# MR. CHANGO — Reggae Mexicano | Sitio Web Oficial

Sitio web oficial y Electronic Press Kit (EPK) de **Mr. Chango Reggae Mexicano**, diseñado con estándares de calidad AAA para el posicionamiento del artista, catálogo de lanzamientos, material en directo y canal de conversión para promotores y festivales.

> **Principio Artístico:** *«La música es el puente, la meta siempre será el mensaje»*  
> **Lema Oficial:** *«Siente lo que escuchas y escucha lo que sientes»*

---

## 1. Arquitectura Técnica

- **Framework**: Next.js 15 (App Router).
- **Lenguaje**: TypeScript 5 (tipado estricto para entidades musicales, integrantes, rider y eventos).
- **Estilos**: Tailwind CSS 3.4 con tokens personalizados de identidad (`stage`, `reggae-gold`, `reggae-orange`, `reggae-green`, `reggae-ivory`).
- **Iconografía**: `lucide-react`.
- **Rendimiento**: Recursos de imagen servidos estáticamente con dimensiones explícitas, videos con posters de respaldo bajo demanda y reproductor Web Audio API sin sobrecarga de dependencias.
- **Accesibilidad**: Semántica HTML5 completa, navegación por teclado, contraste verificado y respeto a `prefers-reduced-motion`.
- **SEO & Metadatos**: Datos estructurados `MusicGroup` (schema.org), Open Graph, Twitter Cards, `robots.ts` y `sitemap.ts`.

---

## 2. Instalación y Ejecución

### Prerrequisitos
- Node.js 18.18+ (recomendado Node 20+ o 22+).
- npm 9+.

### Pasos de instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo local
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Compilación para Producción

```bash
# Compilar proyecto optimizado
npm run build

# Iniciar servidor de producción
npm start
```

---

## 3. ¿Dónde editar los textos y datos de Mr. Chango?

Toda la información del proyecto está centralizada en un único archivo de configuración:

📍 **`src/data/chango-data.ts`**

En este archivo puedes actualizar sin tocar el código de la interfaz:
- **Identidad**: lema, lema de guerra, manifiesto, misión, visión, valores.
- **Integrantes**: nombres, biografías, roles escénicos y viñetas destacadas.
- **Lanzamientos musicales**: títulos («Qué Prudente», «Live Me High»), tipos de disco, portadas y descripciones.
- **Formatos de show**: duración habitual (45-60 min), formatos Banda Híbrida y MC Frontman, y los 5 actos narrativos.
- **Rider técnico**: dimensiones del escenario, lista de 10 puntos del stage plot, canales de salida Midas 32ch y mezclas de monitoreo.

---

## 4. ¿Cómo añadir nuevas fotografías y videos?

1. Guarda el archivo original en la carpeta **`public/`** (respetando nombres descriptivos sin espacios o usando guiones).
2. Si es un video (`.mp4`), genera una imagen de miniatura/poster en **`public/video_thumbs/`**.
3. Registra el nuevo archivo en **`docs/asset-inventory.md`**.
4. Añade la entrada correspondiente en el array `gallery` o `videos` de **`src/data/chango-data.ts`**.

---

## 5. ¿Dónde actualizar redes sociales y enlaces musicales?

En **`src/data/chango-data.ts`**, dentro del array `socials`:

```typescript
socials: [
  { name: "Spotify", url: "https://open.spotify.com/intl-es/artist/1oyZYiWN0ryxVfJ3G2mD4e", ... },
  { name: "YouTube", url: "https://www.youtube.com/@mr.changoreggaemexicano2734", ... },
  { name: "Instagram", url: "https://www.instagram.com/mr_changoreggae/", ... },
  { name: "SoundCloud", url: "https://soundcloud.com/mr_chango", ... },
  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100063477284601", ... },
  { name: "X (Twitter)", url: "https://x.com/mrchangomusic", ... }
]
```

---

## 6. Gestión de Documentos de Contratación y Rider

- El PDF del dossier técnico oficial se encuentra en `public/Proyecto Mr. Chango.pdf`.
- Para reemplazarlo o actualizarlo con una nueva versión autorizada por Soul Entertainment, coloca el nuevo archivo en `public/` y actualiza la referencia de enlace en `src/components/Footer.tsx` y `src/components/StagePlotViewer.tsx`.

---

## 7. Datos que Aún Requieren Confirmación Humana

De acuerdo con el dossier oficial, los siguientes puntos están identificados internamente como pendientes de confirmación final con el artista o la agencia:
1. **Entidad otorgante del galardón de 2012**: El dossier señala que David Chango fue ganador a mejor álbum del Reggae Mexicano en 2012, pero no especifica la institución o festival que lo concedió. Se documentó tal cual sin inventar una academia.
2. **Dimensiones definitivas de la pantalla LED**: En la ficha técnica (pág. 2) se señala 4 × 4 m opcional; en el plano del stage plot (pág. 4) se muestra 4 × 3 m y en el Input list (pág. 5) se menciona 6 × 4 m. La web presenta una nota de transparencia indicando que se adapta al aforo del evento.
3. **Rol de Panto**: Documentado como Ingeniero de Audio de producción oficial; se mantiene claramente diferenciado de los integrantes escénicos frontales.
4. **Fechas de gira 2025/2026**: No se crearon eventos ficticios; en su lugar, se implementó el módulo de contratación inmediata para promotores y foros.

---

## 8. Licencia y Créditos

- Producción: Soul Entertainment / Soul Talent Riviera Maya.
- Todos los derechos reservados © Mr. Chango Reggae Mexicano.
