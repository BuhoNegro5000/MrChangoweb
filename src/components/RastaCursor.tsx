"use client";

import { useEffect, useState, useRef } from "react";

/**
 * RastaCursor — Cursor oficial de Mr. Chango con Bandera Rasta Ondeante.
 *
 * Características:
 *  - El punto de clic exacto (0,0) es la punta dorada del asta.
 *  - Bandera Rasta vibrante (Verde, Amarillo, Rojo) ondeando continuamente en el viento.
 *  - Animación fluida de tela con ondas y sombras orgánicas.
 *  - Rastro suave y respuesta instantánea al ratón.
 *  - Compatible con todas las pantallas de escritorio.
 */
export const RastaCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const prevX = useRef(0);
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      // Inclinación dinámica de la bandera según la velocidad horizontal
      const dx = e.clientX - prevX.current;
      prevX.current = e.clientX;
      const targetTilt = Math.max(-12, Math.min(12, dx * 0.8));
      setTilt(targetTilt);

      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest("button, a, input, select, textarea, [role='button'], .cursor-pointer, .cursor-grab")
        );
        setIsHovered(isClickable);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[999999] select-none will-change-transform"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div
        className="relative transition-transform duration-100 ease-out"
        style={{
          transform: `scale(${isClicking ? 0.9 : isHovered ? 1.15 : 1}) rotate(${tilt}deg)`,
          transformOrigin: "3px 3px",
        }}
      >
        {/* SVG Bandera Rasta con Asta Dorada y Ondulación de Tela */}
        <svg
          width="48"
          height="38"
          viewBox="0 0 48 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_3px_8px_rgba(0,0,0,0.85)] filter"
        >
          <defs>
            {/* Degradados metálicos dorados para el asta */}
            <linearGradient id="poleGold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFF3D0" />
              <stop offset="40%" stopColor="#DAB44A" />
              <stop offset="100%" stopColor="#8C6D1F" />
            </linearGradient>

            <radialGradient id="finialOrb" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F5C518" />
              <stop offset="100%" stopColor="#8C6D1F" />
            </radialGradient>

            {/* Degradados de tela Rasta con brillo de pliegue */}
            <linearGradient id="rastaGreen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0E5A26" />
              <stop offset="25%" stopColor="#1A8C38" />
              <stop offset="50%" stopColor="#146E2E" />
              <stop offset="75%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#125825" />
            </linearGradient>

            <linearGradient id="rastaYellow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D9A108" />
              <stop offset="25%" stopColor="#FACC15" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="75%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>

            <linearGradient id="rastaRed" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#991B1B" />
              <stop offset="25%" stopColor="#DC2626" />
              <stop offset="50%" stopColor="#B91C1C" />
              <stop offset="75%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>
          </defs>

          {/* ── ASTA DE LA BANDERA (PUNTO (3,3) ES LA PUNTA DEL RATÓN) ── */}
          <line
            x1="3"
            y1="3"
            x2="3"
            y2="36"
            stroke="url(#poleGold)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Remate esférico dorado (Esfera de precisión en la punta del cursor) */}
          <circle
            cx="3"
            cy="3"
            r="3"
            fill="url(#finialOrb)"
            stroke="#080A07"
            strokeWidth="0.8"
          />

          {/* ── TELA ONDEANTE DE LA BANDERA RASTA ── */}
          {/* Grupo animado con ondulación continua de viento */}
          <g className="animate-flag-wave origin-left">
            {/* Franja 1: VERDE */}
            <path
              d="M4.5 4 C 14 2, 22 7, 32 4 C 38 2.2, 43 4.5, 45 3.5 L 45 11 C 43 12, 38 9.7, 32 11.5 C 22 14.5, 14 9.5, 4.5 11.5 Z"
              fill="url(#rastaGreen)"
              stroke="#080A07"
              strokeWidth="0.6"
            />

            {/* Franja 2: AMARILLO */}
            <path
              d="M4.5 11.5 C 14 9.5, 22 14.5, 32 11.5 C 38 9.7, 43 12, 45 11 L 45 18.5 C 43 19.5, 38 17.2, 32 19 C 22 22, 14 17, 4.5 19 Z"
              fill="url(#rastaYellow)"
              stroke="#080A07"
              strokeWidth="0.6"
            />

            {/* Franja 3: ROJO */}
            <path
              d="M4.5 19 C 14 17, 22 22, 32 19 C 38 17.2, 43 19.5, 45 18.5 L 45 26 C 43 27, 38 24.7, 32 26.5 C 22 29.5, 14 24.5, 4.5 26.5 Z"
              fill="url(#rastaRed)"
              stroke="#080A07"
              strokeWidth="0.6"
            />

            {/* Sombra y pliegue de viento sobre la tela */}
            <path
              d="M4.5 4 C 14 2, 22 7, 32 4 C 38 2.2, 43 4.5, 45 3.5 L 45 26 C 43 27, 38 24.7, 32 26.5 C 22 29.5, 14 24.5, 4.5 26.5 Z"
              fill="url(#rastaGreen)"
              opacity="0"
            />
          </g>
        </svg>

        {/* Halo luminoso al pasar sobre elementos interactivos */}
        {isHovered && (
          <div
            className="absolute -top-1 -left-1 w-5 h-5 rounded-full border border-[#DAB44A] bg-[#DAB44A]/25 animate-ping pointer-events-none"
            style={{ animationDuration: "1s" }}
          />
        )}
      </div>
    </div>
  );
};
