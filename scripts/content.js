/**
 * MedScan Content Script (Fixed - No Loop)
 * Scans web pages for medical misinformation
 */

(function() {
  'use strict';
  
  // Firefox uses 'browser' namespace, but 'chrome' works too
  const api = typeof browser !== 'undefined' ? browser : chrome;
  
  // ========== CONFIG ==========
  const CONFIG = {
    enabled: true,
    autoScan: true,
    minTextLength: 50,
    scanDelay: 2000,
    cooldownTime: 30000,  // 30 seconds between scans
    maxScansPerPage: 3    // Max scans per page load
  };
  
  // ========== STATE ==========
  let isScanning = false;
  let scanCount = 0;
  let lastScanTime = 0;
  let overlays = [];
  let scannedElements = new WeakSet(); // Track already scanned elements
  
  // ========== INIT ==========
  function init() {
    // Load settings
    api.storage.local.get('settings', (result) => {
      if (result.settings) {
        Object.assign(CONFIG, result.settings);
      }
      
      if (CONFIG.autoScan) {
        setTimeout(scanPage, CONFIG.scanDelay);
      }
    });
    
    // Listen for messages from background
    api.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === 'SHOW_VERDICT') {
        showVerdictOverlay(request.results);
        sendResponse({ received: true });
      }
      if (request.type === 'TOGGLE_SCAN') {
        CONFIG.enabled = !CONFIG.enabled;
        api.storage.local.set({ settings: CONFIG });
        sendResponse({ enabled: CONFIG.enabled });
      }
      if (request.type === 'SCAN_PAGE') {
        scanPage();
        sendResponse({ scanned: true });
      }
      return true;
    });
    
    // NO MutationObserver - avoid infinite loops
    // Only scan on initial load and manual trigger
  }
  
  // ========== SCANNER ==========
  function scanPage() {
    // Prevent loops
    if (isScanning) {
      console.log('[MedScan] Already scanning, skipping...');
      return;
    }
    
    if (!CONFIG.enabled) {
      console.log('[MedScan] Scanning disabled');
      return;
    }
    
    if (scanCount >= CONFIG.maxScansPerPage) {
      console.log('[MedScan] Max scans reached for this page');
      return;
    }
    
    const now = Date.now();
    if (now - lastScanTime < CONFIG.cooldownTime) {
      console.log('[MedScan] Cooldown active, skipping...');
      return;
    }
    
    isScanning = true;
    lastScanTime = now;
    scanCount++;
    
    console.log(`[MedScan] Scanning page (attempt ${scanCount}/${CONFIG.maxScansPerPage})...`);
    
    // Extract text content from page
    const textBlocks = extractTextBlocks();
    
    if (textBlocks.length === 0) {
      console.log('[MedScan] No text blocks found');
      isScanning = false;
      return;
    }
    
    console.log(`[MedScan] Found ${textBlocks.length} text blocks to scan`);
    
    // Scan each block
    let foundClaims = 0;
    let scannedCount = 0;
    
    for (const block of textBlocks) {
      // Skip already scanned elements
      if (scannedElements.has(block.element)) continue;
      
      if (block.text.length < CONFIG.minTextLength) continue;
      
      // Mark as scanned
      scannedElements.add(block.element);
      scannedCount++;
      
      api.runtime.sendMessage(
        { type: 'SCAN_TEXT', text: block.text },
        (response) => {
          if (api.runtime.lastError) return;
          if (!response || !response.results) return;
          
          const { verified, potential } = response.results;
          
          if (verified.length > 0) {
            foundClaims += verified.length;
            highlightBlock(block.element, verified);
            console.log(`[MedScan] Found ${verified.length} claims in block`);
          }
        }
      );
      
      // Limit concurrent requests
      if (scannedCount >= 10) break;
    }
    
    console.log(`[MedScan] Scanned ${scannedCount} blocks, found ${foundClaims} claims`);
    
    // Reset scanning state after delay
    setTimeout(() => { 
      isScanning = false; 
    }, 3000);
  }
  
  // ========== TEXT EXTRACTION ==========
  function extractTextBlocks() {
    const blocks = [];
    const selectors = [
      'p', 'article', 'section', 'li', 'h1', 'h2', 'h3', 'h4',
      'blockquote', 'figcaption', 'aside'
    ];
    
    const elements = document.querySelectorAll(selectors.join(', '));
    
    for (const el of elements) {
      // Skip hidden elements
      if (el.offsetParent === null && el.tagName !== 'BODY') continue;
      if (el.closest('.medscan-overlay')) continue; // Skip our own overlays
      if (scannedElements.has(el)) continue; // Skip already scanned
      
      const text = el.textContent.trim();
      if (text.length >= CONFIG.minTextLength && text.length < 2000) {
        blocks.push({ element: el, text });
      }
    }
    
    // Deduplicate (parent often contains child text)
    const unique = [];
    const seen = new Set();
    
    for (const block of blocks) {
      const hash = block.text.substring(0, 80);
      if (!seen.has(hash)) {
        seen.add(hash);
        unique.push(block);
      }
    }
    
    return unique.slice(0, 15); // Limit to prevent performance issues
  }
  
  // ========== HIGHLIGHTING ==========
  function highlightBlock(element, claims) {
    const severity = claims.some(c => c.severity === 'critical') ? 'critical' :
                     claims.some(c => c.severity === 'high') ? 'high' : 'medium';
    
    // Add border indicator
    element.style.borderLeft = `4px solid ${
      severity === 'critical' ? '#ef4444' :
      severity === 'high' ? '#f59e0b' : '#3b82f6'
    }`;
    element.style.paddingLeft = '12px';
    element.style.transition = 'all 0.3s ease';
    element.style.position = 'relative';
    
    // Add badge
    const badge = document.createElement('div');
    badge.className = 'medscan-badge';
    badge.innerHTML = `
      <span class="medscan-badge-icon">⚠️</span>
      <span class="medscan-badge-text">MedScan: ${claims.length} claim${claims.length > 1 ? 's' : ''}</span>
    `;
    badge.style.cssText = `
      position: absolute;
      top: -12px;
      right: 8px;
      background: ${severity === 'critical' ? '#ef4444' : severity === 'high' ? '#f59e0b' : '#3b82f6'};
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      cursor: pointer;
      z-index: 10000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    
    badge.addEventListener('click', (e) => {
      e.stopPropagation();
      showVerdictOverlay({
        verified: claims,
        potential: [],
        originalText: element.textContent.substring(0, 200)
      });
    });
    
    element.style.position = 'relative';
    element.appendChild(badge);
  }
  
  // ========== VERDICT OVERLAY ==========
  function showVerdictOverlay(results) {
    // Remove existing overlays
    overlays.forEach(el => el.remove());
    overlays = [];
    
    const overlay = document.createElement('div');
    overlay.className = 'medscan-overlay';
    overlay.innerHTML = buildOverlayHTML(results);
    
    document.body.appendChild(overlay);
    overlays.push(overlay);
    
    // Animate in
    requestAnimationFrame(() => overlay.classList.add('medscan-visible'));
    
    // Close handlers
    overlay.querySelector('.medscan-close').addEventListener('click', () => {
      overlay.classList.remove('medscan-visible');
      setTimeout(() => overlay.remove(), 300);
    });
    
    // Auto-close
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.classList.remove('medscan-visible');
        setTimeout(() => overlay.remove(), 300);
      }
    }, 8000);
  }
  
  function buildOverlayHTML(results) {
    const { verified, potential } = results;
    
    let html = `
      <div class="medscan-header">
        <div class="medscan-logo">🔍 MedScan</div>
        <button class="medscan-close">✕</button>
      </div>
      <div class="medscan-body">
    `;
    
    if (verified.length > 0) {
      for (const claim of verified) {
        const verdictColor = claim.verdict === 'false' ? '#ef4444' :
                            claim.verdict === 'misleading' ? '#f59e0b' : '#3b82f6';
        const verdictIcon = claim.verdict === 'false' ? '❌' :
                           claim.verdict === 'misleading' ? '⚠️' : 'ℹ️';
        const verdictLabel = claim.verdict === 'false' ? 'FALSE' :
                            claim.verdict === 'misleading' ? 'MISLEADING' : 'UNVERIFIED';
        
        html += `
          <div class="medscan-claim" style="border-left-color: ${verdictColor}">
            <div class="medscan-claim-header">
              <span class="medscan-verdict" style="background: ${verdictColor}">${verdictIcon} ${verdictLabel}</span>
              <span class="medscan-confidence">${Math.round(claim.confidence * 100)}% confidence</span>
            </div>
            <div class="medscan-matched">"${claim.matchedText}"</div>
            <div class="medscan-explanation">${claim.explanation}</div>
            <div class="medscan-sources">
              <strong>Sources:</strong>
              ${claim.sources.map(s => `<a href="${s.url}" target="_blank" class="medscan-source">${s.name}</a>`).join('')}
            </div>
            <div class="medscan-category">Category: ${claim.category} | Severity: ${claim.severity}</div>
          </div>
        `;
      }
    }
    
    if (potential.length > 0 && verified.length === 0) {
      html += `
        <div class="medscan-potential">
          <div class="medscan-potential-header">⚠️ Potential Medical Claims Detected</div>
          <div class="medscan-potential-text">
            We found patterns that look like medical claims. Always verify with trusted sources like WHO, CDC, or your doctor.
          </div>
          <div class="medscan-potential-claims">
            ${potential.map(p => `<div class="medscan-potential-claim">"${p.matchedText}"</div>`).join('')}
          </div>
        </div>
      `;
    }
    
    html += `
      </div>
      <div class="medscan-footer">
        <span>MedScan v1.0 — Always consult healthcare professionals</span>
      </div>
    `;
    
    return html;
  }
  
  // ========== START ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
