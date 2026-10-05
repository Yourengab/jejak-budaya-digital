"use client";

import { useRef, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Lightbulb, Volume2 } from "lucide-react";

export default function PreSurveiPage() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (window.innerWidth >= 1024) {
            audioRef.current = new Audio("/assets/audio/survei.mp3");
            audioRef.current.play().catch(() => {});
        }
        return () => {
            if (audioRef.current) audioRef.current.pause();
        };
    }, []);

    const steps = [
        "Pilih teman yang akan ditanya",
        "Tanyakan makanan yang mereka pilih",
        "Catat jawabannya",
        "Masukkan hasilnya ke website",
    ];

    return (
        <main className="flex-1 relative flex flex-col h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 bg-[#f9f5f0]">
                <Image
                    src="/assets/survei-awal/bg.png"
                    alt="Background Survei"
                    fill
                    className="object-cover object-bottom opacity-[0.15]"
                    priority
                />
                {/* Light overlay to ensure text readability if needed */}
                <div className="absolute inset-0 bg-linear-to-b from-white/80 via-white/40 to-transparent" />
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-2 min-h-0">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 lg:mb-6 shrink-0">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-xl"
                    >
                        <div className="text-batak-maroon font-bold tracking-widest text-[10px] sm:text-xs mb-1 flex items-center gap-3 uppercase">
                            SURVEI
                            <div className="w-12 h-0.5 bg-batak-maroon rounded-full"></div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-batak-brown mb-2 leading-tight">
                            Ayo Cari Data!
                        </h1>
                        <p className="text-batak-brown/90 text-sm sm:text-base leading-relaxed max-w-md font-medium">
                            Sekarang saatnya melakukan survei kepada
                            teman-temanmu. Ikuti langkah-langkah berikut:
                        </p>
                    </motion.div>
                </div>

                {/* Content Row: Cards and Mascot */}
                <div className="flex-1 flex gap-4 min-h-0 relative">
                    {/* Cards Container */}
                    <div className="flex-1 grid md:grid-cols-2 gap-4 lg:gap-6 overflow-hidden relative z-20 xl:w-2/3 xl:flex-none">
                        {/* Left Card: Langkah Survei */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border-2 border-white/50 flex flex-col h-fit"
                        >
                            <h2 className="text-lg sm:text-xl font-black text-batak-brown mb-4">
                                Langkah Survei
                            </h2>

                            <div className="flex flex-col gap-2 mb-4">
                                {steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 bg-white p-2.5 sm:p-3 rounded-xl border border-batak-cream shadow-sm"
                                    >
                                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-batak-maroon text-white flex items-center justify-center font-bold shrink-0 shadow-md text-xs sm:text-sm">
                                            {index + 1}
                                        </div>
                                        <p className="font-bold text-batak-brown text-xs sm:text-sm">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/input-data"
                                className="w-full flex items-center justify-center gap-2 bg-batak-maroon text-white py-3 rounded-xl font-bold text-sm hover:bg-batak-maroon/90 transition-all shadow-md active:translate-y-1 mt-auto"
                            >
                                <span>Saya Sudah Mendapatkan Data</span>
                                <ArrowRight size={16} strokeWidth={3} />
                            </Link>
                        </motion.div>

                        {/* Right Card: Pertanyaan Survei */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border-2 border-white/50 flex flex-col h-fit"
                        >
                            <h2 className="text-lg sm:text-xl font-black text-batak-brown mb-2">
                                Pertanyaan Survei
                            </h2>
                            <p className="text-batak-brown/80 font-medium text-xs sm:text-sm mb-4">
                                Tanyakan pertanyaan berikut kepada temanmu:
                            </p>

                            <div className="bg-[#fcf3f2] p-5 sm:p-6 rounded-2xl mb-4 flex items-center justify-center border border-batak-maroon/10 shadow-inner">
                                <p className="text-batak-maroon font-bold text-lg sm:text-xl text-center leading-snug">
                                    &quot;Makanan tradisional mana yang paling
                                    kamu sukai?&quot;
                                </p>
                            </div>

                            <div className="bg-[#f0fdf4] p-4 rounded-2xl flex gap-3 border border-green-200 shadow-sm">
                                <div className="mt-0.5 shrink-0 text-green-600 bg-green-100 p-1.5 rounded-full h-fit">
                                    <Lightbulb size={16} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-green-800 mb-0.5 text-xs sm:text-sm">
                                        Tips:
                                    </h4>
                                    <p className="text-green-700/90 text-[11px] sm:text-xs leading-relaxed font-medium">
                                        Kamu bisa memilih lebih dari satu teman
                                        untuk mendapatkan lebih banyak data.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Mascot Section (Right side) - Hidden on small screens, shown absolute on bottom right */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                            delay: 0.5,
                        }}
                        className="hidden xl:block absolute bottom-0 right-0 w-[35%] z-30 pointer-events-none"
                    >
                        {/* Mascot Image - zero height container to prevent scroll */}
                        <div className="relative w-full h-0 shrink-0 flex justify-end">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut",
                                }}
                                className="absolute bottom-0 right-0 w-full h-137 drop-shadow-sm translate-x-12 translate-y-12"
                            >
                                {/* Speech Bubble */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: 0.8,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 15,
                                    }}
                                    className="absolute -top-24 right-28 lg:right-40 bg-white/95 backdrop-blur-sm text-batak-brown p-5 rounded-3xl rounded-br-none border-2 border-batak-cream w-64 z-10"
                                >
                                    <p className="font-medium text-sm leading-relaxed pr-6">
                                        Nah sekarang saatnya melakukan survei ke
                                        teman-temanmu nih. Ikuti langkah-langkah
                                        di layar yaa
                                    </p>

                                    <button
                                        onClick={() => {
                                            if (audioRef.current) {
                                                audioRef.current.pause();
                                                audioRef.current.currentTime = 0;
                                            }
                                            audioRef.current = new Audio("/assets/audio/survei.mp3");
                                            audioRef.current.play().catch(() => {});
                                        }}
                                        className="absolute top-4 right-4 text-batak-maroon hover:text-batak-maroon/70 transition-colors bg-batak-cream/50 p-1.5 rounded-full hover:scale-110 active:scale-95"
                                        aria-label="Putar Suara"
                                    >
                                        <Volume2 size={16} strokeWidth={2.5} />
                                    </button>
                                    {/* Bubble Tail */}
                                    <div className="absolute -bottom-2 right-8 w-6 h-6 bg-white/95 border-b-2 border-r-2 border-batak-cream transform rotate-45 rounded-sm -z-10" />
                                </motion.div>

                                <Image
                                    src="/assets/survei-awal/mascot.png"
                                    alt="Maskot Survei"
                                    fill
                                    sizes="500px"
                                    className="object-contain object-bottom"
                                    priority
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
