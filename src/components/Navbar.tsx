"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CHANGO_DATA } from "@/data/chango-data";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X, Calendar, Music, Phone, ChevronRight } from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Inicio", href: "#hero" },
    { label: "La Banda", href: "#banda" },
    { label: "Música", href: "#musica" },
    { label: "En Vivo", href: "#envivo" },
    { label: "Galería", href: "#galeria" },
    { label: "Rider Técnico", href: "#rider" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FAF7F2]/95 dark:bg-stage-950/90 backdrop-blur-md border-b border-stone-200 dark:border-reggae-green-deep/60 py-3 shadow-md dark:shadow-2xl"
            : "bg-gradient-to-b from-[#FAF7F2]/90 dark:from-stage-950/90 via-[#FAF7F2]/50 dark:via-stage-950/40 to-transparent py-5"
        }`}
        role="banner"
      >
        {/* Franja sutil y elegante Rasta Tricolor en el borde superior */}
        <div className="absolute top-0 left-0 right-0 h-[2px] flex" aria-hidden="true">
          <div className="flex-1 bg-[#1a8c38]" />
          <div className="flex-1 bg-[#f5c518]" />
          <div className="flex-1 bg-[#d62828]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Tag */}
          <Link
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-reggae-gold rounded-lg p-1"
            aria-label="Mr. Chango - Inicio"
          >
            <div className="relative w-12 h-10 sm:w-14 sm:h-11 overflow-hidden rounded bg-stage-950/80 border border-reggae-gold/20 p-0.5 transition-transform group-hover:scale-105">
              <Image
                src="/logonegro.jpeg"
                alt="Logotipo oficial Mr. Chango"
                fill
                sizes="56px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display tracking-widest text-lg sm:text-xl font-bold text-stone-900 dark:text-reggae-ivory group-hover:text-[#875D06] dark:group-hover:text-reggae-gold transition-colors leading-none">
                MR. CHANGO
              </span>
              <span className="text-[10px] sm:text-xs text-[#875D06] dark:text-reggae-gold tracking-widest uppercase font-mono mt-0.5">
                Reggae Mexicano
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm text-stone-700 dark:text-reggae-ivory/80 hover:text-[#875D06] dark:hover:text-reggae-gold hover:bg-stone-100 dark:hover:bg-stage-800/40 rounded-md font-medium tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-reggae-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle />

            <div className="hidden sm:flex items-center">
              <a
                href={`https://wa.me/${CHANGO_DATA.contact.whatsappNormalized}?text=${encodeURIComponent(
                  CHANGO_DATA.contact.whatsappDefaultMsg
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-reggae-gold to-reggae-orange text-stage-950 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-reggae-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-reggae-gold"
              >
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Contratar</span>
              </a>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 dark:text-reggae-ivory hover:text-[#875D06] dark:hover:text-reggae-gold hover:bg-stone-100 dark:hover:bg-stage-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-reggae-gold"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-40 bg-[#FAF7F2]/97 dark:bg-stage-950/95 backdrop-blur-xl lg:hidden pt-24 px-6 pb-10 flex flex-col justify-between overflow-y-auto animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Menú móvil"
        >
          <div className="flex flex-col gap-2">
            <div className="pb-4 mb-2 border-b border-stone-200 dark:border-stage-800">
              <p className="text-xs uppercase tracking-widest text-[#875D06] dark:text-reggae-gold font-mono">
                {CHANGO_DATA.identity.subheading}
              </p>
              <h2 className="text-2xl font-display font-bold text-stone-900 dark:text-reggae-ivory mt-1">
                {CHANGO_DATA.identity.headline}
              </h2>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 text-lg font-medium text-stone-700 dark:text-reggae-ivory/90 hover:text-[#875D06] dark:hover:text-reggae-gold border-b border-stone-200 dark:border-stage-800/60 transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-5 h-5 text-[#875D06]/60 dark:text-reggae-gold/60" />
              </a>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stage-800 flex flex-col gap-3">
            <a
              href={`https://wa.me/${CHANGO_DATA.contact.whatsappNormalized}?text=${encodeURIComponent(
                CHANGO_DATA.contact.whatsappDefaultMsg
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-reggae-gold to-reggae-orange text-stage-950 py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm shadow-xl"
            >
              <Calendar className="w-4 h-4" />
              <span>Contratar a Mr. Chango</span>
            </a>
            <a
              href={`tel:${CHANGO_DATA.contact.phoneTel}`}
              className="w-full flex items-center justify-center gap-2 bg-stone-100 dark:bg-stage-850 hover:bg-stone-200 dark:hover:bg-stage-800 text-stone-800 dark:text-reggae-ivory border border-stone-300 dark:border-stage-700 py-3 rounded-xl font-medium text-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-[#875D06] dark:text-reggae-gold" />
              <span>Llamar al {CHANGO_DATA.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
