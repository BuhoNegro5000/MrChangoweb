"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CHANGO_DATA } from "@/data/chango-data";
import {
  Sliders,
  Layers,
  Volume2,
  FileDown,
  Info,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export const StagePlotViewer = () => {
  const [activeTab, setActiveTab] = useState<"stageplot" | "inputlist" | "rental">("stageplot");
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const { technicalRider } = CHANGO_DATA;

  return (
    <div className="bg-white dark:bg-stage-900 border border-stone-200 dark:border-reggae-green-deep/90 rounded-2xl overflow-hidden shadow-2xl">
      {/* Navigation Tabs */}
      <div className="flex border-b border-stone-200 dark:border-stage-800 bg-stone-100 dark:bg-stage-950/70 p-2 sm:p-3 gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("stageplot")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shrink-0 ${
            activeTab === "stageplot"
              ? "bg-gradient-to-r from-reggae-gold to-reggae-orange text-stage-950 shadow-md"
              : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/70 dark:text-reggae-ivory/70 dark:hover:text-reggae-ivory dark:hover:bg-stage-850"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Stage Plot Oficial (10 Puntos)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("inputlist")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shrink-0 ${
            activeTab === "inputlist"
              ? "bg-gradient-to-r from-reggae-gold to-reggae-orange text-stage-950 shadow-md"
              : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/70 dark:text-reggae-ivory/70 dark:hover:text-reggae-ivory dark:hover:bg-stage-850"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Input List & Canales Midas</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("rental")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shrink-0 ${
            activeTab === "rental"
              ? "bg-gradient-to-r from-reggae-gold to-reggae-orange text-stage-950 shadow-md"
              : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/70 dark:text-reggae-ivory/70 dark:hover:text-reggae-ivory dark:hover:bg-stage-850"
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>Renta de Audio & Producción</span>
        </button>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {/* TAB 1: STAGE PLOT */}
        {activeTab === "stageplot" && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stage-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#875D06] dark:text-reggae-gold font-bold">
                  Ficha Técnica de Escenario
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 dark:text-reggae-ivory">
                  Distribución Escénica y Puntos Técnicos
                </h3>
                <p className="text-sm text-stone-600 dark:text-reggae-ivory/70 mt-1">
                  {technicalRider.stageDimensions} • Formato Banda Híbrida
                </p>
              </div>

              <a
                href="/Proyecto Mr. Chango.pdf"
                download="Proyecto Mr. Chango.pdf"
                className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-[#875D06] border border-[#DAB44A]/50 dark:bg-stage-800 dark:hover:bg-stage-700 dark:text-reggae-gold dark:border-reggae-gold/30 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider w-fit shadow-sm transition-all"
              >
                <FileDown className="w-4 h-4" />
                <span>Descargar Rider en PDF</span>
              </a>
            </div>

            {/* Stage Plot Diagram Image */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-stone-200 dark:border-stage-700 shadow-xl bg-stone-950">
              <Image
                src={technicalRider.stagePlotImage}
                alt="Diagrama oficial de Stage Plot con las 10 posiciones técnicas y pantalla LED"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
                priority
              />
            </div>

            {/* Interactive Stage Points Grid */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#875D06] dark:text-reggae-gold font-bold mb-4">
                Índice de Elementos en Tarima (1 al 10)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {technicalRider.stagePoints.map((pt) => (
                  <button
                    key={pt.num}
                    type="button"
                    onClick={() => setActivePoint(activePoint === pt.num ? null : pt.num)}
                    className={`text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                      activePoint === pt.num
                        ? "bg-amber-50/90 dark:bg-reggae-gold/15 border-[#DAB44A] dark:border-reggae-gold shadow-md ring-2 ring-[#DAB44A]/40"
                        : "bg-stone-50 dark:bg-stage-850/60 border-stone-200 dark:border-stage-800 hover:border-[#DAB44A]/50 dark:hover:border-stage-700 hover:bg-white dark:hover:bg-stage-800 shadow-sm"
                    }`}
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-reggae-gold to-reggae-orange text-stage-950 font-display font-bold text-sm shrink-0">
                      {pt.num}
                    </span>
                    <div>
                      <span className="font-bold text-sm text-stone-900 dark:text-reggae-ivory block">
                        {pt.label}
                      </span>
                      <span className="text-xs text-stone-600 dark:text-reggae-ivory/70 mt-0.5 block leading-relaxed">
                        {pt.detail}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Transparent Note on Discrepancies */}
            <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-stage-850/80 border border-amber-200 dark:border-reggae-gold/20 flex items-start gap-3 text-xs text-stone-700 dark:text-reggae-ivory/80">
              <Info className="w-5 h-5 text-[#875D06] dark:text-reggae-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#875D06] dark:text-reggae-gold font-bold">Verificación con Producción:</strong>{" "}
                {technicalRider.ledScreenNotice}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INPUT LIST */}
        {activeTab === "inputlist" && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stage-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#875D06] dark:text-reggae-gold font-bold">
                  Parcheo y Ruteo de Señal
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 dark:text-reggae-ivory">
                  {technicalRider.consoleModel} & Salidas
                </h3>
              </div>
              <div className="text-xs text-[#875D06] dark:text-reggae-gold font-mono font-bold bg-stone-100 dark:bg-stage-950 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stage-800 w-fit">
                Snake Medusa de 16 canales
              </div>
            </div>

            {/* Channel Output Table */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#875D06] dark:text-reggae-gold font-bold mb-3">
                Canales de Salida (Escenario → PA / Consola)
              </h4>
              <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stage-800 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-100 dark:bg-stage-950 text-xs font-mono uppercase text-[#875D06] dark:text-reggae-gold border-b border-stone-200 dark:border-stage-800">
                    <tr>
                      <th className="py-3 px-4">Canal</th>
                      <th className="py-3 px-4">Instrumento / Entrada</th>
                      <th className="py-3 px-4">Dispositivo / Transductor</th>
                      <th className="py-3 px-4">Observaciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stage-800 bg-white dark:bg-stage-850/40 font-mono text-xs sm:text-sm">
                    {technicalRider.outputChannels.map((ch) => (
                      <tr key={ch.ch} className="hover:bg-stone-50 dark:hover:bg-stage-800/50 transition-colors">
                        <td className="py-3 px-4 font-bold text-[#875D06] dark:text-reggae-gold">{ch.ch}</td>
                        <td className="py-3 px-4 font-sans font-medium text-stone-900 dark:text-reggae-ivory">{ch.name}</td>
                        <td className="py-3 px-4 text-stone-700 dark:text-reggae-ivory/80">{ch.device}</td>
                        <td className="py-3 px-4 text-stone-500 dark:text-reggae-ivory/60 font-sans">Línea directa sin efectos añadidos en tarima</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Monitoring Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {technicalRider.monitoring.map((m) => (
                <div key={m.mix} className="p-4 rounded-xl bg-stone-50 dark:bg-stage-950 border border-stone-200 dark:border-stage-800 shadow-sm">
                  <span className="text-[10px] font-mono uppercase text-[#875D06] dark:text-reggae-gold font-bold tracking-widest">
                    Mezcla Aux #{m.mix}
                  </span>
                  <h5 className="font-bold text-sm text-stone-900 dark:text-reggae-ivory mt-1">{m.target}</h5>
                  <p className="text-xs text-stone-600 dark:text-reggae-ivory/60 mt-0.5">{m.type}</p>
                </div>
              ))}
            </div>

            {/* Hardware list */}
            <div className="p-4 sm:p-5 rounded-xl bg-stone-50 dark:bg-stage-950/80 border border-stone-200 dark:border-stage-800 shadow-sm">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#875D06] dark:text-reggae-gold font-bold mb-3">
                Equipamiento Requerido en Rider
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700 dark:text-reggae-ivory/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                  <span>2 Micrófonos inalámbricos Shure BLX28 Beta 58</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                  <span>Amplificador para bajo eléctrico 300 W</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                  <span>3 Racks o mesa para DJ (1.20m Al × 1m L × 60cm An)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                  <span>2 Monitores Behringer F1220 Frontales</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                  <span>Caja directa pasiva Behringer DI400P</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                  <span>2 Máquinas de humo & luces LED verde/amarillo</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: AUDIO RENTAL & PRODUCTION */}
        {activeTab === "rental" && (
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="pb-4 border-b border-stone-200 dark:border-stage-800">
              <span className="text-xs font-mono uppercase tracking-widest text-[#875D06] dark:text-reggae-gold font-bold">
                Logística y Servicios Complementarios
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 dark:text-reggae-ivory">
                Renta de Audio Profesional por Soul Entertainment
              </h3>
            </div>

            <p className="text-sm text-stone-700 dark:text-reggae-ivory/80 leading-relaxed">
              Para festivales, recintos o municipios que no dispongan de la microfonía, monitoreo o consola especificada en este rider, el equipo de producción de <strong>Mr. Chango</strong> y <strong>Soul Entertainment</strong> puede proveer el servicio completo de renta e ingeniería de audio.
            </p>

            <div className="p-4 rounded-xl bg-orange-50/80 dark:bg-stage-850/80 border border-orange-200 dark:border-reggae-orange/30 flex items-start gap-3 text-xs sm:text-sm text-stone-700 dark:text-reggae-ivory/80">
              <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-reggae-orange shrink-0 mt-0.5" />
              <div>
                <strong className="text-orange-700 dark:text-reggae-orange font-bold">Condiciones de Servicio:</strong>{" "}
                {technicalRider.audioRentalOption}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/${CHANGO_DATA.contact.whatsappNormalized}?text=${encodeURIComponent(
                  "Hola, me interesa consultar el servicio de renta de audio y rider técnico para Mr. Chango."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-reggae-gold to-reggae-orange text-stage-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg"
              >
                <span>Consultar Renta de Audio por WhatsApp</span>
              </a>

              <a
                href={`mailto:${CHANGO_DATA.contact.productionEmail}?subject=${encodeURIComponent(
                  "Consulta Rider y Audio Mr. Chango"
                )}`}
                className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 dark:bg-stage-850 dark:hover:bg-stage-800 dark:text-reggae-ivory border border-stone-300 dark:border-stage-700 px-6 py-3 rounded-xl text-xs font-medium transition-colors"
              >
                <span>Contactar Producción vía Email</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
