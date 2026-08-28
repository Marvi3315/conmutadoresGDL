import { ServiceItem, EquipmentItem, CaseStudy, CoverageZone, MaintenancePlan } from '../types';

export const COMPANY_INFO = {
  name: 'Conmutadores GDL',
  tagline: 'Líderes en Conmutadores Telefónicos, Telecomunicaciones, Venta de Material Panduit/Panasonic y Seguridad en Guadalajara y toda la República Mexicana',
  yearsExperience: 18,
  projectsCompleted: '3,850+',
  activeClients: '1,200+',
  satisfactionRate: '99.4%',
  contactPerson: 'Licenciado Felipe Romo González',
  contactPersonShort: 'Lic. Felipe Romo González',
  phoneMain: '+52 1 33 3445 5760',
  phoneDirect: '33 3445 5760',
  phoneOffice: '+52 33 3810 4857',
  phoneOfficeDirect: '33 3810 4857',
  phoneEmergency: '33 3445 5760',
  whatsappNumber: '5213334455760',
  whatsappFormatted: '+52 1 33 3445 5760',
  email: 'conmutadoresgdl@gmail.com',
  serviceHours: 'Lun - Vie: 9:00 AM - 7:00 PM',
  hoursDetail: {
    lunes: '9:00 a.m. – 7:00 p.m.',
    martes: '9:00 a.m. – 7:00 p.m.',
    miercoles: '9:00 a.m. – 7:00 p.m.',
    jueves: '9:00 a.m. – 7:00 p.m.',
    viernes: '9:00 a.m. – 7:00 p.m.',
    sabado: 'Cerrado',
    domingo: 'Cerrado'
  },
  coverageSummary: 'Guadalajara, Jalisco y proyectos / envíos a toda la República Mexicana',
  syscomIntegrator: 'Integrador Oficial Autorizado SYSCOM'
};

export const SYSCOM_PARTNER_INFO = {
  title: 'Integrador Autorizado SYSCOM',
  tagline: 'Mayorista Líder en Telecomunicaciones, Seguridad y Redes de México',
  description: 'Como integradores autorizados de SYSCOM, Conmutadores GDL cuenta con acceso directo a más de 15,000 productos con inventario en tiempo real, garantía directa de fabricante, soporte de ingeniería nivel 3 y precios preferenciales en las mejores marcas internacionales.',
  badge: 'Canal Certificado SYSCOM',
  warehouseCoverage: 'Envíos express el mismo día desde los centros de distribución en Guadalajara, CDMX, Monterrey, Chihuahua, Querétaro y Mérida a todo el país.',
  guarantees: [
    'Equipo 100% original con número de serie y garantía de fábrica',
    'Suministro de refacciones y tarjetas originales Panduit, Panasonic, Grandstream y Hikvision',
    'Ingeniería de preventa y soporte técnico respaldado directamente por SYSCOM',
    'Envíos rápidos y asegurados a las 32 entidades federativas de México'
  ],
  brands: [
    { name: 'Panduit', category: 'Cableado y Conectividad', logoText: 'PANDUIT' },
    { name: 'Panasonic', category: 'Conmutadores y Telefonía', logoText: 'Panasonic' },
    { name: 'Grandstream', category: 'Conmutadores IP y VoIP', logoText: 'GRANDSTREAM' },
    { name: 'Hikvision', category: 'CCTV y Videovigilancia', logoText: 'HIKVISION' },
    { name: 'Ubiquiti', category: 'Redes y Access Points', logoText: 'UBIQUITI' },
    { name: 'Dahua', category: 'Seguridad y Cámaras', logoText: 'dahua' },
    { name: 'Cisco', category: 'Networking Empresarial', logoText: 'CISCO' },
    { name: 'Belden', category: 'Cables de Alto Desempeño', logoText: 'BELDEN' },
    { name: 'ZKTeco', category: 'Control de Acceso y Asistencia', logoText: 'ZKTECO' },
    { name: 'Charofil', category: 'Canalización y Charolas', logoText: 'CHAROFIL' },
    { name: 'Fanvil', category: 'Teléfonos e Intercoms IP', logoText: 'Fanvil' },
    { name: 'Honeywell', category: 'Seguridad e Incendio', logoText: 'Honeywell' },
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'conmutadores-ip',
    title: 'Conmutadores Telefónicos & Telefonía IP',
    shortDescription: 'Conmutadores IP, Híbridos, Troncales SIP, IVR interactivo, grabación de llamadas y extensiones en smartphones para empresas.',
    fullDescription: 'Diseñamos, instalamos, migramos y configuramos centrales telefónicas IP y conmutadores híbridos de última generación. Permite que tus colaboradores respondan llamadas desde su oficina, home office o smartphone con la misma extensión corporativa, reduciendo hasta un 65% en costos de telefonía.',
    iconName: 'PhoneCall',
    category: 'telefonia',
    badge: 'Especialidad Principal',
    features: [
      'Conmutadores On-Premise y en la Nube (Cloud PBX)',
      'Troncales SIP y Portabilidad de Números Directos (DIDs)',
      'Menú Interactivo IVR ("Para ventas presione 1...") con audio profesional',
      'Extensiones Móviles y Softphone (Android, iOS, Windows, Mac)',
      'Grabación de llamadas y tarificador para control de costos',
      'Integración con CRM (HubSpot, Salesforce, Zoho) y WhatsApp API',
      'Mantenimiento a conmutadores tradicionales Panasonic, Avaya, Siemens'
    ],
    brands: ['Grandstream', 'Panasonic', 'Fanvil', 'Avaya', 'Cisco', 'FreePBX'],
    benefits: [
      'Ahorro de hasta 65% frente a líneas tradicionales de cobre',
      'Movilidad total para equipos comerciales y trabajo híbrido',
      'Monitoreo y métricas de llamadas entrantes, salientes y abandonadas',
      'Cero llamadas perdidas de clientes potenciales'
    ],
    popularUseCases: [
      'Corporativos con múltiples sucursales en México',
      'Call Centers y mesas de ayuda con colas de atención',
      'Hospitales, clínicas y consultorios con citas telefónicas',
      'Hoteles y despachos contables o jurídicos'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80',
    startingPrice: 'Desde $4,890 MXN',
    idealFor: 'Pequeñas, Medianas y Grandes Empresas que buscan profesionalizar su atención telefónica.'
  },
  {
    id: 'cctv-videovigilancia',
    title: 'CCTV & Cámaras de Videovigilancia IP 4K',
    shortDescription: 'Sistemas de cámaras de alta definición con Inteligencia Artificial, visión nocturna ColorVu, reconocimiento facial y monitoreo en app móvil.',
    fullDescription: 'Protección perimetral inteligente para naves industriales, comercios, corporativos y fraccionamientos. Nuestras soluciones de CCTV IP incorporan analíticas avanzadas como detección humana y vehicular (evitando falsas alarmas), lectura de placas vehiculares (LPR) y almacenamiento redundante local o en nube.',
    iconName: 'Camera',
    category: 'seguridad',
    badge: 'Monitoreo 24/7',
    features: [
      'Cámaras IP 4K Ultra HD con audio bidireccional integrado',
      'Tecnología ColorVu / Full Color (Visión a todo color 24 horas)',
      'Analíticas de Inteligencia Artificial: Cruce de línea perimetral y detección de intrusión',
      'Cámaras PTZ con seguimiento automático y zoom óptico 36x',
      'Acceso seguro en tiempo real desde app móvil iOS / Android y PC sin costo mensual',
      'Grabadores NVR con compresión H.265+ y discos duros especializados grado vigilancia'
    ],
    brands: ['Hikvision', 'Dahua', 'Uniview', 'Axis', 'Provision-ISR'],
    benefits: [
      'Evidencia en ultra alta definición para prevención y auditoría',
      'Notificaciones push inmediatas a tu celular ante cualquier evento sospechoso',
      'Supervisión remota de operaciones, almacenes y puntos de venta',
      'Cumplimiento de estándares de seguridad industrial y aseguradoras'
    ],
    popularUseCases: [
      'Naves industriales en El Salto y Zapopan Industrial',
      'Centros de distribución logística y bodegas',
      'Puntos de venta, joyerías y plazas comerciales',
      'Fraccionamientos residenciales y cotos privados'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1000&q=80',
    startingPrice: 'Desde $5,900 MXN kit instalado',
    idealFor: 'Empresas y propietarios que requieren resguardo visual sin puntos ciegos.'
  },
  {
    id: 'cableado-redes-fibra',
    title: 'Cableado Estructurado & Fibra Óptica',
    shortDescription: 'Instalación y certificación de cableado Cat6/6A/7, enlaces de fibra óptica, racks de telecomunicaciones y redes Wi-Fi empresariales.',
    fullDescription: 'La columna vertebral de la comunicación de tu empresa. Realizamos tendido, peinado de racks, parcheo, rotulación normativa y certificación con equipo Fluke Networks. Diseñamos redes de alta disponibilidad con switches administrables y puntos de acceso Wi-Fi 6 de cobertura total.',
    iconName: 'Network',
    category: 'redes',
    badge: 'Certificación Fluke',
    features: [
      'Cableado estructurado voz, datos y video Cat 6, Cat 6A y Cat 7 (10 Gbps)',
      'Instalación, conectorización y fusión de Fibra Óptica Monomodo y Multimodo',
      'Organización, peinado y reacondicionamiento de Racks y Gabinetes IDF/MDF',
      'Enlaces inalámbricos Punto a Punto (PtP) para interconectar bodegas a kilómetros',
      'Redes Wi-Fi empresariales de alta densidad (Mesh, Roaming transparente)',
      'Reporte de certificación de rendimiento de red nodo por nodo'
    ],
    brands: ['Panduit', 'Belden', 'Ubiquiti', 'Cisco', 'MikroTik', 'CommScope', 'Optronics'],
    benefits: [
      'Fin a las caídas de internet y lentitud en sistemas ERP / Nube',
      'Instalaciones estéticas, normadas y fáciles de auditar',
      'Escalabilidad garantizada para el crecimiento de tu empresa',
      'Garantía por escrito de hasta 15 años en canal de enlace certificado'
    ],
    popularUseCases: [
      'Nuevas oficinas corporativas y adecuaciones de edificios',
      'Conexión de naves industriales separadas por vía pública',
      'Hoteles y escuelas con cientos de dispositivos concurrentes',
      'Data Centers y salas de servidores'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80',
    startingPrice: 'Cotización según nodos y metros',
    idealFor: 'Organizaciones que exigen máxima velocidad, estabilidad y cero tiempos muertos.'
  },
  {
    id: 'control-acceso-asistencia',
    title: 'Control de Acceso, Biometría & Videoporteros',
    shortDescription: 'Torniquetes, chapas magnéticas, reconocimiento facial, lectores biométricos de huella, control de tiempo/asistencia y videoporteros IP.',
    fullDescription: 'Administra quién entra, a qué hora y a qué áreas de tu empresa. Controla puertas peatonales, barreras vehiculares y torniquetes con registros biométricos infalsificables y reportes automáticos de retardos y asistencia para nómina.',
    iconName: 'ShieldCheck',
    category: 'control',
    badge: 'Seguridad Perimetral',
    features: [
      'Terminales de Reconocimiento Facial rápido incluso con cubrebocas',
      'Lectores de Huella Digital y Tarjetas de Proximidad RFID / MIFARE / NFC',
      'Chapas magnéticas de 600 y 1200 lbs, contrachapas eléctricas y botones de salida no-touch',
      'Torniquetes de acceso peatonal de acero inoxidable para oficinas y fábricas',
      'Barreras vehiculares con sensores de masa y tags de largo alcance (UHF)',
      'Videoporteros IP con apertura remota desde celular y pantalla táctil interior'
    ],
    brands: ['ZKTeco', 'Hikvision', 'Dahua', 'Rosslare', 'Seco-Larm', 'Kantech'],
    benefits: [
      'Control total de horarios de empleados y contratistas',
      'Restricción de áreas sensibles (Servidores, Almacén, Dirección)',
      'Apertura ágil sin llaves físicas que puedan extraviarse o duplicarse',
      'Exportación directa a sistemas de nómina (COMPACi, NOI, Excel)'
    ],
    popularUseCases: [
      'Plantas de manufactura con control de turnos de personal',
      'Edificios corporativos y centros de negocios',
      'Fraccionamientos con acceso vehicular automatizado',
      'Gimnasios y clubes deportivos con cobro de membresías'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=80',
    startingPrice: 'Desde $3,450 MXN',
    idealFor: 'Empresas y administradores que requieren restringir accesos y auditar asistencias.'
  },
  {
    id: 'alarmas-cercas-electricas',
    title: 'Alarmas Contra Robo, Incendio & Cercas Electrificadas',
    shortDescription: 'Sistemas de alarma inalámbricos y cableados, sensores fotoeléctricos perimetrales, detección de humo y cercas de alto voltaje.',
    fullDescription: 'Disuasión inmediata contra intentos de intrusión y robo. Instalamos paneles de alarma de respuesta ultra rápida con comunicación dual (Wi-Fi + Red Celular 4G LTE), sensores infrarrojos inmunes a mascotas y cercas electrificadas certificadas con sirenas de 120 dB.',
    iconName: 'BellRing',
    category: 'seguridad',
    badge: 'Protección Activa',
    features: [
      'Paneles de alarma híbridos e inalámbricos de largo alcance de grado militar',
      'Sensores de movimiento inmunes a mascotas pequeñas y medianas',
      'Contactos magnéticos para puertas, cortinas metálicas y ventanas',
      'Cercas electrificadas de 5 a 8 líneas con aisladores reforzados y energizador certificado',
      'Sensores fotoeléctricos de rayo infrarrojo para bardas perimetrales',
      'Detección oportuna de humo, temperatura y gas para prevención de siniestros'
    ],
    brands: ['DSC', 'Honeywell', 'Paradox', 'YONUSA', 'Bosch'],
    benefits: [
      'Alerta inmediata en tu smartphone en menos de 2 segundos ante intrusión',
      'Disuasión física y psicológica contundente para delincuentes',
      'Baterías de respaldo integradas (opera incluso si cortan la luz de la calle)',
      'Sin contratos forzosos con centrales si prefieres automonitoreo en app'
    ],
    popularUseCases: [
      'Bodegas de mercancía de alto valor',
      'Locales comerciales y farmacias',
      'Casas habitación y quintas campestres en Chapala y Ajijic',
      'Patios de maniobras y estacionamientos'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=1000&q=80',
    startingPrice: 'Desde $4,200 MXN',
    idealFor: 'Inmuebles que requieren blindaje contra allanamiento y robo.'
  },
  {
    id: 'reparacion-soporte-tecnico',
    title: 'Reparación & Soporte Técnico Especializado',
    shortDescription: 'Diagnóstico en sitio, reparación de conmutadores analógicos/IP, reconfiguración de extensiones, recuperación de claves y reubicación de racks.',
    fullDescription: 'Servicio técnico por evento y correctivo para empresas en Guadalajara y Jalisco. Reparamos fallas de audio, líneas mudas, conmutadores bloqueados, cámaras sin señal o reestructuración de cableado dañado.',
    iconName: 'Wrench',
    category: 'mantenimiento',
    badge: 'Atención en Sitio',
    features: [
      'Diagnóstico y reparación de conmutadores Panasonic, Grandstream, Avaya y Siemens',
      'Corrección de fallas en líneas telefónicas, extensiones mudas y ruido en línea',
      'Reconfiguración de menús IVR, buzones de voz y desvíos a celular',
      'Reubicación de conmutadores, conmutación de racks y peinado de cables',
      'Reparación de grabadores NVR/DVR de CCTV y reposición de fuentes',
      'Atención técnica directa coordinada por Felipe Romo'
    ],
    brands: ['Grandstream', 'Panasonic', 'Hikvision', 'Cisco', 'Fanvil', 'Multimarca'],
    benefits: [
      'Servicio por evento sin contratos forzosos',
      'Refacciones y tarjetas originales para conmutadores',
      'Diagnóstico claro y presupuesto transparente antes de reparar',
      'Garantía por escrito en mano de obra y refacciones'
    ],
    popularUseCases: [
      'Empresas con falla urgente en su conmutador actual',
      'Oficinas que cambiaron de domicilio y requieren mover su infraestructura',
      'Negocios que perdieron la contraseña de administración de su PBX o CCTV',
      'Sustitución de cables roídos o dañados'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1000&q=80',
    startingPrice: 'Diagnóstico desde $850 MXN',
    idealFor: 'Empresas que requieren servicio técnico puntual y profesional sin plazos forzosos.'
  }
];

export const EQUIPMENT_CATALOG: EquipmentItem[] = [
  // --- SECCIÓN 1: PANDUIT - MATERIALES Y CONECTIVIDAD (7 Productos) ---
  {
    id: 'panduit-tx6000-utp',
    name: 'Bobina de Cable UTP Cat6 100% Cobre Puro 305m',
    model: 'PANDUIT TX6000 (NUC6C04BU-C)',
    brand: 'Panduit',
    category: 'panduit-material',
    description: 'Bobina de cable de red Cat6 calibre 23 AWG, 100% cobre electrolítico puro sin aleaciones. Certificado para transmisión Gigabit y 10GBASE-T hasta 55 metros con margen superior a estándares TIA/EIA.',
    specs: ['Categoría 6 U/UTP 4 pares 23 AWG', 'Conductor 100% Cobre Sólido', 'Forro CM azul retardante a la flama', 'Bobina de 305 metros (1,000 ft)', 'Certificación Fluke Channel & Permanent Link'],
    inStock: true,
    stockQuantity: '45+ Bobinas en stock inmediato',
    warranty: 'Garantía del Sistema Panduit 20 Años',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    tag: 'Material Panduit Original',
    sku: 'PAN-NUC6C04BU',
    syscomCode: 'NUC6C04BU-C'
  },
  {
    id: 'panduit-jack-cat6',
    name: 'Jack Modular Hembra RJ45 Cat6 Mini-Com',
    model: 'PANDUIT CJ688TGBL',
    brand: 'Panduit',
    category: 'panduit-material',
    description: 'Módulo conector Jack RJ45 hembra Cat6 tipo Keystone Mini-Com con tecnología TG de terminación rápida de 8 posiciones y 8 cables sin herramienta de impacto.',
    specs: ['Categoría 6 Gigabit Ethernet', 'Terminación estilo TG universal T568A/T568B', 'Contactos con 50 micropulgadas de oro', 'Cuerpo termoplástico de alto impacto', 'Empaque individual y paquetes de 50'],
    inStock: true,
    stockQuantity: '600+ piezas disponibles',
    warranty: 'Garantía Panduit de Fábrica',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    tag: 'Conectividad Certificada',
    sku: 'PAN-CJ688TGBL',
    syscomCode: 'CJ688TGBL'
  },
  {
    id: 'panduit-patch-panel-24',
    name: 'Patch Panel Cat6 de 24 Puertos Flat 1UR para Rack 19"',
    model: 'PANDUIT DP24688TGY',
    brand: 'Panduit',
    category: 'panduit-material',
    description: 'Panel de parcheo de 24 puertos modular para rack estándar de 19 pulgadas en 1 Unidad de Rack (1UR). Acero reforzado con barra trasera para alivio de tensión.',
    specs: ['24 Puertos RJ45 Cat6 precargados', '1 Unidad de Rack (1U) 19 pulgadas', 'Barra posterior de administración y sujeción', 'Rotulación frontal clara y numerada', 'Supera desempeño ANSI/TIA-568-C.2'],
    inStock: true,
    stockQuantity: '18 unidades en almacén',
    warranty: 'Garantía Panduit',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    tag: 'Rack & Distribución',
    sku: 'PAN-DP24688TGY',
    syscomCode: 'DP24688TGY'
  },
  {
    id: 'panduit-patch-cord-cat6',
    name: 'Patch Cord Certificado Cat6 TX6 Plus (1m / 2m / 3m)',
    model: 'PANDUIT UTPSP7BUY / UTPSP3BUY',
    brand: 'Panduit',
    category: 'panduit-material',
    description: 'Cable de parcheo de fábrica 100% probado en laboratorio con bota moldeada ultradelgada para alta densidad en switches y conmutadores telefónicos.',
    specs: ['Cable multifilar flexible Cat6 24 AWG', 'Conectores RJ45 con bota antienredos', '100% probado en atenuación y diafonía NEXT', 'Disponible en 1m, 2m, 3m y 5m', 'Colores: Azul, Gris, Amarillo, Verde'],
    inStock: true,
    stockQuantity: '400+ piezas',
    warranty: 'Garantía de Fábrica',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    tag: 'Accesorios de Red',
    sku: 'PAN-UTPSP7BUY',
    syscomCode: 'UTPSP7BUY'
  },
  {
    id: 'panduit-organizador-horizontal',
    name: 'Organizador Horizontal de Cables 19" 2UR con Tapa',
    model: 'PANDUIT NCMH2',
    brand: 'Panduit',
    category: 'panduit-material',
    description: 'Organizador horizontal para peinado frontal de cables de conmutadores y switches en racks de 19 pulgadas. Cubierta desmontable para mantenimiento limpio.',
    specs: ['2 Unidades de Rack (2UR)', 'Dedos de plástico redondeados anti-estrangulamiento', 'Tapa frontal abatible doble sentido', 'Paso de cables superior e inferior', 'Acabado negro mate electrostático'],
    inStock: true,
    stockQuantity: '24 unidades',
    warranty: 'Garantía Panduit',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    tag: 'Organización Racks',
    sku: 'PAN-NCMH2',
    syscomCode: 'NCMH2'
  },
  {
    id: 'panduit-canaleta-ld5',
    name: 'Canaleta de Superficie Pan-Way LD5 con Adhesivo 2m',
    model: 'PANDUIT LD5EI6-A',
    brand: 'Panduit',
    category: 'panduit-material',
    description: 'Canaleta perimetral de una sola pieza con bisagra flexible para ruteo estético de cables de conmutador, CCTV o red en oficinas y muros.',
    specs: ['Largo: 2.0 metros por tramo', 'Cinta adhesiva de espuma de alta fijación', 'Capacidad para 4-6 cables UTP Cat6', 'Material PVC autoextinguible grado UL94V-0', 'Color Marfil / Blanco oficina'],
    inStock: true,
    stockQuantity: '120 tramos',
    warranty: 'Calidad Panduit',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    tag: 'Canalización Estética',
    sku: 'PAN-LD5EI6',
    syscomCode: 'LD5EI6-A'
  },
  {
    id: 'panduit-velcro-cinchos',
    name: 'Rollo de Cinta de Sujeción de Velcro Hook & Loop 23m',
    model: 'PANDUIT Tak-Ty HLS-15R0',
    brand: 'Panduit',
    category: 'panduit-material',
    description: 'Cinta continua de velcro reutilizable para amarre normativo de mazos de cableado de conmutador y racks, evitando aplastamiento del conductor.',
    specs: ['Rollo de 23 metros x 19mm de ancho', 'Reutilizable cientos de veces', 'No daña ni estrangula cables de red ni fibra', 'Color Negro industrial resistente a UV', 'Grado de telecomunicaciones'],
    inStock: true,
    stockQuantity: '30 rollos',
    warranty: 'Garantía Panduit',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    tag: 'Insumo de Instalación',
    sku: 'PAN-HLS15R0',
    syscomCode: 'HLS-15R0'
  },

  // --- SECCIÓN 2: PANASONIC - CONMUTADORES, TARJETAS Y TELÉFONOS (5 Productos) ---
  {
    id: 'panasonic-kxtes824',
    name: 'Conmutador PBX Híbrido Avanzado Panasonic KX-TES824',
    model: 'PANASONIC KX-TES824LA',
    brand: 'Panasonic',
    category: 'panasonic-telefonia',
    description: 'Central telefónica híbrida analógica para empresas y clínicas. Capacidad base de 3 líneas externas y 8 extensiones, expandible hasta 8 líneas y 24 extensiones. Incluye DISA mensaje de bienvenida.',
    specs: ['Capacidad base: 3 Líneas / 8 Extensiones', 'Expandible a 8 Líneas / 24 Extensiones', 'DISA (Mensaje operadora automática de 1 canal)', 'Identificador de llamadas en extensiones (con tarjeta opcional)', 'Conexión a portero automático y chapa eléctrica'],
    inStock: true,
    stockQuantity: '6 conmutadores nuevos en caja',
    warranty: '1 Año Directo con Conmutadores GDL',
    imageUrl: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=600&q=80',
    tag: 'Clásico Empresarial',
    sku: 'PANAS-KXTES824',
    syscomCode: 'KX-TES824LA'
  },
  {
    id: 'panasonic-kxt7730',
    name: 'Teléfono Propietario Ejecutivo Panasonic KX-T7730',
    model: 'PANASONIC KX-T7730X',
    brand: 'Panasonic',
    category: 'panasonic-telefonia',
    description: 'Teléfono multililínea para conmutadores Panasonic KX-TES824 y KX-TEA308. Pantalla LCD alfanumérica de 1 línea y 12 teclas programables con LED bicolor para operadora/recepción.',
    specs: ['Pantalla LCD alfanumérica de 16 caracteres', '12 teclas programables de línea/extensión con LED', 'Altavoz manos libres digital bidireccional', 'Control de volumen y navegación', 'Lámpara de mensaje/timbre de gran tamaño'],
    inStock: true,
    stockQuantity: '35 piezas disponibles',
    warranty: '1 Año de Garantía',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
    tag: 'Teléfono de Operadora',
    sku: 'PANAS-KXT7730',
    syscomCode: 'KX-T7730'
  },
  {
    id: 'panasonic-tarjeta-3x8',
    name: 'Tarjeta de Expansión de 3 Líneas y 8 Extensiones',
    model: 'PANASONIC KX-TE82483',
    brand: 'Panasonic',
    category: 'panasonic-telefonia',
    description: 'Módulo de tarjeta para ampliar la capacidad del conmutador Panasonic KX-TES824 sumando 3 líneas telefónicas adicionales y 8 extensiones analógicas.',
    specs: ['3 Puertos RJ11 para líneas analógicas', '8 Puertos RJ11 para extensiones analógicas', 'Instalación plug-and-play en ranura libre', 'Tarjeta original sellada de fábrica', 'Compatible con KX-TES824 y KX-TEM824'],
    inStock: true,
    stockQuantity: '12 tarjetas en stock',
    warranty: '1 Año de Garantía',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    tag: 'Refacción Original',
    sku: 'PANAS-KXTE82483',
    syscomCode: 'KX-TE82483'
  },
  {
    id: 'panasonic-kxdt543',
    name: 'Teléfono Digital Propietario Panasonic KX-DT543',
    model: 'PANASONIC KX-DT543-B',
    brand: 'Panasonic',
    category: 'panasonic-telefonia',
    description: 'Teléfono ejecutivo digital con pantalla LCD retroiluminada de 3 líneas y 24 teclas flexibles programables con LED para conmutadores Panasonic KX-TDA, KX-TDE y KX-NS500.',
    specs: ['Pantalla LCD gráfica de 3 líneas con retroiluminación', '24 teclas programables de función rápida', 'Altavoz Full Duplex con audio digital de alta fidelidad', 'Puerto EHS para diademas inalámbricas Plantronics/Jabra', 'Doble puerto digital XDP'],
    inStock: true,
    stockQuantity: '15 piezas',
    warranty: '1 Año de Garantía',
    imageUrl: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=600&q=80',
    tag: 'Serie Digital Pro',
    sku: 'PANAS-KXDT543',
    syscomCode: 'KX-DT543'
  },
  {
    id: 'panasonic-tarjeta-callerid',
    name: 'Tarjeta de Identificador de Llamadas para 3 Líneas',
    model: 'PANASONIC KX-TE82494',
    brand: 'Panasonic',
    category: 'panasonic-telefonia',
    description: 'Tarjeta opcional para conmutador Panasonic KX-TES824 que habilita la visualización de número y nombre de quien llama en las pantallas de los teléfonos.',
    specs: ['Identificación de llamada (FSK / DTMF)', 'Habilita 3 líneas telefónicas externas', 'Muestra el número entrante en teléfonos KX-T7730', 'Registro de llamadas perdidas y recibidas'],
    inStock: true,
    stockQuantity: '8 piezas',
    warranty: '1 Año',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    tag: 'Módulo Opcional',
    sku: 'PANAS-KXTE82494',
    syscomCode: 'KX-TE82494'
  },

  // --- SECCIÓN 3: GRANDSTREAM - CONMUTADORES IP Y TELÉFONOS (5 Productos) ---
  {
    id: 'ucm6302',
    name: 'Grandstream UCM6302 Conmutador IP PBX',
    model: 'GRANDSTREAM UCM6302',
    brand: 'Grandstream',
    category: 'conmutadores',
    description: 'Conmutador IP empresarial de última generación con capacidad para hasta 500 extensiones SIP y 75 llamadas concurrentes. 2 puertos FXO para líneas Telmex/Totalplay y 2 FXS para fax/análogos.',
    specs: ['Hasta 500 extensiones SIP y 75 llamadas simultáneas', '2 Puertos FXO (líneas PSTN) + 2 Puertos FXS', 'Videoconferencias integradas hasta 20 personas en Full HD', 'IVR multinivel, colas de espera, CDR y grabación de llamadas', 'App móvil Wave para Android, iOS, Windows y Mac'],
    inStock: true,
    stockQuantity: '8 unidades listas para entrega',
    warranty: '2 Años de Garantía SYSCOM / Conmutadores GDL',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    tag: 'Más Vendido en México',
    sku: 'GS-UCM6302',
    syscomCode: 'UCM6302'
  },
  {
    id: 'ucm6304',
    name: 'Grandstream UCM6304 Conmutador IP Enterprise 4 FXO / 4 FXS',
    model: 'GRANDSTREAM UCM6304',
    brand: 'Grandstream',
    category: 'conmutadores',
    description: 'Central IP de alto rendimiento para medianas y grandes empresas con capacidad para hasta 1,000 usuarios, 150 llamadas simultáneas y 4 puertos FXO.',
    specs: ['Hasta 1,000 extensiones SIP y 150 llamadas concurrentes', '4 Puertos FXO + 4 Puertos FXS integrados', '3 Puertos Gigabit Ethernet con PoE integrado', 'Alta disponibilidad y respaldo en caliente (HA)', 'Pantalla LCD color frontal con teclas táctiles'],
    inStock: true,
    stockQuantity: '4 unidades',
    warranty: '2 Años de Garantía',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    tag: 'Enterprise PBX',
    sku: 'GS-UCM6304',
    syscomCode: 'UCM6304'
  },
  {
    id: 'grp2614',
    name: 'Grandstream GRP2614 Teléfono IP Ejecutivo Gigabit Wi-Fi',
    model: 'GRANDSTREAM GRP2614',
    brand: 'Grandstream',
    category: 'telefonos-ip',
    description: 'Teléfono IP Carrier-Grade de 4 líneas y 4 cuentas SIP con doble pantalla LCD a color, Wi-Fi integrado de doble banda, Bluetooth y audio HD.',
    specs: ['Pantalla principal TFT 2.8" + Segunda pantalla LCD 2.4"', 'Hasta 40 teclas virtuales digitales BLF / marcación rápida', 'Wi-Fi 802.11 a/b/g/n/ac integrado + Bluetooth 5.0', 'Doble puerto Gigabit Ethernet PoE 10/100/1000', 'Audio HD en auricular y altavoz con códec Opus'],
    inStock: true,
    stockQuantity: '28 piezas',
    warranty: '2 Años',
    imageUrl: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=600&q=80',
    tag: 'Ejecutivo / Directores',
    sku: 'GS-GRP2614',
    syscomCode: 'GRP2614'
  },
  {
    id: 'grp2612p',
    name: 'Grandstream GRP2612P Teléfono IP Operativo PoE',
    model: 'GRANDSTREAM GRP2612P',
    brand: 'Grandstream',
    category: 'telefonos-ip',
    description: 'Teléfono IP básico para escritorios operativos con pantalla LCD a color de 2.4", 2 líneas / 4 cuentas SIP, PoE integrado y carátula personalizable.',
    specs: ['Pantalla a color TFT de 2.4 pulgadas (320x240)', '2 teclas de línea y hasta 16 teclas virtuales', 'Alimentación PoE integrada (Power over Ethernet)', 'Tecnología Noise Shield para bloqueo de ruido ambiente', 'Soporte para diadema RJ9 y EHS Plantronics'],
    inStock: true,
    stockQuantity: '50+ piezas',
    warranty: '2 Años',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
    tag: 'Oficinas y Call Centers',
    sku: 'GS-GRP2612P',
    syscomCode: 'GRP2612P'
  },
  {
    id: 'gxw4108-gateway',
    name: 'Grandstream GXW4108 Gateway VoIP FXO de 8 Puertos',
    model: 'GRANDSTREAM GXW4108',
    brand: 'Grandstream',
    category: 'conmutadores',
    description: 'Gateway analógico a IP de 8 puertos FXO para interconectar hasta 8 líneas de cobre tradicionales hacia un conmutador IP en la nube o local.',
    specs: ['8 Puertos RJ11 FXO independientes', '2 Puertos de red 10/100 Mbps', 'Cancelación de eco de grado carrier G.168', 'Soporte T.38 para fax confiable sobre IP', 'Compatible con Asterisk, 3CX, Grandstream y FreePBX'],
    inStock: true,
    stockQuantity: '5 piezas',
    warranty: '2 Años',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    tag: 'Integración Troncales',
    sku: 'GS-GXW4108',
    syscomCode: 'GXW4108'
  },

  // --- SECCIÓN 4: HIKVISION & DAHUA - CCTV Y SEGURIDAD (4 Productos) ---
  {
    id: 'hik-colorvu-4k',
    name: 'Hikvision ColorVu AcuSense Cámara IP Bala 4K Ultra HD',
    model: 'HIKVISION DS-2CD2087G2-LU',
    brand: 'Hikvision',
    category: 'cctv',
    description: 'Cámara tipo bala IP de 8 Megapíxeles (4K) con tecnología ColorVu para video a todo color las 24 horas y analítica AcuSense de IA para personas/vehículos.',
    specs: ['Resolución 4K Ultra HD (3840 × 2160 a 20 fps)', 'Tecnología ColorVu con apertura super gran angular F1.0', 'Filtro inteligente de falsas alarmas AcuSense', 'Micrófono de alta sensibilidad integrado', 'Protección climática IP67 exterior'],
    inStock: true,
    stockQuantity: '22 piezas',
    warranty: '2 Años de Fábrica',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
    tag: 'Color 24 Horas 4K',
    sku: 'HIK-DS2CD2087G2LU',
    syscomCode: 'DS-2CD2087G2-LU'
  },
  {
    id: 'hik-nvr-16ch-poe',
    name: 'Hikvision NVR AcuSense 16 Canales 4K con 16 Puertos PoE',
    model: 'HIKVISION DS-7616NXI-I2/16P',
    brand: 'Hikvision',
    category: 'cctv',
    description: 'Grabador de red NVR para 16 cámaras IP 4K con switch PoE integrado de 16 puertos. Reconocimiento facial y búsqueda forense por IA.',
    specs: ['16 Canales IP hasta 12 Megapíxeles / 4K', 'Switch PoE integrado de 16 puertos (Plug & Play)', '2 Bahías SATA para discos duros hasta 20TB', 'Salida de video HDMI 4K independiente', 'Compresión de video ultra eficiente H.265+'],
    inStock: true,
    stockQuantity: '7 unidades',
    warranty: '2 Años',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=600&q=80',
    tag: 'Grabador Central NVR',
    sku: 'HIK-DS7616NXII216P',
    syscomCode: 'DS-7616NXI-I2/16P'
  },
  {
    id: 'dahua-tioc-5mp',
    name: 'Dahua TiOC Cámara Disuasiva Activa 5MP con Sirena y Estrobo',
    model: 'DAHUA IPC-HFW3549T1-AS-PV',
    brand: 'Dahua',
    category: 'cctv',
    description: 'Cámara 3 en 1 con sensor Full-Color, iluminación nocturna cálida, luces estroboscópicas roja/azul disuasivas y sirena de 110 dB para advertencia inmediata a intrusos.',
    specs: ['5 Megapíxeles sensor Full-Color 24/7', 'Sirena integrada 110dB + Estrobo disuasivo policial', 'Audio bidireccional en tiempo real con altavoz', 'Detección inteligente de humanos y autos SMD 4.0', 'Ranura MicroSD hasta 256GB y PoE'],
    inStock: true,
    stockQuantity: '14 piezas',
    warranty: '2 Años',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=600&q=80',
    tag: 'Disuasión Activa',
    sku: 'DAH-IPCHFW3549T1',
    syscomCode: 'IPC-HFW3549T1-AS-PV'
  },
  {
    id: 'wd-purple-4tb',
    name: 'Disco Duro Especializado Grado Vigilancia 4TB Western Digital Purple',
    model: 'WD PURPLE WD43PURZ',
    brand: 'Hikvision',
    category: 'cctv',
    description: 'Disco duro diseñado exclusivamente para operar 24 horas los 365 días en sistemas de videovigilancia continua sin caídas ni pérdida de fotogramas.',
    specs: ['Capacidad: 4 Terabytes (4,000 GB)', 'Tecnología AllFrame para cero pérdida de cuadros', 'Diseñado para grabación 24/7/365 en NVRs', 'Interfaz SATA 6 Gb/s con búfer de 256MB', 'Carga de trabajo hasta 180 TB/año'],
    inStock: true,
    stockQuantity: '30 piezas',
    warranty: '3 Años de Garantía',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    tag: 'Almacenamiento Continuo',
    sku: 'WD-43PURZ',
    syscomCode: 'WD43PURZ'
  },

  // --- SECCIÓN 5: UBIQUITI & CISCO - NETWORKING Y ACCESS POINTS (3 Productos) ---
  {
    id: 'unifi-u6-pro',
    name: 'Ubiquiti UniFi 6 Pro Access Point Wi-Fi 6 de Alto Desempeño',
    model: 'UBIQUITI U6-PRO',
    brand: 'Ubiquiti',
    category: 'redes',
    description: 'Punto de acceso Wi-Fi 6 empresarial para interior/exterior techado. Soporta más de 350 dispositivos conectados simultáneamente con velocidades hasta 5.3 Gbps.',
    specs: ['Wi-Fi 6 (802.11ax) 4x4 MU-MIMO en 5GHz + 2x2 en 2.4GHz', 'Rendimiento agregado de 5.3 Gbps', '350+ clientes concurrentes sin saturación', 'Alimentación PoE estándar 802.3at', 'Gestión unificada en controlador UniFi Network'],
    inStock: true,
    stockQuantity: '16 unidades',
    warranty: '1 Año',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    tag: 'Wi-Fi 6 Corporativo',
    sku: 'UBNT-U6PRO',
    syscomCode: 'U6-Pro'
  },
  {
    id: 'unifi-usw-24-poe',
    name: 'Ubiquiti UniFi Switch Gigabit Gestionable 24 Puertos PoE+',
    model: 'UBIQUITI USW-24-POE',
    brand: 'Ubiquiti',
    category: 'redes',
    description: 'Switch administrable de capa 2 con 24 puertos Gigabit (16 puertos PoE+ 802.3at/af y 8 puertos Gigabit), 2 puertos SFP para fibra y pantalla táctil LCM 1.3".',
    specs: ['16 Puertos Gigabit PoE+ (Presupuesto total 95W)', '8 Puertos Gigabit Ethernet estándar', '2 Puertos SFP 1 Gbps para enlace de fibra óptica', 'Pantalla táctil LCM frontal de estado y puertos', 'Refrigeración silenciosa sin ventiladores ruidosos'],
    inStock: true,
    stockQuantity: '6 unidades',
    warranty: '1 Año',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    tag: 'Switching PoE+',
    sku: 'UBNT-USW24POE',
    syscomCode: 'USW-24-POE'
  },
  {
    id: 'cisco-catalyst-1000',
    name: 'Cisco Catalyst 1000 Switch Empresarial 24 Puertos Gigabit PoE+',
    model: 'CISCO C1000-24P-4G-L',
    brand: 'Cisco',
    category: 'redes',
    description: 'Switch de conmutación empresarial de clase mundial Cisco Catalyst con 24 puertos PoE+ (195W), 4 enlaces ascendentes SFP de 1G y software Cisco IOS clásico.',
    specs: ['24 Puertos 10/100/1000 Gigabit PoE+ (195W)', '4 Puertos SFP de 1 Gigabit dedicados', 'Sistema operativo Cisco IOS con CLI completo', 'Seguridad 802.1X, ACLs y Private VLANs', 'Garantía de por vida limitada Cisco'],
    inStock: true,
    stockQuantity: '3 unidades',
    warranty: 'Garantía Cisco',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    tag: 'Grado Misión Crítica',
    sku: 'CSCO-C100024P',
    syscomCode: 'C1000-24P-4G-L'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'parque-industrial-el-salto',
    title: 'Migración Telefónica IP & Red Óptica en Parque Industrial El Salto',
    clientType: 'Empresa de Manufactura y Logística Metalmecánica',
    location: 'Corredor Industrial El Salto, Jalisco',
    challenge: 'Tenían un conmutador analógico Panasonic con más de 12 años con fallas frecuentes, líneas de cobre dañadas por humedad y sin posibilidad de comunicar su nave de producción con las oficinas de Zapopan.',
    solution: 'Implementamos un Conmutador IP Grandstream UCM6304 con troncales SIP redundantes, tendido de 850 metros de fibra óptica monomodo certificada, y 65 teléfonos IP Grandstream con app móvil para ejecutivos foráneos.',
    results: [
      'Reducción del 58% en gasto mensual de facturación telefónica',
      'Comunicación 100% gratuita e instantánea entre ambas plantas',
      'Cero caídas operativas en los últimos 24 meses',
      'Tiempo de implementación de sólo 4 días sin cortar llamadas'
    ],
    servicesUsed: ['Conmutadores IP', 'Fibra Óptica', 'Troncales SIP', 'Póliza Oro'],
    quote: 'La atención de Conmutadores GDL fue impecable. Migraron todo el sistema sin que nuestros clientes notaran ningún corte de línea.',
    author: 'Ing. Carlos Mendoza — Director de Operaciones'
  },
  {
    id: 'corporativo-providencia',
    title: 'Modernización de CCTV 4K con IA & Control de Acceso Facial',
    clientType: 'Corporativo Financiero y Coworking',
    location: 'Providencia / Américas, Guadalajara',
    challenge: 'Requerían control estricto de acceso para más de 400 inquilinos y visitantes sin cuellos de botella en recepción, además de cobertura perimetral de estacionamientos y accesos sin puntos ciegos.',
    solution: 'Instalación de 4 torniquetes de acero inoxidable con reconocimiento facial ZKTeco de 0.3 segundos, junto con un circuito de 32 cámaras IP Hikvision AcuSense 4K con analíticas de cruce de línea y LPR en plumas de estacionamiento.',
    results: [
      'Flujo de ingreso 4 veces más rápido en horas pico matutinas',
      'Eliminación total de credenciales plásticas perdidas',
      'Registro fotográfico automatizado de cada vehículo ingresado',
      'Monitoreo centralizado desde panel táctil de seguridad'
    ],
    servicesUsed: ['Control de Acceso', 'CCTV 4K', 'Cableado Estructurado Cat6A'],
    quote: 'Nuestros clientes se sienten en un edificio de clase mundial gracias a la rapidez del acceso facial y la calidad de las cámaras.',
    author: 'Lic. Mariana Villarreal — Administradora de Inmuebles'
  },
  {
    id: 'cadena-clinicas-zapopan',
    title: 'Call Center Telefónico IP con IVR & Tarificador para Red Médica',
    clientType: 'Red de Clínicas Especializadas y Laboratorios',
    location: 'Zapopan & Guadalajara (5 Sucursales)',
    challenge: 'Perdían más de 35 llamadas diarias de pacientes intentando agendar citas debido a que las líneas estaban ocupadas o no había quien derivara a la sucursal correcta.',
    solution: 'Configuración de PBX IP en la nube con número único 33 cabecera, IVR inteligente con menú por especialidad y sucursal, colas de espera con música personalizada y reporte en tiempo real de llamadas atendidas y tiempos de espera.',
    results: [
      'Aumento del 34% en citas médicas agendadas el primer mes',
      'Cero llamadas perdidas por línea ocupada',
      'Grabación de llamadas para control de calidad médica',
      'Integración con su sistema de agenda médica en la nube'
    ],
    servicesUsed: ['Telefonía IP', 'IVR & Call Center', 'Póliza Platino 24/7'],
    quote: 'El menú interactivo y la rapidez para contestar multiplicó la captación de nuevos pacientes en todas nuestras sucursales.',
    author: 'Dr. Roberto Sandoval — Director Médico'
  }
];

export const COVERAGE_ZONES: CoverageZone[] = [
  {
    name: 'Guadalajara, Zapopan y Zona Metropolitana',
    area: 'Guadalajara Centro, Zapopan, Providencia, Puerta de Hierro, Tlaquepaque, Tonalá, El Salto, Tlajomulco',
    responseTime: '< 45 - 60 minutos',
    techniciansCount: 12,
    highlightedProjects: ['Levantamiento Técnico Sin Costo', 'Instalación en Sitio', 'Cuadrillas de Emergencia', 'Atención Inmediata'],
    isExpressZone: true
  },
  {
    name: 'Jalisco y Región Occidente',
    area: 'Puerto Vallarta, Tepatitlán, Lagos de Moreno, Ocotlán, Ciudad Guzmán, Chapala, Ajijic, Autlán, Arandas',
    responseTime: 'Visita Programada / Envíos 24h',
    techniciansCount: 6,
    highlightedProjects: ['Hotelería y Desarrollos', 'Plantas Agroindustriales', 'Redes de Fibra Óptica', 'Soporte en Sitio'],
    isExpressZone: true
  },
  {
    name: 'Región Bajío y Centro de México',
    area: 'León, Querétaro, Aguascalientes, San Luis Potosí, Irapuato, Celaya, Morelia, Guanajuato',
    responseTime: 'Proyectos & Envíos Express 24-48h',
    techniciansCount: 4,
    highlightedProjects: ['Parques Industriales', 'CEDIS Logísticos', 'Telefonía IP Multi-Sucursal', 'Venta Mayorista'],
    isExpressZone: false
  },
  {
    name: 'Norte y Noroeste de la República',
    area: 'Monterrey, Saltillo, Tijuana, Mexicali, Chihuahua, Hermosillo, Culiacán, Torreón, Ciudad Juárez',
    responseTime: 'Envíos Express SYSCOM / Proyectos',
    techniciansCount: 4,
    highlightedProjects: ['Corporativos Industriales', 'Envíos de Material Panduit/Panasonic', 'Programación Remota PBX'],
    isExpressZone: false
  },
  {
    name: 'CDMX, Valle de México y Centro-Sur',
    area: 'Ciudad de México, Toluca, Puebla, Cuernavaca, Pachuca, Tlaxcala',
    responseTime: 'Envíos Inmediatos / Soporte Nacional',
    techniciansCount: 4,
    highlightedProjects: ['Oficinas Corporativas', 'Centros de Contacto', 'Integración Nube', 'Despachos'],
    isExpressZone: false
  },
  {
    name: 'Toda la República Mexicana (Cobertura Nacional)',
    area: 'Las 32 Entidades Federativas: Veracruz, Mérida, Cancún, Villahermosa, Oaxaca, Chiapas y todo México',
    responseTime: 'Envíos Asegurados a Domicilio',
    techniciansCount: 18,
    highlightedProjects: ['Suministro Nacional de Equipos', 'Preconfiguración de Fábrica', 'Garantía SYSCOM México'],
    isExpressZone: false
  }
];

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: 'bronce',
    name: 'Póliza Preventiva Bronce',
    badge: 'Esencial',
    description: 'Ideal para pequeñas empresas que requieren mantenimiento periódico y soporte técnico telefónico/remoto garantizado.',
    recommendedFor: 'Negocios con hasta 15 extensiones y 8 cámaras',
    features: [
      { name: 'Visita de mantenimiento preventivo bimensual', included: true },
      { name: 'Soporte remoto y telefónico ilimitado (Lun-Vie 9:00 a 19:00)', included: true },
      { name: 'Respaldo de configuraciones de conmutador y NVR', included: true },
      { name: 'Revisión de voltajes, baterías UPS y cableado', included: true },
      { name: 'Descuento del 15% en refacciones y equipo nuevo', included: true },
      { name: 'Tiempo de respuesta en sitio: 4 horas', included: true },
      { name: 'Equipo de préstamo en caliente', included: false },
      { name: 'Atención fines de semana y emergencias 24/7', included: false }
    ]
  },
  {
    id: 'oro',
    name: 'Póliza Integral Oro',
    badge: 'Más Solicitada',
    highlighted: true,
    description: 'Nuestra póliza corporativa integral con visitas correctivas ilimitadas y equipo de respaldo para cero tiempos muertos.',
    recommendedFor: 'Empresas, clínicas y corporativos con operación continua',
    features: [
      { name: 'Visita de mantenimiento preventivo mensual programado', included: true },
      { name: 'Visitas correctivas ILIMITADAS sin costo de mano de obra', included: true },
      { name: 'Soporte remoto y telefónico prioritario (Lun-Vie 9:00 a 19:00)', included: true },
      { name: 'Equipo de préstamo en caliente (Hot Swap si falla el conmutador)', included: true },
      { name: 'Descuento del 25% en refacciones e insumos', included: true },
      { name: 'Tiempo de respuesta en sitio: < 2 horas en emergencias', included: true },
      { name: 'Capacitación bimestral a nuevos colaboradores', included: true },
      { name: 'Atención a emergencias bajo guardia técnica', included: true }
    ]
  },
  {
    id: 'platino',
    name: 'Póliza Platino 24/7 Misión Crítica',
    badge: 'Misión Crítica',
    description: 'Atención 24/7 los 365 días del año para plantas industriales, hospitales y centros de monitoreo que no pueden detenerse.',
    recommendedFor: 'Industria manufacturera, centros hospitalarios y CEDIS 24h',
    features: [
      { name: 'Visitas preventivas quincenales y auditoría de red', included: true },
      { name: 'Atención en sitio y remota 24/7/365 con línea roja directa', included: true },
      { name: 'Ingeniero certificado asignado con respuesta express (<60 min)', included: true },
      { name: 'Stock de refacciones y equipo idéntico en consignación local', included: true },
      { name: 'Monitoreo proactivo de estado de enlace y temperaturas', included: true },
      { name: 'Mantenimiento a planta de emergencia / sistemas UPS', included: true },
      { name: 'Descuento del 35% en equipamiento y proyectos nuevos', included: true },
      { name: 'SLA contractual con penalizaciones por incumplimiento', included: true }
    ]
  }
];

export const FAQ_ITEMS = [
  {
    q: '¿Qué marcas de conmutadores telefónicos y material manejan?',
    a: 'Somos integradores autorizados SYSCOM y distribuidores de Panduit, Panasonic, Grandstream, Hikvision, Ubiquiti, Dahua, Cisco, Belden, ZKTeco y Charofil. Suministramos conmutadores IP, teléfonos propietarios, tarjetas de expansión, bobinas de cable 100% cobre, patch panels, cámaras 4K y accesorios con garantía directa.'
  },
  {
    q: '¿Tienen venta de material y envíos a toda la República Mexicana?',
    a: 'Sí, despachamos materiales e insumos (cables Panduit, jacks, canaletas, tarjetas Panasonic, conmutadores Grandstream, cámaras Hikvision) tanto para entrega inmediata en Guadalajara y Jalisco, como para envíos asegurados a cualquier estado de la República Mexicana mediante red logística SYSCOM y paqueterías express.'
  },
  {
    q: '¿Puedo conservar mis números de teléfono actuales si migro a telefonía IP?',
    a: '¡Totalmente! Hacemos la portabilidad numérica de tus líneas Telmex, Totalplay, Megacable o Axtel hacia troncales SIP digitales o bien interconectamos tus líneas analógicas/digitales existentes a través de gateways FXO sin perder tu número comercial histórico.'
  },
  {
    q: '¿Puedo contestar las extensiones de mi oficina desde mi teléfono celular?',
    a: 'Sí. Con nuestros conmutadores IP configuramos la aplicación móvil corporativa (Grandstream Wave, softphones IP certificados, etc.) en tu smartphone. Podrás transferir llamadas, ver si tus compañeros están ocupados y hacer llamadas salientes mostrando el número de tu oficina desde cualquier lugar de México o el extranjero.'
  },
  {
    q: '¿Realizan visitas de levantamiento técnico en Guadalajara y proyectos foráneos?',
    a: 'Sí, realizamos visitas técnicas de levantamiento sin costo en Guadalajara, Zapopan y municipios de Jalisco, así como asesoría y proyectos llave en mano con soporte remoto y cuadrillas técnicas para proyectos en toda la República Mexicana.'
  },
  {
    q: '¿Qué garantía tienen las instalaciones y equipos suministrados?',
    a: 'Todos nuestros equipos nuevos cuentan con garantía de 1 a 3 años respaldados directamente por el fabricante y SYSCOM. Además, nuestras instalaciones de cableado estructurado Panduit cuentan con garantía y certificación de enlace permanente.'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Ing. Fernando Godínez',
    company: 'Distribuidora Farmacéutica de Occidente',
    role: 'Gerente de TI',
    text: 'Conmutadores GDL nos resolvió un problema crítico de más de 40 extensiones caídas en menos de 3 horas. Desde entonces compramos todo el material Panduit y el conmutador IP con ellos. La atención y precio de integrador SYSCOM es excelente.',
    rating: 5,
    location: 'Guadalajara, Jal.'
  },
  {
    name: 'Lic. Laura Patricia Orozco',
    company: 'Consorcio Jurídico & Fiscal Arcos',
    role: 'Socia Directora',
    text: 'Instalaron el nuevo conmutador IP con grabación de llamadas y app móvil. Ahora nuestros abogados contestan llamadas del despacho desde juzgados en CDMX, Monterrey y Guadalajara con la misma extensión.',
    rating: 5,
    location: 'Zapopan, Jal.'
  },
  {
    name: 'Ing. Miguel Ángel Cortés',
    company: 'Planta de Empaques San Agustín',
    role: 'Jefe de Mantenimiento y Seguridad',
    text: 'El suministro de cableado estructurado Panduit certificado y el sistema de cámaras 4K con IA AcuSense garantizó la seguridad de nuestra planta. Súper recomendados para proyectos serios.',
    rating: 5,
    location: 'Tlajomulco, Jal.'
  }
];
