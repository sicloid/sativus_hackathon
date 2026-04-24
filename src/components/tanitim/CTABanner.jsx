import Link from 'next/link';

export default function CTABanner() {
  return (
    <section className="bg-green-800 px-6 py-20 border-b-2 border-black text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
          Sorularınız mı Var?
        </h2>
        <Link href="/sss" className="inline-block bg-white text-green-800 font-black tracking-tight text-xl px-8 py-4 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          SSS Sayfasına Git
        </Link>
      </div>
    </section>
  );
}
