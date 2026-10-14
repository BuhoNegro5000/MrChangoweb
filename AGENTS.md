# AGENTS.md — Reglas Permanentes de Desarrollo | Mr. Chango

Este documento establece las directrices inmutables para el mantenimiento, diseño, desarrollo y expansión del sitio web oficial de **MR. CHANGO — Reggae Mexicano**. Cualquier agente o desarrollador que trabaje en este repositorio debe respetar estas reglas sin excepción.

---

## 1. Principio Fundamental: Veracidad y Cero Falsificación

1. **No inventar información**: Está estrictamente prohibido fabricar fechas de conciertos, festivales, premios, cifras de reproducciones, seguidores, discografía ficticia, colaboradores no confirmados o citas de prensa inventadas.
2. **Datos verificados únicamente**:
   - **Nombre oficial**: Mr. Chango Reggae Mexicano.
   - **Fundador y voz principal**: David Chango (David Guzmán Martínez).
   - **Año de fundación**: 2008 (Playa del Carmen, Quintana Roo, México).
   - **Trayectoria declarada**: 18 años.
   - **Identidad musical**: Reggae original, Roots Culture, Rocksteady, New Roots, Rap y Dancehall.
   - **Lema**: *«Siente lo que escuchas y escucha lo que sientes»*.
   - **Principio artístico**: *«La música es el puente, la meta siempre será el mensaje»*.
   - **Formatos de directo**: Banda Híbrida y MC / Frontman (duración habitual: 45–60 minutos).
   - **Integrantes documentados**:
     - David Chango (Voz, fundador, músico y compositor; ganador a mejor álbum de reggae mexicano en 2012 —entidad no especificada—; proyectos previos: La Fantástica, Mala Patria).
     - Gerry Corzo (Bajo, cantante y frontman; fundador y miembro histórico de GANJA; creador de líneas de bajo en «Caminando», «Hasta el Final», «Grillete»).
     - Daniel Piñón / Jandread Selektah (DJ / Selector; anfitrión del podcast internacional *Roots Vibration's*).
     - Panto (Ingeniero de audio de producción).
3. **Discrepancias del rider técnico**: En el dossier existen menciones mixtas a pantallas LED (4 × 4 m vs 6 × 4 m vs 4 × 3 m en plano de escenario) y escenario mínimo (8 × 4 m). Presentar siempre los datos con indicación de opcionalidad técnica o confirmación requerida con producción.

---

## 2. Integridad de Recursos Multimedia

1. **Uso de archivos reales**: Todos los logotipos, fotos y videos deben corresponder a los archivos alojados en `public/` y catalogados en `docs/asset-inventory.md`.
2. **Prohibición de sobreescritura**: Jamás renombrar, eliminar ni sobrescribir los archivos multimedia originales.
3. **Optimización no destructiva**: Si se requieren variantes WebP o miniaturas de video, se guardan en subcarpetas específicas (`public/optimized/`, `public/video_thumbs/`) manteniendo intacto el recurso original.
4. **Respeto a las rutas web**: En Next.js, los recursos dentro de `public/` se sirven desde la raíz (`/logonegro.jpeg`, `/banda1.jpeg`, etc.). No anteponer `/public/` en enlaces HTML ni componentes.

---

## 3. Identidad Visual y Dirección de Arte

1. **Paleta cromática**:
   - Negro Escénico Base: `#080A07`
   - Verde Bosque Profundo: `#102419`
   - Dorado Envejecido / Acento Ámbar: `#DAB44A`
   - Naranja Quemado / Escenario: `#C96832`
   - Marfil Editorial: `#F1EADD`
2. **Evitar clichés**: No usar banderas rastafari repetitivas como decoración genérica ni hojas de cannabis decorativas. La identidad de Mr. Chango se basa en elegancia escénica, fuerza roots, textura de madera artesanal y vibración caribeña de Quintana Roo.
3. **Tipografía**:
   - Titulares: Tipografías de gran impacto, condensadas y potentes (ej. Oswald / Bebas / Sans display condensado).
   - Textos de lectura: Sans-serif limpia, moderna y de alta legibilidad (ej. Inter / Montserrat / System Sans).
4. **Composición**: Alternar diseño editorial asimétrico, fotografías a sangre, citas con tipografía monumental y paneles funcionales de audio y rider. Evitar la monotonía de tarjetas idénticas.

---

## 4. Contacto y Contratación Funcional

1. **Canales oficiales verificados**:
   - Correo artístico: `mr.changomusic@outlook.com`
   - Correo de producción: `soultalentrivieramaya@gmail.com`
   - Teléfono directo: `+52 56 3064 40 22`
   - WhatsApp directo: `+52 984 543 27 02` (con número normalizado `529845432702` y mensaje URL codificado predeterminado).
2. **Sin falsos estados de éxito**: Todo formulario debe validar campos y conectarse a un endpoint real o redirigir de forma transparente hacia correo directo / WhatsApp prellenado. No mostrar mensajes ficticios de «Reserva confirmada».
3. **Redes sociales oficiales verificadas**:
   - YouTube: `https://www.youtube.com/@mr.changoreggaemexicano2734`
   - Instagram: `https://www.instagram.com/mr_changoreggae/`
   - Spotify: `https://open.spotify.com/intl-es/artist/1oyZYiWN0ryxVfJ3G2mD4e`
   - SoundCloud: `https://soundcloud.com/mr_chango`
   - Facebook: `https://www.facebook.com/profile.php?id=100063477284601`
   - X: `https://x.com/mrchangomusic`

---

## 5. Rendimiento y Accesibilidad

1. **Sonido y video**: Los videos de fondo deben ser silenciosos (`muted`), con `playsInline`, `loop` y con poster de respaldo. No reproducir música automáticamente sin interacción del usuario.
2. **Accesibilidad**: HTML semántico (`main`, `section`, `nav`, `footer`, `header`), jerarquía de títulos (`h1`-`h4`), contraste cromático verificado, soporte completo de navegación por teclado, focus visible y respeto estricto a `prefers-reduced-motion`.
3. **Diseño responsivo**: Pruebas continuas en 375px (iPhone), 768px (iPad) y 1440px+ (Desktop). Sin desbordamiento horizontal (`overflow-x: hidden`).
