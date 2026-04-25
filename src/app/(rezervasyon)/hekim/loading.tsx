import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fdfdfd] flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="w-24 h-24 border-8 border-black rounded-3xl animate-pulse"></div>
          <Loader2 className="absolute inset-0 m-auto w-10 h-10 animate-spin text-blue-600" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tighter">Hekim Verileri Çekiliyor...</h2>
        <p className="font-bold text-zinc-500">Lütfen bekleyin, kontrol merkezi hazırlanıyor.</p>
      </div>
    </div>
  );
}
