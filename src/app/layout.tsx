import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AudioPlayerBar } from "@/components/AudioPlayerBar";
import { RastaCursor } from "@/components/RastaCursor";
import { CHANGO_DATA } from "@/data/chango-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mrchango.com"),
  title: "Mr. Chango | Reggae Mexicano desde Playa del Carmen",
  description:
    "Sitio web oficial de Mr. Chango Reggae Mexicano. Roots culture, rap y vibración caribeña desde Playa del Carmen, Quintana Roo. 18 años de trayectoria.",
  keywords: [
    "Mr. Chango",
    "Reggae Mexicano",
    "Reggae en vivo",
    "David Chango",
    "Gerry Corzo",
    "Daniel Piñón",
    "Jandread Selektah",
    "Playa del Carmen",
    "Roots Culture",
    "Contratación bandas reggae México",
  ],
  authors: [{ name: "Mr. Chango Reggae Mexicano" }],
  openGraph: {
    title: "Mr. Chango | Reggae Mexicano desde Playa del Carmen",
    description:
      "Siente lo que escuchas y escucha lo que sientes. Música original, roots culture y energía escénica caribeña.",
    url: "https://mrchango.com",
    siteName: "Mr. Chango Oficial",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/playadelcarmen.jpeg",
        width: 1600,
        height: 1600,
        alt: "Mr. Chango en Playa del Carmen",
      },
      {
        url: "/logonegro.jpeg",
        width: 1264,
        height: 974,
        alt: "Logotipo oficial Mr. Chango",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr. Chango | Reggae Mexicano",
    description: "La música es el puente, la meta siempre será el mensaje.",
    images: ["/playadelcarmen.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: CHANGO_DATA.identity.name,
    alternateName: CHANGO_DATA.identity.shortName,
    description: CHANGO_DATA.identity.manifesto,
    foundingLocation: {
      "@type": "Place",
      name: "Playa del Carmen, Quintana Roo, México",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Playa del Carmen",
        addressRegion: "Quintana Roo",
        addressCountry: "MX",
      },
    },
    foundingDate: "2008",
    genre: ["Reggae", "Roots Reggae", "Rocksteady", "Dancehall", "New Roots"],
    slogan: CHANGO_DATA.identity.motto,
    sameAs: CHANGO_DATA.socials.map((s) => s.url),
    member: CHANGO_DATA.members.map((m) => ({
      "@type": "Person",
      name: m.name,
      roleName: m.role,
    })),
  };

  return (
    <html lang="es" className={`dark ${inter.variable} ${oswald.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('theme');
                if (saved === 'light') {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (e) {}
            `,
          }}
        />
        <link rel="icon" href="/logonegro.jpeg" />
      </head>
      <body className="min-h-screen bg-stage-950 text-reggae-ivory antialiased selection:bg-reggae-gold selection:text-stage-950">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-reggae-gold focus:text-stage-950 focus:rounded-lg focus:font-bold"
        >
          Saltar al contenido principal
        </a>

        <Navbar />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
        <AudioPlayerBar />
        <RastaCursor />
      </body>
    </html>
  );
}
