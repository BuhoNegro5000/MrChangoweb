/**
 * FUENTE ÚNICA DE VERDAD — MR. CHANGO REGGAE MEXICANO
 * 
 * Todos los datos están estrictamente fundamentados en:
 * 1. "Proyecto Mr. Chango.pdf" (Dossier oficial de Soul Entertainment).
 * 2. Recursos multimedia verificados en el repositorio.
 * 3. Enlaces oficiales proporcionados en las instrucciones.
 * 
 * Regla: Prohibido inventar datos, premios o fechas no confirmadas.
 */

export interface BandMember {
  id: string;
  name: string;
  role: string;
  verifiedTitle: string;
  photoUrl: string;
  bio: string;
  highlights: string[];
  isArtisticCore: boolean;
}

export interface SongRelease {
  id: string;
  title: string;
  type: "Sencillo" | "Álbum" | "Interpretación en Directo";
  coverUrl: string;
  year?: string;
  description: string;
  confirmedOrigin: "Composición original Mr. Chango" | "Clásico del Reggae Mexicano (Ganja)" | "Homenaje Roots Internacional (Bob Marley)";
  spotifyUrl?: string;
  youtubeUrl?: string;
  soundcloudUrl?: string;
  audioUrl?: string; // URL directa al archivo de audio en public/
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  confirmedOrigin: string;
}

export interface LiveVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  format: "horizontal" | "vertical";
  context: string;
  duration: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Conciertos" | "Integrantes" | "Sesiones" | "En Vivo";
  imageUrl: string;
  aspect: "landscape" | "portrait" | "square";
  caption: string;
}

export const CHANGO_DATA = {
  identity: {
    name: "Mr. Chango Reggae Mexicano",
    shortName: "Mr. Chango",
    originCity: "Playa del Carmen, Quintana Roo, México",
    foundationYear: 2008,
    declaredTrajectory: "18 años",
    motto: "Siente lo que escuchas y escucha lo que sientes",
    artisticPrinciple: "La música es el puente, la meta siempre será el mensaje",
    subheading: "REGGAE DESDE PLAYA DEL CARMEN",
    headline: "MR. CHANGO",
    tagline: "Reggae mexicano original. Roots culture, rap y vibración caribeña.",
    manifesto: "El proyecto Mr. Chango hace música original a través de un cóctel de ritmos caribeños como el Rocksteady, New Roots, Reggae & Rap y Dancehall. Fundado por David Chango en el año 2008, actualmente se presenta reforzado y acompañado de un gran equipo en sus presentaciones por todo el territorio nacional.",
    mission: "Rescatar y fomentar el Reggae Mexicano en los jóvenes.",
    vision: "Ser el grupo de Reggae que incluyen las familias en su playlist.",
    values: "La música es útil cuando inspira, desahoga, informa y sana personas.",
    liveApproach: "Abordando siempre temas de lucha social, historias y reflexiones con un enfoque combativo y emocional dentro de su música. Hacer música que le sirva a la gente.",
  },

  contact: {
    artisticEmail: "mr.changomusic@outlook.com",
    productionEmail: "soultalentrivieramaya@gmail.com",
    phoneDisplay: "+52 56 3064 40 22",
    phoneTel: "+525630644022",
    whatsappDisplay: "+52 984 543 27 02",
    whatsappNormalized: "529845432702",
    whatsappDefaultMsg: "Hola, me interesa contratar a Mr. Chango. ¿Podrían compartirme disponibilidad, costos y requisitos para mi evento?",
    bookingResponsible: "David Guzmán Martínez",
    productionEntity: "Soul Entertainment / Soul Talent Riviera Maya",
  },

  socials: [
    {
      name: "Spotify",
      url: "https://open.spotify.com/intl-es/artist/1oyZYiWN0ryxVfJ3G2mD4e",
      username: "Mr. Chango en Spotify",
      category: "streaming",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@mr.changoreggaemexicano2734",
      username: "@mr.changoreggaemexicano2734",
      category: "video",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/mr_changoreggae/",
      username: "@mr_changoreggae",
      category: "social",
    },
    {
      name: "SoundCloud",
      url: "https://soundcloud.com/mr_chango",
      username: "mr_chango",
      category: "streaming",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=100063477284601",
      username: "Mr. Chango Facebook Oficial",
      category: "social",
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/mrchangomusic",
      username: "@mrchangomusic",
      category: "social",
    },
  ],

  members: [
    {
      id: "david-chango",
      name: "David Chango",
      role: "Voz Principal, Músico y Compositor",
      verifiedTitle: "Fundador de Mr. Chango (2008)",
      photoUrl: "/extracted_pdf_images/p3_xref499_759x506.png",
      altPhotoUrl: "/davo2.jpeg",
      bio: "Fundador del proyecto Mr. Chango en 2008. Cantante, músico y compositor con 18 años de trayectoria recorriendo la República Mexicana. Reconocido con el galardón a mejor álbum del Reggae Mexicano en 2012 (dossier oficial). Ha liderado e integrado proyectos como La Fantástica y Mala Patria, fungiendo como promotor incansable y conector de la escena reggae en el país.",
      highlights: [
        "Fundador y voz líder desde 2008",
        "Reconocimiento Mejor Álbum Reggae Mexicano 2012",
        "Frontman en formaciones como La Fantástica y Mala Patria",
        "Promotor cultural y compositor de letras de lucha social y sanación",
      ],
      isArtisticCore: true,
    },
    {
      id: "gerry-corzo",
      name: "Gerry Corzo",
      role: "Bajo, Cantante y Frontman",
      verifiedTitle: "Fundador Histórico de GANJA",
      photoUrl: "/extracted_pdf_images/p3_xref490_615x615.png",
      altPhotoUrl: "/banda1.jpeg",
      bio: "Legendario e icónico bajista del reggae en México. Socio fundador e integrante original de la legendaria banda GANJA. Creador de líneas de bajo históricas en himnos como «Caminando», «Hasta el Final» y «Grillete». Reconocido por su estilo único y energía escénica, en Mr. Chango aporta el peso rítmico, voces de apoyo y carisma frontal.",
      highlights: [
        "Socio y bajista fundador de GANJA",
        "Autor de las líneas de bajo de «Caminando», «Hasta el Final» y «Grillete»",
        "Voz de apoyo, coros y co-frontman en vivo",
        "Más de dos décadas de historia en el reggae nacional",
      ],
      isArtisticCore: true,
    },
    {
      id: "daniel-pinon",
      name: "Daniel Piñón (Jandread Selektah)",
      role: "DJ, Selector y Diseñador de Atmósferas",
      verifiedTitle: "Titular del podcast Roots Vibration's",
      photoUrl: "/extracted_pdf_images/p3_xref470_317x408.png",
      altPhotoUrl: "/banda2.jpeg",
      bio: "Encargado de los ritmos, beats y atmósfera sonora en Mr. Chango. Reconocido internacionalmente como titular del podcast «Roots Vibration's», especializado en la cultura reggae y sus variantes con sesiones y colaboraciones alrededor del mundo. Actúa como selector bajo el nombre de Jandread Selektah.",
      highlights: [
        "Titular y productor de Roots Vibration's Podcast",
        "Selector oficial bajo el alias Jandread Selektah",
        "Arquitectura rítmica: Dancehall, New Roots y Rocksteady",
        "Controlador DJ y ambientación sonora en vivo",
      ],
      isArtisticCore: true,
    },
    {
      id: "panto",
      name: "Panto",
      role: "Ingeniero de Audio y Operación Técnica",
      verifiedTitle: "Responsable de Sonido en Vivo",
      photoUrl: "/extracted_pdf_images/p5_xref543_3150x2101.jpeg",
      altPhotoUrl: "/extracted_pdf_images/p5_xref543_3150x2101.jpeg",
      bio: "Identificado en la ficha técnica oficial del proyecto como Ingeniero de Audio. Es el encargado de la calibración, mezcla en vivo, operación de consola Midas y monitoreo In-Ear, garantizando la fidelidad sonora del proyecto en festivales, teatros y foros.",
      highlights: [
        "Ingeniero de audio de producción oficial",
        "Operación de consola digital Midas de 32 canales",
        "Calibración de sistemas In-Ear y monitores de escenario",
        "Soporte técnico integral de gira",
      ],
      isArtisticCore: false,
    },
  ],

  musicReleases: [
    {
      id: "que-prudente",
      title: "Qué Prudente",
      type: "Sencillo",
      coverUrl: "/albumqueprudente.jpeg",
      year: "Confirmado en catálogo",
      description: "Sencillo oficial de Mr. Chango grabado con lírica combativa y reflexión social sobre bases contemporáneas de reggae rap y roots moderno.",
      confirmedOrigin: "Composición original Mr. Chango",
      spotifyUrl: "https://open.spotify.com/intl-es/artist/1oyZYiWN0ryxVfJ3G2mD4e",
      youtubeUrl: "https://www.youtube.com/@mr.changoreggaemexicano2734",
      soundcloudUrl: "https://soundcloud.com/mr_chango",
    },
    {
      id: "live-me-high",
      title: "Live Me High",
      type: "Sencillo",
      coverUrl: "/album1.jpeg",
      year: "Interpretada en gira",
      description: "Canción emblemática del repertorio en vivo de Mr. Chango señalada en el dossier oficial, destacada por su cadencia caribeña y coro coreable.",
      confirmedOrigin: "Composición original Mr. Chango",
      spotifyUrl: "https://open.spotify.com/intl-es/artist/1oyZYiWN0ryxVfJ3G2mD4e",
      youtubeUrl: "https://www.youtube.com/@mr.changoreggaemexicano2734",
      soundcloudUrl: "https://soundcloud.com/mr_chango",
    },
    {
      id: "caminando-live",
      title: "Caminando (En Vivo)",
      type: "Interpretación en Directo",
      coverUrl: "/banda1.jpeg",
      year: "En repertorio en vivo",
      description: "Himno histórico del reggae mexicano compuesto por Gerry Corzo con la banda GANJA, reinterpretado en vivo en la gira de Mr. Chango con su bajista y fundador original en el escenario.",
      confirmedOrigin: "Clásico del Reggae Mexicano (Ganja)",
      spotifyUrl: "https://open.spotify.com/intl-es/artist/1oyZYiWN0ryxVfJ3G2mD4e",
      youtubeUrl: "https://www.youtube.com/@mr.changoreggaemexicano2734",
      soundcloudUrl: "https://soundcloud.com/mr_chango",
    },
    {
      id: "could-you-be-loved-live",
      title: "Could You Be Loved (Tributo Roots en Vivo)",
      type: "Interpretación en Directo",
      coverUrl: "/frontal.jpeg",
      year: "En repertorio en vivo",
      description: "Homenaje al inmortal clásico de Bob Marley & The Wailers, adaptado con la cadencia de Playa del Carmen para desatar la energía y comunión con el público en festivales.",
      confirmedOrigin: "Homenaje Roots Internacional (Bob Marley)",
      spotifyUrl: "https://open.spotify.com/intl-es/artist/1oyZYiWN0ryxVfJ3G2mD4e",
      youtubeUrl: "https://www.youtube.com/@mr.changoreggaemexicano2734",
      soundcloudUrl: "https://soundcloud.com/mr_chango",
    },
  ] as SongRelease[],

  /**
   * Tracks de audio reproducibles directamente en el sitio.
   * Archivos MP3 alojados en /public.
   * Para agregar más canciones: añadir un nuevo objeto a este array.
   */
  audioTracks: [
    {
      id: "incertidumbre",
      title: "Incertidumbre",
      artist: "Mr. Chango",
      coverUrl: "/albumqueprudente.jpeg",
      audioUrl: "/Incertidumbre!.mp3",
      confirmedOrigin: "Composición original Mr. Chango",
    },
  ],

  showFormat: {
    duration: "45 a 60 minutos",
    formats: [
      {
        name: "Formato Banda Híbrida",
        badge: "Recomendado para Festivales y Teatros",
        description: "Potencia total en tarima con MC / frontman (David Chango), bajo eléctrico y coros (Gerry Corzo), DJ Selector con controladores en vivo (Daniel Piñón / Jandread), músicos invitados y visuales en pantalla gigante.",
        requirements: "Escenario mínimo 8 × 4 m, consola Midas 32 canales, monitores de piso, Side Fill y pantalla LED.",
      },
      {
        name: "Formato MC / Frontman & Selector",
        badge: "Versátil para Clubs, Foros y Eventos Especiales",
        description: "Esquema dinámico y ágil ideal para recintos medianos, palapas de playa, eventos privados y showcases. Conserva toda la energía de interacción lírica, beats caribeños y cercanía directa con la audiencia.",
        requirements: "Cabina para DJ, 2 micrófonos inalámbricos Beta 58, monitoreo In-Ear y PA acorde al aforo.",
      },
    ],
    narrativeStages: [
      {
        act: "Acto I",
        title: "Introducción & Mística",
        description: "Atmósfera envolvente que sumerge al público en la narrativa caribeña, como quien abre las páginas de un cuento roots.",
      },
      {
        act: "Acto II",
        title: "Historia & Mensaje",
        description: "Desarrollo de líricas con contenido social, historias de vida, conciencia y resistencia con groove constante.",
      },
      {
        act: "Acto III",
        title: "Intermedio Dinámico",
        description: "Interacción directa con la audiencia, transiciones de selector con ritmos de Dancehall y New Roots.",
      },
      {
        act: "Acto IV",
        title: "Clímax Musical",
        description: "Explosión de energía con los temas originales más intensos («Live Me High», «Qué Prudente») y clásicos compartidos («Caminando»).",
      },
      {
        act: "Acto V",
        title: "Desenlace & Trascendencia",
        description: "Cierre en comunión total con la bandera del Reggae Mexicano en alto y el mensaje de sanación resonando.",
      },
    ],
  },

  technicalRider: {
    stageDimensions: "Escenario mínimo recomendado: 8 × 4 metros",
    stagePlotImage: "/extracted_pdf_images/p4_xref304_1075x717.png",
    consoleModel: "Consola digital Midas de 32 canales",
    ledScreenNotice: "Pantalla LED gigante: el dossier documenta referencias a 4 × 4 m (ficha técnica), 6 × 4 m (input list) y 4 × 3 m (diagrama de escenario). Se confirma con la producción del evento según aforo.",
    audioRentalOption: "Servicio disponible de renta de audio profesional coordinado directamente por Soul Entertainment (costo independiente de honorarios artísticos).",
    stagePoints: [
      { num: 1, label: "Controlador DJ", detail: "Salida estéreo Canon L/R conectada al patch de escenario" },
      { num: 2, label: "Computadora y Control", detail: "Gestión de visuales y control de máquinas de humo" },
      { num: 3, label: "Flightcases de DJ", detail: "Mesa/racks de 1.20 m altura × 1 m largo × 60 cm ancho" },
      { num: 4, label: "Monitores de Piso", detail: "2 Monitores Behringer F1220 Frontales" },
      { num: 5, label: "Side Fill & Subwoofer", detail: "Refuerzo lateral de frecuencias graves en escenario" },
      { num: 6, label: "Micrófono con Pedestal", detail: "Para bajista y coros (Shure BLX28 Beta 58)" },
      { num: 7, label: "Bajo Eléctrico Plug", detail: "Conexión a Caja Directa Pasiva Behringer DI400P y amplificador de bajo 300W" },
      { num: 8, label: "Sistema In-Ear Cantante", detail: "Monitoreo inalámbrico profesional para David Chango" },
      { num: 9, label: "Máquinas de Humo", detail: "2 máquinas de humo para atmósfera escénica teatral" },
      { num: 10, label: "Iluminación LED", detail: "Torres de luz LED color verde y amarillo en trípodes laterales" },
    ],
    outputChannels: [
      { ch: "1", name: "Voz Principal", device: "Shure Beta 58 inalámbrico (David Chango)" },
      { ch: "2", name: "Voz Apoyo y Coros", device: "Shure Beta 58 con pedestal (Gerry Corzo)" },
      { ch: "3", name: "Bajo Eléctrico", device: "Caja pasiva Behringer DI400P + Amplificador 300W" },
      { ch: "4", name: "Línea DJ Estéreo L", device: "Línea balanceada Canon izquierda" },
      { ch: "5", name: "Línea DJ Estéreo R", device: "Línea balanceada Canon derecha" },
    ],
    monitoring: [
      { mix: "1", target: "In-Ear Cantante Principal", type: "Inalámbrico estéreo" },
      { mix: "2", target: "Monitores de Piso L / R", type: "Cuñas frontales F1220" },
      { mix: "3", target: "Side Fill", type: "Refuerzo lateral estéreo con sub" },
    ],
  },

  videos: [
    {
      id: "festival-concierto",
      title: "Concierto Festival — Escenario Principal",
      description: "Presentación en festival con visuales en pantalla LED gigante, multitud bailando al ritmo caribeño y banda en vivo a máxima potencia.",
      videoUrl: "/bandatocando3.mp4",
      posterUrl: "/video_thumbs/bandatocando3_poster.jpg",
      format: "horizontal",
      context: "Festival masivo en vivo",
      duration: "1:20 min",
    },
    {
      id: "show-luces",
      title: "Voz & Energía Frontal en Escenario",
      description: "David Chango y la formación desplegando lírica y melodía bajo iluminación verde y ámbar de concierto.",
      videoUrl: "/videocantando.mp4",
      posterUrl: "/video_thumbs/videocantando_poster.jpg",
      format: "vertical",
      context: "Actuación en vivo en tarima",
      duration: "0:53 min",
    },
    {
      id: "playa-del-carmen-live",
      title: "Directo en Playa del Carmen",
      description: "Registro de presentación nocturna en su ciudad sede con interacción comunitaria de seguidores.",
      videoUrl: "/bandatocando4.mp4",
      posterUrl: "/video_thumbs/bandatocando4_poster.jpg",
      format: "vertical",
      context: "Playa del Carmen, Quintana Roo",
      duration: "1:00 min",
    },
    {
      id: "sesion-palapa",
      title: "Sesión Íntima & Acústica en Palapa",
      description: "Versatilidad del proyecto: David Chango en formato acústico con guitarra y percusión en un entorno costero caribeño.",
      videoUrl: "/bandatocando2.mp4",
      posterUrl: "/video_thumbs/bandatocando2_poster.jpg",
      format: "vertical",
      context: "Sesión caribeña acústica",
      duration: "0:45 min",
    },
    {
      id: "club-venue",
      title: "Atmósfera Club & Foros Musicales",
      description: "Set en recinto cerrado con sonido envolvente y cadencia dancehall roots.",
      videoUrl: "/bandatocando5.mp4",
      posterUrl: "/video_thumbs/bandatocando5_poster.jpg",
      format: "vertical",
      context: "Club & Recinto musical",
      duration: "0:31 min",
    },
  ] as LiveVideo[],

  gallery: [
    {
      id: "g1",
      title: "Playa del Carmen — Raíz & Trono",
      category: "Sesiones",
      imageUrl: "/playadelcarmen.jpeg",
      aspect: "square",
      caption: "David Chango en trono barroco con los haces de luz tricolor y palmeras caribeñas de Quintana Roo.",
    },
    {
      id: "g2",
      title: "Fuerza Colectiva en Tarima",
      category: "Conciertos",
      imageUrl: "/banda1.jpeg",
      aspect: "landscape",
      caption: "Gerry Corzo en el bajo sonriendo a la multitud y David Chango en el micrófono (Fotografía DZ74).",
    },
    {
      id: "g3",
      title: "Comunión con el Público",
      category: "Conciertos",
      imageUrl: "/banda2.jpeg",
      aspect: "landscape",
      caption: "Foto celebratoria desde el escenario con la sala abarrotada tras un concierto de Mr. Chango.",
    },
    {
      id: "g4",
      title: "Lírica al Frente",
      category: "En Vivo",
      imageUrl: "/frontal.jpeg",
      aspect: "landscape",
      caption: "David Chango vocalizando con batería de fondo y luces verdes tropicales en el escenario.",
    },
    {
      id: "g5",
      title: "Gerry Corzo — Bajo Legendario",
      category: "Integrantes",
      imageUrl: "/extracted_pdf_images/p3_xref490_615x615.png",
      aspect: "square",
      caption: "Gerry Corzo, fundador histórico de GANJA, impartiendo la escuela del bajo reggae en México.",
    },
    {
      id: "g6",
      title: "Daniel Piñón — Jandread Selektah",
      category: "Integrantes",
      imageUrl: "/extracted_pdf_images/p3_xref470_317x408.png",
      aspect: "portrait",
      caption: "Daniel Piñón en cabina con camiseta Roots Vibration's, diseñando los ritmos de la banda.",
    },
    {
      id: "g7",
      title: "David Chango — Festival al Aire Libre",
      category: "En Vivo",
      imageUrl: "/extracted_pdf_images/p3_xref499_759x506.png",
      aspect: "landscape",
      caption: "Actuación festivalera a pleno sol con micrófono en mano conectando con la audiencia.",
    },
    {
      id: "g8",
      title: "Canto y Devoción Escénica",
      category: "En Vivo",
      imageUrl: "/davo2.jpeg",
      aspect: "portrait",
      caption: "Retrato editorial en blanco y negro: la entrega lírica de David Chango al micrófono.",
    },
    {
      id: "g9",
      title: "Fuego & Pasión",
      category: "Sesiones",
      imageUrl: "/cantantefuego.jpeg",
      aspect: "square",
      caption: "Retrato escénico con camisa caribeña y energía flamígera que simboliza la calidez de su show.",
    },
  ] as GalleryItem[],
};
