"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "PetVerse nedir?",
    answer: "PetVerse, evcil hayvan sahiplerinin tüm ihtiyaçlarını (sağlık, bakım, alışveriş) tek bir platformdan yönetebildiği kapsamlı bir ekosistemdir."
  },
  {
    question: "Randevu sistemi nasıl çalışır?",
    answer: "İstediğiniz veteriner veya kuaförden uygun saati seçerek saniyeler içinde randevu oluşturabilir ve anlık onay alabilirsiniz."
  },
  {
    question: "AI Teşhis özelliği ücretli mi?",
    answer: "Temel semptom kontrolü ücretsizdir, ancak derinlemesine analizler için Plus aboneliği gerekmektedir."
  },
  {
    question: "Dijital Pet Karnesi nedir?",
    answer: "Dostunuzun aşılarını, geçmiş tedavilerini ve sağlık verilerini her an yanınızda taşımanızı sağlayan dijital bir sağlık takip sistemidir."
  },
  {
    question: "PetVerse Care üzerinden nasıl randevu alırım?",
    answer: "Hekim listesinden dilediğiniz uzmanı seçip, takvimindeki uygun boşluklara tıklayarak saniyeler içinde randevunuzu kesinleştirebilirsiniz."
  }
];

import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function FAQSection() {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className={`bg-white px-6 pt-20 border-b-2 border-black overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-4xl mx-auto space-y-8 mb-16">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black text-center mb-12">
          Sıkça Sorulan Sorular
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${openIndex === index ? 'border-l-8 border-l-blue-600' : ''}`}
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-gray-300 font-black text-lg mr-4">{(index + 1).toString().padStart(2, '0')}</span>
                  <span className="text-xl font-black tracking-tight text-black">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown className={`w-6 h-6 text-black flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 border-t-2 border-black bg-blue-50/30">
                  <p className="pt-4 font-bold text-gray-800 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Wave Transition to Footer (bg-black) */}
      <div className="w-full overflow-hidden leading-none relative z-20">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill="#000000"
          />
        </svg>
      </div>
    </section>
  );
}
