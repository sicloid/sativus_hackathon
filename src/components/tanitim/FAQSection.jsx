"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
    question: "Acil durumlarda ne yapmalıyım?",
    answer: "Uygulamamızdaki 'Acil Yardım' butonuna basarak size en yakın 7/24 açık nöbetçi klinikleri listeleyebilirsiniz."
  },
  {
    question: "Abonelik sistemi var mı?",
    answer: "Evet, aylık ve yıllık Plus paketlerimizle kargo avantajları ve AI hizmetlerine sınırsız erişim sağlayabilirsiniz."
  },
  {
    question: "Hangi hayvan türlerini destekliyor?",
    answer: "Kedi, köpek, kuş ve kemirgenler başta olmak üzere tüm evcil hayvan türleri için özelleştirilmiş hizmetlerimiz mevcuttur."
  },
  {
    question: "Verilerim güvende mi?",
    answer: "Tüm kullanıcı ve evcil hayvan verileriniz uçtan uca şifrelenmekte ve KVKK standartlarına uygun olarak saklanmaktadır."
  },
  {
    question: "Veterinerler onaylı mı?",
    answer: "Platformumuzdaki tüm profesyoneller, diploma ve sertifika kontrollerinden geçtikten sonra onaylanmaktadır."
  },
  {
    question: "Kargo süreci nasıl işliyor?",
    answer: "Mağazamızdan verdiğiniz siparişler 24 saat içinde kargoya verilir ve İstanbul içi aynı gün teslimat seçeneği sunulur."
  },
  {
    question: "Mobil uygulaması var mı?",
    answer: "Evet, iOS ve Android mağazalarından PetVerse uygulamasını ücretsiz olarak indirebilirsiniz."
  },
  {
    question: "Teknik destek hattına nasıl ulaşırım?",
    answer: "Bize 7/24 canlı destek hattımızdan veya destek@petverse.com adresinden ulaşabilirsiniz."
  },
  {
    question: "Mama tavsiyesi alabilir miyim?",
    answer: "AI destekli asistanımız dostunuzun yaşına, kilosuna ve türüne göre en uygun mama seçeneklerini size önerir."
  },
  {
    question: "İptal ve iade politikası nedir?",
    answer: "Randevuları 2 saat öncesine kadar ücretsiz iptal edebilir, ürünleri 14 gün içinde koşulsuz iade edebilirsiniz."
  },
  {
    question: "Topluluk forumu var mı?",
    answer: "Evet, diğer pet sahipleriyle deneyimlerinizi paylaşabileceğiniz aktif bir topluluk bölümümüz bulunmaktadır."
  },
  {
    question: "Kurumsal ortaklık yapıyor musunuz?",
    answer: "Veteriner klinikleri ve pet shoplar için özel iş ortaklığı programlarımız mevcuttur."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white px-6 py-20 border-b-2 border-black">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black text-center mb-12">
          Sıkça Sorulan Sorular
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl font-black tracking-tight text-black">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-black flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-black flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5 border-t-2 border-black bg-yellow-50">
                  <p className="pt-4 font-bold text-gray-800 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
