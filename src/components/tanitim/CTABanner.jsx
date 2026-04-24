"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTABanner() {
  return (
    <section className="relative bg-green-800 px-6 py-20 border-b-2 border-black text-center overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400 to-transparent opacity-20 pointer-events-none"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
        className="relative z-10 max-w-4xl mx-auto space-y-8"
      >
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
          Sorularınız mı Var?
        </h2>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/sss" className="inline-block bg-white text-green-800 font-black tracking-tight text-xl px-8 py-4 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
            SSS Sayfasına Git
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
