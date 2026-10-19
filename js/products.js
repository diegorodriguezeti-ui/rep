// Database of diesel engine replacement parts for REP (Rodriguez Equipment Parts)
// All assets linked locally from assets/images/ with real diesel parts on clean white backgrounds

const PRODUCTS_DATA = [
  {
    id: "rep-cum-x15-ovh",
    name: "Kit de Overhaul Cummins X15 / ISX15",
    brand: "cummins",
    brandLabel: "Cummins",
    category: "overhaul",
    categoryLabel: "Kits de Overhaul",
    oemNumber: "4376378 / 4376379",
    engineFitment: "Cummins X15, ISX15 Dual Cam & EPA10/13",
    badge: "CALIDAD OEM PREMIUM",
    rating: 5.0,
    reviewsCount: 38,
    inStock: true,
    condition: "Nuevo Aftermarket Calidad Original",
    warranty: "12 Meses de Garantía",
    priceRange: "Consultar Precio B2B",
    summary: "Kit completo de reconstrucción mayor para motores Cummins X15. Componentes maquinados con tolerancias micrométricas para servicio pesado y transporte nacional.",
    components: [
      "6 Juegos de Camisas con sellos D-Ring de fluoroelastómero",
      "6 Pistones de Acero Forjado (Diseño Monoterm)",
      "6 Pasadores de pistón endurecidos con retenes cónicos",
      "Juego completo de anillos de pistón PVD recubiertos",
      "Juego de cojinetes de biela y bancada estándar o bajo medida",
      "Kit completo de empacaduras superior e inferior (Junta de culata grafito/acero)"
    ],
    image: "assets/images/cummins_x15_overhaul.jpg",
    tags: ["X15", "ISX15", "Overhaul", "Camisas", "Pistones", "Cummins"]
  },
  {
    id: "rep-cat-c15-pst",
    name: "Pistones CAT C15 / C18 Acero Forjado",
    brand: "caterpillar",
    brandLabel: "Caterpillar",
    category: "pistones",
    categoryLabel: "Pistones y Componentes",
    oemNumber: "356-7888 / 385-7278 / 238-2729",
    engineFitment: "Caterpillar C15 Acert, C18, 3406E",
    badge: "ALTO RENDIMIENTO",
    rating: 5.0,
    reviewsCount: 29,
    inStock: true,
    condition: "Forjado de una pieza (One-Piece Monosteel)",
    warranty: "12 Meses",
    priceRange: "Disponibilidad Inmediata",
    summary: "Pistones de acero forjado de alta resistencia a la fatiga térmica y compresión extrema. Diseñados para soportar presiones elevadas de turboalimentación y jornadas continuas.",
    components: [
      "Cuerpo de pistón en acero de alta aleación tratada térmicamente",
      "Pasador de alta fricción con acabado nitrurado",
      "Ranuras mecanizadas con precisión para anillo de fuego",
      "Retenes de pasador templados",
      "Buje de biela opcional incluido según especificación CPL"
    ],
    image: "assets/images/cat_c15_pistons.jpg",
    tags: ["CAT", "C15", "C18", "Pistón", "Acero", "Caterpillar"]
  },
  {
    id: "rep-prk-1104-cmp",
    name: "Componentes y Repuestos para Motores Perkins",
    brand: "perkins",
    brandLabel: "Perkins",
    category: "perkins",
    categoryLabel: "Sistemas Perkins",
    oemNumber: "U5MK0671 / 4132F071 / 3681E049",
    engineFitment: "Perkins 1104D-44TA, 1106A, 1004, 4.236",
    badge: "GENERADORES Y AGRÍCOLA",
    rating: 4.9,
    reviewsCount: 42,
    inStock: true,
    condition: "Grado Industrial Heavy-Duty",
    warranty: "Garantía de Fábrica",
    priceRange: "Entrega Directa Maracaibo",
    summary: "Línea completa para generadores eléctricos, tractores agrícolas y retroexcavadoras. Incluye bombas de agua de alto caudal, empacaduras de culata y kits de válvulas.",
    components: [
      "Bomba de agua con rodamiento sellado y turbina equilibrada",
      "Juego de empacaduras de culata multi-lámina MLS",
      "Válvulas de admisión y escape con vástago nitrurado",
      "Termostatos de doble acción térmica",
      "Juego de filtros y retenes de cigüeñal vitón"
    ],
    image: "assets/images/perkins_engine_parts.jpg",
    tags: ["Perkins", "1104", "1106", "Planta Eléctrica", "Agrícola", "Bomba de Agua"]
  },
  {
    id: "rep-cat-c15-inj",
    name: "Inyectores Diésel CAT C15 Acert Reman",
    brand: "caterpillar",
    brandLabel: "Caterpillar",
    category: "inyeccion",
    categoryLabel: "Sistemas de Inyección",
    oemNumber: "10R-1000 / 211-3023 / 253-0616",
    engineFitment: "CAT C15 SDP / BXS / MXS",
    badge: "CALIBRACIÓN MICRÓNICA",
    rating: 5.0,
    reviewsCount: 31,
    inStock: true,
    condition: "Prueba 100% en Banco Hartridge",
    warranty: "6 Meses de Garantía",
    priceRange: "Stock Inmediato",
    summary: "Inyectores electrónicos de precisión extrema. Nuevas toberas, válvulas solenoides y empaquetaduras de alta presión para restaurar la potencia original de su motor.",
    components: [
      "Tobera de pulverización de 6 orificios por electroerosión",
      "Sello tórico reforzado para presiones superiores a 30,000 PSI",
      "Bobina solenoide de respuesta ultrarrápida",
      "Informe de prueba de caudal individual adjunto"
    ],
    image: "assets/images/cat_c15_injectors.jpg",
    tags: ["CAT", "C15", "Inyector", "Inyección", "Acert"]
  },
  {
    id: "rep-cum-turbo-isx",
    name: "Turbocargador VGT Holset HE451VE",
    brand: "cummins",
    brandLabel: "Cummins",
    category: "turbos",
    categoryLabel: "Turbocargadores",
    oemNumber: "2881997 / 3792776 / 4955305",
    engineFitment: "Cummins ISX15 / QSX15 Industrial",
    badge: "EQUIPO ORIGINAL AFTERMARKET",
    rating: 5.0,
    reviewsCount: 22,
    inStock: true,
    condition: "Balanceo Dinámico Digital",
    warranty: "12 Meses",
    priceRange: "Consulte Disponibilidad",
    summary: "Turbocargador de geometría variable (VGT) para Cummins ISX15. Eje de turbina y rueda compresora de palanquilla forjada para máxima respuesta y reducción de consumo de combustible.",
    components: [
      "Rueda compresora de aluminio billet fresado por CNC",
      "Carcasa de escape en aleación de níquel nodular D5S",
      "Actuador electrónico calibrado de fábrica",
      "Kit de empaquetaduras de entrada y salida incluido"
    ],
    image: "assets/images/holset_turbocharger.jpg",
    tags: ["Cummins", "ISX15", "Turbo", "Holset", "VGT"]
  },
  {
    id: "rep-prk-gasket-kit",
    name: "Kit de Empacaduras Completo Perkins Serie 1100",
    brand: "perkins",
    brandLabel: "Perkins",
    category: "perkins",
    categoryLabel: "Sistemas Perkins",
    oemNumber: "U5LC0017 / 3681E049",
    engineFitment: "Perkins 1104C-44T, 1104D-E44T",
    badge: "SELLADO HERMÉTICO",
    rating: 4.8,
    reviewsCount: 19,
    inStock: true,
    condition: "Materiales Sintéticos y Acero Multicapa",
    warranty: "Calidad Asegurada REP",
    priceRange: "Envíos a Nivel Nacional",
    summary: "Juego completo de juntas superior e inferior para plantas eléctricas y maquinaria pesada con motores Perkins de 4 cilindros turboalimentados.",
    components: [
      "Junta de culata metálica de triple capa con sellos de combustión de acero inoxidable",
      "Junta de cárter de silicona moldeada",
      "Retén delantero y trasero de cigüeñal en fluoroelastómero",
      "Sellos de vástago de válvula y juntas de múltiple"
    ],
    image: "assets/images/perkins_gasket_kit.jpg",
    tags: ["Perkins", "Empacaduras", "Juntas", "Plantas Eléctricas", "1104"]
  },
  {
    id: "rep-cat-pump-c15",
    name: "Bomba de Agua y Aceite Heavy-Duty CAT 3406 / C15",
    brand: "caterpillar",
    brandLabel: "Caterpillar",
    category: "bombas",
    categoryLabel: "Bombas y Refrigeración",
    oemNumber: "10R-0484 / 161-5719 / 248-5513",
    engineFitment: "CAT C15, C16, 3406E, 3406C",
    badge: "ALTO CAUDAL",
    rating: 4.9,
    reviewsCount: 26,
    inStock: true,
    condition: "Rotor de Bronce Mecanizado",
    warranty: "12 Meses",
    priceRange: "Despacho Inmediato",
    summary: "Bomba de refrigeración de caudal reforzado para soportar temperaturas críticas en transporte pesado y operaciones mineras en clima cálido.",
    components: [
      "Sello mecánico de carburo de silicio de máxima duración",
      "Cojinete de rodillos sobredimensionado",
      "Eje de acero templado resistente a la cavitación",
      "Incluye sellos tóricos y junta de montaje"
    ],
    image: "assets/images/cat_water_pump.jpg",
    tags: ["CAT", "C15", "Bomba de Agua", "Refrigeración", "3406E"]
  },
  {
    id: "rep-cum-crankshaft",
    name: "Cigüeñal Forjado Cummins Serie B / ISB 5.9L & 6.7L",
    brand: "cummins",
    brandLabel: "Cummins",
    category: "bloque",
    categoryLabel: "Bloque y Tren de Fuerza",
    oemNumber: "3907804 / 3908032 / 4934862",
    engineFitment: "Cummins 6BT 5.9, ISB 6.7, QSB",
    badge: "ACERO FORJADO 4340",
    rating: 5.0,
    reviewsCount: 15,
    inStock: true,
    condition: "Medida Estándar (STD/STD)",
    warranty: "1 Año de Garantía",
    priceRange: "Cotizar WhatsApp",
    summary: "Cigüeñal forjado con endurecimiento por inducción en los muñones de biela y bancada. Excelente balance y resistencia a la torsión en equipos de carga pesada.",
    components: [
      "Forjado al calor con tratamiento térmico profundo",
      "Muñones nitrurados con acabado micro-pulido espejo",
      "Galerías de lubricación biseladas para flujo de aceite continuo",
      "Inspección por partículas magnéticas Magnaflux 100% aprobada"
    ],
    image: "assets/images/diesel_crankshaft.jpg",
    tags: ["Cummins", "Cigüeñal", "ISB", "6BT", "Tren de Fuerza"]
  }
];

// Testimonials data (Mercado Libre Verified Reviews)
const TESTIMONIALS_DATA = [
  {
    name: "EBAGFDECH63082",
    role: "Cliente Verificado Mercado Libre",
    rating: 5,
    comment: "RESPONDE RÁPIDO, MUY ATENTO Y CONFIABLE.",
    verified: true,
    badgeText: "Compra Verificada en Mercado Libre"
  },
  {
    name: "REPJ3M",
    role: "Cliente Verificado Mercado Libre",
    rating: 5,
    comment: "Responsable, educado y amable. 100% recomendado.",
    verified: true,
    badgeText: "Compra Verificada en Mercado Libre"
  },
  {
    name: "WILLIAMSCAMACARO",
    role: "Cliente Verificado Mercado Libre",
    rating: 5,
    comment: "Porque muy atento y serio en la negociación.",
    verified: true,
    badgeText: "Compra Verificada en Mercado Libre"
  },
  {
    name: "FLEETSERVICEVZLA",
    role: "Cliente Verificado Mercado Libre",
    rating: 5,
    comment: "Excelente atención gracias, recomendado al 100%.",
    verified: true,
    badgeText: "Compra Verificada en Mercado Libre"
  }
];
