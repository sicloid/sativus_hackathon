import Link from 'next/link';

const blogPosts = [
  { id: 1, featured: true, kategori: "Sağlık", baslik: "Köpeğinizin Yıllık Sağlık Takvimi: Uzman Rehberi", ozet: "Aşılardan diş temizliğine kadar her şey bu rehberde", yazar: "Dr. Ayşe Kaya", sure: "5 dk", tarih: "24 Nis 2026", image: "https://picsum.photos/id/237/800/500", icerik: "Evcil dostlarımızın sağlıklı ve uzun bir yaşam sürmeleri için düzenli veteriner kontrolleri hayati önem taşır. Özellikle köpekler için yıllık aşı takvimi, parazit mücadele programı ve diş sağlığı kontrolleri, olası hastalıkların önüne geçilmesinde en büyük yardımcılarımızdır. Bu rehberimizde, köpeğinizin sağlığını korumak için yıl boyunca takip etmeniz gereken temel adımları bir araya getirdik." },
  { id: 2, featured: false, kategori: "Beslenme", baslik: "Köpekler İçin En İyi Besinler", ozet: "Doğru protein ve vitamin dengesi için rehber", yazar: "Mert Demir", sure: "3 dk", tarih: "20 Nis 2026", image: "https://picsum.photos/id/1025/600/400", icerik: "Köpeklerin beslenmesinde protein, yağ ve karbonhidrat dengesi yaşa, ırka ve aktivite düzeyine göre değişir. Ev yemeği veya ticari mama seçimi yaparken dikkat edilmesi gereken en önemli nokta, köpeğinizin ihtiyaç duyduğu tüm aminoasit ve vitaminleri eksiksiz alabilmesidir. Ayrıca, bazı insan gıdalarının köpekler için toksik olabileceğini unutmamak gerekir." },
  { id: 3, featured: false, kategori: "Kedi", baslik: "Kedilerde Tüy Bakımı Nasıl Yapılır?", ozet: "Mevsimsel tüy dökülmesini azaltmanın yolları", yazar: "Selin Arslan", sure: "4 dk", tarih: "18 Nis 2026", image: "https://picsum.photos/id/219/600/400", icerik: "Kediler kendilerini yalayarak temizleseler de, dışarıdan müdahale ile fırçalanmaları ölü tüylerin uzaklaştırılması ve yutulan tüy yumağı problemlerinin önlenmesi açısından şarttır. Özellikle uzun tüylü ırklarda haftada en az üç kez, kısa tüylülerde ise haftada bir kez özel kedi fırçalarıyla yapılacak tarama işlemleri, kedinizin hem tüy yapısını güçlendirir hem de aranızdaki bağı kuvvetlendirir." },
  { id: 4, featured: false, kategori: "Sağlık", baslik: "Yavru Aşı Takvimi 2026", ozet: "Güncel aşı programı ve ziyaret zamanları", yazar: "Dr. Can Yıldız", sure: "6 dk", tarih: "15 Nis 2026", image: "https://picsum.photos/id/1062/600/400", icerik: "Yavru köpek ve kediler, hayata gözlerini açtıkları ilk anlardan itibaren dış dünyanın barındırdığı virüslere ve bakterilere karşı savunmasızdırlar. Anne sütünden alınan antikorlar zamanla azaldığında, ilk karma aşılar, kuduz aşısı ve Lyme gibi bölgesel aşıların zamanında yaptırılması, minik dostunuzun hayata sağlıklı bir başlangıç yapmasını sağlar." },
  { id: 5, featured: false, kategori: "Eğitim", baslik: "Temel Komutları Öğretmek", ozet: "Pozitif pekiştirme ile otur, yat, gel", yazar: "Burak Şahin", sure: "5 dk", tarih: "12 Nis 2026", image: "https://picsum.photos/id/1074/600/400", icerik: "Köpek eğitiminde en etkili yöntem pozitif pekiştirmedir. Ceza yerine, doğru davranışı anında ödüllendirmeye dayanan bu yaklaşım, köpeğinizin öğrenme isteğini artırır. 'Otur', 'bekle', 'gel' gibi temel komutlar sadece günlük yaşamı kolaylaştırmakla kalmaz, aynı zamanda tehlikeli durumlarda köpeğinizin güvenliğini sağlamak için de kritik öneme sahiptir." },
  { id: 6, featured: false, kategori: "Teknoloji", baslik: "Lumina Tech Akıllı Tasma Rehberi", ozet: "PetVerse AI ile entegre kullanım ipuçları", yazar: "Zeynep Kurt", sure: "4 dk", tarih: "8 Nis 2026", image: "https://picsum.photos/id/0/600/400", icerik: "Yeni nesil teknolojiler sayesinde dostlarımızın adımlarını, sağlık verilerini ve konumlarını anlık olarak izleyebiliyoruz. Lumina Tech'in en son piyasaya sürdüğü akıllı tasmalar, kalp ritminden uyku kalitesine kadar pek çok veriyi analiz ederek, olası bir sağlık sorununu henüz belirti vermeden tespit edebiliyor. PetVerse uygulamanızla bu cihazları nasıl eşleştirebileceğinizi adım adım anlattık." },
  { id: 7, featured: false, kategori: "Eğitim", baslik: "Köpeklerde Sosyalleşme Dönemi", ozet: "Diğer köpeklerle sağlıklı iletişim kurmanın yolları", yazar: "Mert Demir", sure: "4 dk", tarih: "5 Nis 2026", image: "https://picsum.photos/id/102/600/400", icerik: "Köpeklerin yavruluk döneminde sosyalleşmesi, ileriki yaşlarda korku ve saldırganlık gibi davranış problemlerinin önüne geçmek için kritik önem taşır. Bu yazımızda güvenli sosyalleşme adımlarını anlatıyoruz." },
  { id: 8, featured: false, kategori: "Kedi", baslik: "Yaşlı Kediler İçin Bakım Önerileri", ozet: "İleri yaş kedilerde beslenme ve sağlık yönetimi", yazar: "Dr. Ayşe Kaya", sure: "7 dk", tarih: "1 Nis 2026", image: "https://picsum.photos/id/40/600/400", icerik: "Kediniz yaşlandıkça böbrek sağlığı, diş problemleri ve eklem ağrıları gibi konulara daha fazla dikkat etmeniz gerekir. Yaşlı kedilerin beslenmesi ve bakımıyla ilgili detaylı rehberimizi okuyun." },
  { id: 9, featured: false, kategori: "Beslenme", baslik: "Kedi Kumları Rehberi", ozet: "Hangi kumu seçmelisiniz? İnceleme ve tavsiyeler", yazar: "Selin Arslan", sure: "3 dk", tarih: "28 Mar 2026", image: "https://picsum.photos/id/64/600/400", icerik: "Bentonit, silika veya çam paleti... Kedi kumu seçerken hem kedinizin konforunu hem de evin hijyenini düşünmeniz gerekir. En popüler kedi kumu çeşitlerini sizin için inceledik." },
  { id: 10, featured: false, kategori: "Sağlık", baslik: "Evde Köpek Yıkama İpuçları", ozet: "Banyo korkusunu yenmek ve doğru şampuan seçimi", yazar: "Burak Şahin", sure: "5 dk", tarih: "25 Mar 2026", image: "https://picsum.photos/id/111/600/400", icerik: "Köpeğinizi evde yıkamak bazen zorlayıcı olabilir. Doğru şampuan seçimi, suyun sıcaklığı ve banyo sonrası kurutma işlemlerine dair tüm püf noktalarını bu yazıda bulabilirsiniz." },
  { id: 11, featured: false, kategori: "Sağlık", baslik: "Köpeklerde Diş Çürükleri", ozet: "Ağız kokusu ve tartar oluşumunu engelleme", yazar: "Dr. Can Yıldız", sure: "6 dk", tarih: "20 Mar 2026", image: "https://picsum.photos/id/237/600/400", icerik: "Pek çok köpek sahibi diş bakımını ihmal eder, ancak diş çürükleri ve tartar, ilerleyen yaşlarda kalp rahatsızlıklarına bile yol açabilir. Düzenli diş fırçalama ve çiğneme kemikleriyle bu sorunu nasıl aşacağınızı öğrenin." },
  { id: 12, featured: false, kategori: "Kedi", baslik: "Kediniz Sizi Seviyor Mu?", ozet: "Kedilerin sevgi göstergeleri ve mırlama dilinin anlamı", yazar: "Zeynep Kurt", sure: "4 dk", tarih: "15 Mar 2026", image: "https://picsum.photos/id/219/600/400", icerik: "Kediler köpekler kadar heyecanlı tepkiler vermeseler de, kafalarını tokuşturmaları, gözlerini yavaşça kırpmaları ve mırlamaları onların size duyduğu derin sevginin göstergesidir." },
  { id: 13, featured: false, kategori: "Eğitim", baslik: "Köpeğinizi Evde Yalnız Bırakmak", ozet: "Ayrılık kaygısını yenme ve güvenli ortam sağlama", yazar: "Mert Demir", sure: "5 dk", tarih: "10 Mar 2026", image: "https://picsum.photos/id/1074/600/400", icerik: "İşe veya okula giderken köpeğinizi evde yalnız bırakmak zorunda kalıyorsanız, ayrılık anksiyetesini hafifletmek için ona bırakabileceğiniz oyuncaklar ve eğitim yöntemlerini uygulamanız çok önemlidir." },
  { id: 14, featured: false, kategori: "Köpek", baslik: "Barınaktan Köpek Sahiplenmek", ozet: "Yeni dostunuzu evinize hazırlama rehberi", yazar: "Selin Arslan", sure: "6 dk", tarih: "5 Mar 2026", image: "https://picsum.photos/id/1025/600/400", icerik: "Barınaktan sahiplenilen bir köpeğin yeni yuvasına alışma süreci sabır gerektirir. 3-3-3 kuralı (3 gün, 3 hafta, 3 ay) ile köpeğinizin evinize adaptasyon sürecini nasıl yöneteceğinizi anlatıyoruz." },
  { id: 15, featured: false, kategori: "Eğitim", baslik: "Evcil Hayvanınızla Uzun Yolculuk", ozet: "Yol tutması ve taşıma çantası eğitimi", yazar: "Burak Şahin", sure: "4 dk", tarih: "1 Mar 2026", image: "https://picsum.photos/id/1015/600/400", icerik: "Araba veya uçak yolculuğu evcil hayvanlar için stresli olabilir. Yolculuk öncesi beslenme düzeni, taşıma çantasına alıştırma ve mola noktalarında yapılması gerekenleri derledik." }
];

export default async function BlogPostDetail({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15+ dinamik rota parametreleri Promise olarak gelir. (Next 16 kullanılıyor)
  const resolvedParams = await params;
  const postId = Number(resolvedParams.id);
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0];

  return (
    <main className="min-h-screen bg-orange-50 font-sans pb-24">
      {/* 1. Üst Alan — Hero */}
      <section className="bg-yellow-50 border-b-2 border-black pt-24 pb-16 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blog" 
            className="absolute top-8 left-6 md:left-0 bg-black text-white font-black px-4 py-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] transition-all text-sm z-10"
          >
            ← Blog'a Dön
          </Link>
          
          <div className="mt-12 md:mt-16 flex flex-col items-start text-left">
            <span className="bg-yellow-400 text-black font-black text-xs px-3 py-1 rounded-md border-2 border-black mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block uppercase tracking-wider">
              {post.kategori}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black mb-6 leading-tight">
              {post.baslik}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 text-gray-800 font-bold border-t-2 border-black border-dashed pt-6 w-full text-sm md:text-base">
              <span>✍️ {post.yazar}</span>
              <span className="hidden sm:inline text-black">•</span>
              <span>⏱️ {post.sure} okuma</span>
              <span className="hidden sm:inline text-black">•</span>
              <span>📅 {post.tarih}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. İçerik */}
      <section className="max-w-4xl mx-auto px-6 mt-12 md:mt-16">
        <div className="border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-12 h-[300px] md:h-[450px] bg-white">
          <img src={post.image} alt={post.baslik} className="w-full h-full object-cover" />
        </div>
        
        <article className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 text-lg font-bold text-gray-800 leading-relaxed">
          <p className="mb-8 text-xl md:text-2xl text-black font-black leading-snug">{post.ozet}</p>
          
          <p className="mb-6">{post.icerik}</p>
          
          <p className="mb-6">Burada makalenin devamı yer almaktadır. Sativus Hackathon kapsamında hazırlanan bu projede, içerik okuma deneyimi Soft-Brutalism tarzına ve PetVerse'ün dinamik renkli dünyasına uygun şekilde tasarlanmıştır. Dostlarımız için her zaman en iyisini istiyoruz.</p>
          
          <p className="mb-6">Unutmayın, düzenli olarak veteriner kontrollerine gitmek ve can dostlarınızın beslenmesine özen göstermek, onların yaşam kalitesini doğrudan artırır. Bizler PetVerse olarak bu serüvende yanınızdayız.</p>

          <div className="bg-orange-100 border-2 border-black p-6 rounded-xl mt-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black text-black mb-2 flex items-center gap-2">
              <span>💡</span> PetVerse Önerisi
            </h3>
            <p className="text-black text-base">Makaledeki konularda yardıma ihtiyacınız varsa, hemen <Link href="/randevu" className="text-blue-600 underline hover:text-blue-800">Veteriner Randevusu</Link> alabilir veya sormak istedikleriniz için PetVerse akıllı asistanını kullanabilirsiniz.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
