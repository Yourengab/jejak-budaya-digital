"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X, Volume2, MessageCircle } from "lucide-react";

export default function SmallMascot() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Track which path was auto-dismissed; derived visibility avoids setState-in-effect
  const [closedPath, setClosedPath] = useState<string | null>(null);
  const isVisible = closedPath !== pathname;

  useEffect(() => {
    const timer = setTimeout(() => {
      setClosedPath(pathname);
    }, 3000);
    return () => clearTimeout(timer);
  }, [pathname]);

  let text = "";
  let subText = "";
  let audioSrc = "";

  switch (pathname) {
    case "/home":
    case "/":
      text = "Horas! Hai teman-teman!";
      subText = "Ayo mulai petualangannya!";
      audioSrc = "/assets/audio/beranda.mp3";
      break;
    case "/kenali-budaya":
      text = "Kenali Budaya Kita!";
      subText = "Pilih makanan untuk lihat fakta unik.";
      audioSrc = "/assets/audio/kenali-budaya.mp3";
      break;
    case "/survei":
      text = "Mulai Survei!";
      subText = "Tanya temanmu makanan kesukaannya.";
      audioSrc = "/assets/audio/survei.mp3";
      break;
    case "/input-data":
      text = "Input Data Survei";
      subText = "Pastikan jumlahnya sudah benar ya!";
      audioSrc = "/assets/audio/data-survei.mp3";
      break;
    case "/analisis":
      text = "Analisis Data";
      subText = "Lihat grafik hasil surveimu di sini!";
      audioSrc = "/assets/audio/grafik.mp3";
      break;
    case "/detektif-data":
      text = "Misi Detektif!";
      subText = "Jawab pertanyaan berdasarkan grafik.";
      audioSrc = "/assets/audio/detektif-data.mp3";
      break;
    default:
      break;
  }

  // Autoplay audio when mascot appears on mobile
  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    
    if (audioSrc && window.innerWidth < 1024) {
      audio = new Audio(audioSrc);
      audioRef.current = audio;
      audio.play().catch(() => {});
    }
    
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      if (audioRef.current === audio) {
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  if (!text) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="mascot-dialog"
          className="lg:hidden fixed bottom-4 left-4 z-60 flex items-end gap-2"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="relative w-24 h-24 shrink-0 drop-shadow-xl z-10"
          >
            <Image 
              src="/assets/home/mascot-small.png" 
              alt="Maskot" 
              fill
              sizes="128px"
              className="object-contain" 
              priority
            />
          </motion.div>
          
          <motion.div
            className="relative bg-white/95 backdrop-blur-sm text-batak-brown p-3 rounded-2xl shadow-xl border border-batak-cream mb-4 max-w-50"
            initial={{ opacity: 0, scale: 0.5, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
          >
            <button 
              onClick={() => setClosedPath(pathname)}
              className="absolute -top-2 -right-2 bg-white text-batak-brown/50 hover:text-batak-maroon rounded-full p-1 shadow-sm border border-batak-cream transition-colors z-20"
              aria-label="Tutup"
            >
              <X size={12} strokeWidth={3} />
            </button>
            <button 
              onClick={() => {
                if (audioSrc) {
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                  audioRef.current = new Audio(audioSrc);
                  audioRef.current.play().catch(() => {});
                }
              }}
              className="absolute -top-2 right-4 bg-white text-batak-maroon hover:text-batak-maroon/70 rounded-full p-1 shadow-sm border border-batak-cream transition-colors z-20"
              aria-label="Putar Audio"
            >
              <Volume2 size={12} strokeWidth={3} />
            </button>
            <p className="font-bold text-sm leading-tight pr-6">{text}</p>
            <p className="text-[10px] font-medium opacity-80 mt-1">{subText}</p>
            
            <div className="absolute bottom-2 -left-1.5 w-4 h-4 bg-white/95 border-b border-l border-batak-cream transform rotate-45 rounded-sm -z-10" />
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isVisible && (
          <motion.div
            key="mascot-toggle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="lg:hidden fixed bottom-4 left-4 z-50"
          >
            <button
              onClick={() => setClosedPath(null)}
              className="bg-white p-3 rounded-full shadow-xl border-2 border-batak-cream text-batak-maroon hover:bg-batak-cream/50 transition-colors flex items-center justify-center relative group"
              aria-label="Tampilkan Maskot"
            >
              <MessageCircle size={24} strokeWidth={2.5} />
              {/* Optional: mini red dot if needed */}
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
