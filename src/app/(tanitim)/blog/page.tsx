"use client";

import { useState } from 'react';
import Link from 'next/link';
import BlogCard from '@/components/tanitim/BlogCard';

const blogPosts = [
  { id: 1, featured: true, kategori: "Sağlık", baslik: "Köpeğinizin Yıllık Sağlık Takvimi: Uzman Rehberi", ozet: "Aşılardan diş temizliğine kadar her şey bu rehberde", yazar: "Dr. Ayşe Kaya", sure: "5 dk", tarih: "24 Nis 2026", image: "https://picsum.photos/id/237/800/500" },
  { id: 2, featured: false, kategori: "Beslenme", baslik: "Köpekler İçin En İyi Besinler", ozet: "Doğru protein ve vitamin dengesi için rehber", yazar: "Mert Demir", sure: "3 dk", tarih: "20 Nis 2026", image: "https://picsum.photos/id/1025/600/400" },
  { id: 3, featured: false, kategori: "Kedi", baslik: "Kedilerde Tüy Bakımı Nasıl Yapılır?", ozet: "Mevsimsel tüy dökülmesini azaltmanın yolları", yazar: "Selin Arslan", sure: "4 dk", tarih: "18 Nis 2026", image: "https://picsum.photos/id/219/600/400" },
  { id: 4, featured: false, kategori: "Sağlık", baslik: "Yavru Aşı Takvimi 2026", ozet: "Güncel aşı programı ve ziyaret zamanları", yazar: "Dr. Can Yıldız", sure: "6 dk", tarih: "15 Nis 2026", image: "https://picsum.photos/id/1062/600/400" },
  { id: 5, featured: false, kategori: "Eğitim", baslik: "Temel Komutları Öğretmek", ozet: "Pozitif pekiştirme ile otur, yat, gel", yazar: "Burak Şahin", sure: "5 dk", tarih: "12 Nis 2026", image: "https://picsum.photos/id/1074/600/400" },
  { id: 6, featured: false, kategori: "Teknoloji", baslik: "PetVerse Akıllı Tasma Rehberi", ozet: "PetVerse AI ile entegre kullanım ipuçları", yazar: "Zeynep Kurt", sure: "4 dk", tarih: "8 Nis 2026", image: "https://picsum.photos/id/0/600/400" },
  { id: 7, featured: false, kategori: "Eğitim", baslik: "Köpeklerde Sosyalleşme Dönemi", ozet: "Diğer köpeklerle sağlıklı iletişim kurmanın yolları", yazar: "Mert Demir", sure: "4 dk", tarih: "5 Nis 2026", image: "https://picsum.photos/id/102/600/400" },
  { id: 8, featured: false, kategori: "Kedi", baslik: "Yaşlı Kediler İçin Bakım Önerileri", ozet: "İleri yaş kedilerde beslenme ve sağlık yönetimi", yazar: "Dr. Ayşe Kaya", sure: "7 dk", tarih: "1 Nis 2026", image: "https://picsum.photos/id/40/600/400" },
  { id: 9, featured: false, kategori: "Beslenme", baslik: "Kedi Kumları Rehberi", ozet: "Hangi kumu seçmelisiniz? İnceleme ve tavsiyeler", yazar: "Selin Arslan", sure: "3 dk", tarih: "28 Mar 2026", image: "https://picsum.photos/id/64/600/400" },
  { id: 10, featured: false, kategori: "Sağlık", baslik: "Evde Köpek Yıkama İpuçları", ozet: "Banyo korkusunu yenmek ve doğru şampuan seçimi", yazar: "Burak Şahin", sure: "5 dk", tarih: "25 Mar 2026", image: "https://picsum.photos/id/111/600/400" },
  { id: 11, featured: false, kategori: "Sağlık", baslik: "Köpeklerde Diş Çürükleri", ozet: "Ağız kokusu ve tartar oluşumunu engelleme", yazar: "Dr. Can Yıldız", sure: "6 dk", tarih: "20 Mar 2026", image: "https://picsum.photos/id/237/600/400" },
  { id: 12, featured: false, kategori: "Kedi", baslik: "Kediniz Sizi Seviyor Mu?", ozet: "Kedilerin sevgi göstergeleri ve mırlama dilinin anlamı", yazar: "Zeynep Kurt", sure: "4 dk", tarih: "15 Mar 2026", image: "https://picsum.photos/id/219/600/400" },
  { id: 13, featured: false, kategori: "Eğitim", baslik: "Köpeğinizi Evde Yalnız Bırakmak", ozet: "Ayrılık kaygısını yenme ve güvenli ortam sağlama", yazar: "Mert Demir", sure: "5 dk", tarih: "10 Mar 2026", image: "https://picsum.photos/id/1074/600/400" },
  { id: 14, featured: false, kategori: "Köpek", baslik: "Barınaktan Köpek Sahiplenmek", ozet: "Yeni dostunuzu evinize hazırlama rehberi", yazar: "Selin Arslan", sure: "6 dk", tarih: "5 Mar 2026", image: "https://picsum.photos/id/1025/600/400" },
  { id: 15, featured: false, kategori: "Eğitim", baslik: "Evcil Hayvanınızla Uzun Yolculuk", ozet: "Yol tutması ve taşıma çantası eğitimi", yazar: "Burak Şahin", sure: "4 dk", tarih: "1 Mar 2026", image: "https://picsum.photos/id/1015/600/400" }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = ["Tümü", "🐕 Köpek", "🐈 Kedi", "🌿 Beslenme", "💊 Sağlık", "🎮 Eğitim"];

  const featuredPost = blogPosts.find(post => post.featured);
  
  const filteredPosts = blogPosts.filter(post => {
    if (post.featured) return false;
    if (activeCategory === "Tümü") return true;
    
    // Emojileri temizleyerek sadece metin kısmını alıyoruz (Örn: "🐕 Köpek" -> "Köpek")
    const categoryName = activeCategory.includes(" ") ? activeCategory.split(" ").slice(1).join(" ") : activeCategory;
    
    // Aramayı esnek yapmak için kelimenin ilk 3 harfini alıyoruz ("Köp" veya "Ked" gibi)
    const searchKeyword = categoryName.length > 3 ? categoryName.substring(0, 3) : categoryName;
    const searchRegex = new RegExp(searchKeyword, 'i');
    
    return post.kategori === categoryName || post.kategori.includes(categoryName) || searchRegex.test(post.baslik) || searchRegex.test(post.ozet);
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1); // Reset page on category change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-orange-50 pb-20">
      {/* 1. Üst Alan — Hero */}
      <section className="bg-yellow-50 border-b-2 border-black pt-20 pb-16 px-6 relative">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          
          <Link 
            href="/" 
            className="absolute top-6 left-6 bg-black text-white font-black px-4 py-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] transition-all z-10"
          >
            ← Ana Sayfaya Dön
          </Link>

          <span className="bg-yellow-400 text-black font-black text-sm px-4 py-2 rounded-xl border-2 border-black mb-6 mt-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block uppercase tracking-wider">
            🐾 PETVERSE REHBERİ
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black mb-6 leading-tight">
            Evcil Hayvan Dünyasından Haberler
          </h1>
          <p className="text-xl font-bold tracking-tight text-gray-800 max-w-2xl">
            Sadece mama ve oyuncak değil; dostlarınızın mutlu ve sağlıklı bir yaşam sürmesi için bilmeniz gereken her şey.
          </p>
        </div>
      </section>

      {/* 2. Filtre Çubuğu */}
      <section className="bg-white border-b-2 border-black sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full font-black text-sm transition-colors border-2 border-black ${
                activeCategory === cat 
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" 
                  : "bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pt-12 flex flex-col gap-12">
        {/* 3. Öne Çıkan Yazı Kartı (Featured) */}
        {featuredPost && activeCategory === "Tümü" && currentPage === 1 && (
          <div className="w-full bg-blue-600 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row hover:-translate-y-1 transition-transform">
            {/* Sol görsel */}
            <div className="md:w-2/5 border-b-2 md:border-b-0 md:border-r-2 border-black overflow-hidden relative min-h-[250px] md:min-h-full">
              <img src={featuredPost.image} alt={featuredPost.baslik} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            
            {/* Sağ içerik */}
            <div className="p-8 md:p-10 flex flex-col justify-center flex-1">
              <div className="mb-4 inline-block">
                <span className="bg-yellow-400 text-black font-black text-xs px-2 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  ✨ ÖNE ÇIKAN
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 tracking-tight">
                {featuredPost.baslik}
              </h2>
              <p className="text-blue-200 font-bold text-lg mb-6">
                {featuredPost.ozet}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto gap-4">
                <div className="text-blue-300 font-bold text-sm">
                  {featuredPost.yazar} • {featuredPost.sure} okuma • {featuredPost.tarih}
                </div>
                <Link 
                  href={`/blog/${featuredPost.id}`}
                  className="bg-white text-black font-black px-6 py-3 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform whitespace-nowrap text-center"
                >
                  Okumaya Başla →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 4. Blog Kartları Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white border-2 border-black border-dashed rounded-2xl">
              <span className="text-4xl block mb-4">🔍</span>
              <h3 className="text-2xl font-black text-black">Sonuç Bulunamadı</h3>
              <p className="text-gray-600 font-bold mt-2">Bu kategoriye ait henüz yazı eklenmemiş.</p>
            </div>
          )}
        </div>

        {/* 5. Sayfalama */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-12 h-12 flex items-center justify-center font-black border-2 border-black rounded-xl transition-all ${
                  currentPage === i + 1
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-12 h-12 flex items-center justify-center bg-white text-black font-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:hover:translate-y-0"
            >
              →
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
