"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
    Search,
    Lightbulb,
    CheckCircle2,
    XCircle,
    ArrowRight,
} from "lucide-react";

type FoodCount = {
    id: string;
    name: string;
    count: number;
};

type Question = {
    id: number;
    text: string;
    options: string[];
    correctAnswers: string[];
    feedbackText: (selected: string) => string;
};

export default function DetektifDataPage() {
    const router = useRouter();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);
    const [showEmptyDataModal, setShowEmptyDataModal] = useState(false);

    const generateQuestions = (surveyData: FoodCount[]): Question[] => {
        const maxCount = Math.max(...surveyData.map((d) => d.count));
        const topFoods = surveyData
            .filter((d) => d.count === maxCount)
            .map((d) => d.name);

        const allNames = surveyData.map((d) => d.name);

        // Q1
        const q1Options = [...allNames].sort(() => Math.random() - 0.5);

        // Q2
        const extraPortions = Math.floor(Math.random() * 5) + 3; // 3 to 7
        const q2Options = [...allNames].sort(() => Math.random() - 0.5);

        // Q3
        const randomFood =
            surveyData[Math.floor(Math.random() * surveyData.length)];
        const extraBuyers = Math.floor(Math.random() * 4) + 2; // 2 to 5
        const newTotal = randomFood.count + extraBuyers;
        const numSet = new Set([
            newTotal,
            Math.max(0, newTotal - 1),
            newTotal + 1,
            newTotal + 2,
        ]);
        const q3Options = Array.from(numSet)
            .map(String)
            .sort(() => Math.random() - 0.5);

        const isAllEqual = topFoods.length === surveyData.length;

        return [
            {
                id: 1,
                text: isAllEqual
                    ? "Wah, ternyata semua makanan di datamu disukai oleh jumlah orang yang sama! Coba pilih salah satu dari makanan tersebut."
                    : topFoods.length > 1
                      ? "Ada beberapa makanan yang seri nih jumlah pemilihnya paling tinggi! Pilih salah satu makanan favorit itu."
                      : "Dari data yang kamu kumpulkan, makanan tradisional apa yang paling banyak dipilih teman-temanmu?",
                options: q1Options,
                correctAnswers: topFoods,
                feedbackText: (ans) =>
                    isAllEqual
                        ? `Benar! Karena semua datanya sama, ${ans} sama-sama dipilih oleh ${maxCount} orang.`
                        : topFoods.length > 1
                          ? `Benar! ${ans} adalah salah satu yang terfavorit dan sama-sama dipilih oleh ${maxCount} orang.`
                          : `Benar sekali! ${ans} adalah makanan terfavorit karena dipilih oleh ${maxCount} orang.`,
            },
            {
                id: 2,
                text: isAllEqual
                    ? `Seorang pedagang ingin memasak ${extraPortions} porsi tambahan. Karena datamu semuanya seri, makanan mana saja yang bisa ia tambah? Pilih salah satu!`
                    : topFoods.length > 1
                      ? `Seorang pedagang ingin memasak ${extraPortions} porsi tambahan. Pilih salah satu dari makanan terfavorit (yang jumlahnya tertinggi seri) untuk ditambah.`
                      : `Seorang pedagang ingin memasak ${extraPortions} porsi tambahan. Berdasarkan datamu, makanan mana yang sebaiknya ia tambah agar cepat habis terjual?`,
                options: q2Options,
                correctAnswers: topFoods,
                feedbackText: (ans) =>
                    isAllEqual
                        ? `Tepat! Karena semua disukai merata, menambah ${ans} juga pilihan yang bagus.`
                        : `Tepat! Karena ${ans} paling banyak disukai, pasti akan cepat habis kalau ditambah porsinya.`,
            },
            {
                id: 3,
                text: `Wah, tiba-tiba ada ${extraBuyers} orang lagi yang datang khusus untuk memilih ${randomFood.name}. Kalau ditambah dengan data surveimu, berapa total orang yang memilih ${randomFood.name} sekarang?`,
                options: q3Options,
                correctAnswers: [newTotal.toString()],
                feedbackText: (ans) =>
                    `Pintar! Awalnya ada ${randomFood.count} orang, lalu ditambah ${extraBuyers} orang, totalnya jadi ${newTotal}!`,
            },
        ];
    };

    useEffect(() => {
        const savedData = localStorage.getItem("surveiData");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData) as FoodCount[];
                const total = parsed.reduce((sum, item) => sum + item.count, 0);

                if (total === 0) {
                    setTimeout(() => setShowEmptyDataModal(true), 0);
                    return;
                }

                setTimeout(() => {
                    setQuestions(generateQuestions(parsed));
                    setIsLoaded(true);
                }, 0);
            } catch (e) {
                setTimeout(() => setShowEmptyDataModal(true), 0);
            }
        } else {
            setTimeout(() => setShowEmptyDataModal(true), 0);
        }
    }, []);

    const handleSelectOption = (opt: string) => {
        if (isAnswerChecked) return;
        setSelectedOption(opt);
    };

    const handleCheckAnswer = () => {
        if (!selectedOption) return;
        setIsAnswerChecked(true);
    };

    const handleNext = () => {
        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex((prev) => prev + 1);
            setSelectedOption(null);
            setIsAnswerChecked(false);
        } else {
            // Finished all questions, go to Misi (if implemented) or elsewhere
            router.push("/misi");
        }
    };

    if (showEmptyDataModal) {
        return (
            <main className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] relative flex items-center justify-center p-4">
                <div className="fixed inset-0 z-0 bg-[#faf8f5]">
                    <Image
                        src="/assets/budaya/bg.png"
                        alt="Background Pattern"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="relative z-10 bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border-2 border-batak-cream"
                >
                    <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 border-[4px] border-white drop-shadow-sm">
                        <Lightbulb size={40} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0f213a] mb-3 leading-tight">
                        Yah, Datanya Masih Kosong! 😲
                    </h2>
                    <p className="text-[#3b4c68] text-sm sm:text-base font-medium mb-8 leading-relaxed">
                        Kita belum bisa main Detektif Data nih karena kamu belum
                        memasukkan jumlah survei. Yuk, isi datanya dulu!
                    </p>
                    <button
                        onClick={() => router.replace("/input-data")}
                        className="w-full bg-batak-maroon text-white font-bold py-3.5 sm:py-4 rounded-xl hover:bg-batak-maroon/90 active:translate-y-1 transition-all shadow-md"
                    >
                        Ayo Isi Data Survei
                    </button>
                </motion.div>
            </main>
        );
    }

    if (!isLoaded || questions.length === 0) return null;

    const currentQ = questions[currentQIndex];
    const isCorrect = currentQ.correctAnswers.includes(selectedOption || "");

    return (
        <main className="flex-1 relative flex flex-col min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] overflow-x-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0 bg-[#faf8f5]">
                <Image
                    src="/assets/budaya/bg.png"
                    alt="Background Pattern"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
            </div>

            <div className="relative z-10 flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 items-center justify-center lg:justify-between gap-8">
                {/* Left Side: Mascot */}
                <div className="hidden lg:flex relative w-full lg:w-[40%] h-full flex-col items-center justify-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            bounce: 0.4,
                        }}
                        className="relative w-full max-w-[400px] h-[500px]"
                    >
                        <Image
                            src="/assets/detektif data/mascot-crop.png"
                            alt="Maskot Detektif"
                            fill
                            className="object-contain object-bottom drop-shadow-2xl"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Right Side: Quiz Card */}
                <div className="w-full lg:max-w-2xl shrink-0">
                    <motion.div
                        key={currentQ.id}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                        className="bg-[#fdfbf7] rounded-[2rem] p-6 sm:p-10 shadow-2xl border-2 border-white/50 w-full relative overflow-hidden"
                    >
                        {/* Progress Indicator */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            {questions.map((q, idx) => (
                                <div
                                    key={q.id}
                                    className={`h-2 rounded-full transition-all duration-500 ${
                                        idx === currentQIndex
                                            ? "w-12 bg-batak-maroon"
                                            : idx < currentQIndex
                                              ? "w-4 bg-batak-maroon/40"
                                              : "w-4 bg-gray-200"
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Question Header */}
                        <div className="flex items-start gap-4 mb-8">
                            <div className="w-12 h-12 bg-batak-cream/50 text-batak-maroon rounded-2xl flex items-center justify-center shrink-0">
                                <Search size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-[#3b4c68] font-bold text-sm mb-1 uppercase tracking-wider">
                                    Misi {currentQIndex + 1} dari{" "}
                                    {questions.length}
                                </h3>
                                <h2 className="text-xl sm:text-2xl font-black text-[#0f213a] leading-snug">
                                    {currentQ.text}
                                </h2>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="flex flex-col gap-3 mb-8">
                            {currentQ.options.map((opt, idx) => {
                                const isSelected = selectedOption === opt;
                                const showCorrect =
                                    isAnswerChecked &&
                                    currentQ.correctAnswers.includes(opt);
                                const showWrong =
                                    isAnswerChecked && isSelected && !isCorrect;

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelectOption(opt)}
                                        disabled={isAnswerChecked}
                                        className={`relative w-full p-4 rounded-xl text-left font-bold border-2 transition-all group ${
                                            showCorrect
                                                ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                                                : showWrong
                                                  ? "bg-red-50 border-red-500 text-red-800"
                                                  : isSelected
                                                    ? "bg-batak-cream border-batak-maroon text-batak-maroon"
                                                    : "bg-white border-batak-cream/80 text-[#0f213a] hover:border-batak-maroon/40"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm sm:text-base">
                                                {opt}
                                            </span>

                                            {showCorrect && (
                                                <CheckCircle2
                                                    className="text-emerald-500"
                                                    size={20}
                                                    strokeWidth={2.5}
                                                />
                                            )}
                                            {showWrong && (
                                                <XCircle
                                                    className="text-red-500"
                                                    size={20}
                                                    strokeWidth={2.5}
                                                />
                                            )}
                                            {!isAnswerChecked && (
                                                <div
                                                    className={`w-5 h-5 rounded-full border-2 transition-colors ${
                                                        isSelected
                                                            ? "border-batak-maroon bg-batak-maroon"
                                                            : "border-gray-300"
                                                    }`}
                                                >
                                                    {isSelected && (
                                                        <div className="w-full h-full rounded-full border-2 border-white" />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Action Area & Feedback */}
                        <div className="pt-4 border-t-2 border-gray-100 min-h-[100px] flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                {!isAnswerChecked ? (
                                    <motion.div
                                        key="btn-check"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <button
                                            onClick={handleCheckAnswer}
                                            disabled={!selectedOption}
                                            className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
                                                selectedOption
                                                    ? "bg-batak-maroon text-white hover:bg-batak-maroon/90 shadow-md active:translate-y-1"
                                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}
                                        >
                                            Periksa Jawaban
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="feedback"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`w-full p-5 rounded-xl border-2 flex flex-col gap-4 ${
                                            isCorrect
                                                ? "bg-emerald-50 border-emerald-200"
                                                : "bg-red-50 border-red-200"
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5">
                                                {isCorrect ? (
                                                    <CheckCircle2
                                                        className="text-emerald-600"
                                                        size={24}
                                                        strokeWidth={2.5}
                                                    />
                                                ) : (
                                                    <XCircle
                                                        className="text-red-600"
                                                        size={24}
                                                        strokeWidth={2.5}
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <h4
                                                    className={`font-black mb-1 ${isCorrect ? "text-emerald-800" : "text-red-800"}`}
                                                >
                                                    {isCorrect
                                                        ? "Hore! Jawabanmu Benar 🎉"
                                                        : "Ops! Kurang Tepat 🧐"}
                                                </h4>
                                                <p
                                                    className={`text-sm font-medium leading-relaxed ${isCorrect ? "text-emerald-700" : "text-red-700"}`}
                                                >
                                                    {!isCorrect && (
                                                        <span className="block mb-2 font-bold text-red-900">
                                                            Jawaban yang benar
                                                            adalah:{" "}
                                                            {currentQ.correctAnswers.join(
                                                                " atau ",
                                                            )}
                                                        </span>
                                                    )}
                                                    {currentQ.feedbackText(
                                                        selectedOption ||
                                                            currentQ
                                                                .correctAnswers[0],
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleNext}
                                            className="w-full bg-[#0f213a] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#1a3254] transition-all active:translate-y-1 shadow-sm mt-2"
                                        >
                                            <span>
                                                {currentQIndex <
                                                questions.length - 1
                                                    ? "Lanjut ke Misi Berikutnya"
                                                    : "Selesaikan Penyelidikan"}
                                            </span>
                                            <ArrowRight
                                                size={18}
                                                strokeWidth={2.5}
                                            />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
