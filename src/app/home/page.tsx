"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Volume2 } from "lucide-react";
import { motion, Variants } from "motion/react";

const navCards = [
    {
        title: "Kenali Budaya",
        description: "Mengenal makanan khas Batak",
        image: "/assets/home/budaya.png",
        href: "/kenali-budaya",
        bgColor: "bg-[var(--color-card-pink)]",
        iconColor: "text-[var(--color-icon-pink)]",
        hoverBgColor: "group-hover:bg-[var(--color-icon-pink)]",
    },
    {
        title: "Survei",
        description: "Lakukan survei bersama teman",
        image: "/assets/home/survei.png",
        href: "/survei",
        bgColor: "bg-[var(--color-card-yellow)]",
        iconColor: "text-[var(--color-icon-yellow)]",
        hoverBgColor: "group-hover:bg-[var(--color-icon-yellow)]",
    },
    {
        title: "Input Data",
        description: "Masukkan hasil survei kamu",
        image: "/assets/home/input.png",
        href: "/input-data",
        bgColor: "bg-[var(--color-card-green)]",
        iconColor: "text-[var(--color-icon-green)]",
        hoverBgColor: "group-hover:bg-[var(--color-icon-green)]",
    },
    {
        title: "Analisis",
        description: "Lihat data dalam bentuk grafik",
        image: "/assets/home/analisis.png",
        href: "/analisis",
        bgColor: "bg-[var(--color-card-blue)]",
        iconColor: "text-[var(--color-icon-blue)]",
        hoverBgColor: "group-hover:bg-[var(--color-icon-blue)]",
    },
    {
        title: "Detektif Data",
        description: "Jawab pertanyaan dari data",
        image: "/assets/home/detektif.png",
        href: "/detektif-data",
        bgColor: "bg-[var(--color-card-purple)]",
        iconColor: "text-[var(--color-icon-purple)]",
        hoverBgColor: "group-hover:bg-[var(--color-icon-purple)]",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
};

export default function Home() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio("/assets/audio/beranda.mp3");
        audioRef.current = audio;
        
        const tryPlay = () => {
            audio.play().catch(() => {
                console.log("Home audio autoplay blocked, waiting for interaction");
            });
        };
        
        tryPlay();

        const unlockAudio = () => {
            if (audio.paused) {
                audio.play().catch(() => {});
            }
        };

        document.addEventListener("click", unlockAudio, { once: true });
        document.addEventListener("touchstart", unlockAudio, { once: true });

        return () => {
            audio.pause();
            audio.currentTime = 0;
            if (audioRef.current === audio) {
                audioRef.current = null;
            }
            document.removeEventListener("click", unlockAudio);
            document.removeEventListener("touchstart", unlockAudio);
        };
    }, []);

    return (
        <main className="flex-1 relative flex flex-col h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/home/bg.png"
                    alt="Pasar Budaya Batak Toba"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Global overlay removed completely */}
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 py-4">
                {/* Top Section: Hero Content */}
                <div className="relative w-full mb-8 lg:mb-12">
                    {/* Hero Content (Left) */}
                    <div className="max-w-2xl relative z-10 shrink-0">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative"
                        >
                            {/* Subtle round glow, pushed to the left edge and enlarged */}
                            <div className="absolute top-1/2 left-[-70%] -translate-y-1/2 w-[180%] h-[200%] bg-[radial-gradient(circle,rgba(0,0,0,0.80)_0%,transparent_50%)] rounded-full blur-3xl pointer-events-none -z-10" />
                            <p className="text-white font-bold tracking-widest text-xs mb-2 uppercase">
                                Selamat datang di
                            </p>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
                                Jejak <br className="hidden sm:block" /> Data
                                Budaya
                            </h1>
                            <p className="text-lg sm:text-xl font-medium text-white/90 mb-2">
                                Data Explorer — Petualangan Data di Pasar Budaya
                            </p>
                            <p className="text-sm sm:text-base text-white/80 mb-6 max-w-lg leading-relaxed">
                                Yuk, jelajahi makanan khas Batak Toba, kumpulkan
                                data, lihat hasilnya, dan temukan cerita menarik
                                di balik angka!
                            </p>

                            <Link
                                href="/kenali-budaya"
                                className="inline-flex items-center gap-2 bg-batak-maroon text-white px-6 py-3 rounded-full font-bold text-base hover:bg-batak-maroon/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-batak-maroon/30 group"
                            >
                                Mulai Petualangan
                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Navigation Cards */}
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {navCards.map((card) => {
                        return (
                            <motion.div
                                key={card.title}
                                variants={itemVariants}
                                className="h-full"
                            >
                                <Link
                                    href={card.href}
                                    className={`${card.bgColor} rounded-3xl p-5 lg:p-6 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group h-full border border-white/50 hover:-translate-y-1`}
                                >
                                    <div
                                        className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 lg:mb-5 ${card.iconColor} group-hover:scale-110 transition-transform`}
                                    >
                                        {card.image && (
                                            <Image
                                                src={card.image}
                                                alt={card.title}
                                                width={60}
                                                height={60}
                                                className="object-contain w-auto h-auto"
                                            />
                                        )}
                                    </div>

                                    <h3 className="font-bold text-batak-brown text-base lg:text-lg mb-2 leading-tight">
                                        {card.title}
                                    </h3>
                                    <p className="text-batak-brown/70 text-xs lg:text-[13px] mb-3 lg:mb-4 flex-1 leading-snug">
                                        {card.description}
                                    </p>

                                    {/* Small arrow circle at the bottom */}
                                    <div
                                        className={`mt-auto w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm ${card.iconColor} ${card.hoverBgColor} group-hover:text-white transition-colors`}
                                    >
                                        <ArrowRight size={16} />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Large Mascot in Background */}
            <motion.div
                className="hidden lg:block absolute bottom-30 right-[2%] xl:right-[5%] z-5 pointer-events-none"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
                {/* Speech Bubble (Left, Slightly Up) */}
                <motion.div
                    className="absolute right-[85%] top-[10%] w-65 bg-white/95 backdrop-blur-sm text-batak-brown px-6 py-4 rounded-3xl shadow-xl border border-batak-cream drop-shadow-md z-10 transform -rotate-3 pointer-events-auto"
                    initial={{ opacity: 0, scale: 0.5, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{
                        delay: 0.8,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                    }}
                >
                    <div className="flex justify-between items-start mb-1">
                        <p className="font-bold text-lg leading-tight">
                            Horas, Adik-adik!
                        </p>
                        <button
                            className="text-batak-maroon hover:bg-batak-maroon/10 p-1.5 -mr-2 -mt-1 rounded-full transition-colors shrink-0 cursor-pointer"
                            title="Dengarkan Ulang"
                            onClick={() => {
                                if (audioRef.current) {
                                    audioRef.current.pause();
                                    audioRef.current.currentTime = 0;
                                    audioRef.current.play().catch(() => {});
                                } else {
                                    audioRef.current = new Audio(
                                        "/assets/audio/beranda.mp3",
                                    );
                                    audioRef.current.play().catch(() => {});
                                }
                            }}
                        >
                            <Volume2 size={18} className="stroke-[2.5]" />
                        </button>
                    </div>
                    <p className="text-sm font-medium opacity-90 leading-snug">
                        Perkenalkan, aku <strong>SIDATA</strong>! Aku yang akan
                        menemani kalian menjelajahi dan berburu data seru di
                        Pasar Budaya ini. Yuk, berangkat!
                    </p>

                    {/* Bubble Tail pointing Right */}
                    <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-6 h-6 bg-white/95 border-t border-r border-batak-cream transform rotate-45 rounded-sm" />
                </motion.div>

                {/* Mascot Image */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                    }}
                >
                    <Image
                        // !! READ THIS !! DO NOT CHANGE THE IMAGE. THIS IS THE CORRECT ONE.
                        src="/assets/home/mascot-crop.png"
                        alt="Maskot Jejak Budaya"
                        width={400}
                        height={520}
                        className="object-contain drop-shadow-2xl w-auto h-auto"
                        priority
                    />
                </motion.div>
            </motion.div>
        </main>
    );
}
