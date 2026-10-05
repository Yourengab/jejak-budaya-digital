"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Info, Volume2 } from "lucide-react";

// Dummy data for now, images can be replaced later
const foodData = [
  {
    id: "lapet",
    name: "Lapet",
    image: "/assets/makanan/lapet.png",
    shortDesc: "Kue tradisional khas Batak dari tepung beras dan kelapa parut.",
    longDesc: "Lapet adalah jajanan tradisional khas Batak yang berasal dari Tapanuli. Kue ini biasanya dibentuk menyerupai limas dan dibungkus daun pisang, proses pembuatannya tidak begitu rumit, terbuat dari tepung beras, kelapa parut, dan gula merah sebagai isiannya.",
  },
  {
    id: "lemang",
    name: "Lemang",
    image: "/assets/makanan/lemang.png",
    shortDesc: "Beras ketan yang dimasak dalam seruas bambu.",
    longDesc: "Lemang adalah makanan dari beras ketan yang dimasak dalam seruas bambu, setelah sebelumnya digulung dengan selembar daun pisang. Gulungan daun bambu berisi beras ketan dicampur santan kelapa ini kemudian dibakar sampai matang.",
  },
  {
    id: "ombus",
    name: "Ombus Ombus",
    image: "/assets/makanan/ombus ombus.png",
    shortDesc: "Kue dari tepung beras dan gula merah khas Siborongborong.",
    longDesc: "Kue ombus-ombus adalah makanan atau jajanan khas Batak yang berasal dari Siborongborong, Tapanuli Utara. Terbuat dari tepung beras yang diberi gula di tengahnya dan dibungkus dengan daun pisang, nikmat disajikan selagi hangat (dihembus-hembus).",
  },
  {
    id: "bika",
    name: "Bika Ambon",
    image: "/assets/makanan/bika ambon.png",
    shortDesc: "Kue pipih berwarna kuning dengan tekstur bersarang.",
    longDesc: "Bika Ambon adalah kue tradisional khas Medan, Sumatera Utara. Kue ini terbuat dari bahan-bahan seperti tepung tapioka, telur, gula, dan santan. Memiliki tekstur unik yang bersarang dan aroma harum pandan atau daun jeruk.",
  }
];

export default function KenaliBudaya() {
  const [selectedFood, setSelectedFood] = useState<typeof foodData[0] | null>(null);
  const [showMascot] = useState(true);

  return (
    <main className="flex-1 relative flex flex-col h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 bg-[#faf8f5]">
        <Image 
          src="/assets/budaya/bg.png" 
          alt="Background Pattern" 
          fill
          className="object-cover object-center opacity-10" 
          priority
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 pt-4 lg:pt-6 pb-2 min-h-0">
        
        {/* Header Section */}
        <div className="flex flex-col mb-6 lg:mb-8 shrink-0">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="text-batak-maroon font-bold tracking-widest text-[10px] sm:text-xs mb-2 flex items-center gap-3 uppercase">
              Kenali Budaya
              <div className="w-12 h-0.5 bg-batak-maroon rounded-full"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-batak-brown mb-2 leading-tight flex flex-col">
              <span>Kenali Makanan Tradisional</span>
              <span className="text-batak-maroon mt-1">Batak Toba</span>
            </h1>
            <p className="text-batak-brown/80 text-sm sm:text-base leading-relaxed max-w-lg mt-3 mb-5">
              Yuk, kenali dulu makanan tradisional yang akan kita jelajahi! Setiap makanan punya cerita, rasa, dan nilai budaya yang unik.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link 
                href="/survei" 
                className="inline-flex items-center justify-center gap-1.5 bg-batak-maroon text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm hover:bg-batak-maroon/90 transition-all shadow-md active:translate-y-1"
              >
                <span>Selanjutnya</span> 
                <ArrowRight size={14} strokeWidth={3} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Content Row: Cards and Mascot */}
        <div className="flex-1 flex gap-4 min-h-0 pb-2">
          
          {/* Food Cards Grid */}
          <motion.div 
            className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 overflow-y-auto pr-1 pb-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {foodData.map((food) => (
            <motion.div 
              key={food.id}
              onClick={() => setSelectedFood(food)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className="bg-white rounded-4xl p-3 sm:p-4 border-3 border-batak-cream shadow-[4px_4px_0px_0px_rgba(0,0,0,0.06)] h-76 sm:h-80 flex flex-col group transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[4px_8px_0px_0px_rgba(0,0,0,0.06)]"
            >
              {/* Food Image */}
              <div className="w-full h-28 lg:h-32 bg-[#faf8f5] rounded-3xl mb-3 flex items-center justify-center relative overflow-hidden border-2 border-batak-cream/60 shrink-0 group-hover:border-batak-maroon/30 transition-colors">
                <Image 
                  src={food.image}
                  alt={food.name}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-batak-brown to-transparent"></div>
              </div>
              
              <h3 className="font-black text-batak-brown text-lg mb-1 text-center">{food.name}</h3>
              <p className="text-batak-brown/70 text-[11px] sm:text-xs mb-3 flex-1 text-center line-clamp-3 font-medium">
                {food.shortDesc}
              </p>
              
              <button 
                onClick={() => setSelectedFood(food)}
                className="w-full py-2.5 px-3 rounded-2xl bg-[#faf8f5] text-batak-maroon text-sm font-bold flex items-center justify-center gap-2 group-hover:bg-batak-maroon group-hover:text-white transition-colors border-2 border-batak-cream group-hover:border-batak-maroon shrink-0"
              >
                <span>Lihat Detail</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Mascot Section (Right side) */}
        <AnimatePresence>
          {showMascot && (
            <motion.div
              key="mascot"
              className="hidden lg:flex w-1/4 shrink-0 flex-col items-center justify-center relative z-40 -translate-y-64"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
              {/* Speech Bubble */}
              <motion.div
                className="relative bg-white/95 backdrop-blur-sm text-batak-brown p-4 rounded-3xl rounded-br-none shadow-md border border-batak-cream mb-4 w-60"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-bold text-base leading-tight">Kenali Budaya Kita!</p>
                  <button 
                    className="text-batak-maroon hover:text-white hover:bg-batak-maroon bg-batak-cream/30 p-1.5 rounded-full transition-colors shrink-0"
                    aria-label="Putar Audio"
                  >
                    <Volume2 size={14} strokeWidth={2.5} />
                  </button>
                </div>
                <p className="text-xs sm:text-sm font-medium opacity-80 leading-relaxed">
                  Pilih salah satu makanan untuk mengetahui fakta uniknya.
                </p>
                
                {/* Bubble Tail pointing down-right */}
                <div className="absolute -bottom-2 right-4 w-5 h-5 bg-white/95 border-b border-r border-batak-cream transform rotate-45 rounded-sm -z-10" />
              </motion.div>

              {/* Mascot Image Wrapper (h-0 prevents scrolling) */}
              <div className="relative w-[170%] h-0 shrink-0">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-full h-80 xl:h-140 drop-shadow-2xl translate-x-4"
                >
                  <Image 
                    src="/assets/budaya/mascot.png" 
                    alt="Maskot" 
                    fill
                    sizes="(max-width: 1024px) 210px, 260px"
                    className="object-contain object-bottom" 
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        </div>
      </div>



      {/* Food Detail Modal */}
      <AnimatePresence>
        {selectedFood && (
          <motion.div 
            key="food-modal"
            className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-batak-black/60 backdrop-blur-sm transform-gpu" 
              onClick={() => setSelectedFood(null)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-[#faf8f5] w-full max-w-2xl rounded-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Image Section */}
              <div className="w-full md:w-2/5 h-48 md:h-auto bg-[#faf8f5] flex items-center justify-center relative border-b-4 md:border-b-0 md:border-r-4 border-batak-cream/30">
                 <Image 
                   src={selectedFood.image}
                   alt={selectedFood.name}
                   fill
                   className="object-cover object-center"
                 />
                 <div className="absolute inset-0 bg-white/20 mix-blend-overlay"></div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col relative bg-white">
                <button 
                  onClick={() => setSelectedFood(null)}
                  className="absolute top-4 right-4 text-batak-brown/40 hover:text-batak-maroon bg-batak-cream/30 hover:bg-batak-cream p-2 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
                
                <div className="flex items-center gap-2 text-batak-maroon font-bold text-xs uppercase tracking-widest mb-2">
                  <Info size={14} /> Makanan Tradisional
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold text-batak-brown mb-4">
                  {selectedFood.name}
                </h2>
                
                <p className="text-batak-brown/80 text-sm sm:text-base leading-relaxed mb-6">
                  {selectedFood.longDesc}
                </p>
                
                <div className="mt-auto pt-4">
                  <button 
                    onClick={() => setSelectedFood(null)}
                    className="w-full py-3.5 bg-batak-maroon hover:bg-batak-maroon/90 text-white font-bold rounded-xl transition-colors shadow-lg shadow-batak-maroon/20"
                  >
                    Tutup Detail
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
