"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Tent, RotateCcw, ArrowLeft, Volume2, VolumeX, Play, Pause, Music } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Beranda", href: "/home" },
  { name: "Kenali Budaya", href: "/kenali-budaya" },
  { name: "Survei", href: "/survei" },
  { name: "Input Data", href: "/input-data" },
  { name: "Analisis", href: "/analisis" },
  { name: "Detektif Data & Misi", href: "/detektif-data" },
  { name: "Overview", href: "/overview" },
];

const tracks = ["/assets/audio/lagu-1.mp3", "/assets/audio/lagu-2.mp3"];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showAudioControls, setShowAudioControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current && isPlaying) {
        try {
          await audioRef.current.play();
        } catch {
          console.log("Audio play failed (autoplay policy). Waiting for interaction.");
        }
      } else if (audioRef.current && !isPlaying) {
        audioRef.current.pause();
      }
    };
    
    playAudio();
  }, [isPlaying, currentTrackIndex]);

  // Global listener to unlock audio upon first user interaction
  useEffect(() => {
    const unlockAudio = () => {
      if (audioRef.current && isPlaying && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    };
    
    document.addEventListener("click", unlockAudio, { once: true });
    document.addEventListener("touchstart", unlockAudio, { once: true });
    
    return () => {
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
    };
  }, [isPlaying]);

  const handleEnded = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handleRestart = () => {
    localStorage.clear();
    router.push("/home");
    router.refresh();
    setShowModal(false);
  };

  return (
    <>
      <header className="w-full h-14 sm:h-16 bg-batak-cream/90 backdrop-blur-sm sticky top-0 z-50 border-b border-batak-brown/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        <div className="flex items-center">
          {pathname !== "/home" && pathname !== "/" && (
            <button 
              onClick={() => {
                const backRoutes: Record<string, string> = {
                  "/kenali-budaya": "/home",
                  "/survei": "/kenali-budaya",
                  "/input-data": "/survei",
                  "/analisis": "/input-data",
                  "/detektif-data": "/analisis",
                  "/overview": "/detektif-data",
                };
                router.push(backRoutes[pathname] || "/home");
              }} 
              className="mr-2 sm:mr-4 flex items-center justify-center p-1.5 sm:p-2 rounded-full hover:bg-batak-brown/10 transition-colors text-batak-brown"
              title="Kembali"
            >
              <ArrowLeft size={20} className="stroke-[2.5]" />
            </button>
          )}
          <Link href="/home" className="flex items-center gap-3 group">
            <div className="text-batak-brown p-1.5 sm:p-2 rounded-lg group-hover:bg-batak-gold/30 transition-colors">
              <Tent size={24} className="stroke-[2.5]" />
            </div>
          <div className="font-bold text-base sm:text-lg leading-tight text-batak-brown flex flex-col">
            <span>Jejak Data Budaya</span>
          </div>
        </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors hover:text-batak-maroon ${
                  isActive ? "text-batak-maroon" : "text-batak-brown/70"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-batak-maroon rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons Container */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Audio Controls */}
          <div className="hidden sm:flex items-center relative">
            <button
              onClick={() => setShowAudioControls(!showAudioControls)}
              className="p-2 sm:p-2.5 rounded-full bg-batak-cream/30 border border-batak-brown/10 hover:bg-batak-brown/10 text-batak-brown transition-colors z-10"
              title="Pengaturan Musik Latar"
            >
              <Music size={18} className="stroke-[2.5]" />
            </button>
            
            <AnimatePresence>
              {showAudioControls && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-batak-cream flex flex-col gap-3 min-w-35"
                >
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded-full hover:bg-batak-brown/10 text-batak-brown transition-colors"
                      title={isPlaying ? "Jeda Musik" : "Putar Musik"}
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 rounded-full hover:bg-batak-brown/10 text-batak-brown transition-colors"
                      title={isMuted ? "Bunyikan" : "Bisukan"}
                    >
                      {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>
                  
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      if (parseFloat(e.target.value) > 0) setIsMuted(false);
                    }}
                    className="w-full h-1.5 bg-batak-brown/20 rounded-lg appearance-none cursor-pointer accent-batak-maroon"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Button */}
          <button
            className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-full bg-batak-maroon/10 text-batak-maroon font-semibold hover:bg-batak-maroon/20 transition-colors text-sm"
            title="Mulai Ulang"
            onClick={() => setShowModal(true)}
          >
            <RotateCcw size={18} className="sm:w-4 sm:h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Mulai Ulang</span>
          </button>
        </div>
      </div>
    </header>

      {/* Restart Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-batak-black/40 backdrop-blur-sm" 
            onClick={() => setShowModal(false)} 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-white p-6 sm:p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border-2 border-batak-cream"
          >
            <div className="w-16 h-16 bg-red-100 text-batak-maroon rounded-full flex items-center justify-center mx-auto mb-5">
              <RotateCcw size={32} className="stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-bold text-batak-brown mb-2">Mulai Ulang?</h3>
            <p className="text-batak-brown/70 text-sm mb-6 leading-relaxed">
              Semua data kemajuan dan hasil survei kamu akan dihapus secara permanen. Apakah kamu yakin ingin memulai dari awal?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 bg-batak-cream/50 hover:bg-batak-cream text-batak-brown font-bold rounded-xl transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleRestart}
                className="flex-1 px-4 py-3 bg-batak-maroon hover:bg-batak-maroon/90 text-white font-bold rounded-xl transition-colors shadow-lg shadow-batak-maroon/20"
              >
                Ya, Hapus
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex]}
        onEnded={handleEnded}
        autoPlay
      />
    </>
  );
}
