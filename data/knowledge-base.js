/**
 * MedScan Knowledge Base
 * Verified medical claims from WHO, CDC, PubMed, NIH
 * Each entry: { pattern, verdict, explanation, sources, category }
 * 
 * verdict: "false" | "misleading" | "unverified" | "true"
 */

const MEDICAL_KNOWLEDGE_BASE = [

  // ==================== VACCINES ====================
  // VAX-001 to VAX-003 already exist below

  // ==================== CANCER (MORE) ====================
  {
    id: "CAN-004",
    patterns: [
      /apio\s+cura\s+cancer/i,
      /jugo\s+de\s+apio\s+y\s+cancer/i,
      /celery\s+j cure/i
    ],
    verdict: "false",
    confidence: 0.95,
    explanation: "No existe evidencia científica de que el apio o su jugo cure el cáncer. Ningún alimento por sí solo puede curar el cáncer.",
    sources: [
      { name: "American Cancer Society", url: "https://www.cancer.org/treatment/treatments-and-side-effects/complementary-and-alternative-medicine.html" },
      { name: "NCI - Anticancer Drugs", url: "https://www.cancer.gov/about-cancer/treatment/cam" }
    ],
    category: "cancer",
    severity: "high"
  },
  {
    id: "CAN-005",
    patterns: [
      /vph\s+se\s+cura\s+con\s+hierbas/i,
      /virus\s+del\s+papiloma\s+natural/i,
      /vacuna\s+vph\s+causa\s+infertilidad/i
    ],
    verdict: "false",
    confidence: 0.96,
    explanation: "El VPH no se cura con hierbas. La vacuna contra el VPH es segura y efectiva, y NO causa infertilidad. Previene cánceres causados por el VPH.",
    sources: [
      { name: "CDC - HPV Vaccine", url: "https://www.cdc.gov/hpv/vaccine/index.html" },
      { name: "WHO - HPV", url: "https://www.who.int/news-room/fact-sheets/detail/human-papillomavirus-(hpv)" }
    ],
    category: "cancer",
    severity: "high"
  },
  {
    id: "CAN-006",
    patterns: [
      /mamosa\s+cura\s+cancer/i,
      /graviola\s+cura\s+cancer/i,
      /soursop\s+cures?\s+cancer/i
    ],
    verdict: "false",
    confidence: 0.94,
    explanation: "La guanábana/mamosa/graviola NO cura el cáncer. Estudios in vitro no son equivalentes a tratamientos probados en humanos. Puede ser tóxica en exceso.",
    sources: [
      { name: "NCI - Graviola", url: "https://www.cancer.gov/about-cancer/treatment/cam/hp/graviola-pdq" },
      { name: "FDA - Toxic Plants", url: "https://www.fda.gov/food/buy-store-serve-safe-food/foodborne-illness-and-germs" }
    ],
    category: "cancer",
    severity: "high"
  },

  // ==================== DIABETES ====================
  {
    id: "DIA-001",
    patterns: [
      /diabetes\s+se\s+cura\s+con\s+canela/i,
      /canela\s+cura\s+diabetes/i,
      /canela\s+reemplaza\s+insulina/i
    ],
    verdict: "false",
    confidence: 0.95,
    explanation: "La canela NO cura la diabetes. Puede ayudar marginalmente con la sensibilidad a la insulina, pero NUNCA debe reemplazar medicamentos prescritos.",
    sources: [
      { name: "ADA - Cinnamon", url: "https://diabetes.org/healthy-living/medication-treatments/cinnamon-and-diabetes" },
      { name: "PubMed Review", url: "https://pubmed.ncbi.nlm.nih.gov/?term=cinnamon+diabetes+meta-analysis" }
    ],
    category: "diabetes",
    severity: "high"
  },
  {
    id: "DIA-002",
    patterns: [
      /diabetes\s+es\+por\s+comer\s+azúcar/i,
      /azúcar\+causa\s+diabetes\s+tipo/i,
      /si\s+no\s+comes\s+azúcar\s+no\s+tienes\s+diabetes/i
    ],
    verdict: "misleading",
    confidence: 0.80,
    explanation: "La diabetes tipo 2 tiene factores genéticos, peso, edad y sedentarismo. Comer azúcar NO causa diabetes directamente, aunque una dieta alta en azúcar contribuye al sobrepeso.",
    sources: [
      { name: "CDC - Diabetes", url: "https://www.cdc.gov/diabetes/risk-factors/index.html" },
      { name: "WHO - Diabetes", url: "https://www.who.int/news-room/fact-sheets/detail/diabetes" }
    ],
    category: "diabetes",
    severity: "medium"
  },
  {
    id: "DIA-003",
    patterns: [
      /diabetes\s+tipo\s+2\s+se\s+cura\s+con\s+ayuno/i,
      /ayuno\s+intermitente\s+cura\s+diabetes/i,
      /diabetes\s+reversible\s+con\s+dieta/i
    ],
    verdict: "misleading",
    confidence: 0.75,
    explanation: "Algunos estudios muestran mejora con pérdida de peso significativa, pero 'cura' es engañoso. La diabetes tipo 2 es una condición crónica que se gestiona, no se cura.",
    sources: [
      { name: "ADA - Remission", url: "https://diabetes.org/diabetes/remission" },
      { name: "NEJM - DiRECT Trial", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1716153" }
    ],
    category: "diabetes",
    severity: "medium"
  },

  // ==================== HEART DISEASE ====================
  {
    id: "HEA-001",
    patterns: [
      /aceite\s+de\s+coco\s+es\+bueno\s+para\s+el\corazón/i,
      /aceite\s+coco\s+baja\s+colesterol/i,
      /mantequilla\s+es\s+mejor\s+que\s+margarina/i
    ],
    verdict: "misleading",
    confidence: 0.80,
    explanation: "El aceite de coco es alto en grasas saturadas. La AHA no lo recomienda para mejorar la salud cardíaca. Puede elevar el colesterol LDL.",
    sources: [
      { name: "AHA - Coconut Oil", url: "https://www.heart.org/en/news/2020/03/30/more-evidence-that-higher-coconut-oil-intake-may-increase-heart-disease-risk" },
      { name: "Circulation", url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000000743" }
    ],
    category: "heart",
    severity: "medium"
  },
  {
    id: "HEA-002",
    patterns: [
      /infarto\s+se\s+cura\s+con\s+ajo/i,
      /ajo\s+disuelve\s+placas/i,
      /ajo\s+liquida\s+la\s+sangre/i
    ],
    verdict: "false",
    confidence: 0.92,
    explanation: "El ajo tiene propiedades modestas, pero NO disuelve placas arteriales ni previene infartos. Las estatinas y cambios en el estilo de vida son los tratamientos probados.",
    sources: [
      { name: "AHA - Garlic", url: "https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/nutrition-basics/garlic" },
      { name: "Cochrane Review", url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007653.pub2/full" }
    ],
    category: "heart",
    severity: "high"
  },

  // ==================== PREGNANCY ====================
  {
    id: "PRE-001",
    patterns: [
      /embarazo\s+no\s+tomar\s+ácido\s+fólico/i,
      /ácido\s+fólico\s+es\s+opcional/i,
      /vitaminas\s+no\s+necesarias\s+embarazo/i
    ],
    verdict: "false",
    confidence: 0.97,
    explanation: "El ácido fólico es ESENCIAL durante el embarazo. Previene defectos del tubo neural como la espina bífida. La OMS recomienda 400-800 mcg diarios.",
    sources: [
      { name: "WHO - Folic Acid", url: "https://www.who.int/publications/i/item/9241546840" },
      { name: "ACOG", url: "https://www.acog.org/womens-health/faqs/folic-acid" }
    ],
    category: "pregnancy",
    severity: "critical"
  },
  {
    id: "PRE-002",
    patterns: [
      /embarazo\s+no\s+vacunar/i,
      /vacuna\s+en\s+embarazo\s+peligro/i,
      /vacuna\s+gripe\s+embarazo\s+mata/i
    ],
    verdict: "false",
    confidence: 0.96,
    explanation: "Las vacunas de gripe y Tdap son SEGURAS y RECOMENDADAS durante el embarazo. Protegen a la madre y al bebé. No contienen virus vivos.",
    sources: [
      { name: "CDC - Vaccines & Pregnancy", url: "https://www.cdc.gov/vaccines/pregnancy/index.html" },
      { name: "WHO", url: "https://www.who.int/news-room/questions-and-answers/item/vaccines-and-immunization-what-is-vaccination" }
    ],
    category: "pregnancy",
    severity: "critical"
  },

  // ==================== CHILDREN'S HEALTH ====================
  {
    id: "CHI-001",
    patterns: [
      /fiebre\s+en\s+niños\s+peligrosa/i,
      /fiebre\s+mata\s+neuronas/i,
      /paracetamol\s+en\s+niños\s+veneno/i
    ],
    verdict: "false",
    confidence: 0.90,
    explanation: "La fiebre es una respuesta normal del sistema inmunológico. Por sí sola NO daña el cerebro. El paracetamol/ibuprofeno en dosis correctas es seguro para niños.",
    sources: [
      { name: "AAP - Fever", url: "https://www.healthychildren.org/English/health-issues/conditions/fever/Pages/Fever-Without-Fear.aspx" },
      { name: "NICE Guidelines", url: "https://www.nice.org.uk/guidance/cg160" }
    ],
    category: "children",
    severity: "high"
  },
  {
    id: "CHI-002",
    patterns: [
      /autismo\s+se\s+cura\s+con\s+dieta/i,
      /dieta\s+keto\s+cura\s+autismo/i,
      /autismo\s+se\s+cura\s+con\s+terapia\s+natural/i
    ],
    verdict: "false",
    confidence: 0.95,
    explanation: "El autismo NO tiene cura. Las terapias conductuales (ABA, etc.) pueden ayudar, pero las dietas 'curativas' no tienen evidencia científica.",
    sources: [
      { name: "Autism Speaks", url: "https://www.autismspeaks.org/what-autism" },
      { name: "NIH", url: "https://www.nimh.nih.gov/health/topics/autism-spectrum-disorders-asd" }
    ],
    category: "children",
    severity: "high"
  },

  // ==================== HIV/AIDS ====================
  {
    id: "HIV-001",
    patterns: [
      /sida\s+se\s+cura\s+con\s+hierbas/i,
      /vih\s+se\s+cura\s+natural/i,
      /antirretrovirales\s+son\s+veneno/i
    ],
    verdict: "false",
    confidence: 0.99,
    explanation: "El VIH NO tiene cura conocida. Los antirretrovirales son tratamientos que mantienen la carga viral indetectable. Suspenderlos puede ser fatal.",
    sources: [
      { name: "WHO - HIV/AIDS", url: "https://www.who.int/news-room/fact-sheets/detail/hiv-aids" },
      { name: "CDC - Treatment", url: "https://www.cdc.gov/hiv/basics/livingwithhiv/treatment.html" }
    ],
    category: "infectious",
    severity: "critical"
  },
  {
    id: "HIV-002",
    patterns: [
      /vih\s+no\+existe/i,
      /sida\s+es\s+inventado/i,
      /vih\s+se\s+transmite\s+por\s+besos/i
    ],
    verdict: "false",
    confidence: 0.99,
    explanation: "El VIH es un virus real, secuenciado y estudiado extensamente. NO se transmite por besos, abrazos, vasos ni mosquito. Se transmite por fluidos corporales.",
    sources: [
      { name: "CDC - Transmission", url: "https://www.cdc.gov/hiv/basics/transmission.html" },
      { name: "NIH", url: "https://www.niaid.nih.gov/diseases-conditions/hiv-aids" }
    ],
    category: "infectious",
    severity: "critical"
  },

  // ==================== WEIGHT LOSS ====================
  {
    id: "WLO-001",
    patterns: [
      /píldora\s+de\s+dieta\s+quema\s+grasa/i,
      /suplemento\s+mágico\s+bajar\s+peso/i,
      /te\s+quema\s+grasa\s+rápido/i,
      /pastilla\s+para\+adelgazar\s+sin\s+dieta/i
    ],
    verdict: "false",
    confidence: 0.95,
    explanation: "No existe pastilla mágica para bajar de peso. Los suplementos para dietas pueden ser peligrosos (contaminados, no regulados). La pérdida de peso sostenible requiere dieta y ejercicio.",
    sources: [
      { name: "FDA - Weight Loss Supplements", url: "https://www.fda.gov/consumers/consumer-updates/tainted-weight-loss-products" },
      { name: "NIH", url: "https://www.niddk.nih.gov/health-information/weight-management/healthy-weight" }
    ],
    category: "weight-loss",
    severity: "high"
  },
  {
    id: "WLO-002",
    patterns: [
      /comida\s+light\s+se\s+puede\s+comer\s+sin\s+límite/i,
      /light\s+no\s+engorda/i,
      /diet\+cola\s+no\s+engorda/i
    ],
    verdict: "misleading",
    confidence: 0.80,
    explanation: "Los productos 'light' pueden tener menos calorías, pero no significa que puedas comer sin límite. El efecto psicológico puede llevar a comer más de otras fuentes.",
    sources: [
      { name: "FDA - Labeling", url: "https://www.fda.gov/food/food-labeling-nutrition/food-labeling-guide" },
      { name: "NIH", url: "https://www.niddk.nih.gov/health-information/weight-management/healthy-weight" }
    ],
    category: "weight-loss",
    severity: "medium"
  },

  // ==================== VITAMINS & SUPPLEMENTS ====================
  {
    id: "VIT-001",
    patterns: [
      /vitamina\s+c\s+cura\s+gripe/i,
      /vitamina\s+c\s+preven\s+resfriado/i,
      /megadosis\s+vitamina\s+c\s+cura/i
    ],
    verdict: "misleading",
    confidence: 0.85,
    explanation: "La vitamina C NO cura la gripe. Puede reducir ligeramente la duración del resfriado (8% en adultos), pero NO lo previene. Megadosis pueden causar problemas renales.",
    sources: [
      { name: "Cochrane Review", url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD000980.pub4/full" },
      { name: "NIH - Vitamin C", url: "https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/" }
    ],
    category: "supplements",
    severity: "medium"
  },
  {
    id: "VIT-002",
    patterns: [
      /vitamina\s+d\s+cura\s+todo/i,
      /vitamina\s+d\s+es\s+la\s+cura/i,
      /déficit\s+vitamina\s+d\s+causa\s+todo/i
    ],
    verdict: "misleading",
    confidence: 0.80,
    explanation: "La vitamina D es importante pero NO es una cura universal. El exceso puede ser tóxico (hipervitaminosis D). Los niveles deben ser monitoreados por un médico.",
    sources: [
      { name: "NIH - Vitamin D", url: "https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/" },
      { name: "Endocrine Society", url: "https://www.endocrine.org/diseases-and-conditions/vitamin-d" }
    ],
    category: "supplements",
    severity: "medium"
  },

  // ==================== DENTAL ====================
  {
    id: "DEN-001",
    patterns: [
      /dientes\s+se\s+blanquean\s+con\s+limón/i,
      /bicarbonato\s+blanquea\s+dientes/i,
      /hidrógeno\s+oxidado\s+bucal/i
    ],
    verdict: "misleading",
    confidence: 0.85,
    explanation: "El limón y bicarbonato en exceso dañan el esmalte dental. El peróxido de hidrógeno bucal puede causar irritación. Consulta a un dentista para blanqueamiento seguro.",
    sources: [
      { name: "ADA", url: "https://www.ada.org/resources/research/science-and-research-institute/oral-health-topics/teeth-whitening" },
      { name: "Cleveland Clinic", url: "https://health.clevelandclinic.org/why-you-should-not-use-baking-soda-and-lemon-juice-to-whiten-your-teeth" }
    ],
    category: "dental",
    severity: "medium"
  },

  // ==================== SLEEP ====================
  {
    id: "SLE-001",
    patterns: [
      /melatonina\s+es\+segura\s+siempre/i,
      /melatonina\s+no\s+tiene\s+efectos/i,
      /dormir\s+4\s+horas\s+es\s+suficiente/i
    ],
    verdict: "misleading",
    confidence: 0.82,
    explanation: "La melatonina puede ayudar a regular el sueño pero el exceso puede causar problemas. Dormir menos de 6 horas se asocia con problemas de salud serios.",
    sources: [
      { name: "NIH - Melatonin", url: "https://ods.od.nih.gov/factsheets/Melatonin-HealthProfessional/" },
      { name: "AASM", url: "https://aasm.org/resources/factsheets/sleepduration/" }
    ],
    category: "sleep",
    severity: "medium"
  },

  // ==================== STI/STD ====================
  {
    id: "STI-001",
    patterns: [
      /herpes\s+se\s+cura\s+con\s+hierbas/i,
      /virus\s+herpes\s+natural/i,
      /herpes\s+desaparece\s+con\s+aceite/i
    ],
    verdict: "false",
    confidence: 0.97,
    explanation: "El herpes (HSV-1 y HSV-2) NO tiene cura conocida. Los antivirales (aciclovir) controlan los brotes pero no eliminan el virus. Los 'remedios naturales' no funcionan.",
    sources: [
      { name: "CDC - Herpes", url: "https://www.cdc.gov/std/herpes/index.htm" },
      { name: "WHO", url: "https://www.who.int/news-room/fact-sheets/detail/herpes-simplex-virus" }
    ],
    category: "sti",
    severity: "high"
  },

  // ==================== AGING ====================
  {
    id: "AGE-001",
    patterns: [
      /aceite\s+de\s+ricino\s+crece\s+pelo/i,
      /aceite\s+ricino\s+calvicie/i,
      /gel\s+de\s+aloe\s+crece\s+cabello/i
    ],
    verdict: "false",
    confidence: 0.90,
    explanation: "No existe evidencia de que el aceite de ricino o aloe vera hagan crecer el cabello. La calvicie (alopecia androgénica) tiene causas genéticas/hormonales que estos productos no abordan.",
    sources: [
      { name: "AAD - Hair Loss", url: "https://www.aad.org/public/diseases/hair-loss/types/alopecia-areata/treatment" },
      { name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=castor+oil+hair+growth" }
    ],
    category: "aging",
    severity: "medium"
  },

  // ==================== EYE CARE ====================
  {
    id: "EYE-001",
    patterns: [
      /zanahoria\s+mejora\s+visión/i,
      /zanahoria\s+cura\s+miopía/i,
      /ojos\s+se\s+ejercitan\s+con\s+ejercicios/i
    ],
    verdict: "misleading",
    confidence: 0.80,
    explanation: "Las zanahorias aportan vitamina A (buena para la salud ocular) pero NO mejoran la miopía ni 'curan' problemas de visión. Los ejercicios oculares no corrigen errores refractivos.",
    sources: [
      { name: "AAO", url: "https://www.aao.org/eye-health/tips-prevention/nutrition-vision" },
      { name: "Cochrane Review", url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD013244.pub2/full" }
    ],
    category: "eye-care",
    severity: "medium"
  },

  // ==================== SKIN CARE ====================
  {
    id: "SKI-001",
    patterns: [
      /crema\s+de\s+mercurio\s+blanquea/i,
      /mercurio\s+para\s+la\s+piel/i,
      /calomel\s+blanquea\s+pelo/i
    ],
    verdict: "false",
    confidence: 0.99,
    explanation: "El mercurio es ALTAMENTE TÓXICO. Causa daño neurológico, renal y puede ser mortal. Está PROHIBIDO en cosméticos en la mayoría de países.",
    sources: [
      { name: "FDA - Mercury in Cosmetics", url: "https://www.fda.gov/cosmetics/productsingredients/ingredients/ucm127412.htm" },
      { name: "WHO - Mercury", url: "https://www.who.int/news-room/fact-sheets/detail/mercury-and-health" }
    ],
    category: "skin",
    severity: "critical"
  },

  // ==================== MORE VACCINES ====================
  {
    id: "VAX-004",
    patterns: [
      /vacuna\s+gripe\s+causa\s+gripe/i,
      /vacuna\s+gripe\s+te\s+enferma/i,
      /gripe\s+por\s+vacuna/i
    ],
    verdict: "false",
    confidence: 0.97,
    explanation: "La vacuna de gripe NO contiene virus vivos y NO puede causar gripe. Los efectos leves (dolor, fiebre baja) son normales y duran 1-2 días.",
    sources: [
      { name: "CDC - Flu Vaccine Safety", url: "https://www.cdc.gov/flu/prevent/vaccinationsafety.htm" },
      { name: "WHO", url: "https://www.who.int/news-room/questions-and-answers/item/influenza-vaccines" }
    ],
    category: "vaccines",
    severity: "high"
  },
  {
    id: "VAX-005",
    patterns: [
      /vacuna\s+covid\s+causa\s+infertilidad/i,
      /covid\s+vaccine\s+causes\s+infertility/i,
      /vacuna\s+mrna\s+modifica\s+adn/i
    ],
    verdict: "false",
    confidence: 0.98,
    explanation: "Las vacunas de COVID-19 NO causan infertilidad y NO modifican el ADN. Los ensayos clínicos y millones de dosis confirmaron su seguridad reproductiva.",
    sources: [
      { name: "CDC - Fertility", url: "https://www.cdc.gov/coronavirus/2019-ncov/vaccines/faq.html" },
      { name: "NEJM", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2104983" }
    ],
    category: "vaccines",
    severity: "critical"
  },

  // ==================== MORE COVID ====================
  {
    id: "COVID-004",
    patterns: [
      /covid\s+se\s+cura\s+con\s+vitamina\s+d/i,
      /vitamina\s+d\s+previene\s+covid/i,
      /zinc\s+cures?\s+covid/i
    ],
    verdict: "misleading",
    confidence: 0.80,
    explanation: "La vitamina D y zinc pueden apoyar el sistema inmunológico, pero NO previenen ni curan COVID-19. Las vacunas son la protección principal.",
    sources: [
      { name: "WHO", url: "https://www.who.int/publications/i/item/WHO-2019-nCoV-Sci_Brief-Nutritional_supplements-2022.1" },
      { name: "Cochrane Review", url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD015043.pub2/full" }
    ],
    category: "infectious",
    severity: "medium"
  },
  {
    id: "COVID-005",
    patterns: [
      /mascarilla\s+no\s+sirve/i,
      /barbijo\s+no\s+protege/i,
      /cubrebocas\s+causa\s+daño/i
    ],
    verdict: "false",
    confidence: 0.90,
    explanation: "Las mascarillas reducen la transmisión de enfermedades respiratorias. No causan hipoxia ni acumulan CO2. La evidencia científica respalda su uso.",
    sources: [
      { name: "CDC - Masks", url: "https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/masks" },
      { name: "Lancet Meta-analysis", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext" }
    ],
    category: "infectious",
    severity: "high"
  },

  // ==================== MORE EMERGENCIES ====================
  {
    id: "EME-002",
    patterns: [
      /acv\s+se\s+cura\s+con\s+ajo/i,
      /derrame\s+cerebral\s+natural/i,
      /parálisis\s+se\s+cura\s+en\s+casa/i
    ],
    verdict: "false",
    confidence: 0.99,
    explanation: "Un ACV (derrame cerebral) es una EMERGENCIA MÉDICA. Cada minuto cuenta. Los tratamientos deben iniciarse en las primeras 3-4 horas para salvar tejido cerebral.",
    sources: [
      { name: "AHA - Stroke", url: "https://www.stroke.org/en/about-stroke/stroke-signs-and-symptoms" },
      { name: "CDC - Stroke", url: "https://www.cdc.gov/stroke/index.htm" }
    ],
    category: "emergency",
    severity: "critical"
  },
  {
    id: "EME-003",
    patterns: [
      /asfixia\s+se\s+cura\s+con\s+bolso/i,
      /ahogamiento\s+natural/i,
      /paro\s+respiratorio\s+casa/i
    ],
    verdict: "false",
    confidence: 0.99,
    explanation: "La asfixia y el paro respiratorio requieren RCP inmediata y llamada a emergencias. No intentes 'remedios caseros' — la falta de oxígeno mata en minutos.",
    sources: [
      { name: "AHA - CPR", url: "https://cpr.heart.org/en/cpr-courses-and-kits/hands-only-cpr" },
      { name: "Red Cross", url: "https://www.redcross.org/take-a-class/cpr/cpr-training/performing-cpr/adult-cpr" }
    ],
    category: "emergency",
    severity: "critical"
  },

  // ==================== MORE MENTAL HEALTH ====================
  {
    id: "MH-003",
    patterns: [
      /esquizofrenia\s+se\s+cura\s+con\s+fe/i,
      /psicosis\s+es\s+posesión/i,
      /esquizofrenia\s+se\s+cura\s+con\s+oración/i
    ],
    verdict: "false",
    confidence: 0.97,
    explanation: "La esquizofrenia es un trastorno neurológico que requiere medicación antipsicótica. La oración puede dar comfort, pero NO reemplaza el tratamiento médico.",
    sources: [
      { name: "NIMH", url: "https://www.nimh.nih.gov/health/topics/schizophrenia" },
      { name: "APA", url: "https://www.psychiatry.org/patients-families/schizophrenia/what-is-schizophrenia" }
    ],
    category: "mental-health",
    severity: "critical"
  },
  {
    id: "MH-004",
    patterns: [
      /trastorno\s+bipolar\s+no\s+existe/i,
      /bipolar\s+es\s+excusa/i,
      /bipolar\s+se\s+cura\s+con\s+yoga/i
    ],
    verdict: "false",
    confidence: 0.96,
    explanation: "El trastorno bipolar es una condición neurológica real con base genética y neuroquímica. Requiere estabilizadores del ánimo (litio, etc.) supervisados por psiquiatra.",
    sources: [
      { name: "NIMH - Bipolar", url: "https://www.nimh.nih.gov/health/topics/bipolar-disorder" },
      { name: "WHO", url: "https://www.who.int/news-room/fact-sheets/detail/bipolar-disorder" }
    ],
    category: "mental-health",
    severity: "high"
  },

  // ==================== MORE DANGEROUS REMEDIES ====================
  {
    id: "REM-004",
    patterns: [
      /clorofila\s+cura\s+todo/i,
      /clorofila\s+desintoxica/i,
      /jugo\s+verde\s+cura\s+cancer/i
    ],
    verdict: "misleading",
    confidence: 0.82,
    explanation: "La clorofila tiene propiedades antioxidantes modestas, pero NO 'cura todo' ni 'desintoxica'. No hay evidencia de que cure enfermedades graves.",
    sources: [
      { name: "NIH", url: "https://www.nccih.nih.gov/health/chlorophyll-and-chlorophyllin" },
      { name: "Memorial Sloan Kettering", url: "https://www.mskcc.org/cancer-care/integrative-medicine/herbs/chlorophyll" }
    ],
    category: "dangerous",
    severity: "medium"
  },
  {
    id: "REM-005",
    patterns: [
      /aceite\s+esencial\s+cura\s+epilepsia/i,
      /aceite\s+cbd\s+cura\s+epilepsia/i,
      /epilepsia\s+se\s+cura\s+con\s+marihuana/i
    ],
    verdict: "misleading",
    confidence: 0.80,
    explanation: "El CBD (epidiolex) está aprobado para ciertas formas de epilepsia resistente, pero es un medicamento controlado, NO aceite esencial genérico. La marihuana NO cura la epilepsia.",
    sources: [
      { name: "FDA - Epidiolex", url: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-drug-composed-active-ingredient-derived-marijuana-treat-seizures" },
      { name: "Epilepsy Foundation", url: "https://www.epilepsy.com/article/2020/3/cbd-and-epilepsy" }
    ],
    category: "dangerous",
    severity: "high"
  },
  {
    id: "REM-006",
    patterns: [
      /cloro\s+cura\s+covid/i,
      /lavandina\s+cura\s+covid/i,
      /injerto\s+rectal\s+de\s+cloro/i,
      /bleach\s+cures?\s+covid/i
    ],
    verdict: "false",
    confidence: 0.99,
    explanation: "Ingerir o inyectar cloro/lejía es EXTREMADAMENTE PELIGROSO y puede ser MORTAL. No existe ninguna forma segura de usar cloro como tratamiento médico.",
    sources: [
      { name: "FDA - COVID-19 Fraudulent Products", url: "https://www.fda.gov/consumers/consumer-updates/caution-its-fake-fraudulent-or-misleading-dont-buy-covid-19-product" },
      { name: "Poison Control", url: "https://www.poison.org/articles/bleach-chlorine-poisoning" }
    ],
    category: "dangerous",
    severity: "critical"
  },

  // ==================== MORE ALIMENTACIÓN ====================
  {
    id: "ALI-003",
    patterns: [
      /leche\s+de\+soja\s+causa\s+ginecomastia/i,
      /soja\s+es\s+estrogeno/i,
      /soja\s+feminiza\s+hombres/i
    ],
    verdict: "false",
    confidence: 0.90,
    explanation: "La soja contiene fitoestrógenos débiles que NO causan ginecomastia ni feminización. Estudios en hombres que consumen soja regularmente no muestran efectos hormonales significativos.",
    sources: [
      { name: "Harvard Health", url: "https://www.health.harvard.edu/staying-healthy/misconceptions-about-soy" },
      { name: "PubMed Meta-analysis", url: "https://pubmed.ncbi.nlm.nih.gov/?term=soy+phytoestrogens+men+testosterone" }
    ],
    category: "nutrition",
    severity: "medium"
  },
  {
    id: "ALI-004",
    patterns: [
      /comida\s+genéticamente\s+modificada\s+causa\s+cancer/i,
      /alimentos\s+transgénicos\s+peligrosos/i,
      /omg\s+causan\s+tumores/i
    ],
    verdict: "false",
    confidence: 0.92,
    explanation: "Los alimentos transgénicos (OMG) aprobados son SEGUNDS según la OMS, FAO, y NAS. No hay evidencia de que causen cancer ni daño a la salud.",
    sources: [
      { name: "WHO - GMOs", url: "https://www.who.int/news-room/questions-and-answers/item/nutrition-ecdl-m-issues-genetically-modified-foods" },
      { name: "NAS", url: "https://nap.nationalacademies.org/catalog/25234/genetically-engineered-crops-experiences-and-prospects" }
    ],
    category: "nutrition",
    severity: "high"
  },

  // ==================== MORE ANTIBIÓTICOS ====================
  {
    id: "ANT-002",
    patterns: [
      /antibióticos\s+para\s+virus/i,
      /antibióticos\s+para\s+covid/i,
      /amoxicilina\s+para\s+gripe/i
    ],
    verdict: "false",
    confidence: 0.98,
    explanation: "Los antibióticos NO funcionan contra virus como la gripe o COVID. Solo matan bacterias. Su uso innecesario crea resistencia antibiótica global.",
    sources: [
      { name: "WHO - AMR", url: "https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance" },
      { name: "CDC", url: "https://www.cdc.gov/antibiotic-use/community/index.html" }
    ],
    category: "antibiotics",
    severity: "high"
  },

  // ==================== ORIGINAL CLAIMS (VAX-001 to GEN-001) ====================
  {
    id: "VAX-001",
    patterns: [
      /vaci[ua]n[ea]s?\s+causan?\s+autismo/i,
      /autismo\s+por\s+vacunas/i,
      /vacunas\s+y\s+autismo/i,
      /vacuna\s+produc[ei]\s+autismo/i
    ],
    verdict: "false",
    confidence: 0.99,
    explanation: "Múltiples estudios con millones de participantes demuestran que NO existe relación entre vacunas y autismo. El estudio original de Wakefield (1998) fue retractado por fraude.",
    sources: [
      { name: "CDC", url: "https://www.cdc.gov/vaccinesafety/concerns/autism.html" },
      { name: "OMS", url: "https://www.who.int/news-room/questions-and-answers/item/vaccines-and-immunization-what-is-vaccination" },
      { name: "The Lancet", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(97)11096-0/fulltext" }
    ],
    category: "vaccines",
    severity: "high"
  },
  {
    id: "VAX-002",
    patterns: [
      /vacunas?\s+contienen?\s+microchips?/i,
      /chip\s+en\s+la\s+vacuna/i,
      /vacuna\s+de\s+5g/i,
      /vacuna\s+control/i
    ],
    verdict: "false",
    confidence: 0.99,
    explanation: "Las vacunas NO contienen microchips, rastreadores ni tecnología 5G. Sus ingredientes son públicos y verificados por agencias regulatorias de múltiples países.",
    sources: [
      { name: "FDA - Ingredientes", url: "https://www.fda.gov/emergency-preparedness-and-response/coronavirus-disease-2019-covid-19/covid-19-vaccines" },
      { name: "EMA", url: "https://www.ema.europa.eu/en/human-regulatory-overview/public-health-threats/coronavirus-disease-covid-19/covid-19-vaccines" }
    ],
    category: "vaccines",
    severity: "high"
  },
  {
    id: "VAX-003",
    patterns: [
      /mejor\s+natur[oa]l[ea]?\s+que\s+vacunar/i,
      /inmunidad\s+natural\s+mejor\s+que\s+vacuna/i,
      /vacuna\s+no\s+es\s+necesaria/i
    ],
    verdict: "misleading",
    confidence: 0.85,
    explanation: "La inmunidad natural existe pero el costo puede ser hospitalización, complicaciones graves o muerte. Las vacunas ofrecen protección con riesgo significativamente menor.",
    sources: [
      { name: "CDC - Natural Immunity", url: "https://www.cdc.gov/coronavirus/2019-ncov/science/science-briefs/vaccine-induced-immunity.html" },
      { name: "Nature Medicine", url: "https://www.nature.com/articles/s41591-022-02051-3" }
    ],
    category: "vaccines",
    severity: "medium"
  },

  // ========== CANCER ==========
  {
    id: "CAN-001",
    patterns: [
      /bicarbonato\s+cura\s+cancer/i,
      /bicarbonato\s+de\s+sodio\s+y\s+cancer/i,
      /alcaliniza[rn]?\s+el\s+cuerpo\s+y\s+cancer/i,
      /ph\s+alcalino\s+cura/i
    ],
    verdict: "false",
    confidence: 0.98,
    explanation: "No existe evidencia científica de que el bicarbonato de sodio cure el cáncer. El cáncer no se 'alcaliniza'. Los tumores tienen su propio microambiente ácido que no se altera con dieta.",
    sources: [
      { name: "American Cancer Society", url: "https://www.cancer.org/treatment/treatments-and-side-effects/complementary-and-alternative-medicine/dietary-supplements.html" },
      { name: "NCI", url: "https://www.cancer.gov/about-cancer/treatment/cam/hp/baking-soda-pdq" }
    ],
    category: "cancer",
    severity: "critical"
  },
  {
    id: "CAN-002",
    patterns: [
      /quimioterapia\s+es\s+peor/i,
      /quimio\s+mata\s+más/i,
      /quimioterapia\s+no\s+funciona/i,
      /no\s+hagas\s+quimio/i
    ],
    verdict: "false",
    confidence: 0.95,
    explanation: "La quimioterapia ha salvado millones de vidas. Para muchos cánceres, es el tratamiento estándar con mayor tasa de supervivencia. Suspenderla por consejo no médico puede ser fatal.",
    sources: [
      { name: "NCI - Chemotherapy", url: "https://www.cancer.gov/about-cancer/treatment/types/chemotherapy" },
      { name: "Cochrane Reviews", url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012244.pub2/full" }
    ],
    category: "cancer",
    severity: "critical"
  },
  {
    id: "CAN-003",
    patterns: [
      /azúcar\s+alimenta\s+cancer/i,
      /azúcar\s+causa\s+cancer/i,
      /eliminar\s+azúcar\s+cura\s+cancer/i,
      /cancer\s+se\s+alimenta\s+de\s+azúcar/i
    ],
    verdict: "misleading",
    confidence: 0.80,
    explanation: "Las células cancerosas usan glucosa, pero TODAS las células del cuerpo usan glucosa. Reducir azúcar no 'alimenta' ni 'desalimenta' el cáncer directamente. La dieta sola no cura el cáncer.",
    sources: [
      { name: "Cancer Research UK", url: "https://www.cancerresearchuk.org/about-cancer/causes-and-prevention/diet-and-cancer/does-sugar-cause-cancer" },
      { name: "MD Anderson", url: "https://www.mdanderson.org/cancerwise/does-sugar-feed-cancer.h00-159385478.html" }
    ],
    category: "cancer",
    severity: "high"
  },

  // ========== COVID-19 ==========
  {
    id: "COVID-001",
    patterns: [
      /ivermectina\s+cure\s+covid/i,
      /ivermectina\s+para\s+covid/i,
      /ivermectina\s+previene\s+covid/i
    ],
    verdict: "misleading",
    confidence: 0.88,
    explanation: "La ivermectina es un antiparasitario. Estudios iniciales prometedores NO se replicaron en ensayos controlados grandes (WHO SOLIDARITY, TOGETHER). La OMS no la recomienda para COVID.",
    sources: [
      { name: "WHO", url: "https://www.who.int/news/item/31-03-2022-who-downgrades-ivermectin-for-covid-19" },
      { name: "NEJM - TOGETHER Trial", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2115869" }
    ],
    category: "infectious",
    severity: "high"
  },
  {
    id: "COVID-002",
    patterns: [
      /covid\s+es\s+gripe\s+nada\s+más/i,
      /covid\s+no\s+existe/i,
      /plandemia/i,
      /covid\s+es\s+inventado/i
    ],
    verdict: "false",
    confidence: 0.99,
    explanation: "COVID-19 ha causado más de 7 millones de muertes confirmadas (OMS). El virus SARS-CoV-2 ha sido secuenciado miles de veces por laboratorios independientes en todo el mundo.",
    sources: [
      { name: "WHO Dashboard", url: "https://covid19.who.int/" },
      { name: "GISAID", url: "https://gisaid.org/" }
    ],
    category: "infectious",
    severity: "critical"
  },
  {
    id: "COVID-003",
    patterns: [
      /covid\s+no\s+mata\s+a\s+la\s+gente/i,
      /muertes\s+por\s+covid\s+son\s+falsas/i,
      /inflan\s+las\s+cifras/i
    ],
    verdict: "false",
    confidence: 0.95,
    explanation: "Los excesos de mortalidad (muertes totales vs esperadas) confirman las cifras de COVID. Países independientes con diferentes gobiernos reportaron patrones similares.",
    sources: [
      { name: "The Economist - Excess Deaths", url: "https://www.economist.com/graphic-detail/coronavirus-excess-deaths-tracker" },
      { name: "Our World in Data", url: "https://ourworldindata.org/excess-mortality-covid" }
    ],
    category: "infectious",
    severity: "high"
  },

  // ========== REMEDIOS CASEROS PELIGROSOS ==========
  {
    id: "REM-001",
    patterns: [
      /peróxido\s+de\s+hidrógeno\s+intravenoso/i,
      /oxígeno\s+idual\s+intravenoso/i,
      /mms\s+(clorito|cloro\s+dióxido)/i,
      /miracle\s+mineral\s+solution/i
    ],
    verdict: "false",
    confidence: 0.99,
    explanation: "El MMS (clorito de sodio) es UN PELIGRO para la salud. La FDA ha emitido múltiples advertencias. Puede causar daño renal severo, insuficiencia respiratoria y muerte.",
    sources: [
      { name: "FDA Warning", url: "https://www.fda.gov/consumers/consumer-updates/danger-dont-drink-miracle-mineral-solution-or-similar-products" },
      { name: "Poison Control", url: "https://www.poison.org/articles/miracle-mineral-solution-or-mms" }
    ],
    category: "dangerous",
    severity: "critical"
  },
  {
    id: "REM-002",
    patterns: [
      /aceite\s+de\s+orégano\s+cure\s+cancer/i,
      /aceite\s+orégano\s+cura\s+todo/i,
      /orégano\s+antibiótico\s+natural/i
    ],
    verdict: "misleading",
    confidence: 0.82,
    explanation: "El aceite de orégano tiene propiedades antioxidantes, pero NO cura el cáncer ni reemplaza antibióticos. Usarlo en lugar de tratamiento médico puede ser peligroso.",
    sources: [
      { name: "Memorial Sloan Kettering", url: "https://www.mskcc.org/cancer-care/integrative-medicine/herbs/oregano" },
      { name: "PubMed Meta-analysis", url: "https://pubmed.ncbi.nlm.nih.gov/?term=oregano+oil+antimicrobial" }
    ],
    category: "remedies",
    severity: "medium"
  },
  {
    id: "REM-003",
    patterns: [
      /coloidal\s+plata\s+cura/i,
      /plata\s+coloidal\s+inmune/i,
      /plata\s+coloidal\s+antibiótico/i
    ],
    verdict: "false",
    confidence: 0.95,
    explanation: "La plata coloidal NO tiene beneficios medicinales comprobados. Puede causar argiria (coloración permanente de la piel), daño renal y puede interferir con medicamentos.",
    sources: [
      { name: "NIH", url: "https://www.nccih.nih.gov/health/silver-colloidal" },
      { name: "FDA", url: "https://www.fda.gov/consumers/consumer-updates/silver-dont-take- orally" }
    ],
    category: "dangerous",
    severity: "high"
  },

  // ========== MENTAL HEALTH ==========
  {
    id: "MH-001",
    patterns: [
      /depresión\s+es\s+falta\s+de\s+fe/i,
      /depresión\s+no\s+existe/i,
      /tristeza\s+no\s+es\s+depresión/i,
      /ansiedad\s+es\s+debilidad/i
    ],
    verdict: "false",
    confidence: 0.95,
    explanation: "La depresión es un trastorno neurológico con base biológica. No es 'falta de fe' ni 'debilidad'. Afecta a más de 280 millones de personas en el mundo (OMS).",
    sources: [
      { name: "OMS - Depression", url: "https://www.who.int/news-room/fact-sheets/detail/depression" },
      { name: "NIMH", url: "https://www.nimh.nih.gov/health/topics/depression" }
    ],
    category: "mental-health",
    severity: "high"
  },
  {
    id: "MH-002",
    patterns: [
      /medicamentos\s+psiquiátricos\s+son\s+veneno/i,
      /antidepresivos\s+destruyen\s+cerebro/i,
      /no\s+tomes\s+antidepresivos/i
    ],
    verdict: "false",
    confidence: 0.90,
    explanation: "Los antidepresivos son tratamientos validados por décadas de investigación. Suspenderlos abruptamente puede causar síndrome de abstinencia y empeoramiento peligroso.",
    sources: [
      { name: "APA Guidelines", url: "https://www.psychiatry.org/patients-families/depression/what-is-depression" },
      { name: "NICE Guidelines", url: "https://www.nice.org.uk/guidance/cg90" }
    ],
    category: "mental-health",
    severity: "high"
  },

  // ========== ALIMENTACIÓN ==========
  {
    id: "ALI-001",
    patterns: [
      /detox\s+real\s+limpieza/i,
      /desintoxicación\s+natural/i,
      /limpiar\s+hígado\s+con/i,
      /cleanse\s+el\s+organismo/i
    ],
    verdict: "misleading",
    confidence: 0.85,
    explanation: "Tu hígado y riñones ya desintoxican tu cuerpo. Los 'detox' comerciales no tienen evidencia científica. La食品安全ade no reemplaza funciones orgánicas.",
    sources: [
      { name: "Science Based Medicine", url: "https://sciencebasedmedicine.org/a-physicians-thoughts-on-detox/" },
      { name: "NHS", url: "https://www.nhs.uk/live-well/eat-well/do-you-need-a-detox/" }
    ],
    category: "nutrition",
    severity: "medium"
  },
  {
    id: "ALI-002",
    patterns: [
      /gluten\s+causa\s+autismo/i,
      /dieta\s+sin\s+gluten\s+cura\s+autismo/i,
      /gluten\s+libre\s+y\s+autismo/i
    ],
    verdict: "false",
    confidence: 0.92,
    explanation: "No hay evidencia de que el gluten cause autismo. La dieta sin gluten es necesaria SOLO para personas con enfermedad celíaca diagnosticada profesionalmente.",
    sources: [
      { name: "Autism Speaks Research", url: "https://www.autismspeaks.org/science-and-research/our-research/research-initiatives/gluten-free-casein-free-diet" },
      { name: "Cochrane Review", url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD010942.pub2/full" }
    ],
    category: "nutrition",
    severity: "medium"
  },

  // ========== ANTIBIÓTICOS ==========
  {
    id: "ANT-001",
    patterns: [
      /antibióticos\s+para\s+gripe/i,
      /antibióticos\s+viral/i,
      /tomar\s+antibióticos\s+prevención/i
    ],
    verdict: "false",
    confidence: 0.98,
    explanation: "Los antibióticos NO funcionan contra virus. Solo matan bacterias. Usarlos innecesariamente crea resistencia antibiótica, una de las mayores amenazas de salud global.",
    sources: [
      { name: "WHO - AMR", url: "https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance" },
      { name: "CDC - Antibiotic Resistance", url: "https://www.cdc.gov/antibiotic-use/community/index.html" }
    ],
    category: "antibiotics",
    severity: "high"
  },

  // ========== EMERGENCIAS ==========
  {
    id: "EME-001",
    patterns: [
      /no\s+llames?\s+a\s+ambulancia/i,
      /no\s+vayas?\s+al\s+hospital/i,
      /tratar\s+en\s+casa\s+infarto/i,
      /infarto\s+se\s+cura\s+en\s+casa/i
    ],
    verdict: "false",
    confidence: 0.99,
    explanation: "Las emergencias médicas (infarto, ACV, anafilaxia) requieren atención médica INMEDIATA. Cada minuto de retraso aumenta el riesgo de muerte o daño permanente.",
    sources: [
      { name: "AHA - Heart Attack", url: "https://www.heart.org/en/health-topics/heart-attack/warning-signs-of-a-heart-attack" },
      { name: "Stroke Association", url: "https://www.stroke.org/en/about-stroke/stroke-signs-and-symptoms" }
    ],
    category: "emergency",
    severity: "critical"
  },

  // ========== GÉNERO DE INFORMACIÓN ==========
  {
    id: "GEN-001",
    patterns: [
      /no\s+vayas?\s+al\s+médico/i,
      /médicos?\s+solo\s+quieren?\s+dinero/i,
      /big\s+pharma\s+nos\s+oculta/i,
      /la\s+cura\s+del\s+cancer\s+la\s+ocultan/i
    ],
    verdict: "misleading",
    confidence: 0.85,
    explanation: "La desconfianza generalizada hacia el sistema médico puede llevar a retrasar tratamientos que salvan vidas. Siempre consulta a un profesional de salud.",
    sources: [
      { name: "WHO - Infodemic", url: "https://www.who.int/publications/i/item/managed-Infodemic" },
      { name: "Nature Medicine", url: "https://www.nature.com/articles/s41591-020-1124-9" }
    ],
    category: "misinformation",
    severity: "high"
  }
];

// Medical claim detection patterns (Spanish + English)
const MEDICAL_PATTERNS = [
  // Direct claims about cures
  /(?:cura|curar|cur[ae]s?|trata|tratar|tratamiento)\s+(?:el|la|los|las)\s+\w+/gi,
  // "X is good for Y"
  /(?:\w+)\s+(?:es|son|está|están)\s+(?:buen[oa]s?|bueno|eficaz|efectiv[oa]?)\s+(?:para|por)\s+/gi,
  // "Don't take medication"
  /(?:no|nunca|jamás)\s+(?:tomes?|toma[s]?|us[ea]s?|use[s]?|consum[ae]s?)\s+(?:\w+\s+){0,3}(?:medicamento|fármaco|pastilla|droga)/gi,
  // "Doctors are hiding"
  /(?:médico[s]?|doctor[es]?|big\s+pharma|farmacéutica)\s+(?:oculta[n]?|mienten?|engañan?)/gi,
  // "Natural remedy"
  /(?:remedio[s]?\s+natural|cura\s+natural|tratamiento\s+natural)\s+(?:para|contra)\s+/gi,
  // "Vaccine dangers"
  /(?:vacuna[s]?\s+(?:causa[n]?|provoca[n]?|genera[n]?)\s+\w+)/gi,
  // "Cancer alternative"
  /(?:alternativ[ao]?\s+(?:al\s+)?(?:tratamiento|quimio|cirugía)\s+(?:del?\s+)?cancer)/gi,
];

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.MedScanKB = {
    knowledgeBase: MEDICAL_KNOWLEDGE_BASE,
    medicalPatterns: MEDICAL_PATTERNS
  };
}
