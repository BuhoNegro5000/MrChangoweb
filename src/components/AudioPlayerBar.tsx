"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { CHANGO_DATA } from "@/data/chango-data";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Disc3,
  Maximize2,
  Minimize2,
  Music,
  ExternalLink,
} from "lucide-react";

interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  confirmedOrigin: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
}

export const AudioPlayerBar = () => {
  const tracks: AudioTrack[] = CHANGO_DATA.audioTracks;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack: AudioTrack = tracks[currentTrackIndex];

  // Inicializar con minimizado en mobile
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setIsMinimized(true);
    }
  }, []);

  // Crear / actualizar el elemento <audio>
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "metadata";
    }

    const audio = audioRef.current;
    audio.src = currentTrack.audioUrl;
    audio.volume = isMuted ? 0 : volume;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(true);

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      // Auto-advance si hay más tracks
      if (tracks.length > 1) {
        setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
      }
    };
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => setIsLoading(false);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);

  // Sincronizar play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Sincronizar volumen / mute
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    setIsPlaying(false);
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  }, [tracks.length]);

  const handlePrev = useCallback(() => {
    setIsPlaying(false);
    // Si lleva más de 3 s reproducidos, reiniciar; si no, ir al anterior
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    }
  }, [tracks.length]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
  }, []);

  const formatTime = (s: number) => {
    if (!isFinite(s) || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Barras del ecualizador animado
  const eqHeights = [40, 75, 55, 90, 65, 80, 45, 95, 60, 85];

  return (
    <aside
      aria-label="Reproductor musical de Mr. Chango"
      className={`fixed bottom-4 right-4 sm:right-6 z-40 transition-all duration-300 ${
        isMinimized
          ? "w-auto"
          : "w-[calc(100vw-2rem)] sm:w-[22rem] max-w-sm"
      }`}
    >
      <div className="audio-player-modal bg-[#080A07]/95 backdrop-blur-xl border border-[#102419]/90 shadow-2xl rounded-2xl p-3 sm:p-4 text-[#F1EADD] ring-1 ring-[#DAB44A]/20">
        {isMinimized ? (
          /* ── Pill minimizado ── */
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="audio-player-pill flex items-center gap-2 px-3.5 py-2 bg-[#102419] border border-[#DAB44A]/40 rounded-xl hover:bg-[#102419]/80 text-[#DAB44A] text-xs font-bold uppercase tracking-wider shadow-lg"
            title="Expandir reproductor musical"
            aria-label="Expandir reproductor de Mr. Chango"
          >
            <Disc3 className={`w-4 h-4 ${isPlaying ? "animate-spin" : ""}`} />
            <span>
              {isPlaying ? currentTrack.title : "Mr. Chango — Música"}
            </span>
            <Maximize2 className="w-3.5 h-3.5 ml-1 text-[#F1EADD]/60" />
          </button>
        ) : (
          /* ── Reproductor expandido ── */
          <div className="flex flex-col gap-3">
            {/* Header */}
            <div className="audio-player-header flex items-center justify-between pb-2 border-b border-[#102419] text-xs">
              <div className="flex items-center gap-2">
                <Music className="w-3.5 h-3.5 text-[#DAB44A]" />
                <span className="font-mono text-[11px] text-[#DAB44A] font-bold tracking-widest uppercase">
                  {isLoading
                    ? "Cargando…"
                    : `Pista ${currentTrackIndex + 1} / ${tracks.length}`}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="audio-player-close text-[#F1EADD]/60 hover:text-[#DAB44A] p-1 rounded transition-colors"
                title="Minimizar reproductor"
                aria-label="Minimizar reproductor"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Track Info & Artwork */}
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-[#DAB44A]/30 shadow-md">
                <Image
                  src={currentTrack.coverUrl}
                  alt={`Portada de ${currentTrack.title}`}
                  fill
                  sizes="56px"
                  className={`object-cover transition-transform duration-[3000ms] ${
                    isPlaying ? "scale-110" : "scale-100"
                  }`}
                />
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <h4 className="audio-player-title font-bold text-sm text-[#F1EADD] truncate">
                  {currentTrack.title}
                </h4>
                <p className="audio-player-artist text-[11px] text-[#DAB44A]/90 truncate font-mono font-medium">
                  {currentTrack.artist}
                </p>

                {/* Ecualizador animado */}
                <div
                  className="flex items-end gap-[2px] h-4 mt-1.5"
                  aria-hidden="true"
                >
                  {eqHeights.map((h, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-full"
                      style={{
                        height: isPlaying ? `${h}%` : "15%",
                        opacity: isPlaying ? 1 : 0.35,
                        background: `linear-gradient(to top, #DAB44A, #C96832)`,
                        transition: `height ${0.2 + i * 0.05}s ease-in-out`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Barra de progreso */}
            <div className="audio-player-progress flex items-center gap-2 text-[10px] text-[#F1EADD]/60 font-mono">
              <span className="w-8 text-right tabular-nums font-semibold">
                {formatTime(currentTime)}
              </span>
              <div className="audio-player-track relative flex-1 h-1.5 bg-[#102419] rounded-full overflow-hidden group/seek">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#DAB44A] to-[#C96832] rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.5}
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Posición de reproducción"
                />
              </div>
              <span className="w-8 tabular-nums font-semibold">{formatTime(duration)}</span>
            </div>

            {/* Controles principales */}
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="audio-player-btn p-1.5 text-[#F1EADD]/70 hover:text-[#DAB44A] rounded hover:bg-[#102419] transition-colors"
                  aria-label="Pista anterior"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="p-2.5 rounded-full bg-gradient-to-r from-[#DAB44A] to-[#C96832] text-stage-950 font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg disabled:opacity-50"
                  aria-label={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="audio-player-btn p-1.5 text-[#F1EADD]/70 hover:text-[#DAB44A] rounded hover:bg-[#102419] transition-colors"
                  aria-label="Siguiente pista"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Volumen */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsMuted((m) => !m)}
                  className="audio-player-vol p-1.5 text-[#F1EADD]/60 hover:text-[#DAB44A] rounded transition-colors"
                  aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="audio-player-slider w-16 h-1 accent-[#DAB44A] cursor-pointer"
                  aria-label="Volumen"
                />
              </div>
            </div>

            {/* Streaming Links (Spotify & YouTube) */}
            <div className="audio-player-footer flex items-center justify-between pt-1 border-t border-[#102419]/80">
              <span className="audio-player-origin text-[10px] text-[#F1EADD]/40 font-mono font-medium truncate max-w-[120px]">
                {currentTrack.confirmedOrigin}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={currentTrack.spotifyUrl || "https://open.spotify.com/intl-es/artist/1oyZYiWN0ryxVfJ3G2mD4e"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="audio-player-spotify px-2 py-1 text-[11px] font-semibold text-[#1DB954] hover:text-[#1ed760] bg-[#102419]/90 hover:bg-[#102419] border border-[#1DB954]/30 rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
                  title="Abrir perfil y música en Spotify"
                >
                  <Disc3 className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>Spotify</span>
                </a>
                <a
                  href={currentTrack.youtubeUrl || "https://www.youtube.com/@mr.changoreggaemexicano2734"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="audio-player-youtube px-2 py-1 text-[11px] font-semibold text-[#FF4444] hover:text-[#ff6666] bg-[#102419]/90 hover:bg-[#102419] border border-[#FF0000]/30 rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
                  title="Ver canal oficial en YouTube"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
