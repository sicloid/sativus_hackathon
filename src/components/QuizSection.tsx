"use client";
import Image from "next/image";
import { useState } from "react";

const questions = [
  {
    q: "Günün çoğunu nerede geçiriyorsun?",
    opts: [
      { label: "Spor / Dışarıda", icon: "🏃", tag: "band" },
      { label: "Müzik / Konser", icon: "🎵", tag: "pods" },
      { label: "Arkadaşlarla Buluşma", icon: "🎉", tag: "boom" },
      { label: "Okul / Şehir Gezisi", icon: "📱", tag: "case" },
    ],
  },
  {
    q: "Seni en iyi tanımlayan özellik hangisi?",
    opts: [
      { label: "Sağlık Odaklı", icon: "💪", tag: "band" },
      { label: "Müzik Tutkunu", icon: "🎧", tag: "pods" },
      { label: "Sosyal Kelebek", icon: "✨", tag: "boom" },
      { label: "Stil Sahibi", icon: "💜", tag: "case" },
    ],
  },
  {
    q: "Teknolojiden beklentin ne?",
    opts: [
      { label: "Sağlık Takibi", icon: "❤️", tag: "band" },
      { label: "Mükemmel Ses", icon: "🔊", tag: "pods" },
      { label: "Eğlence & Enerji", icon: "⚡", tag: "boom" },
      { label: "Koruma & Şık Görünüm", icon: "🛡️", tag: "case" },
    ],
  },
];

const results: Record<string, { name: string; subtitle: string; img: string; desc: string; color: string; price: string }> = {
  band: {
    name: "PetVerse GPS Tasma",
    subtitle: "Akıllı Tasma",
    img: "/lumina_band.png",
    desc: "Aktif dostlar için mükemmel eşlik. Sağlık verilerini anlık takip et, GPS ile nerede olduğunu gör.",
    color: "#7c3aed",
    price: "₺2.499",
  },
  pods: {
    name: "PetVerse Çip",
    subtitle: "Akıllı Kimlik",
    img: "/lumina_pods.png",
    desc: "Veteriner uyumlu, ömür boyu güvenli kimlik tespiti ve sağlık geçmişi takibi.",
    color: "#06b6d4",
    price: "₺1.799",
  },
  boom: {
    name: "PetVerse Kamera",
    subtitle: "İzleme Sistemi",
    img: "/lumina_boom.png",
    desc: "Gece görüşü ve çift yönlü ses ile evdeki dostunuzu uzaktan izleyin ve güvende tutun.",
    color: "#ec4899",
    price: "₺1.199",
  },
  case: {
    name: "PetVerse Karne",
    subtitle: "Dijital Takip",
    img: "/lumina_case.png",
    desc: "Aşı takvimi ve sağlık geçmişi artık bulutta. Hatırlatıcılar ile hiçbir kontrolü kaçırma.",
    color: "#f97316",
    price: "₺699",
  },
};

export default function QuizSection() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ band: 0, pods: 0, boom: 0, case: 0 });
  const [done, setDone] = useState(false);
  const [animating, setAnimating] = useState(false);

  const choose = (tag: string) => {
    if (animating) return;
    setAnimating(true);
    const next = { ...scores, [tag]: scores[tag] + 1 };
    setScores(next);
    setTimeout(() => {
      if (step + 1 >= questions.length) {
        setDone(true);
      } else {
        setStep(step + 1);
      }
      setAnimating(false);
    }, 300);
  };

  const reset = () => { setStep(0); setScores({ band: 0, pods: 0, boom: 0, case: 0 }); setDone(false); };

  const topTag = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  const result = results[topTag];
  const progress = ((step + (done ? 1 : 0)) / questions.length) * 100;

  return (
    <section id="quiz" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Bg orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, #7c3aed, transparent)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          filter: "blur(120px)",
          opacity: 0.05,
          borderRadius: "50%",
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6 text-sm font-medium border"
            style={{
              background: "rgba(124,58,237,0.08)",
              borderColor: "rgba(124,58,237,0.3)",
              color: "#c4b5fd",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#a855f7" }} />
            🎮 Oyunlaştırma
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Sana Özel{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a855f7, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PetVerse
            </span>
          </h2>
          <p className="mt-3 text-slate-400 text-lg">
            3 soruda sana en uygun ürünü bulalım.
          </p>
        </div>

        {/* Quiz card */}
        <div
          className="rounded-3xl p-1 reveal"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.15), rgba(124,58,237,0.1))",
          }}
        >
          <div
            className="rounded-[22px] p-8 sm:p-10"
            style={{ background: "#0c0c1e" }}
          >
            {!done ? (
              <>
                {/* Progress */}
                <div className="flex items-center justify-between mb-2 text-sm text-slate-500">
                  <span>Soru {step + 1} / {questions.length}</span>
                  <span className="font-semibold" style={{ color: "#a855f7" }}>{Math.round(progress)}%</span>
                </div>
                <div
                  className="w-full rounded-full h-2 mb-8 overflow-hidden"
                  style={{ background: "rgba(124,58,237,0.15)" }}
                >
                  <div
                    className="h-2 rounded-full progress-bar transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Question */}
                <h3
                  className="text-xl sm:text-2xl font-bold text-white mb-8 leading-snug text-center transition-all duration-300"
                  style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(-10px)" : "translateY(0)" }}
                >
                  {questions[step].q}
                </h3>

                {/* Options — Magic MCP quiz-section inspired */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {questions[step].opts.map((opt) => (
                    <button
                      key={opt.tag}
                      onClick={() => choose(opt.tag)}
                      className="quiz-option rounded-xl px-5 py-4 text-left flex items-center gap-3"
                      style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                      <span className="text-2xl flex-none">{opt.icon}</span>
                      <span className="text-sm font-semibold text-slate-200">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              /* Result */
              <div className="text-center">
                <div className="text-4xl mb-4 animate-bounce">🎉</div>
                <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: result.color }}>
                  Senin için seçtik
                </p>
                <h3 className="text-3xl font-black text-white mb-1">{result.name}</h3>
                <p className="text-slate-400 mb-6" style={{ color: result.color, opacity: 0.8 }}>
                  {result.subtitle}
                </p>

                {/* Product image */}
                <div className="flex justify-center mb-6">
                  <div
                    className="relative w-48 h-48"
                    style={{
                      filter: `drop-shadow(0 0 30px ${result.color}60)`,
                      animation: "float 4s ease-in-out infinite",
                    }}
                  >
                    <Image src={result.img} alt={result.name} fill className="object-contain" />
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-md mx-auto">{result.desc}</p>

                {/* Price + CTA */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-3xl font-black text-white">{result.price}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    className="btn-neon px-8 py-3 rounded-full text-sm font-bold"
                    onClick={() => document.getElementById("urunler")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <span>Tüm Ürünlere Bak ⚡</span>
                  </button>
                  <button
                    onClick={reset}
                    className="px-8 py-3 rounded-full text-sm font-semibold transition-all duration-200"
                    style={{
                      border: "1px solid rgba(124,58,237,0.3)",
                      color: "#94a3b8",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.6)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
                  >
                    Tekrar Dene
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
