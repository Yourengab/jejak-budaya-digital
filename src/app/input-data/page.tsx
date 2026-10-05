"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Volume2 } from "lucide-react";
import { motion } from "motion/react";

type FoodCount = {
    id: string;
    name: string;
    count: number;
    image?: string;
};

export default function SurveiPage() {
    const router = useRouter();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (window.innerWidth >= 1024) {
            audioRef.current = new Audio("/assets/audio/data-survei.mp3");
            audioRef.current.play().catch(() => {});
        }
        return () => {
            if (audioRef.current) audioRef.current.pause();
        };
    }, []);
    const [foods, setFoods] = useState<FoodCount[]>([
        {
            id: "lapet",
            name: "Lapet",
            count: 0,
            image: "/assets/makanan/lapet.png",
        },
        {
            id: "lemang",
            name: "Lemang",
            count: 0,
            image: "/assets/makanan/lemang.png",
        },
        {
            id: "ombus",
            name: "Ombus-ombus",
            count: 0,
            image: "/assets/makanan/ombus ombus.png",
        },
        {
            id: "bika",
            name: "Bika Ambon",
            count: 0,
            image: "/assets/makanan/bika ambon.png",
        },
    ]);

    const handleCountChange = (id: string, value: string) => {
        // Only allow numbers and empty string
        if (!/^\d*$/.test(value)) return;

        const numValue = value === "" ? 0 : parseInt(value, 10);

        setFoods((prev) =>
            prev.map((f) => (f.id === id ? { ...f, count: numValue } : f)),
        );
    };

    const handleReset = () => {
        setFoods((prev) => prev.map((f) => ({ ...f, count: 0 })));
    };

    const handleProcess = () => {
        // Save to local storage for the analysis page to use
        localStorage.setItem("surveiData", JSON.stringify(foods));
        router.push("/analisis");
    };

    return (
        <main className="flex-1 relative flex flex-col h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0 ">
                <Image
                    src="/assets/survei/bg.png"
                    alt="Background Survei"
                    fill
                    className="object-cover object-bottom opacity-100"
                    priority
                />
                {/* Light overlay */}
                <div className="absolute inset-0" />
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4 min-h-0 items-center justify-between gap-8">
                {/* Left Side: Main Card Container */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    className="w-full lg:max-w-3xl shrink-0"
                >
                    <div className="bg-[#fdfbf7] rounded-4xl p-5 sm:p-8 shadow-2xl border-2 border-white/50 w-full flex flex-col items-center">
                        {/* Header */}
                        <div className="text-center mb-6 sm:mb-8">
                            <h1 className="text-2xl sm:text-3xl font-black text-[#0f213a] mb-2">
                                Masukkan Hasil Survei
                            </h1>
                            <p className="text-[#3b4c68] text-xs sm:text-sm max-w-lg mx-auto font-medium leading-relaxed">
                                Masukkan jumlah teman yang memilih setiap
                                makanan berdasarkan hasil survei yang sudah kamu
                                lakukan.
                            </p>
                        </div>

                        {/* Form / List */}
                        <div className="w-full flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
                            {foods.map((food) => (
                                <div
                                    key={food.id}
                                    className="flex items-center gap-4 sm:gap-6 bg-white p-2.5 sm:p-3 rounded-2xl border border-batak-cream shadow-sm"
                                >
                                    {/* Food Image */}
                                    <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-xl bg-white overflow-hidden relative shrink-0 border-2 border-batak-cream/60 flex items-center justify-center group-hover:border-batak-maroon/30 transition-colors">
                                        {food.image ? (
                                            <Image
                                                src={food.image}
                                                alt={food.name}
                                                fill
                                                className="object-contain object-center p-1"
                                            />
                                        ) : (
                                            <span className="text-[10px] sm:text-xs font-bold text-batak-brown/40 text-center px-1 leading-tight">
                                                Foto {food.name}
                                            </span>
                                        )}
                                        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-batak-brown to-transparent pointer-events-none"></div>
                                    </div>

                                    {/* Name */}
                                    <div className="flex-1">
                                        <p className="font-black text-[#0f213a] text-sm sm:text-base">
                                            {food.name}
                                        </p>
                                    </div>

                                    {/* Input Area */}
                                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                                        <input
                                            type="number"
                                            value={
                                                food.count === 0
                                                    ? ""
                                                    : food.count
                                            }
                                            onChange={(e) =>
                                                handleCountChange(
                                                    food.id,
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="0"
                                            className="w-14 sm:w-16 h-9 sm:h-10 text-center font-bold text-batak-brown bg-white border-2 border-batak-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-batak-maroon/20 transition-all shadow-inner"
                                            min="0"
                                        />
                                        <span className="text-batak-brown/80 font-medium text-xs sm:text-sm w-10">
                                            orang
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Buttons Row */}
                        <div className="w-full max-w-lg flex items-center gap-3 sm:gap-4">
                            <button
                                onClick={handleReset}
                                className="flex-1 bg-[#f4ebd9] text-[#0f213a] font-bold py-3 sm:py-3.5 rounded-xl hover:bg-[#eadebd] transition-all active:translate-y-1 shadow-sm text-sm sm:text-base"
                            >
                                Reset
                            </button>
                            <button
                                onClick={handleProcess}
                                className="flex-2 flex items-center justify-center gap-2 bg-[#b31b1b] text-white font-bold py-3 sm:py-3.5 rounded-xl hover:bg-[#9a1717] transition-all active:translate-y-1 shadow-md text-sm sm:text-base"
                            >
                                <span>Proses Analisis</span>
                                <ArrowRight size={18} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Mascot Section - Absolute bottom right */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.8,
                    type: "spring",
                    bounce: 0.3,
                    delay: 0.3,
                }}
                className="hidden lg:block absolute bottom-0 right-0 w-[45%] xl:w-[40%] z-30 pointer-events-none"
            >
                <div className="relative w-full h-0 shrink-0 flex justify-end">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-0 right-20 w-full max-w-112.5 h-125 xl:h-137.5 drop-shadow-2xl translate-x-4 xl:translate-x-12 translate-y-8"
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
                            className="absolute top-10 -left-16 bg-white/95 backdrop-blur-sm text-batak-brown p-5 rounded-3xl rounded-br-none shadow-xl border-2 border-batak-cream w-64 z-10 pointer-events-auto"
                        >
                            <p className="font-medium text-sm leading-relaxed pr-6">
                                Yuk masukan data survei kamu. Pastikan kamu
                                memasukkan datanya dengan benar ya!
                            </p>

                            <button
                                onClick={() => {
                                    if (audioRef.current) {
                                        audioRef.current.pause();
                                        audioRef.current.currentTime = 0;
                                    }
                                    audioRef.current = new Audio("/assets/audio/data-survei.mp3");
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
                            src="/assets/survei/mascot.png"
                            alt="Maskot Survei"
                            fill
                            sizes="500px"
                            className="object-contain object-bottom"
                            priority
                        />
                    </motion.div>
                </div>
            </motion.div>
        </main>
    );
}
