"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { GalleryItem, LiveVideo } from "@/data/chango-data";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  item: GalleryItem | LiveVideo | null;
  type: "image" | "video";
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export const LightboxModal: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  item,
  type,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext && hasNext) onNext();
      if (e.key === "ArrowLeft" && onPrev && hasPrev) onPrev();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!isOpen || !item) return null;

  const isVideo = type === "video";
  const videoItem = isVideo ? (item as LiveVideo) : null;
  const galleryItem = !isVideo ? (item as GalleryItem) : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isVideo ? videoItem?.title : galleryItem?.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-stage-950/95 backdrop-blur-2xl p-4 sm:p-6"
    >
      {/* Close Button */}
      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-stage-900/90 text-reggae-ivory hover:text-reggae-gold hover:bg-stage-850 border border-stage-700/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-reggae-gold"
        aria-label="Cerrar visor"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation */}
      {hasPrev && onPrev && (
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-3 sm:left-6 z-50 p-3 rounded-full bg-stage-900/80 text-reggae-ivory hover:text-reggae-gold hover:bg-stage-850 border border-stage-700 transition-all hidden sm:flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-reggae-gold"
          aria-label="Elemento anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Navigation */}
      {hasNext && onNext && (
        <button
          type="button"
          onClick={onNext}
          className="absolute right-3 sm:right-6 z-50 p-3 rounded-full bg-stage-900/80 text-reggae-ivory hover:text-reggae-gold hover:bg-stage-850 border border-stage-700 transition-all hidden sm:flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-reggae-gold"
          aria-label="Elemento siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Modal Main Content Container */}
      <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center gap-4">
        <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl bg-stage-900 border border-stage-800">
          {isVideo && videoItem ? (
            <video
              ref={videoRef}
              src={videoItem.videoUrl}
              poster={videoItem.posterUrl}
              controls
              autoPlay
              playsInline
              className={`max-h-[75vh] max-w-full rounded-lg object-contain shadow-2xl ${
                videoItem.format === "vertical" ? "w-auto h-[70vh]" : "w-full h-auto"
              }`}
            />
          ) : galleryItem ? (
            <div className="relative w-full h-[65vh] sm:h-[72vh]">
              <Image
                src={galleryItem.imageUrl}
                alt={galleryItem.caption}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
                priority
              />
            </div>
          ) : null}
        </div>

        {/* Caption & Metadata */}
        <div className="text-center max-w-2xl px-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-reggae-gold">
            {isVideo ? `Video en Vivo • ${videoItem?.duration}` : galleryItem?.category}
          </span>
          <h3 className="text-lg sm:text-xl font-display font-bold text-reggae-ivory mt-1">
            {isVideo ? videoItem?.title : galleryItem?.title}
          </h3>
          <p className="text-xs sm:text-sm text-reggae-ivory/70 mt-1 leading-relaxed">
            {isVideo ? videoItem?.description : galleryItem?.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
