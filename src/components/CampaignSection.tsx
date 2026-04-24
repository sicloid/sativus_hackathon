"use client";
import { useEffect, useRef } from "react";

const values = [
  {
    icon: "⚡",
    title: "Enerji Dolu Deneyim",
    desc: "Her ürün, gençlerin aktif yaşam temposuna uyum sağlamak için tasarlandı. Spor, müzik, teknoloji — hepsi bir arada.",
    color: "#7c3aed",
  },
  {
    icon: "🎯",
    title: "Sana Özel Tasarım",
    desc: "Genç estetiği ve modern tasarım anlayışıyla birleştirilen Lumina ürünleri, tarzını yansıtır.",
    color: "#06b6d4",
  },
  {
    icon: "🌍",
    title: "Dijital Bağlantı",
    desc: "Sosyal medya entegrasyonu, akıllı paylaşım ve topluluk özellikleriyle gençleri birbirine bağlıyoruz.",
    color: "#ec4899",
  },
  {
    icon: "🔋",
    title: "Uzun Ömürlü Performans",
    desc: "Günlük yaşamın temposuna ayak uyduran, uzun pil ömrü ve dayanıklı yapıya sahip ürünler.",
    color: "#f97316",
  },
];

const timeline = [
  { step: "01", title: "Keşfet", desc: "Lumina Tech dünyasını ve kampanyayı tanı.", color: "#7c3aed" },
  { step: "02", title: "Seç", desc: "Yaşam tarzına en uygun Lumina ürününü bul.", color: "#06b6d4" },
  { step: "03", title: "Işılt", desc: "Ürününü kullan, enerjini paylaş, dünyayı ışılt.", color: "#ec4899" },
];

export default function CampaignSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="kampanya" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="orb"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, #7c3aed, transparent)",
          top: "10%",
          right: "-15%",
          opacity: 0.08,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm font-medium text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Kampanya Detayları
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            Neden{" "}
            <span className="grad-text">Lumina Tech?</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            &ldquo;Gençlik Enerjisi Seninle!&rdquo; kampanyası, gençlerle dijital bağ kurarak
            marka bilinirliğini artırmayı ve teknolojiyi eğlenceyle buluşturmayı hedefler.
          </p>
        </div>

        {/* Campaign purpose */}
        <div className="glass rounded-2xl p-8 lg:p-12 mb-16 reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Kampanyanın Amacı
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Lumina Tech, teknoloji ile gençliği bir araya getiriyor. Bu kampanya ile 18-28 yaş
                arası genç kitleye dokunarak marka bilinirliğini dijital kanallar üzerinden güçlendirmeyi
                ve yenilikçi ürünleri eğlenceli bir deneyimle tanıtmayı amaçlıyoruz.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Gen-Z", "Aktif Yaşam", "Müzik Sever", "Tech Meraklısı", "Sporcu"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border border-purple-500/40 text-purple-300 bg-purple-900/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Kampanya Süresi", val: "12 Hafta" },
                { label: "Hedef Kitle Yaşı", val: "18–28" },
                { label: "Sosyal Medya", val: "8 Platform" },
                { label: "Kampanya Teması", val: "Enerji & Işık" },
              ].map((item) => (
                <div key={item.label} className="stat-card glass rounded-xl p-5 text-center">
                  <div className="text-2xl font-black grad-text">{item.val}</div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Value cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="glass product-card rounded-2xl p-6 reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: `${v.color}20`, border: `1px solid ${v.color}40` }}
              >
                {v.icon}
              </div>
              <h4 className="text-base font-bold text-white mb-2">{v.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Timeline / message flow */}
        <div className="reveal">
          <h3 className="text-2xl lg:text-3xl font-bold text-white text-center mb-10">
            Mesaj Akışı
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-0">
            {timeline.map((t, i) => (
              <div key={t.step} className="flex-1 flex flex-col sm:flex-row items-center">
                <div className="flex flex-col items-center text-center px-6 py-8 group">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black text-white mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`, boxShadow: `0 0 30px ${t.color}40` }}
                  >
                    {t.step}
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">{t.title}</h4>
                  <p className="text-sm text-slate-400 max-w-xs">{t.desc}</p>
                </div>
                {i < timeline.length - 1 && (
                  <div className="flex-none w-px h-12 sm:h-px sm:w-full" style={{ background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
