import React from "react";
import Image from "next/image";
import { CHANGO_DATA } from "@/data/chango-data";
import {
  Mail,
  Phone,
  MessageCircle,
  FileDown,
  ExternalLink,
  ShieldCheck,
  Disc3,
  Youtube,
  Instagram,
  Radio,
  Facebook,
  Share2,
} from "lucide-react";

export const Footer = () => {
  const currentYear = 2026;

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "spotify":
        return <Disc3 className="w-5 h-5 text-green-400" />;
      case "youtube":
        return <Youtube className="w-5 h-5 text-red-500" />;
      case "instagram":
        return <Instagram className="w-5 h-5 text-pink-400" />;
      case "soundcloud":
        return <Radio className="w-5 h-5 text-orange-400" />;
      case "facebook":
        return <Facebook className="w-5 h-5 text-blue-400" />;
      default:
        return <Share2 className="w-5 h-5 text-reggae-gold" />;
    }
  };

  return (
    <footer className="bg-[#FAF7F2] dark:bg-stage-950 border-t border-stone-200 dark:border-reggae-green-deep/80 text-stone-700 dark:text-reggae-ivory/80 pt-16 pb-36 sm:pb-40 relative overflow-hidden" role="contentinfo">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-radial-gradient from-reggae-green-deep/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-stone-200 dark:border-stage-800">
          {/* Col 1: Identity & Motto */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-12 overflow-hidden rounded bg-white dark:bg-stage-900 border border-stone-200 dark:border-reggae-gold/30 p-1 shadow-sm">
                <Image
                  src="/logonegro.jpeg"
                  alt="Logotipo Mr. Chango"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-wider text-stone-900 dark:text-reggae-ivory block leading-none">
                  {CHANGO_DATA.identity.name}
                </span>
                <span className="text-xs text-[#875D06] dark:text-reggae-gold uppercase tracking-widest font-mono font-bold">
                  {CHANGO_DATA.identity.originCity}
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-600 dark:text-reggae-ivory/70 leading-relaxed italic mt-2">
              «{CHANGO_DATA.identity.motto}»
            </p>

            <blockquote className="text-xs text-[#875D06] dark:text-reggae-gold/90 font-mono border-l-2 border-[#DAB44A]/60 pl-3 py-1 my-1 font-medium">
              {CHANGO_DATA.identity.artisticPrinciple}
            </blockquote>

            <div className="inline-flex items-center gap-2 text-xs text-stone-600 dark:text-reggae-ivory/60 bg-white dark:bg-stage-900/80 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stage-800 w-fit shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#875D06] dark:text-reggae-gold" />
              <span>Proyecto oficial • {CHANGO_DATA.identity.declaredTrajectory} de trayectoria</span>
            </div>
          </div>

          {/* Col 2: Official Social & Streaming Links */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-[#875D06] dark:text-reggae-gold">
              Canales y Música
            </h3>
            <ul className="flex flex-col gap-2">
              {CHANGO_DATA.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-sm text-stone-700 dark:text-reggae-ivory/80 hover:text-[#875D06] dark:hover:text-reggae-gold p-1.5 rounded hover:bg-white dark:hover:bg-stage-900/60 transition-colors group"
                  >
                    <span className="flex items-center gap-2.5">
                      {getSocialIcon(social.name)}
                      <span>{social.name}</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-[#875D06] dark:text-reggae-gold">
              Contratación Directa
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={`https://wa.me/${CHANGO_DATA.contact.whatsappNormalized}?text=${encodeURIComponent(
                  CHANGO_DATA.contact.whatsappDefaultMsg
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-800 dark:text-reggae-ivory/90 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-green-600 dark:text-green-500 shrink-0" />
                <span>WhatsApp: {CHANGO_DATA.contact.whatsappDisplay}</span>
              </a>

              <a
                href={`tel:${CHANGO_DATA.contact.phoneTel}`}
                className="flex items-center gap-2 text-stone-800 dark:text-reggae-ivory/90 hover:text-[#875D06] dark:hover:text-reggae-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-[#875D06] dark:text-reggae-gold shrink-0" />
                <span>Tel: {CHANGO_DATA.contact.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${CHANGO_DATA.contact.artisticEmail}`}
                className="flex items-start gap-2 text-stone-800 dark:text-reggae-ivory/90 hover:text-[#875D06] dark:hover:text-reggae-gold transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#875D06] dark:text-reggae-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-stone-500 dark:text-reggae-ivory/50">Artístico:</span>
                  <span>{CHANGO_DATA.contact.artisticEmail}</span>
                </div>
              </a>

              <a
                href={`mailto:${CHANGO_DATA.contact.productionEmail}`}
                className="flex items-start gap-2 text-stone-800 dark:text-reggae-ivory/90 hover:text-[#B84E18] dark:hover:text-reggae-orange transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#B84E18] dark:text-reggae-orange shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-stone-500 dark:text-reggae-ivory/50">Producción:</span>
                  <span>{CHANGO_DATA.contact.productionEmail}</span>
                </div>
              </a>

              <div className="pt-2 text-xs text-stone-500 dark:text-reggae-ivory/50 font-mono">
                Responsable: {CHANGO_DATA.contact.bookingResponsible}
              </div>
            </div>
          </div>

          {/* Col 4: Dossier & Press Kit Download */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-[#875D06] dark:text-reggae-gold">
              Dossier & EPK
            </h3>
            <p className="text-xs text-stone-600 dark:text-reggae-ivory/60 leading-relaxed">
              Descarga la ficha técnica oficial, rider técnico y semblanza de Mr. Chango (PDF).
            </p>
            <a
              href="/Proyecto Mr. Chango.pdf"
              download="Proyecto Mr. Chango.pdf"
              className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 dark:bg-stage-850 dark:hover:bg-stage-800 border border-[#DAB44A]/50 dark:border-reggae-gold/40 text-[#875D06] dark:text-reggae-gold hover:text-stone-900 dark:hover:text-reggae-ivory px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all mt-1 shadow-sm hover:scale-[1.02]"
            >
              <FileDown className="w-4 h-4" />
              <span>Dossier Oficial</span>
            </a>
            <span className="text-[10px] text-stone-500 dark:text-reggae-ivory/40 font-mono text-center">
              Soul Entertainment (PDF • 38.1 MB)
            </span>
          </div>
        </div>

        {/* Creator & Agency Credit - Centrado, Prominente y libre de obstrucción */}
        <div className="pt-10 pb-4 flex flex-col items-center justify-center gap-2 text-center border-t border-stone-200 dark:border-stage-850">
          <a
            href="https://www.tiktok.com/@pamusic2"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white dark:bg-stage-900/95 border border-[#dab44a]/50 dark:border-[#dab44a]/40 shadow-md hover:shadow-lg text-xs text-stone-700 dark:text-[#f1eadd] font-mono hover:border-[#dab44a] hover:scale-105 active:scale-95 transition-all"
            title="Conoce a Pa' music en TikTok (@pamusic2)"
          >
            <span className="flex items-center gap-1" aria-hidden="true">
              <span className="w-2 h-2 rounded-full bg-[#1a8c38]" />
              <span className="w-2 h-2 rounded-full bg-[#f5c518] animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-[#d62828]" />
            </span>
            <span className="text-stone-600 dark:text-reggae-ivory/80 group-hover:text-stone-900 dark:group-hover:text-reggae-ivory transition-colors">
              Sitio web oficial creado por
            </span>
            <span className="font-display font-bold text-sm tracking-wider text-[#875D06] dark:text-[#dab44a] dark:text-glow-gold group-hover:underline flex items-center gap-1">
              Pa&apos; music
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </span>
          </a>
        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-reggae-ivory/50">
          <div>
            © {currentYear} Mr. Chango Reggae Mexicano. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Producción: {CHANGO_DATA.contact.productionEntity}</span>
            <span>•</span>
            <span>Playa del Carmen, Q. Roo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
