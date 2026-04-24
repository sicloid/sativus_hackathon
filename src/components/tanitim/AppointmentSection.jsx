"use client";

import Link from 'next/link';
import { Bell, RefreshCw, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AppointmentSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="bg-orange-50 px-6 py-16 md:py-24 border-b-2 border-black overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Sol - Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="order-2 md:order-1 bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative aspect-[4/3] flex flex-col hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
        >
          <div className="border-b-2 border-black pb-4 mb-4 flex items-center justify-between">
            <h3 className="font-black text-xl">Randevularım</h3>
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div className="space-y-4 flex-1">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-green-100 border-2 border-black rounded-xl p-4 flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
              <div>
                <p className="font-black">Aşı Takvimi</p>
                <p className="text-sm font-bold">Yarın, 14:00</p>
              </div>
              <div className="w-4 h-4 bg-green-500 border-2 border-black rounded-full animate-pulse"></div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-blue-100 border-2 border-black rounded-xl p-4 flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
              <div>
                <p className="font-black">Kuaför</p>
                <p className="text-sm font-bold">15 Mayıs, 10:30</p>
              </div>
              <div className="w-4 h-4 bg-blue-500 border-2 border-black rounded-full"></div>
            </motion.div>
            <div className="bg-yellow-100 border-2 border-black rounded-xl p-4 flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] opacity-50">
               <div>
                <p className="font-black">Genel Kontrol</p>
                <p className="text-sm font-bold">Geçmiş</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sağ */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="order-1 md:order-2 space-y-8"
        >
          <div>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4">
              Karmaşıklığa Son Verin
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl font-bold tracking-tight text-gray-800">
              Veteriner ve bakım randevularınızı tek bir ekrandan kolayca yönetin, hiçbir önemli tarihi kaçırmayın.
            </motion.p>
          </div>

          <motion.div variants={containerVariants} className="flex flex-wrap gap-4">
            <motion.div variants={itemVariants} className="bg-white border-2 border-black rounded-xl p-4 flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
              <Bell className="w-6 h-6 text-red-500" />
              <span className="font-black text-lg">Akıllı Hatırlatıcılar</span>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white border-2 border-black rounded-xl p-4 flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
              <RefreshCw className="w-6 h-6 text-blue-500" />
              <span className="font-black text-lg">Anlık Senkronizasyon</span>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/hastane" className="inline-block bg-black text-white font-black tracking-tight text-xl px-8 py-4 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              PetVerse Care'e Git
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
