"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
    Home,
    Download,
    Trash2,
    CheckCircle2,
    XCircle,
    Trophy,
    Users,
    BarChart3,
    Star,
    X,
    FileText,
    Sparkles,
    ChevronRight,
} from "lucide-react";

type FoodCount = {
    id: string;
    name: string;
    count: number;
    image?: string;
};

type QuizAnswer = {
    question: string;
    selected: string;
    correct: boolean;
};

const FOOD_IMAGES: Record<string, string> = {
    lapet: "/assets/makanan/lapet.png",
    lemang: "/assets/makanan/lemang.png",
    ombus: "/assets/makanan/ombus ombus.png",
    bika: "/assets/makanan/bika ambon.png",
};

const FOOD_ID_MAP: Record<string, string> = {
    Lapet: "lapet",
    Lemang: "lemang",
    "Ombus-ombus": "ombus",
    "Bika Ambon": "bika",
};

const CHART_COLORS = ["#EA2426", "#D97706", "#2D5A43", "#3B82F6"];

export default function OverviewPage() {
    const router = useRouter();

    const [surveyData, setSurveyData] = useState<FoodCount[]>([]);
    const [quizResults, setQuizResults] = useState<QuizAnswer[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showNameModal, setShowNameModal] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [nameError, setNameError] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("surveiData");
        const quiz = localStorage.getItem("quizResults");
        
        let newSurveyData: FoodCount[] = [];
        let newQuizResults: QuizAnswer[] = [];
        let block = false;

        if (saved) {
            try { newSurveyData = JSON.parse(saved); } catch { /* ignore */ }
        }
        if (quiz) {
            try {
                const parsed: QuizAnswer[] = JSON.parse(quiz);
                if (parsed.length === 0) {
                    block = true;
                } else {
                    newQuizResults = parsed;
                }
            } catch {
                block = true;
            }
        } else {
            block = true;
        }

        setTimeout(() => {
            setSurveyData(newSurveyData);
            setQuizResults(newQuizResults);
            setShowBlockModal(block);
            setIsLoaded(true);
        }, 0);
    }, []);

    const totalResponden = surveyData.reduce((s, f) => s + f.count, 0);
    const maxCount = surveyData.length > 0 ? Math.max(...surveyData.map((d) => d.count)) : 0;
    const topFoods = surveyData.filter((d) => d.count === maxCount && maxCount > 0);
    const correctCount = quizResults.filter((q) => q.correct).length;
    const quizScore = quizResults.length > 0 ? Math.round((correctCount / quizResults.length) * 100) : 0;

    const handleDownloadClick = () => {
        setNameInput("");
        setNameError("");
        setShowNameModal(true);
    };

    const handleNameSubmit = () => {
        if (!nameInput.trim()) {
            setNameError("Nama tidak boleh kosong.");
            return;
        }
        const name = nameInput.trim();
        setShowNameModal(false);
        setTimeout(() => triggerPrint(name, surveyData, quizResults, totalResponden, topFoods, correctCount, quizScore), 150);
    };

    const handleClearData = () => {
        localStorage.clear();
        router.push("/home");
    };

    if (!isLoaded) return null;

    if (showBlockModal) {
        return (
            <main className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] relative flex items-center justify-center p-4">
                <div className="fixed inset-0 z-0 bg-[#faf8f5]">
                    <Image src="/assets/budaya/bg.png" alt="Background" fill className="object-cover opacity-40" priority />
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="relative z-10 bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border-2 border-batak-cream"
                >
                    <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                        🔍
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0f213a] mb-3 leading-tight">
                        Misi Belum Selesai!
                    </h2>
                    <p className="text-[#3b4c68] text-sm sm:text-base font-medium mb-8 leading-relaxed">
                        Kamu harus menyelesaikan semua soal <strong>Detektif Data & Misi</strong> terlebih dahulu sebelum bisa melihat overview.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => router.replace("/detektif-data")}
                            className="w-full bg-batak-maroon text-white font-bold py-3.5 rounded-xl hover:bg-batak-maroon/90 active:translate-y-1 transition-all shadow-md"
                        >
                            Selesaikan Misi Dulu →
                        </button>
                        <button
                            onClick={() => router.replace("/home")}
                            className="w-full bg-batak-cream text-[#0f213a] font-bold py-3 rounded-xl hover:bg-batak-cream/70 active:translate-y-1 transition-all"
                        >
                            Kembali ke Beranda
                        </button>
                    </div>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="flex-1 relative flex flex-col min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] overflow-x-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0 bg-[#faf8f5]">
                <Image src="/assets/budaya/bg.png" alt="Background" fill className="object-cover opacity-40" priority />
                <div className="absolute inset-0 bg-linear-to-b from-batak-cream/80 via-transparent to-batak-cream/60" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 pb-28">

                {/* Hero Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-batak-maroon/10 text-batak-maroon font-bold text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-4 border border-batak-maroon/20">
                        <Sparkles size={14} /> Laporan Lengkap
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-[#0f213a] mb-3 leading-tight">
                        Overview Perjalananmu! 🎉
                    </h1>
                    <p className="text-[#3b4c68] text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
                        Rangkuman hasil survei dan misi detektif data yang sudah kamu selesaikan.
                    </p>
                </motion.div>

                {/* Stats Row */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                    <StatCard icon={<Users size={20} />} label="Total Responden" value={`${totalResponden} orang`} color="blue" />
                    <StatCard icon={<BarChart3 size={20} />} label="Makanan Disurvei" value={`${surveyData.length} jenis`} color="green" />
                    <StatCard icon={<Trophy size={20} />} label="Skor Detektif" value={`${quizScore}%`} color="gold" className="col-span-2 sm:col-span-1" />
                </motion.div>

                {/* Survey Results */}
                <SectionCard delay={0.15} icon={<BarChart3 size={20} />} title="Hasil Survei Makanan" subtitle="Data pilihan teman-temanmu">
                    {surveyData.length === 0 ? (
                        <p className="text-center text-[#3b4c68]/60 font-medium py-6">Tidak ada data survei.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {surveyData.slice().sort((a, b) => b.count - a.count).map((food, idx) => {
                                const imgKey = FOOD_ID_MAP[food.name] || food.id;
                                const imgSrc = food.image || FOOD_IMAGES[imgKey] || "";
                                const pct = totalResponden > 0 ? (food.count / totalResponden) * 100 : 0;
                                const isTop = topFoods.some((t) => t.id === food.id);
                                return (
                                    <motion.div key={food.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + idx * 0.07 }}
                                        className={`flex items-center gap-4 p-3 rounded-2xl border-2 transition-all ${isTop ? "border-batak-maroon/30 bg-red-50" : "border-batak-cream bg-white"}`}
                                    >
                                        <div className="w-14 h-14 rounded-xl bg-white border-2 border-batak-cream/60 relative shrink-0 overflow-hidden">
                                            {imgSrc ? (
                                                <Image src={imgSrc} alt={food.name} fill className="object-contain p-1" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">?</div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="font-black text-[#0f213a] text-sm">{food.name}</p>
                                                    {isTop && (
                                                        <span className="bg-batak-maroon text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                                            <Star size={9} fill="currentColor" /> Favorit
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="font-black text-sm text-[#0f213a] shrink-0 ml-2">
                                                    {food.count} <span className="font-medium text-[#3b4c68]/70 text-xs">orang</span>
                                                </span>
                                            </div>
                                            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pct}%` }}
                                                    transition={{ duration: 0.8, delay: 0.3 + idx * 0.07, ease: "easeOut" }}
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                                                />
                                            </div>
                                            <p className="text-[10px] text-[#3b4c68]/60 font-medium mt-1">{pct.toFixed(1)}% dari total</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </SectionCard>

                {/* Favorite Banner */}
                {topFoods.length > 0 && (
                    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }}
                        className="my-4 p-5 rounded-2xl bg-linear-to-r from-batak-maroon to-[#c41f1f] text-white flex items-center gap-4 shadow-lg shadow-batak-maroon/20"
                    >
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                            <Trophy size={24} />
                        </div>
                        <div>
                            <p className="font-black text-base leading-tight">
                                {topFoods.length === 1
                                    ? `"${topFoods[0].name}" jadi makanan paling favorit!`
                                    : `"${topFoods.map((f) => f.name).join(" & ")}" sama-sama favorit!`}
                            </p>
                            <p className="text-white/80 text-xs font-medium mt-0.5">Dipilih oleh {maxCount} orang</p>
                        </div>
                    </motion.div>
                )}

                {/* Quiz Results */}
                <SectionCard delay={0.4} icon={<Trophy size={20} />} title="Hasil Misi Detektif Data" subtitle={`${correctCount} dari ${quizResults.length} soal dijawab benar`}>
                    {quizResults.length === 0 ? (
                        <div className="text-center py-6">
                            <p className="text-[#3b4c68]/60 font-medium mb-3">Belum ada hasil misi detektif.</p>
                            <button onClick={() => router.push("/detektif-data")} className="text-batak-maroon font-bold underline text-sm">
                                Kerjakan sekarang →
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {/* Score Banner */}
                            <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${quizScore === 100 ? "bg-emerald-50 border-emerald-200" : quizScore >= 67 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200"}`}>
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-2xl shrink-0 ${quizScore === 100 ? "bg-emerald-500 text-white" : quizScore >= 67 ? "bg-amber-500 text-white" : "bg-red-400 text-white"}`}>
                                    {quizScore}
                                </div>
                                <div>
                                    <p className="font-black text-[#0f213a] text-sm">
                                        {quizScore === 100 ? "Sempurna! Kamu Detektif Handal! 🏆" : quizScore >= 67 ? "Bagus! Hampir Sempurna! ⭐" : "Tetap Semangat Belajar! 💪"}
                                    </p>
                                    <p className="text-[#3b4c68]/70 text-xs font-medium mt-0.5">{correctCount}/{quizResults.length} benar · Skor {quizScore}/100</p>
                                </div>
                            </div>

                            {/* Per-question breakdown */}
                            {quizResults.map((answer, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + idx * 0.08 }}
                                    className={`p-4 rounded-xl border-2 ${answer.correct ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-0.5 shrink-0 ${answer.correct ? "text-emerald-600" : "text-red-500"}`}>
                                            {answer.correct ? <CheckCircle2 size={20} strokeWidth={2.5} /> : <XCircle size={20} strokeWidth={2.5} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-[#3b4c68]/70 mb-1">Soal {idx + 1}</p>
                                            <p className="text-sm font-bold text-[#0f213a] mb-2 leading-snug">{answer.question}</p>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <ChevronRight size={14} className="text-[#3b4c68]/50 shrink-0" />
                                                <span className={`text-sm font-black ${answer.correct ? "text-emerald-700" : "text-red-700"}`}>
                                                    {answer.selected || "(tidak dijawab)"}
                                                </span>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${answer.correct ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
                                                    {answer.correct ? "Benar ✓" : "Salah ✗"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </SectionCard>
            </div>

            {/* Fixed Bottom Action Bar */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: "spring" }}
                className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-white/90 backdrop-blur-md border-t border-batak-cream shadow-2xl"
            >
                <div className="max-w-4xl mx-auto flex items-center gap-2 sm:gap-3">
                    <button onClick={handleDownloadClick}
                        className="flex-1 flex items-center justify-center gap-2 bg-batak-maroon text-white font-bold py-3 sm:py-3.5 rounded-xl hover:bg-batak-maroon/90 active:translate-y-1 transition-all shadow-md shadow-batak-maroon/25 text-sm sm:text-base"
                    >
                        <Download size={17} strokeWidth={2.5} />
                        <span>Download PDF</span>
                    </button>
                    <button onClick={() => router.push("/home")}
                        className="flex items-center justify-center gap-2 bg-[#f4ebd9] text-[#0f213a] font-bold py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl hover:bg-[#eadebd] active:translate-y-1 transition-all border-2 border-[#e8dcc8] text-sm sm:text-base shrink-0"
                    >
                        <Home size={17} strokeWidth={2.5} />
                        <span className="hidden sm:inline">Beranda</span>
                    </button>
                    <button onClick={() => setShowClearModal(true)}
                        className="flex items-center justify-center gap-2 bg-gray-100 text-red-600 font-bold py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl hover:bg-red-50 active:translate-y-1 transition-all border-2 border-red-100 text-sm sm:text-base shrink-0"
                    >
                        <Trash2 size={17} strokeWidth={2.5} />
                        <span className="hidden sm:inline">Hapus Data</span>
                    </button>
                </div>
            </motion.div>

            {/* Name Input Modal */}
            <AnimatePresence>
                {showNameModal && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowNameModal(false)}
                        />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 24 }}
                            transition={{ type: "spring", stiffness: 350, damping: 28 }}
                            className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border-2 border-batak-cream"
                        >
                            <button onClick={() => setShowNameModal(false)}
                                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                            >
                                <X size={18} />
                            </button>
                            <div className="w-14 h-14 bg-red-50 text-batak-maroon rounded-2xl flex items-center justify-center mx-auto mb-5">
                                <FileText size={28} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-black text-[#0f213a] text-center mb-1">Siapa Namamu?</h3>
                            <p className="text-[#3b4c68]/70 text-sm text-center mb-6 font-medium leading-relaxed">
                                Namamu akan tercantum dalam laporan PDF yang diunduh.
                            </p>
                            <div className="mb-5">
                                <label className="block text-xs font-bold text-[#3b4c68] mb-1.5 uppercase tracking-wide">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={nameInput}
                                    onChange={(e) => { setNameInput(e.target.value); setNameError(""); }}
                                    onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                                    placeholder="Contoh: Budi Santoso"
                                    autoFocus
                                    className={`w-full px-4 py-3 rounded-xl border-2 font-medium text-[#0f213a] focus:outline-none transition-all ${nameError ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200" : "border-batak-cream focus:ring-2 focus:ring-batak-maroon/20"}`}
                                />
                                {nameError && <p className="text-red-500 text-xs font-bold mt-1.5">{nameError}</p>}
                            </div>
                            <button onClick={handleNameSubmit}
                                className="w-full bg-batak-maroon text-white font-bold py-3.5 rounded-xl hover:bg-batak-maroon/90 active:translate-y-1 transition-all shadow-md shadow-batak-maroon/20 flex items-center justify-center gap-2"
                            >
                                <Download size={18} strokeWidth={2.5} /> Download PDF
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Clear Data Confirmation Modal */}
            <AnimatePresence>
                {showClearModal && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowClearModal(false)}
                        />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 24 }}
                            transition={{ type: "spring", stiffness: 350, damping: 28 }}
                            className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border-2 border-batak-cream text-center"
                        >
                            <div className="w-14 h-14 bg-red-100 text-batak-maroon rounded-full flex items-center justify-center mx-auto mb-5">
                                <Trash2 size={28} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-black text-[#0f213a] mb-2">Hapus Semua Data?</h3>
                            <p className="text-[#3b4c68]/70 text-sm font-medium mb-6 leading-relaxed">
                                Seluruh data survei dan hasil detektif data akan dihapus permanen. Kamu akan diarahkan ke beranda.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setShowClearModal(false)}
                                    className="flex-1 px-4 py-3 bg-batak-cream/50 hover:bg-batak-cream text-[#0f213a] font-bold rounded-xl transition-colors"
                                >Batal</button>
                                <button onClick={handleClearData}
                                    className="flex-1 px-4 py-3 bg-batak-maroon hover:bg-batak-maroon/90 text-white font-bold rounded-xl transition-colors shadow-md shadow-batak-maroon/20"
                                >Ya, Hapus</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, color, className = "" }: {
    icon: React.ReactNode; label: string; value: string;
    color: "blue" | "green" | "gold"; className?: string;
}) {
    const colorMap = {
        blue:  { bg: "bg-blue-50",    text: "text-blue-600",    border: "border-blue-100"    },
        green: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
        gold:  { bg: "bg-amber-50",   text: "text-amber-600",   border: "border-amber-100"   },
    };
    const c = colorMap[color];
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className={`${c.bg} border-2 ${c.border} rounded-2xl p-4 flex flex-col items-start gap-2 ${className}`}
        >
            <div className={`${c.text} p-2 rounded-xl border ${c.border} bg-white/60`}>{icon}</div>
            <div>
                <p className="text-xs font-bold text-[#3b4c68]/70 uppercase tracking-wide">{label}</p>
                <p className="text-xl font-black text-[#0f213a] leading-tight">{value}</p>
            </div>
        </motion.div>
    );
}

function SectionCard({ icon, title, subtitle, delay, children }: {
    icon: React.ReactNode; title: string; subtitle?: string;
    delay: number; children: React.ReactNode;
}) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 sm:p-6 shadow-lg border-2 border-white/50 mb-4"
        >
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-batak-cream/70 text-batak-maroon rounded-xl flex items-center justify-center shrink-0">{icon}</div>
                <div>
                    <h2 className="text-base sm:text-lg font-black text-[#0f213a] leading-tight">{title}</h2>
                    {subtitle && <p className="text-xs font-medium text-[#3b4c68]/60">{subtitle}</p>}
                </div>
            </div>
            {children}
        </motion.div>
    );
}

// ─── PDF Print Helper ──────────────────────────────────────────────────────────

function triggerPrint(
    name: string,
    surveyData: FoodCount[],
    quizResults: QuizAnswer[],
    totalResponden: number,
    topFoods: FoodCount[],
    correctCount: number,
    quizScore: number
) {
    const dateStr = new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    const surveyRows = surveyData.slice().sort((a, b) => b.count - a.count).map((food) => {
        const pct = totalResponden > 0 ? ((food.count / totalResponden) * 100).toFixed(1) : "0.0";
        const isTop = topFoods.some((t) => t.id === food.id) && food.count > 0;
        return `<tr style="border-bottom:1px solid #f4ebd9;">
          <td style="padding:10px 12px;font-weight:700;color:#0f213a;">${food.name}${isTop ? " ⭐" : ""}</td>
          <td style="padding:10px 12px;text-align:center;font-weight:700;">${food.count} orang</td>
          <td style="padding:10px 12px;text-align:center;color:#3b4c68;">${pct}%</td>
          <td style="padding:10px 12px;"><div style="background:#f0f0f0;border-radius:99px;height:8px;overflow:hidden;"><div style="background:#EA2426;height:8px;border-radius:99px;width:${pct}%;"></div></div></td>
        </tr>`;
    }).join("");

    const quizRows = quizResults.map((a, i) => `
      <tr style="border-bottom:1px solid #f4ebd9;">
        <td style="padding:10px 12px;color:#3b4c68;font-weight:600;">Soal ${i + 1}</td>
        <td style="padding:10px 12px;color:#0f213a;font-size:12px;">${a.question}</td>
        <td style="padding:10px 12px;font-weight:700;color:${a.correct ? "#16a34a" : "#dc2626"};">${a.selected || "-"}</td>
        <td style="padding:10px 12px;text-align:center;"><span style="background:${a.correct ? "#dcfce7" : "#fee2e2"};color:${a.correct ? "#16a34a" : "#dc2626"};font-weight:700;padding:3px 10px;border-radius:99px;font-size:11px;">${a.correct ? "Benar ✓" : "Salah ✗"}</span></td>
      </tr>`).join("");

    const html = `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/>
<title>Laporan – ${name}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:Arial,sans-serif;color:#0f213a;background:#fff;padding:32px;font-size:14px;}
h1{font-size:24px;font-weight:700;}
h2{font-size:15px;font-weight:700;margin-bottom:12px;}
.badge{display:inline-block;background:#fdf2f2;color:#EA2426;border:1px solid #fca5a5;padding:3px 12px;border-radius:99px;font-size:11px;font-weight:700;text-transform:uppercase;margin-bottom:8px;}
.header{border-bottom:3px solid #EA2426;padding-bottom:14px;margin-bottom:22px;}
.meta{color:#3b4c68;font-size:12px;margin-top:4px;}
.section{background:#fdfbf7;border:1px solid #f4ebd9;border-radius:12px;padding:18px;margin-bottom:18px;}
table{width:100%;border-collapse:collapse;}
th{background:#f4ebd9;padding:9px 12px;text-align:left;font-size:11px;font-weight:700;color:#3b4c68;text-transform:uppercase;}
td{vertical-align:middle;}
.score-box{display:inline-flex;align-items:center;gap:14px;background:#fff8f0;border:2px solid #EA2426;border-radius:10px;padding:10px 18px;margin-bottom:14px;}
.score-num{font-size:34px;font-weight:700;color:#EA2426;}
.footer{margin-top:28px;text-align:center;color:#3b4c68;font-size:11px;border-top:1px solid #f4ebd9;padding-top:14px;}
@media print{button{display:none;}}
</style></head><body>
<div class="header">
  <div class="badge">Jejak Data Budaya</div>
  <h1>Laporan Overview Survei</h1>
  <p class="meta">Nama: <strong>${name}</strong> &nbsp;|&nbsp; Tanggal: ${dateStr}</p>
</div>
<div class="section">
  <h2>📊 Hasil Survei Makanan Tradisional</h2>
  <p style="color:#3b4c68;font-size:12px;margin-bottom:14px;">Total responden: <strong>${totalResponden} orang</strong></p>
  <table><thead><tr><th>Makanan</th><th>Jumlah</th><th>Persentase</th><th>Bar</th></tr></thead><tbody>${surveyRows}</tbody></table>
  <p style="margin-top:12px;font-size:12px;color:#3b4c68;">⭐ Makanan favorit: <strong>${topFoods.map((f) => f.name).join(", ")}</strong> (${topFoods[0]?.count ?? 0} suara)</p>
</div>
<div class="section">
  <h2>🔍 Hasil Misi Detektif Data</h2>
  <div class="score-box">
    <span class="score-num">${quizScore}</span>
    <div><div><strong>${correctCount}/${quizResults.length}</strong> soal benar</div>
    <div style="font-size:12px;color:#3b4c68;">${quizScore === 100 ? "Sempurna! 🏆" : quizScore >= 67 ? "Bagus! ⭐" : "Terus Belajar! 💪"}</div></div>
  </div>
  <table><thead><tr><th>Soal</th><th>Pertanyaan</th><th>Jawaban</th><th>Status</th></tr></thead><tbody>${quizRows}</tbody></table>
</div>
<div class="footer"><p>Laporan oleh <strong>${name}</strong> · <em>Jejak Data Budaya</em> · Semangat menjaga budaya Batak! 🎊</p></div>
</body></html>`;

    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); w.close(); }, 500);
}
