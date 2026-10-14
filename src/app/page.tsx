"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CHANGO_DATA, GalleryItem, LiveVideo } from "@/data/chango-data";
import { LightboxModal } from "@/components/LightboxModal";
import { StagePlotViewer } from "@/components/StagePlotViewer";
import { BookingForm } from "@/components/BookingForm";
import Logo3D from "@/components/Logo3D";

import {
  Play,
  Calendar,
  Volume2,
  Disc3,
  ExternalLink,
  ChevronDown,
  Clock,
  Sparkles,
  Users,
  Radio,
  FileDown,
  Music,
  ArrowRight,
  ShieldCheck,
  Award,
  Video,
} from "lucide-react";

export default function HomePage() {
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | LiveVideo | null>(null);
  const [lightboxType, setLightboxType] = useState<"image" | "video">("image");
  const [galleryCategory, setGalleryCategory] = useState<string>("Todos");

  const openImageLightbox = (item: GalleryItem) => {
    setLightboxItem(item);
    setLightboxType("image");
    setLightboxOpen(true);
  };

  const openVideoLightbox = (video: LiveVideo) => {
    setLightboxItem(video);
    setLightboxType("video");
    setLightboxOpen(true);
  };

  const filteredGallery =
    galleryCategory === "Todos"
      ? CHANGO_DATA.gallery
      : CHANGO_DATA.gallery.filter((g) => g.category === galleryCategory);

  return (
    <div className="relative overflow-hidden bg-stage-950">
      {/* ============================================================== */}
      {/* 1. HERO CINEMATOGRÁFICO DE APERTURA                            */}
      {/* ============================================================== */}
      <section
        id="hero"
        aria-label="Apertura y presentación oficial"
        className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Video / Picture with optimized fallback */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/video_thumbs/bandatocando3_poster.jpg"
            className="w-full h-full object-cover object-center opacity-35 scale-105 transform motion-safe:animate-pulse-slow"
          >
            <source src="/bandatocando3.mp4" type="video/mp4" />
          </video>
          {/* Multi-layered cinematic gradient overlays */}
          <div className="hero-video-overlay-1 absolute inset-0 bg-gradient-to-t from-stage-950 via-stage-950/70 to-stage-950/50" />
          <div className="hero-video-overlay-2 absolute inset-0 bg-gradient-to-r from-stage-950/90 via-transparent to-stage-950/90" />
          <div className="hero-video-overlay-3 absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,36,25,0.4)_0%,transparent_70%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">


          {/* 3D Model Logo */}
          <div className="relative w-full max-w-[min(460px,calc(100vw-2rem))] mb-4 flex items-center justify-center overflow-hidden">
            <Logo3D size={440} className="w-full" />
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-stone-900 dark:text-reggae-ivory leading-none text-glow-gold">
            {CHANGO_DATA.identity.headline}
          </h1>

          <p className="mt-4 sm:mt-6 text-lg sm:text-2xl font-light text-stone-700 dark:text-reggae-ivory/90 max-w-2xl leading-relaxed">
            {CHANGO_DATA.identity.tagline}
          </p>

          {/* Official Motto */}
          <p className="mt-3 text-xs sm:text-sm font-mono italic text-[#875D06] dark:text-reggae-gold/90 tracking-wide border-y border-stone-200 dark:border-reggae-gold/20 py-2 px-4 max-w-xl">
            «{CHANGO_DATA.identity.motto}»
          </p>

          {/* Two Hierarchical CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#contacto"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-reggae-gold to-reggae-orange hover:from-reggae-gold-light hover:to-reggae-orange-warm text-stage-950 font-display font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-2xl hover:shadow-reggae-gold/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>CONTRATAR A MR. CHANGO</span>
            </a>

            <a
              href="#musica"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-stage-900/90 hover:bg-stone-50 dark:hover:bg-stage-850 text-stone-900 dark:text-reggae-ivory hover:text-[#875D06] dark:hover:text-reggae-gold border border-stone-200 dark:border-stage-700 hover:border-[#DAB44A] dark:hover:border-reggae-gold/40 font-display font-semibold text-sm sm:text-base px-8 py-4 rounded-xl shadow-sm transition-all"
            >
              <Disc3 className="w-4 h-4 text-[#875D06] dark:text-reggae-gold" />
              <span>ESCUCHAR MÚSICA</span>
            </a>
          </div>

          {/* Quick Verified Highlights */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 w-full max-w-3xl pt-8 border-t border-stone-200 dark:border-stage-800/80 text-left">
            <div className="p-3 bg-white dark:bg-stage-900/60 rounded-xl border border-stone-200 dark:border-stage-800 shadow-sm">
              <span className="block text-[10px] font-mono uppercase text-[#875D06] dark:text-reggae-gold font-bold">Fundación</span>
              <span className="text-base sm:text-lg font-bold text-stone-900 dark:text-reggae-ivory">2008</span>
              <span className="block text-[11px] text-stone-600 dark:text-reggae-ivory/60 truncate">Playa del Carmen</span>
            </div>

            <div className="p-3 bg-white dark:bg-stage-900/60 rounded-xl border border-stone-200 dark:border-stage-800 shadow-sm">
              <span className="block text-[10px] font-mono uppercase text-[#875D06] dark:text-reggae-gold font-bold">Formato</span>
              <span className="text-base sm:text-lg font-bold text-stone-900 dark:text-reggae-ivory">Banda Híbrida</span>
              <span className="block text-[11px] text-stone-600 dark:text-reggae-ivory/60 truncate">MC & Frontman</span>
            </div>

            <div className="p-3 bg-white dark:bg-stage-900/60 rounded-xl border border-stone-200 dark:border-stage-800 shadow-sm">
              <span className="block text-[10px] font-mono uppercase text-[#875D06] dark:text-reggae-gold font-bold">Producción</span>
              <span className="text-base sm:text-lg font-bold text-stone-900 dark:text-reggae-ivory">Soul Talent</span>
              <span className="block text-[11px] text-stone-600 dark:text-reggae-ivory/60 truncate">Riviera Maya</span>
            </div>
          </div>

          {/* Scroll Down Hint */}
          <a
            href="#manifiesto"
            className="mt-10 text-reggae-ivory/50 hover:text-reggae-gold flex flex-col items-center gap-1 text-xs font-mono transition-colors"
            aria-label="Desplazarse a la historia y propuesta de la banda"
          >
            <span>DESCUBRIR PROPUESTA</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 1.5 SECCIÓN SELVÁTICA — Atmósfera Riviera Maya               */}
      {/* ============================================================== */}
      <section
        aria-label="Atmósfera selvática de la Riviera Maya"
        className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden"
      >
        {/* Fondo: background.jpeg — selva nocturna mística */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.jpeg"
            alt="Selva tropical nocturna de la Riviera Maya"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={false}
          />
          {/* Capas de overlay cinematográficas */}
          <div className="absolute inset-0 bg-[#080A07]/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080A07] via-transparent to-[#080A07]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080A07]/40 via-transparent to-[#080A07]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,36,25,0.3)_0%,transparent_70%)]" />
        </div>

        {/* Contenido editorial */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center gap-8">
          {/* Eyebrow */}
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#DAB44A] border border-[#DAB44A]/30 px-4 py-1.5 rounded-full bg-[#080A07]/50 backdrop-blur-sm">
            Riviera Maya · México · Roots Culture
          </span>

          {/* Cita monumental */}
          <blockquote className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#F1EADD] leading-[1.1] tracking-tight">
            <span className="text-[#DAB44A]">«</span>
            La música es el puente,
            <br className="hidden sm:block" />{" "}
            la meta siempre será
            <br className="hidden sm:block" />{" "}
            <span className="text-[#C96832]">el mensaje.</span>
            <span className="text-[#DAB44A]">»</span>
          </blockquote>

          {/* Atribución con barra Rasta tricolor */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 w-16 h-1 rounded-full overflow-hidden" aria-hidden="true">
              <div className="flex-1 h-full bg-[#1a8c38]" />
              <div className="flex-1 h-full bg-[#f5c518]" />
              <div className="flex-1 h-full bg-[#d62828]" />
            </div>
            <p className="text-sm font-mono text-[#DAB44A]/90 tracking-widest uppercase">
              David Chango — Mr. Chango Reggae Mexicano
            </p>
          </div>

          {/* Sub-descripción */}
          <p className="text-base sm:text-lg text-[#F1EADD]/70 max-w-xl leading-relaxed font-light">
            Desde la selva caribeña de Quintana Roo, una propuesta que une la raíz
            del reggae con la realidad de México.
          </p>

          {/* CTA */}
          <a
            href="#manifiesto"
            className="mt-2 inline-flex items-center gap-2 text-[#DAB44A] hover:text-[#F1EADD] font-mono text-xs uppercase tracking-widest transition-colors group"
            aria-label="Ver la historia y filosofía del proyecto"
          >
            <span>Conoce el proyecto</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Grain overlay decorativo */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px",
          }}
        />
      </section>

      {/* ============================================================== */}
      {/* 2. MANIFIESTO, IDENTIDAD Y FILOSOFÍA ARTÍSTICA                */}
      {/* ============================================================== */}
      <section

        id="manifiesto"
        aria-label="Filosofía, valores y trayectoria de Mr. Chango"
        className="py-24 px-4 sm:px-6 lg:px-8 border-t border-reggae-green-deep/60 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Column: Playa del Carmen portrait with authentic lighting */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-reggae-gold/30 shadow-2xl group">
                <Image
                  src="/playadelcarmen.jpeg"
                  alt="David Chango en Playa del Carmen con iluminación escénica"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 keep-white-on-media">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#DAB44A] block font-bold">
                    Sede y Origen
                  </span>
                  <p className="text-xl font-display font-bold text-white">
                    Playa del Carmen, Quintana Roo
                  </p>
                  <p className="text-xs text-white/80 mt-1">
                    Cuna del proyecto y resonancia de ritmos caribeños en México.
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial Column: Manifesto, Mission, Vision & Values */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#875D06] dark:text-reggae-gold font-bold">
                  Sobre Mr. Chango
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-stone-900 dark:text-reggae-ivory mt-1">
                  Música que Sirve a la Gente
                </h2>
              </div>

              {/* Principle Badge */}
              <blockquote className="p-4 sm:p-5 rounded-xl bg-white dark:bg-stage-900 border-l-4 border-reggae-gold text-stone-800 dark:text-reggae-ivory text-base sm:text-lg font-light italic leading-relaxed shadow-sm">
                «{CHANGO_DATA.identity.artisticPrinciple}»
              </blockquote>

              <p className="text-sm sm:text-base text-stone-700 dark:text-reggae-ivory/80 leading-relaxed">
                {CHANGO_DATA.identity.manifesto}
              </p>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-reggae-ivory/70 leading-relaxed">
                {CHANGO_DATA.identity.liveApproach}
              </p>

              {/* Triad: Mission, Vision, Values */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-200 dark:border-stage-800">
                <div className="p-4 rounded-xl bg-white dark:bg-stage-900/80 border border-stone-200 dark:border-stage-800 shadow-sm">
                  <span className="text-xs font-mono font-bold uppercase text-[#875D06] dark:text-reggae-gold block mb-1">
                    Misión
                  </span>
                  <p className="text-xs text-stone-700 dark:text-reggae-ivory/80 leading-relaxed">
                    {CHANGO_DATA.identity.mission}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-stage-900/80 border border-stone-200 dark:border-stage-800 shadow-sm">
                  <span className="text-xs font-mono font-bold uppercase text-[#B84E18] dark:text-reggae-orange block mb-1">
                    Visión
                  </span>
                  <p className="text-xs text-stone-700 dark:text-reggae-ivory/80 leading-relaxed">
                    {CHANGO_DATA.identity.vision}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-stage-900/80 border border-stone-200 dark:border-stage-800 shadow-sm">
                  <span className="text-xs font-mono font-bold uppercase text-green-700 dark:text-green-400 block mb-1">
                    Valores
                  </span>
                  <p className="text-xs text-stone-700 dark:text-reggae-ivory/80 leading-relaxed">
                    {CHANGO_DATA.identity.values}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. LA BANDA: INTEGRANTES Y ROLES VERIFICADOS                   */}
      {/* ============================================================== */}
      <section
        id="banda"
        aria-label="Integrantes y equipo de Mr. Chango"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-stage-900/40 border-t border-reggae-green-deep/60 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-reggae-gold font-bold">
              Músicos al Servicio del Reggae Mexicano
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-reggae-ivory mt-2">
              La Banda & Equipo Técnico
            </h2>
            <div className="flex items-center justify-center gap-1.5 w-20 h-1 mx-auto my-3 rounded-full overflow-hidden" aria-hidden="true">
              <div className="flex-1 h-full bg-[#1a8c38]" />
              <div className="flex-1 h-full bg-[#f5c518]" />
              <div className="flex-1 h-full bg-[#d62828]" />
            </div>
            <p className="text-xs sm:text-sm text-reggae-ivory/70 mt-2 leading-relaxed">
              Integrantes y colaboradores documentados en el dossier oficial, con sus trayectorias y papeles escénicos confirmados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHANGO_DATA.members.map((member) => (
              <article
                key={member.id}
                className="flex flex-col bg-white dark:bg-stage-900 border border-stone-200 dark:border-stage-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-[#DAB44A] dark:hover:border-reggae-gold/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Member Portrait */}
                <div className="relative aspect-[4/3] bg-stone-900 dark:bg-stage-950 overflow-hidden">
                  <Image
                    src={member.photoUrl}
                    alt={`Retrato de ${member.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-stage-900 via-transparent to-transparent opacity-80 dark:opacity-100" />
                  <span className="absolute top-3 right-3 text-[10px] font-mono bg-black/75 dark:bg-stage-950/80 border border-reggae-gold/40 text-[#DAB44A] px-2 py-0.5 rounded-full shadow-md font-semibold">
                    {member.isArtisticCore ? "Escenario" : "Producción"}
                  </span>
                </div>

                {/* Member Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#875D06] dark:text-reggae-gold block font-bold">
                      {member.verifiedTitle}
                    </span>
                    <h3 className="text-xl font-display font-bold text-stone-900 dark:text-reggae-ivory mt-0.5">
                      {member.name}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-reggae-ivory/60 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs text-stone-700 dark:text-reggae-ivory/75 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="mt-5 pt-4 border-t border-stone-200 dark:border-stage-800">
                    <ul className="space-y-1.5 text-[11px] text-stone-600 dark:text-reggae-ivory/70 font-mono">
                      {member.highlights.slice(0, 2).map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#875D06] dark:text-reggae-gold shrink-0 font-bold">▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 p-4 rounded-xl bg-stone-50 dark:bg-stage-950 border border-stone-200 dark:border-stage-800 text-center text-xs text-stone-600 dark:text-reggae-ivory/60 font-mono">
            ** Nota oficial de producción: Los músicos ejecutores y los invitados secundarios pueden variar según disponibilidad técnica y aforo de cada plaza.
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. MÚSICA & REPERTORIO CONFIRMADO                             */}
      {/* ============================================================== */}
      <section
        id="musica"
        aria-label="Catálogo musical y lanzamientos confirmados"
        className="py-24 px-4 sm:px-6 lg:px-8 border-t border-reggae-green-deep/60 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-reggae-gold font-bold">
                Discografía & Directos Oficiales
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-reggae-ivory mt-2">
                Experiencia Musical
              </h2>
              <div className="flex items-center gap-1.5 w-16 h-1 my-2.5 rounded-full overflow-hidden" aria-hidden="true">
                <div className="flex-1 h-full bg-[#1a8c38]" />
                <div className="flex-1 h-full bg-[#f5c518]" />
                <div className="flex-1 h-full bg-[#d62828]" />
              </div>
              <p className="text-xs sm:text-sm text-reggae-ivory/70 mt-1 max-w-xl">
                Lanzamientos originales confirmados y clásicos que forman parte del repertorio en vivo en festivales.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={CHANGO_DATA.socials.find((s) => s.name === "Spotify")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md transition-all"
              >
                <Disc3 className="w-4 h-4" />
                <span>Abrir en Spotify</span>
              </a>

              <a
                href={CHANGO_DATA.socials.find((s) => s.name === "YouTube")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Canal de YouTube</span>
              </a>
            </div>
          </div>

          {/* Music Releases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHANGO_DATA.musicReleases.map((release) => (
              <article
                key={release.id}
                className="bg-white dark:bg-stage-900 border border-stone-200 dark:border-stage-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-[#DAB44A] dark:hover:border-reggae-gold/40 transition-all duration-300 flex flex-col group"
              >
                {/* Artwork */}
                <div className="relative aspect-square bg-stone-900 dark:bg-stage-950 overflow-hidden">
                  <Image
                    src={release.coverUrl}
                    alt={`Portada oficial de ${release.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-3.5 rounded-full bg-reggae-gold text-stage-950 shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 text-[10px] font-mono bg-black/75 dark:bg-stage-950/80 text-[#DAB44A] border border-reggae-gold/30 px-2 py-0.5 rounded-full shadow-md font-semibold">
                    {release.type}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-display font-bold text-stone-900 dark:text-reggae-ivory group-hover:text-[#875D06] dark:group-hover:text-reggae-gold transition-colors">
                      {release.title}
                    </h3>
                    <span className="text-[11px] font-mono text-[#875D06] dark:text-reggae-gold/90 font-medium block mt-0.5">
                      {release.confirmedOrigin}
                    </span>
                    <p className="text-xs text-stone-600 dark:text-reggae-ivory/70 mt-2.5 leading-relaxed">
                      {release.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-200 dark:border-stage-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-500 dark:text-reggae-ivory/50 font-medium">{release.year}</span>
                    <div className="flex items-center gap-2">
                      {release.spotifyUrl && (
                        <a
                          href={release.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                          title="Reproducir en Spotify"
                          aria-label={`Reproducir ${release.title} en Spotify`}
                        >
                          <Disc3 className="w-4 h-4" />
                        </a>
                      )}
                      {release.youtubeUrl && (
                        <a
                          href={release.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          title="Ver en YouTube"
                          aria-label={`Ver ${release.title} en YouTube`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-stone-50 dark:bg-stage-900/60 border border-stone-200 dark:border-stage-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600 dark:text-reggae-ivory/70">
            <p>
              * Canciones interpretadas con autorización artística de sus integrantes originales. No se replican letras completas protegidas.
            </p>
            <a
              href={CHANGO_DATA.socials.find((s) => s.name === "SoundCloud")?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#875D06] dark:text-reggae-gold hover:underline font-mono font-bold shrink-0"
            >
              Explorar catálogo en SoundCloud →
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. EL SHOW EN VIVO: 5 ACTOS & FORMATOS                         */}
      {/* ============================================================== */}
      <section
        id="envivo"
        aria-label="Estructura del espectáculo en vivo y formatos de gira"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-stage-900/30 border-t border-reggae-green-deep/60 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-reggae-gold font-bold">
              Narrativa Escénica de 45 a 60 Minutos
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-reggae-ivory mt-2">
              El Espectáculo en Vivo
            </h2>
            <p className="text-xs sm:text-sm text-reggae-ivory/70 mt-3 leading-relaxed">
              El concierto de Mr. Chango se concibe como una experiencia con introducción, desarrollo narrativo, intermedio, clímax y desenlace, creando una comunión total con el espectador.
            </p>
          </div>

          {/* 5 Narrative Stages */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
            {CHANGO_DATA.showFormat.narrativeStages.map((stage, idx) => (
              <div
                key={stage.act}
                className="bg-white dark:bg-stage-900 border border-stone-200 dark:border-stage-800 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden shadow-sm"
              >
                <div className="absolute top-2 right-2 text-3xl font-display font-bold text-stone-200 dark:text-stage-800/80 select-none">
                  0{idx + 1}
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#875D06] dark:text-reggae-gold font-bold">
                    {stage.act}
                  </span>
                  <h3 className="text-lg font-display font-bold text-stone-900 dark:text-reggae-ivory mt-1">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-reggae-ivory/70 mt-2 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Live Video Teaser Showcase */}
          <div className="mb-16 bg-white dark:bg-stage-900 border border-stone-200 dark:border-reggae-green-deep/80 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-stone-200 dark:border-stage-700 shadow-xl bg-stone-950 group">
                  <Image
                    src="/video_thumbs/bandatocando3_poster.jpg"
                    alt="Registro en vivo de concierto en festival"
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => openVideoLightbox(CHANGO_DATA.videos[0])}
                      className="p-5 rounded-full bg-gradient-to-r from-reggae-gold to-reggae-orange text-stage-950 shadow-2xl hover:scale-110 active:scale-95 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-reggae-gold"
                      aria-label="Ver video en vivo de concierto en festival"
                    >
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </button>
                  </div>
                  <span className="absolute bottom-3 right-3 text-xs font-mono bg-black/80 text-white px-2.5 py-1 rounded-md font-semibold">
                    1:20 min • Festival Masivo
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#875D06] dark:text-reggae-gold font-bold">
                  Energía Comprobada en Tarima
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 dark:text-reggae-ivory">
                  Conexión Eléctrica con el Público
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-reggae-ivory/80 leading-relaxed">
                  Pantalla LED gigante con visuales sincronizados, interacción continua con el público, dinámicas en vivo y la fusión vibrante entre New Roots, Dancehall y Rap Mexicano.
                </p>
                <div className="flex flex-col gap-2 pt-2 text-xs font-mono text-stone-700 dark:text-reggae-ivory/70">
                  <div className="flex items-center gap-2">
                    <span className="text-[#875D06] dark:text-reggae-gold font-bold">✔</span>
                    <span>Repertorio propio + clásicos de Ganja y Bob Marley</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#875D06] dark:text-reggae-gold font-bold">✔</span>
                    <span>Duración estándar: 45 a 60 minutos continuos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#875D06] dark:text-reggae-gold font-bold">✔</span>
                    <span>Adaptabilidad a foros cerrados, masivos o palapas acústicas</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-reggae-gold to-reggae-orange hover:from-reggae-gold-light hover:to-reggae-orange-warm text-stage-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all"
                  >
                    <span>Cotizar este Show</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Formats Grid: Banda Híbrida vs MC Frontman */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CHANGO_DATA.showFormat.formats.map((fmt, i) => (
              <div
                key={fmt.name}
                className="bg-white dark:bg-stage-900 border border-stone-200 dark:border-stage-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md"
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#875D06] dark:text-reggae-gold font-bold">
                    {fmt.badge}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-stone-900 dark:text-reggae-ivory mt-1">
                    {fmt.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-reggae-ivory/80 mt-3 leading-relaxed">
                    {fmt.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stage-800 text-xs font-mono text-stone-600 dark:text-reggae-ivory/60">
                  <strong className="text-stone-900 dark:text-reggae-ivory/90 font-bold block mb-1">
                    Requerimiento Técnico:
                  </strong>
                  <span>{fmt.requirements}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. GALERÍA VISUAL & VIDEOS EN DIRECTO                          */}
      {/* ============================================================== */}
      <section
        id="galeria"
        aria-label="Galería visual fotográfica y videoclips de Mr. Chango"
        className="py-24 px-4 sm:px-6 lg:px-8 border-t border-reggae-green-deep/60 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#875D06] dark:text-reggae-gold font-bold">
                Archivo Audiovisual Verificado
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-stone-900 dark:text-reggae-ivory mt-2">
                Galería de Conciertos & Sesiones
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {["Todos", "Conciertos", "En Vivo", "Sesiones", "Integrantes"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setGalleryCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                    galleryCategory === cat
                      ? "bg-gradient-to-r from-reggae-gold to-reggae-orange text-stage-950 font-bold shadow-md"
                      : "bg-white dark:bg-stage-900 text-stone-700 dark:text-reggae-ivory/70 hover:text-stone-900 dark:hover:text-reggae-ivory hover:bg-stone-50 dark:hover:bg-stage-850 border border-stone-200 dark:border-stage-800 shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Asymmetric Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => openImageLightbox(item)}
                onKeyDown={(e) => e.key === "Enter" && openImageLightbox(item)}
                tabIndex={0}
                role="button"
                aria-label={`Ver imagen: ${item.title}`}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 dark:bg-stage-900 border border-stone-200 dark:border-stage-800 hover:border-[#DAB44A] dark:hover:border-reggae-gold/50 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-reggae-gold"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end keep-white-on-media">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#DAB44A] font-bold">
                    {item.category}
                  </span>
                  <h4 className="font-display font-bold text-lg text-white mt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/80 line-clamp-2 mt-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="mt-16 pt-12 border-t border-stone-200 dark:border-stage-800">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 dark:text-reggae-ivory mb-6 flex items-center gap-2">
              <Video className="w-5 h-5 text-[#875D06] dark:text-reggae-gold" />
              <span>Registros en Video del Show</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CHANGO_DATA.videos.slice(1).map((video) => (
                <div
                  key={video.id}
                  onClick={() => openVideoLightbox(video)}
                  onKeyDown={(e) => e.key === "Enter" && openVideoLightbox(video)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Reproducir video: ${video.title}`}
                  className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-stone-950 border border-stone-200 dark:border-stage-800 hover:border-[#DAB44A] dark:hover:border-reggae-gold/50 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-reggae-gold"
                >
                  <Image
                    src={video.posterUrl}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="p-4 rounded-full bg-gradient-to-r from-reggae-gold to-reggae-orange text-stage-950 shadow-2xl scale-90 group-hover:scale-105 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/75 to-transparent keep-white-on-media">
                    <span className="text-[10px] font-mono uppercase text-[#DAB44A] font-bold">
                      {video.context} • {video.duration}
                    </span>
                    <h5 className="font-display font-bold text-sm text-white mt-0.5 leading-snug">
                      {video.title}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. RIDER TÉCNICO & STAGE PLOT                                 */}
      {/* ============================================================== */}
      <section
        id="rider"
        aria-label="Rider técnico y distribución de escenario"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-stage-900/30 border-t border-reggae-green-deep/60 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-reggae-gold font-bold">
              Especificaciones de Producción
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-reggae-ivory mt-2">
              Rider Técnico & Stage Plot
            </h2>
            <p className="text-xs sm:text-sm text-reggae-ivory/70 mt-3 leading-relaxed">
              Diseño de tarima, parcheo de canales Midas de 32 canales y monitoreo acústico para promotores, teatros y festivales.
            </p>
          </div>

          <StagePlotViewer />
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. CONTRATACIÓN PROFESIONAL & CONTACTO                         */}
      {/* ============================================================== */}
      <section
        id="contacto"
        aria-label="Contratación profesional de Mr. Chango"
        className="py-24 px-4 sm:px-6 lg:px-8 border-t border-reggae-green-deep/60 relative"
      >
        <div className="max-w-7xl mx-auto">
          <BookingForm />
        </div>
      </section>

      {/* Lightbox Modal for Gallery & Videos */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        item={lightboxItem}
        type={lightboxType}
      />
    </div>
  );
}
