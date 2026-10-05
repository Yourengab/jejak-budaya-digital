"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Tent, RotateCcw, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

const navLinks = [
  { name: "Beranda", href: "/home" },
  { name: "Kenali Budaya", href: "/kenali-budaya" },
  { name: "Survei", href: "/survei" },
  { name: "Input Data", href: "/input-data" },
  { name: "Analisis", href: "/analisis" },
  { name: "Detektif Data & Misi", href: "/detektif-data" },
  { name: "Overview", href: "/overview" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

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

        {/* Action Button */}
        <button
          className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-full bg-batak-maroon/10 text-batak-maroon font-semibold hover:bg-batak-maroon/20 transition-colors text-sm shrink-0"
          title="Mulai Ulang"
          onClick={() => setShowModal(true)}
        >
          <RotateCcw size={18} className="sm:w-4 sm:h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Mulai Ulang</span>
        </button>
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
    </>
  );
}
