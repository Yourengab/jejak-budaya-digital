"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { 
  LayoutGrid, 
  BarChart3, 
  PieChart, 
  Users, 
  Table,
  Trophy,
  Lightbulb,
  ArrowRight
} from "lucide-react";

type FoodCount = {
  id: string;
  name: string;
  count: number;
};

const TABS = [
  { id: "ringkasan", label: "Ringkasan", icon: LayoutGrid },
  { id: "batang", label: "Diagram Batang", icon: BarChart3 },
  { id: "lingkaran", label: "Diagram Lingkaran", icon: PieChart },
  { id: "piktogram", label: "Piktogram", icon: Users },
  { id: "tabel", label: "Tabel Data", icon: Table },
];

export default function AnalisisPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("ringkasan");
  const [data, setData] = useState<FoodCount[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEmptyDataModal, setShowEmptyDataModal] = useState(false);

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
          setData(parsed);
          setIsLoaded(true);
        }, 0);
      } catch {
        console.error("Failed to parse data");
        setTimeout(() => setShowEmptyDataModal(true), 0);
      }
    } else {
      setTimeout(() => setShowEmptyDataModal(true), 0);
    }
  }, []);

  if (showEmptyDataModal) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] relative flex items-center justify-center p-4">
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
        
        {/* Modal Popup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="relative z-10 bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border-2 border-batak-cream"
        >
          <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shrink-0 border-4 border-white drop-shadow-sm">
            <Lightbulb size={40} strokeWidth={2.5} />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0f213a] mb-3 leading-tight">
            Yah, Datanya Masih Kosong! 😲
          </h2>
          <p className="text-[#3b4c68] text-sm sm:text-base font-medium mb-8 leading-relaxed">
            Kita belum bisa melihat hasil analisisnya nih karena kamu belum memasukkan jumlah survei dari teman-temanmu. Yuk, isi datanya dulu!
          </p>
          <button 
            onClick={() => router.replace("/input-data")}
            className="w-full bg-batak-maroon text-white font-bold py-3.5 sm:py-4 rounded-xl hover:bg-batak-maroon/90 active:translate-y-1 transition-all shadow-md text-sm sm:text-base"
          >
            Ayo Isi Data Survei
          </button>
        </motion.div>
      </main>
    );
  }

  if (!isLoaded) return null;

  // Derived calculations
  const totalRespondents = data.reduce((sum, item) => sum + item.count, 0);
  const maxCount = Math.max(...data.map(d => d.count), 0);
  // Find top foods (handle ties)
  const topFoods = data.filter(d => d.count === maxCount && maxCount > 0);
  const topFoodName = topFoods.length > 0 
    ? topFoods.map(f => f.name).join(" & ") 
    : "Belum ada data";

  const renderTabContent = () => {
    switch (activeTab) {
      case "ringkasan":
        return (
          <motion.div 
            key="ringkasan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
          >
            {/* Card 1: Total */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-batak-cream/50 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 text-batak-maroon rounded-full flex items-center justify-center mb-4 sm:mb-6 shrink-0">
                <Users size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-[#0f213a] font-bold text-sm sm:text-base mb-2">Total Responden</h3>
              <div className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-black text-batak-maroon leading-none mb-1">
                  {totalRespondents}
                </span>
                <span className="text-[#3b4c68] font-medium text-xs sm:text-sm">orang</span>
              </div>
            </div>

            {/* Card 2: Top Food */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-batak-cream/50 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#fef3c7] text-batak-gold rounded-full flex items-center justify-center mb-4 sm:mb-6 shrink-0">
                <Trophy size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-[#0f213a] font-bold text-sm sm:text-base mb-2">Makanan Paling Disukai</h3>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-black text-batak-maroon leading-tight mb-1 line-clamp-2">
                  {topFoodName}
                </span>
                <span className="text-[#3b4c68] font-medium text-xs sm:text-sm">
                  {maxCount > 0 ? `${maxCount} orang` : "-"}
                </span>
              </div>
            </div>

            {/* Card 3: Insight */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-batak-cream/50 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 shrink-0">
                <Lightbulb size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-[#0f213a] font-bold text-sm sm:text-base mb-2">Insight</h3>
              <p className="text-[#3b4c68] font-medium text-xs sm:text-sm leading-relaxed mt-2 max-w-50">
                {totalRespondents === 0 
                  ? "Belum ada data yang dikumpulkan. Ayo tanyakan ke teman-temanmu!"
                  : `${topFoodName} menjadi makanan yang paling banyak dipilih berdasarkan data survei.`}
              </p>
            </div>
          </motion.div>
        );

      case "batang":
        return (
          <motion.div 
            key="batang"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-batak-cream/50 w-full"
          >
            <h3 className="text-xl font-black text-center text-batak-brown mb-8">Diagram Batang Kesukaan Makanan</h3>
            <div className="flex flex-col gap-6">
              {data.map(food => {
                const percentage = maxCount === 0 ? 0 : (food.count / maxCount) * 100;
                return (
                  <div key={food.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="w-full sm:w-32 shrink-0 font-bold text-sm text-[#0f213a]">
                      {food.name}
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="flex-1 h-8 sm:h-10 bg-gray-100 rounded-r-xl overflow-hidden flex items-center">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, type: "spring", bounce: 0.2 }}
                          className="h-full bg-batak-maroon rounded-r-xl min-w-1"
                        />
                      </div>
                      <div className="w-8 shrink-0 font-bold text-batak-brown text-sm">
                        {food.count}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );

      case "lingkaran":
        // Calculate cumulative gradient for pie chart
        let cumulativePercent = 0;
        const colors = ["#b31b1b", "#e07a5f", "#f2cc8f", "#81b29a", "#3d405b"];
        const pieSlices = data.map((food, i) => {
          const pct = totalRespondents === 0 ? 0 : (food.count / totalRespondents) * 100;
          const start = cumulativePercent;
          cumulativePercent += pct;
          return { ...food, pct, start, end: cumulativePercent, color: colors[i % colors.length] };
        });

        const conicGradient = totalRespondents === 0 
          ? "conic-gradient(#e5e7eb 0 100%)" 
          : `conic-gradient(${pieSlices.map(s => `${s.color} ${s.start}% ${s.end}%`).join(", ")})`;

        return (
          <motion.div 
            key="lingkaran"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-batak-cream/50 w-full flex flex-col items-center"
          >
            <h3 className="text-xl font-black text-center text-batak-brown mb-8">Diagram Lingkaran Kesukaan Makanan</h3>
            
            <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
              {/* Pie Chart Circle */}
              <div 
                className="w-48 h-48 sm:w-64 sm:h-64 rounded-full shadow-inner border-4 border-white drop-shadow-md"
                style={{ background: conicGradient }}
              />

              {/* Legend */}
              <div className="flex flex-col gap-4">
                {pieSlices.map(slice => (
                  <div key={slice.id} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md shadow-sm" style={{ backgroundColor: slice.color }} />
                    <div className="font-bold text-sm text-[#0f213a] min-w-30">{slice.name}</div>
                    <div className="font-medium text-sm text-gray-500">
                      {slice.count} orang ({slice.pct.toFixed(1)}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case "piktogram":
        return (
          <motion.div 
            key="piktogram"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-batak-cream/50 w-full"
          >
            <h3 className="text-xl font-black text-center text-batak-brown mb-8">Piktogram Kesukaan Makanan</h3>
            
            <div className="flex flex-col gap-6">
              {data.map(food => (
                <div key={food.id} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 border-b border-gray-100 pb-6 last:border-0">
                  <div className="w-full sm:w-32 shrink-0 font-bold text-sm text-[#0f213a] sm:mt-1">
                    {food.name}
                  </div>
                  <div className="flex-1 flex flex-wrap gap-2">
                    {food.count === 0 && <span className="text-gray-400 text-sm italic">Tidak ada pemilih</span>}
                    {Array.from({ length: food.count }).map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: Math.min(i * 0.05, 1), type: "spring", stiffness: 300 }}
                        className="text-batak-maroon bg-red-50 p-1.5 rounded-lg"
                      >
                        <Users size={20} strokeWidth={2.5} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "tabel":
        return (
          <motion.div 
            key="tabel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-batak-cream/50 w-full overflow-hidden"
          >
            <h3 className="text-xl font-black text-center text-batak-brown mb-8">Tabel Data Kesukaan Makanan</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#fdfbf7] border-b-2 border-batak-cream">
                    <th className="p-4 font-bold text-[#0f213a]">No</th>
                    <th className="p-4 font-bold text-[#0f213a]">Nama Makanan</th>
                    <th className="p-4 font-bold text-[#0f213a]">Jumlah Pemilih</th>
                    <th className="p-4 font-bold text-[#0f213a]">Persentase</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((food, idx) => {
                    const pct = totalRespondents === 0 ? 0 : (food.count / totalRespondents) * 100;
                    return (
                      <tr key={food.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-500">{idx + 1}</td>
                        <td className="p-4 font-bold text-batak-brown">{food.name}</td>
                        <td className="p-4 font-medium text-[#0f213a]">{food.count} orang</td>
                        <td className="p-4 font-medium text-[#0f213a]">{pct.toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                  <tr className="bg-red-50/50 font-black text-batak-maroon">
                    <td className="p-4 text-right" colSpan={2}>Total Responden:</td>
                    <td className="p-4">{totalRespondents} orang</td>
                    <td className="p-4">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] relative flex flex-col">
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

      <div className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header Title */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f213a] mb-3"
          >
            Hasil Analisis Data
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#3b4c68] text-sm sm:text-base max-w-2xl mx-auto font-medium"
          >
            Berikut adalah contoh hasil analisis data dari survei makanan tradisional Batak Toba.
          </motion.p>
          
          {/* Decorative Divider */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 mt-6"
          >
            <div className="w-16 h-0.5 bg-batak-maroon/30" />
            <div className="w-3 h-3 rotate-45 border-2 border-batak-maroon" />
            <div className="w-16 h-0.5 bg-batak-maroon/30" />
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="w-full mx-auto mb-8 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex bg-[#fdfbf7] p-1.5 rounded-2xl border border-batak-cream shadow-sm min-w-max">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all relative ${
                    isActive ? "text-white" : "text-[#3b4c68] hover:bg-gray-100"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-batak-maroon rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="w-full mx-auto mb-10">
          <AnimatePresence mode="wait">
            {renderTabContent()}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div className="w-full mx-auto flex justify-center pb-8">
          <button 
            onClick={() => router.push("/detektif-data")}
            className="bg-batak-maroon text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 hover:bg-batak-maroon/90 transition-all active:translate-y-1 shadow-lg border-2 border-batak-maroon/20"
          >
            <span>Selanjutnya</span>
            <ArrowRight size={20} strokeWidth={3} />
          </button>
        </div>

      </div>
    </main>
  );
}
