"use client";
import Image from "next/image";
import { useRef, useState } from "react";

const products = [
  {
    id: "band",
    name: "LuminaBand X",
    subtitle: "Akıllı Bileklik",
    price: "₺2.499",
    badge: "Çok Satan",
    badgeColor: "#7c3aed",
    img: "/lumina_band.png",
    features: ["7 Gün Pil", "Kalp Atışı", "GPS", "Su Geçirmez"],
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.4)",
  },
  {
    id: "pods",
    name: "LuminaPods",
    subtitle: "Kablosuz Kulaklık",
    price: "₺1.799",
    badge: "Yeni",
    badgeColor: "#06b6d4",
    img: "/lumina_pods.png",
    features: ["ANC", "40 Saat", "Hızlı Şarj", "Hi-Fi Ses"],
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.4)",
  },
  {
    id: "boom",
    name: "LuminaBoom",
    subtitle: "Mini Hoparlör",
    price: "₺1.199",
    badge: "Popüler",
    badgeColor: "#ec4899",
    img: "/lumina_boom.png",
    features: ["RGB LED", "360° Ses", "IPX7", "12 Saat"],
    color: "#ec4899",
    glow: "rgba(236,72,153,0.4)",
  },
  {
    id: "case",
    name: "LuminaCase",
    subtitle: "Mobil Aksesuar",
    price: "₺699",
    badge: "Sınırlı",
    badgeColor: "#f97316",
    img: "/lumina_case.png",
    features: ["MagSafe", "Şeffaf", "Antibakteriyel", "Tüm Modeller"],
    color: "#f97316",
    glow: "rgba(249,115,22,0.4)",
  },
];

function ProductCard3D({ product }: { product: (typeof products)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotX = ((y - height / 2) / (height / 2)) * -8;
    const rotY = ((x - width / 2) / (width / 2)) * 8;
    setStyle({
      transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.5s ease-in-out",
    });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        boxShadow: hovered ? `0 30px 70px ${product.glow}` : "0 4px 20px rgba(0,0,0,0.4)",
      }}
      className="relative rounded-2xl overflow-hidden cursor-default transition-shadow duration-300"
    >
      {/* Glass bg */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(20,20,40,0.9), rgba(10,10,25,0.95))",
          border: `1px solid ${product.color}30`,
          backdropFilter: "blur(20px)",
        }}
      />

      {/* Top color stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${product.color}, transparent)` }}
      />

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Badge */}
        <div className="flex justify-between items-start mb-4">
          <div
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{
              background: `${product.color}20`,
              color: product.color,
              border: `1px solid ${product.color}40`,
            }}
          >
            {product.badge}
          </div>
          <div className="text-right">
            <div className="text-xl font-black text-white">{product.price}</div>
            <div className="text-xs text-slate-500">KDV dahil</div>
          </div>
        </div>

        {/* Product image — translates in 3D */}
        <div
          className="flex justify-center mb-5"
          style={{ transform: "translateZ(30px)" }}
        >
          <div
            className="relative w-44 h-44"
            style={{
              filter: hovered ? `drop-shadow(0 0 20px ${product.color}60)` : "none",
              transition: "filter 0.3s",
            }}
          >
            <Image
              src={product.img}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-500"
              style={{ transform: hovered ? "scale(1.08) translateY(-4px)" : "scale(1)" }}
            />
          </div>
        </div>

        {/* Name */}
        <div style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-xl font-black text-white">{product.name}</h3>
          <p className="text-sm font-medium mt-0.5" style={{ color: product.color }}>{product.subtitle}</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-1.5 mt-4" style={{ transform: "translateZ(15px)" }}>
          {product.features.map((f) => (
            <div
              key={f}
              className="flex items-center gap-1.5 text-xs text-slate-400"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-none"
                style={{ background: product.color }}
              />
              {f}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className="w-full mt-5 py-3 rounded-xl text-sm font-bold transition-all duration-300"
          style={{
            background: hovered
              ? `linear-gradient(135deg, ${product.color}, ${product.color}99)`
              : `${product.color}15`,
            border: `1px solid ${product.color}50`,
            color: hovered ? "#fff" : product.color,
            transform: "translateZ(20px)",
          }}
        >
          İncele →
        </button>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  return (
    <section id="urunler" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Bg orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, #ec4899, transparent)",
          bottom: "-10%",
          left: "-10%",
          filter: "blur(100px)",
          opacity: 0.06,
          borderRadius: "50%",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6 text-sm font-medium border"
            style={{
              background: "rgba(236,72,153,0.08)",
              borderColor: "rgba(236,72,153,0.25)",
              color: "#f9a8d4",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#ec4899" }} />
            Ürün Kataloğu
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            Koleksiyonu{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ec4899, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Keşfet
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
            Her ürün genç yaşam tarzı için tasarlandı. Fareyi üzerinde gezdirerek detayları incele.
          </p>
        </div>

        {/* 3D Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div key={product.id} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <ProductCard3D product={product} />
            </div>
          ))}
        </div>

        {/* Marquee strip */}
        <div className="mt-16 overflow-hidden relative">
          <div
            className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, #05050f, transparent)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(-90deg, #05050f, transparent)" }}
          />
          <div
            className="flex gap-8 text-slate-600 text-sm font-semibold uppercase tracking-widest"
            style={{
              animation: "marquee 20s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) =>
              ["LuminaBand X", "∞", "LuminaPods", "∞", "LuminaBoom", "∞", "LuminaCase", "∞"].map((item, j) => (
                <span key={`${i}-${j}`}>{item}</span>
              ))
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
