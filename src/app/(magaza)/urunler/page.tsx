'use client';

import { useState } from 'react';
import ProductCard, { Product } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useToast } from '@/context/ToastContext';

// Mock data for development
const MOCK_PRODUCTS: Product[] = [
  // KÖPEK (10 ürün)
  {
    id: 'dog-1',
    name: 'Premium Köpek Maması 15kg',
    description: 'Yetişkin köpekler için somonlu, tahılsız yüksek proteinli premium kuru mama.',
    price: 1250,
    image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=80',
    category: 'Köpek',
    stock_quantity: 45
  },
  {
    id: 'dog-2',
    name: 'Köpek Gezdirme Tasması 5m',
    description: 'Otomatik sarmallı, stop tuşlu, fosforlu şeritli gezdirme kayışı.',
    price: 220,
    image_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    category: 'Köpek',
    stock_quantity: 56
  },
  {
    id: 'dog-3',
    name: 'Köpek Yatağı Ortopedik',
    description: 'Eklem dostu, hafızalı süngerli, yıkanabilir kılıflı lüks köpek yatağı.',
    price: 890,
    image_url: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=800&q=80',
    category: 'Köpek',
    stock_quantity: 15
  },
  {
    id: 'dog-4',
    name: 'Köpek Oyun Topu Seti',
    description: 'Dayanıklı kauçuktan üretilmiş, diş temizlemeye yardımcı 3lü top seti.',
    price: 185,
    image_url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80',
    category: 'Köpek',
    stock_quantity: 30
  },
  {
    id: 'dog-5',
    name: 'Köpek Tüy Tarağı',
    description: 'Ölü tüyleri kolayca toplayan, masaj etkili ergonomik tarak.',
    price: 145,
    image_url: 'https://images.unsplash.com/photo-1625316708582-7c38734be31d?w=800&q=80',
    category: 'Köpek',
    stock_quantity: 40
  },
  {
    id: 'dog-6',
    name: 'Köpek Şampuanı Doğal',
    description: 'Hassas ciltler için uygun, aloe vera özlü doğal içerikli şampuan.',
    price: 220,
    image_url: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=800&q=80',
    category: 'Köpek',
    stock_quantity: 25
  },
  {
    id: 'dog-7',
    name: 'Köpek Ödül Maması',
    description: 'Eğitim için ideal, kuzu etli ve vitamin katkılı yumuşak lokmalar.',
    price: 95,
    image_url: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800&q=80',
    category: 'Köpek',
    stock_quantity: 100
  },
  {
    id: 'dog-8',
    name: 'Köpek Tasması Deri',
    description: 'Gerçek deriden üretilmiş, dayanıklı metal tokalı şık boyun tasması.',
    price: 340,
    image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80',
    category: 'Köpek',
    stock_quantity: 20
  },
  {
    id: 'dog-9',
    name: 'Köpek Taşıma Çantası',
    description: 'Hava alan fileli bölmeler, omuz askılı, orta boy köpekler için uygun.',
    price: 650,
    image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
    category: 'Köpek',
    stock_quantity: 10
  },
  {
    id: 'dog-10',
    name: 'Köpek Kulübesi Ahşap',
    description: 'Dış mekana dayanıklı, izolasyonlu, çatılı ahşap köpek evi.',
    price: 1750,
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    category: 'Köpek',
    stock_quantity: 5
  },
  // KEDİ (10 ürün)
  {
    id: 'cat-1',
    name: 'Kedi Kumu İnce Taneli 10L',
    description: 'Ekstra topaklaşan, parfümlü, tozsuz bentonit kedi kumu.',
    price: 180,
    image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
    category: 'Kedi',
    stock_quantity: 120
  },
  {
    id: 'cat-2',
    name: 'Kedi Tırmalama Tahtası',
    description: 'Kedi nanesi hediyeli, dayanıklı sisal ipli tırmalama platformu.',
    price: 290,
    image_url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&q=80',
    category: 'Kedi',
    stock_quantity: 34
  },
  {
    id: 'cat-3',
    name: 'Kedi Evi Ahşap',
    description: 'İç mekan için şık tasarımlı, minderli ahşap kedi yuvası.',
    price: 1200,
    image_url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&q=80',
    category: 'Kedi',
    stock_quantity: 8
  },
  {
    id: 'cat-4',
    name: 'Kedi Oyun Çubuğu',
    description: 'Tüylü ve zilli, interaktif oyun için ideal kedi oltası.',
    price: 75,
    image_url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=80',
    category: 'Kedi',
    stock_quantity: 50
  },
  {
    id: 'cat-5',
    name: 'Kedi Maması Premium',
    description: 'Kısırlaştırılmış kediler için tavuklu, düşük yağlı dengeli mama.',
    price: 320,
    image_url: 'https://images.unsplash.com/photo-1604848698030-c434ba08ece1?w=800&q=80',
    category: 'Kedi',
    stock_quantity: 60
  },
  {
    id: 'cat-6',
    name: 'Kedi Taşıma Kafesi',
    description: 'Dayanıklı plastik gövde, emniyet kilitli kapı, standart boy.',
    price: 480,
    image_url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&q=80',
    category: 'Kedi',
    stock_quantity: 15
  },
  {
    id: 'cat-7',
    name: 'Kedi Tasması Hafif',
    description: 'Zilli, kopma emniyetli, ayarlanabilir yumuşak kedi tasması.',
    price: 120,
    image_url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80',
    category: 'Kedi',
    stock_quantity: 40
  },
  {
    id: 'cat-8',
    name: 'Kedi Tüneli Oyuncak',
    description: 'Hışırtılı kumaş, 3 girişli, katlanabilir eğlenceli oyun tüneli.',
    price: 210,
    image_url: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&q=80',
    category: 'Kedi',
    stock_quantity: 25
  },
  {
    id: 'cat-9',
    name: 'Kedi Mama Kabı Otomatik',
    description: 'Programlanabilir öğün saatleri, paslanmaz çelik hazneli dijital besleyici.',
    price: 750,
    image_url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80',
    category: 'Kedi',
    stock_quantity: 12
  },
  {
    id: 'cat-10',
    name: 'Kedi Yatağı Peluş',
    description: 'Ekstra yumuşak, sıcak tutan, yuvarlak pofuduk kedi yatağı.',
    price: 380,
    image_url: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=800&q=80',
    category: 'Kedi',
    stock_quantity: 20
  },
  // KUŞ (10 ürün)
  {
    id: 'bird-1',
    name: 'Kuş Kafesi Tam Takım',
    description: 'Muhabbet kuşları ve kanaryalar için uygun, yemlik ve suluk dahil kafes.',
    price: 450,
    image_url: 'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=800&q=80',
    category: 'Kuş',
    stock_quantity: 12
  },
  {
    id: 'bird-2',
    name: 'Muhabbet Kuşu Yemi',
    description: 'Karışık tohumlu, vitaminli ve enerji veren taze kuş yemi.',
    price: 85,
    image_url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80',
    category: 'Kuş',
    stock_quantity: 80
  },
  {
    id: 'bird-3',
    name: 'Kuş Tüneği Ahşap',
    description: 'Doğal ağaç dalından üretilmiş, tırnak törpülemeye yardımcı tünek.',
    price: 120,
    image_url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&q=80',
    category: 'Kuş',
    stock_quantity: 35
  },
  {
    id: 'bird-4',
    name: 'Kuş Oyuncak Seti',
    description: 'Renkli boncuklu, aynalı ve zilli 5li kuş oyuncağı paketi.',
    price: 95,
    image_url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80',
    category: 'Kuş',
    stock_quantity: 45
  },
  {
    id: 'bird-5',
    name: 'Papağan Kafesi Büyük',
    description: 'Jako ve Amazon papağanları için uygun, geniş ve dayanıklı metal kafes.',
    price: 1800,
    image_url: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&q=80',
    category: 'Kuş',
    stock_quantity: 4
  },
  {
    id: 'bird-6',
    name: 'Kuş Vitamini Damla',
    description: 'B vitamini ağırlıklı, tüy dökümünü azaltan multivitamin desteği.',
    price: 110,
    image_url: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&q=80',
    category: 'Kuş',
    stock_quantity: 60
  },
  {
    id: 'bird-7',
    name: 'Kuş Yemi Otomatik',
    description: 'Akıllı yemleme haznesi, kabuk biriktirmeyen dökülme önleyici sistem.',
    price: 340,
    image_url: 'https://images.unsplash.com/photo-1600618528240-fb9fe964b853?w=800&q=80',
    category: 'Kuş',
    stock_quantity: 15
  },
  {
    id: 'bird-8',
    name: 'Kuş Tüneği Salıncak',
    description: 'Renkli ahşap halkalı, kafes tavanına asılan eğlenceli salıncak.',
    price: 75,
    image_url: 'https://images.unsplash.com/photo-1480044965905-02098d419e96?w=800&q=80',
    category: 'Kuş',
    stock_quantity: 30
  },
  {
    id: 'bird-9',
    name: 'Kuş Kafesi Küçük',
    description: 'Tek kuş için uygun, kolay temizlenebilir alt çekmeceli kafes.',
    price: 280,
    image_url: 'https://images.unsplash.com/photo-1555000395-66992976503c?w=800&q=80',
    category: 'Kuş',
    stock_quantity: 10
  },
  {
    id: 'bird-10',
    name: 'Kuş Banyosu Plastik',
    description: 'Kafes kapısına asılan, şeffaf kapaklı banyo havuzu.',
    price: 65,
    image_url: 'https://images.unsplash.com/photo-1470114756577-bb1b1f5a721c?w=800&q=80',
    category: 'Kuş',
    stock_quantity: 25
  },
  // BALIK (10 ürün)
  {
    id: 'fish-1',
    name: 'Akvaryum Dış Filtre 1000L/h',
    description: 'Sessiz çalışan, 3 sepetli, enerji tasarruflu akvaryum dış motoru.',
    price: 1850,
    image_url: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&q=80',
    category: 'Balık',
    stock_quantity: 8
  },
  {
    id: 'fish-2',
    name: 'Akvaryum Starter Set 60L',
    description: 'Cam akvaryum, iç filtre, LED aydınlatma ve ısıtıcı dahil başlangıç seti.',
    price: 1200,
    image_url: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800&q=80',
    category: 'Balık',
    stock_quantity: 6
  },
  {
    id: 'fish-3',
    name: 'Balık Yemi Granül',
    description: 'Tüm tropikal balıklar için uygun, renk canlandırıcı kaliteli granül yem.',
    price: 75,
    image_url: 'https://images.unsplash.com/photo-1498100673548-9eb2cfd66462?w=800&q=80',
    category: 'Balık',
    stock_quantity: 100
  },
  {
    id: 'fish-4',
    name: 'LED Akvaryum Lambası',
    description: 'Su altı bitkileri için uygun spektrumlu, RGB kontrollü akvaryum aydınlatma.',
    price: 420,
    image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    category: 'Balık',
    stock_quantity: 15
  },
  {
    id: 'fish-5',
    name: 'Akvaryum Substrat Kumu',
    description: 'Doğal mineralli, bitki gelişimi için ideal koyu renkli akvaryum kumu.',
    price: 180,
    image_url: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800&q=80',
    category: 'Balık',
    stock_quantity: 50
  },
  {
    id: 'fish-6',
    name: 'Hava Motoru Sessiz',
    description: 'Çift çıkışlı, ayarlanabilir hava debili, titreşim önleyici ayaklı motor.',
    price: 220,
    image_url: 'https://images.unsplash.com/photo-1544551763-47a159f7731d?w=800&q=80',
    category: 'Balık',
    stock_quantity: 20
  },
  {
    id: 'fish-7',
    name: 'Akvaryum Termometre',
    description: 'Hassas ölçüm yapan, vantuzlu, kolay okunabilir derece.',
    price: 85,
    image_url: 'https://images.unsplash.com/photo-1520190282173-6e2751f9ed20?w=800&q=80',
    category: 'Balık',
    stock_quantity: 40
  },
  {
    id: 'fish-8',
    name: 'Su Kondisyoneri 500ml',
    description: 'Musluk suyundaki kloru anında temizleyen, mukoza koruyucu su düzenleyici.',
    price: 95,
    image_url: 'https://images.unsplash.com/photo-1516683037151-9a17603a899c?w=800&q=80',
    category: 'Balık',
    stock_quantity: 30
  },
  {
    id: 'fish-9',
    name: 'Akvaryum Dekor Taş',
    description: 'Doğal volkanik kayalar, su değerlerini bozmayan dekoratif taş seti.',
    price: 145,
    image_url: 'https://images.unsplash.com/photo-1517924161044-8975836437d4?w=800&q=80',
    category: 'Balık',
    stock_quantity: 15
  },
  {
    id: 'fish-10',
    name: 'Balık Ağı Seti',
    description: 'Yumuşak fileli, paslanmaz saplı 2li balık yakalama ağı.',
    price: 55,
    image_url: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&q=80',
    category: 'Balık',
    stock_quantity: 40
  },
  // KEMİRGEN (10 ürün)
  {
    id: 'small-1',
    name: 'Hamster Kafesi Geniş',
    description: 'Çok katlı, tünelli, çarklı ve suluklu büyük boy hamster kafesi.',
    price: 380,
    image_url: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&q=80',
    category: 'Kemirgen',
    stock_quantity: 10
  },
  {
    id: 'small-2',
    name: 'Hamster Koşu Tekeri',
    description: 'Sessiz rulmanlı, ayak yaralanmalarını önleyen geniş çaplı tekerlek.',
    price: 120,
    image_url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=800&q=80',
    category: 'Kemirgen',
    stock_quantity: 25
  },
  {
    id: 'small-3',
    name: 'Tavşan Yemi Granül',
    description: 'Yüksek lifli, sindirim sistemini destekleyen tavşanlar için pelet yem.',
    price: 95,
    image_url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80',
    category: 'Kemirgen',
    stock_quantity: 50
  },
  {
    id: 'small-4',
    name: 'Kemirgen Talaş Altlık',
    description: 'Yüksek emici güce sahip, tozdan arındırılmış çam talaşı.',
    price: 75,
    image_url: 'https://images.unsplash.com/photo-1544320299-8ad9fca94296?w=800&q=80',
    category: 'Kemirgen',
    stock_quantity: 100
  },
  {
    id: 'small-5',
    name: 'Tavşan Kafesi',
    description: 'Geniş tabanlı, kolay açılır tavanlı, metal gövdeli tavşan evi.',
    price: 650,
    image_url: 'https://images.unsplash.com/photo-1591384019130-109000000000?w=800&q=80',
    category: 'Kemirgen',
    stock_quantity: 5
  },
  {
    id: 'small-6',
    name: 'Kemirgen Oyun Tüneli',
    description: 'Hışırtılı, uzayıp kısalabilen plastik esnek oyun tüneli.',
    price: 110,
    image_url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&q=80',
    category: 'Kemirgen',
    stock_quantity: 20
  },
  {
    id: 'small-7',
    name: 'Guinea Pig Yemi',
    description: 'C vitamini katkılı, meyve ve sebze kurusu karışımlı özel yem.',
    price: 85,
    image_url: 'https://images.unsplash.com/photo-1533514114760-4389f9ed3aa9?w=800&q=80',
    category: 'Kemirgen',
    stock_quantity: 35
  },
  {
    id: 'small-8',
    name: 'Kemirgen Su Şişesi',
    description: 'Damlatmaz bilyalı uçlu, kafese asılan 500ml suluk.',
    price: 65,
    image_url: 'https://images.unsplash.com/photo-1534833215160-5f082e666a01?w=800&q=80',
    category: 'Kemirgen',
    stock_quantity: 30
  },
  {
    id: 'small-9',
    name: 'Hamster Evi Ahşap',
    description: 'Doğal ağaçtan üretilmiş, çatılı şirin hamster yuvası.',
    price: 195,
    image_url: 'https://images.unsplash.com/photo-1516642898673-eda1916ca456?w=800&q=80',
    category: 'Kemirgen',
    stock_quantity: 15
  },
  {
    id: 'small-10',
    name: 'Kemirgen Vitamini',
    description: 'Suya katılan, bağışıklık güçlendirici multivitamin damlası.',
    price: 110,
    image_url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80',
    category: 'Kemirgen',
    stock_quantity: 40
  }
];

const CATEGORIES = ['Tümü', 'Kedi', 'Köpek', 'Kuş', 'Balık', 'Kemirgen'];

export default function UrunlerPage() {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();
  
  const filteredProducts = activeCategory === 'Tümü' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  const handleAddToCart = (productId: string) => {
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url
      });
      showToast('Ürün sepete eklendi!');
    }
  };

  const handleToggleFavorite = (productId: string) => {
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (product) {
      toggleFavorite(product);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-[var(--brutal-blue)] brutal-border brutal-shadow p-6 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-black uppercase">Tüm Ürünler</h1>
        <div className="text-lg sm:text-xl font-bold bg-white brutal-border px-4 py-2">
          {filteredProducts.length} Ürün
        </div>
      </div>

      {/* Categories / Filters */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 mb-8">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 sm:px-6 sm:py-3 font-black uppercase text-sm sm:text-base brutal-border brutal-shadow-hover transition-colors ${
              activeCategory === category 
                ? 'bg-black text-white brutal-shadow' 
                : 'bg-white text-black shadow-none border-b-4'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite(product.id)}
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="bg-[var(--brutal-yellow)] brutal-border brutal-shadow p-12 text-center">
          <h2 className="text-3xl font-black uppercase mb-4">Üzgünüz, ürün bulunamadı.</h2>
          <p className="text-xl font-bold">Bu kategoride henüz ürün eklenmemiş.</p>
        </div>
      )}
    </div>
  );
}
