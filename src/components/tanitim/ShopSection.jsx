"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ShopSection() {
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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="bg-yellow-50 px-6 py-16 md:py-24 border-b-2 border-black overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Sol */}
        <div className="space-y-6">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black tracking-tight text-black">
            Güvenli ve Hızlı Alışveriş
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl font-bold tracking-tight text-gray-800">
            Dostunuzun tüm ihtiyaçları için seçkin markalar, güvenilir ürünler ve hızlı teslimat avantajları sizi bekliyor.
          </motion.p>
          <motion.div variants={itemVariants} className="pt-4">
            <Link href="/urunler" className="inline-block bg-blue-600 text-white font-black tracking-tight text-xl px-8 py-4 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              Mağazayı Keşfet
            </Link>
          </motion.div>
        </div>

        {/* Sağ */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="bg-orange-100 border-2 border-black rounded-2xl min-h-[300px] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden relative cursor-pointer"
        >
          <img 
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800" 
            alt="PetVerse Mağaza" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
