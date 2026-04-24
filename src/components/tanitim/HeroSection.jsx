"use client";

import Link from 'next/link';
import { Calendar, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-orange-50 px-6 py-16 md:py-24 border-b-2 border-black overflow-hidden">
      {/* Background Grid Pattern & Animated Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <motion.div 
        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-black mb-6 max-w-4xl leading-tight">
            Gençlik Enerjisi Seninle, <span className="text-blue-600 inline-block">Sevgin Patilerle!</span>
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl font-bold tracking-tight text-gray-800 mb-12 max-w-2xl"
        >
          Sevimli dostlarınız için ihtiyacınız olan her şey tek bir platformda.
        </motion.p>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
        >
          {/* Blog Kartı */}
          <motion.div variants={itemVariants} className="h-full">
            <Link href="/blog" className="h-full bg-blue-600 border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-end min-h-[250px] text-white">
              <h3 className="text-2xl font-black tracking-tight mb-2">Blog Oku</h3>
              <p className="font-bold">Dostunuz için en iyi ipuçları</p>
            </Link>
          </motion.div>

          <div className="md:col-span-2 grid grid-cols-1 gap-6">
            {/* PetVerse Care Kartı */}
            <motion.div variants={itemVariants} className="h-full">
              <Link href="/hastane" className="h-full bg-green-400 border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-4 text-black">
                <div className="bg-white p-4 border-2 border-black rounded-xl">
                  <span className="text-3xl leading-none">🐾</span>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-black tracking-tight">PetVerse Care</h3>
                  <p className="font-bold">Randevu, Karne, Teşhis</p>
                </div>
              </Link>
            </motion.div>

            {/* Mağaza Şeridi */}
            <motion.div variants={itemVariants} className="h-full">
              <Link href="/urunler" className="h-full bg-yellow-300 border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-4 text-black">
                <div className="bg-white p-4 border-2 border-black rounded-xl">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-black tracking-tight">Mağaza</h3>
                  <p className="font-bold">Oyuncak, mama, aksesuar</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
