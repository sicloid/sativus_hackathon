"use client";

import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogSection() {
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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="bg-white px-6 py-16 md:py-24 border-b-2 border-black overflow-hidden">
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
            Bilgi Paylaştıkça Çoğalır
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl font-bold tracking-tight text-gray-800">
            Evcil hayvanınızın sağlığı, beslenmesi ve eğitimi hakkında bilmeniz gereken her şeyi uzman içeriklerimizle öğrenin.
          </motion.p>
          <motion.ul variants={containerVariants} className="space-y-4 pt-4">
            <motion.li variants={itemVariants} className="flex items-center gap-3 font-black text-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              Uzman içeriklere erişim
            </motion.li>
            <motion.li variants={itemVariants} className="flex items-center gap-3 font-black text-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
              Haftalık yeni makaleler
            </motion.li>
            <motion.li variants={itemVariants} className="flex items-center gap-3 font-black text-lg">
              <CheckCircle className="w-6 h-6 text-orange-500" />
              Topluluk destekli bilgi bankası
            </motion.li>
          </motion.ul>
        </div>

        {/* Sağ */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="bg-blue-100 border-2 border-black rounded-2xl min-h-[300px] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden relative cursor-pointer"
        >
          <img src="https://picsum.photos/id/237/800/600" alt="Blog Görseli" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors z-10" />
        </motion.div>
      </motion.div>
    </section>
  );
}
