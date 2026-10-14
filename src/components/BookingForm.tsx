"use client";

import React, { useState } from "react";
import { CHANGO_DATA } from "@/data/chango-data";
import {
  MessageCircle,
  Mail,
  Calendar,
  Send,
  AlertCircle,
  CheckCircle,
  Phone,
} from "lucide-react";

export const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    eventType: "Festival / Masivo",
    format: "Banda Híbrida (Recomendado)",
    eventDate: "",
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedChoice, setSubmittedChoice] = useState<"whatsapp" | "email" | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Por favor ingresa tu nombre o el de la empresa.";
    if (!formData.email.trim() || !formData.email.includes("@"))
      errs.email = "Ingresa un correo electrónico válido.";
    if (!formData.phone.trim())
      errs.phone = "Ingresa un número telefónico o WhatsApp de contacto.";
    if (!formData.location.trim())
      errs.location = "Indica la ciudad, estado o país del evento.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const constructPayloadText = () => {
    return (
      `*SOLICITUD DE CONTRATACIÓN — MR. CHANGO*\n\n` +
      `• *Contacto:* ${formData.name} ${formData.organization ? `(${formData.organization})` : ""}\n` +
      `• *Email:* ${formData.email}\n` +
      `• *Teléfono:* ${formData.phone}\n` +
      `• *Tipo de Evento:* ${formData.eventType}\n` +
      `• *Formato deseado:* ${formData.format}\n` +
      `• *Fecha tentativa:* ${formData.eventDate || "A convenir"}\n` +
      `• *Ubicación / Ciudad:* ${formData.location}\n` +
      (formData.message ? `• *Notas adicionales:* ${formData.message}\n` : "") +
      `\nSolicito información de disponibilidad, costos y logística.`
    );
  };

  const handleSendViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = constructPayloadText();
    const waUrl = `https://wa.me/${CHANGO_DATA.contact.whatsappNormalized}?text=${encodeURIComponent(
      payload
    )}`;
    setSubmittedChoice("whatsapp");
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleSendViaEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = `Contratación Mr. Chango - ${formData.eventType} (${formData.location})`;
    const body = constructPayloadText();
    const mailtoUrl = `mailto:${CHANGO_DATA.contact.productionEmail}?cc=${
      CHANGO_DATA.contact.artisticEmail
    }&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSubmittedChoice("email");
    window.location.href = mailtoUrl;
  };

  return (
    <div className="bg-white dark:bg-stage-900/90 border border-stone-200 dark:border-reggae-green-deep/90 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden ring-1 ring-[#DAB44A]/30 dark:ring-reggae-gold/20">
      {/* Decorative ambient corner */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-reggae-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#875D06] dark:text-reggae-gold font-bold">
            Formulario de Solicitud Profesional
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 dark:text-reggae-ivory mt-1">
            Contrata a Mr. Chango para tu Evento
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-reggae-ivory/70 mt-2 leading-relaxed">
            Completa los detalles de tu evento y conecta directamente con el equipo de producción para recibir cotización, requerimientos técnicos y disponibilidad de fechas.
          </p>
        </div>

        <form className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-reggae-ivory/80 mb-1 font-semibold">
                Nombre del Promotor / Organizador *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Carlos Mendoza"
                className={`w-full bg-[#FAF7F2] dark:bg-stage-950 border rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-reggae-ivory placeholder-stone-500 dark:placeholder-reggae-ivory/40 focus:outline-none focus:ring-2 focus:ring-[#DAB44A] transition-colors ${
                  errors.name ? "border-red-500" : "border-stone-300 dark:border-stage-800 focus:border-[#DAB44A]"
                }`}
              />
              {errors.name && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Organization */}
            <div>
              <label htmlFor="organization" className="block text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-reggae-ivory/80 mb-1 font-semibold">
                Festival, Recinto o Empresa
              </label>
              <input
                id="organization"
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="Ej. Festival Roots Caribe / Bar Club"
                className="w-full bg-[#FAF7F2] dark:bg-stage-950 border border-stone-300 dark:border-stage-800 rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-reggae-ivory placeholder-stone-500 dark:placeholder-reggae-ivory/40 focus:outline-none focus:ring-2 focus:ring-[#DAB44A] focus:border-[#DAB44A] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-reggae-ivory/80 mb-1 font-semibold">
                Correo Electrónico *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="produccion@tuevento.com"
                className={`w-full bg-[#FAF7F2] dark:bg-stage-950 border rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-reggae-ivory placeholder-stone-500 dark:placeholder-reggae-ivory/40 focus:outline-none focus:ring-2 focus:ring-[#DAB44A] transition-colors ${
                  errors.email ? "border-red-500" : "border-stone-300 dark:border-stage-800 focus:border-[#DAB44A]"
                }`}
              />
              {errors.email && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-reggae-ivory/80 mb-1 font-semibold">
                Teléfono / WhatsApp Móvil *
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+52 984 000 0000"
                className={`w-full bg-[#FAF7F2] dark:bg-stage-950 border rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-reggae-ivory placeholder-stone-500 dark:placeholder-reggae-ivory/40 focus:outline-none focus:ring-2 focus:ring-[#DAB44A] transition-colors ${
                  errors.phone ? "border-red-500" : "border-stone-300 dark:border-stage-800 focus:border-[#DAB44A]"
                }`}
              />
              {errors.phone && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Event Type */}
            <div>
              <label htmlFor="eventType" className="block text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-reggae-ivory/80 mb-1 font-semibold">
                Tipo de Evento
              </label>
              <select
                id="eventType"
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full bg-[#FAF7F2] dark:bg-stage-950 border border-stone-300 dark:border-stage-800 rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-reggae-ivory focus:outline-none focus:ring-2 focus:ring-[#DAB44A] focus:border-[#DAB44A] transition-colors"
              >
                <option value="Festival / Masivo" className="bg-white dark:bg-stage-950 text-stone-900 dark:text-reggae-ivory">Festival / Masivo</option>
                <option value="Club / Foro Musical" className="bg-white dark:bg-stage-950 text-stone-900 dark:text-reggae-ivory">Club / Foro Musical</option>
                <option value="Institución Cultural / Municipio" className="bg-white dark:bg-stage-950 text-stone-900 dark:text-reggae-ivory">Institución Cultural / Municipio</option>
                <option value="Evento Privado / Boda / Corporativo" className="bg-white dark:bg-stage-950 text-stone-900 dark:text-reggae-ivory">Evento Privado / Boda / Corporativo</option>
                <option value="Showcase / Otro" className="bg-white dark:bg-stage-950 text-stone-900 dark:text-reggae-ivory">Showcase / Otro</option>
              </select>
            </div>

            {/* Desired Format */}
            <div>
              <label htmlFor="format" className="block text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-reggae-ivory/80 mb-1 font-semibold">
                Formato Deseado
              </label>
              <select
                id="format"
                value={formData.format}
                onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                className="w-full bg-[#FAF7F2] dark:bg-stage-950 border border-stone-300 dark:border-stage-800 rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-reggae-ivory focus:outline-none focus:ring-2 focus:ring-[#DAB44A] focus:border-[#DAB44A] transition-colors"
              >
                <option value="Banda Híbrida (Recomendado)" className="bg-white dark:bg-stage-950 text-stone-900 dark:text-reggae-ivory">Banda Híbrida (45–60 min)</option>
                <option value="MC Frontman & Selector DJ" className="bg-white dark:bg-stage-950 text-stone-900 dark:text-reggae-ivory">MC Frontman & Selector DJ</option>
                <option value="Por Definir con Producción" className="bg-white dark:bg-stage-950 text-stone-900 dark:text-reggae-ivory">Por Definir según aforo y presupuesto</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Event Date */}
            <div>
              <label htmlFor="eventDate" className="block text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-reggae-ivory/80 mb-1 font-semibold">
                Fecha Tentativa del Evento
              </label>
              <input
                id="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full bg-[#FAF7F2] dark:bg-stage-950 border border-stone-300 dark:border-stage-800 rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-reggae-ivory focus:outline-none focus:ring-2 focus:ring-[#DAB44A] focus:border-[#DAB44A] transition-colors"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-reggae-ivory/80 mb-1 font-semibold">
                Ciudad / Ubicación del Recinto *
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ej. Cancún, CDMX, Guadalajara..."
                className={`w-full bg-[#FAF7F2] dark:bg-stage-950 border rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-reggae-ivory placeholder-stone-500 dark:placeholder-reggae-ivory/40 focus:outline-none focus:ring-2 focus:ring-[#DAB44A] transition-colors ${
                  errors.location ? "border-red-500" : "border-stone-300 dark:border-stage-800 focus:border-[#DAB44A]"
                }`}
              />
              {errors.location && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.location}</p>}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-reggae-ivory/80 mb-1 font-semibold">
              Detalles Adicionales del Evento
            </label>
            <textarea
              id="message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Indica el aforo estimado, tipo de escenario, requerimiento de audio o cualquier duda sobre el show..."
              className="w-full bg-[#FAF7F2] dark:bg-stage-950 border border-stone-300 dark:border-stage-800 rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-reggae-ivory placeholder-stone-500 dark:placeholder-reggae-ivory/40 focus:outline-none focus:ring-2 focus:ring-[#DAB44A] focus:border-[#DAB44A] transition-colors"
            />
          </div>

          {/* Action Buttons: WhatsApp and Email */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleSendViaWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:shadow-green-600/30 active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Enviar Solicitud por WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleSendViaEmail}
              className="flex-1 flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 dark:bg-stage-850 dark:hover:bg-stage-800 text-[#875D06] dark:text-reggae-gold border border-[#DAB44A]/50 dark:border-reggae-gold/40 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider active:scale-[0.98] transition-all shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Enviar por Correo Electrónico</span>
            </button>
          </div>

          {/* Notice of Transparency */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-stage-950/80 border border-amber-200/80 dark:border-stage-800 flex items-start gap-2.5 text-[11px] text-stone-700 dark:text-reggae-ivory/60 mt-3 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-[#875D06] dark:text-reggae-gold shrink-0 mt-0.5" />
            <span>
              <strong className="text-stone-900 dark:text-reggae-gold font-bold">Aviso de proceso:</strong> Al hacer clic se abrirá tu aplicación de mensajería o correo con la solicitud pre-llenada hacia Soul Entertainment y la oficina de Mr. Chango. Ninguna fecha queda reservada de manera definitiva hasta la confirmación de disponibilidad, emisión de contrato y depósito de anticipo oficial.
            </span>
          </div>

          {submittedChoice && (
            <div className="p-3 rounded-lg bg-green-950/60 border border-green-600/40 text-green-300 text-xs flex items-center gap-2 mt-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>
                Solicitud preparada con éxito. Si no se abrió la ventana automáticamente, puedes escribir directo a{" "}
                <a href={`https://wa.me/${CHANGO_DATA.contact.whatsappNormalized}`} className="underline font-bold">
                  {CHANGO_DATA.contact.whatsappDisplay}
                </a>
                .
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
