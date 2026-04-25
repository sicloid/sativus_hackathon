"use client";

import { useState } from "react";
import { Calendar, Syringe, Pill, Activity } from "lucide-react";

export default function KarneTabs({ 
  appointments, 
  vaccinations, 
  prescriptions 
}: { 
  appointments: any[];
  vaccinations: any[];
  prescriptions: any[];
}) {
  const [activeTab, setActiveTab] = useState("randevular");

  // Mock data fallbacks for hackathon demo
  const mockVaccinations = vaccinations.length > 0 ? vaccinations : [
    { id: '1', name: 'Kuduz Aşısı', date: new Date('2024-01-15'), nextDate: new Date('2025-01-15'), vetName: 'Dr. Zeynep Yılmaz', status: 'completed' },
    { id: '2', name: 'Karma Aşı', date: new Date('2024-03-20'), nextDate: new Date('2025-03-20'), vetName: 'Dr. Ahmet Yılmaz', status: 'completed' },
    { id: '3', name: 'Lyme Aşısı', date: new Date('2024-06-10'), nextDate: new Date('2025-06-10'), vetName: 'Dr. Zeynep Yılmaz', status: 'upcoming' },
  ];

  const mockPrescriptions = prescriptions.length > 0 ? prescriptions : [
    { 
      id: '1', 
      vetName: 'Dr. Zeynep Yılmaz', 
      date: new Date('2024-04-10'), 
      diagnosis: 'Hafif Soğuk Algınlığı', 
      items: [
        { name: 'Vitamin C Takviyesi', dosage: 'Günde 1 kez', quantity: 1 }
      ] 
    },
    { 
      id: '2', 
      vetName: 'Dr. Ali Veli', 
      date: new Date('2023-11-22'), 
      diagnosis: 'Mide İltihabı', 
      items: [
        { name: 'Antiasit Şurup', dosage: 'Günde 2 kez, sabah akşam', quantity: 1 },
        { name: 'Probiyotik', dosage: 'Günde 1 kez', quantity: 1 }
      ] 
    }
  ];

  const mockXRays = [
    { id: '1', date: new Date('2024-02-05'), region: 'Sol Arka Bacak', vetName: 'Dr. Zeynep Yılmaz', notes: 'Kemik yapısı normal, çatlak belirtisi yok.', imageUrl: '/images/xrays/leg.png' },
    { id: '2', date: new Date('2023-10-12'), region: 'Göğüs Kafesi', vetName: 'Dr. Ahmet Kaya', notes: 'Akciğer kapasitesi iyi durumda, herhangi bir anomali görülmedi.', imageUrl: '/images/xrays/chest.png' }
  ];

  return (
    <div className="space-y-6">
      {/* Tabs Header */}
      <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
        <button 
          onClick={() => setActiveTab("randevular")}
          className={`flex-shrink-0 flex items-center gap-2 px-6 py-4 rounded-2xl border-4 border-black font-black uppercase transition-all ${activeTab === "randevular" ? "bg-[#3b82f6] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]" : "bg-white text-black hover:bg-zinc-100"}`}
        >
          <Calendar className="w-5 h-5" /> Randevular
        </button>
        <button 
          onClick={() => setActiveTab("asilar")}
          className={`flex-shrink-0 flex items-center gap-2 px-6 py-4 rounded-2xl border-4 border-black font-black uppercase transition-all ${activeTab === "asilar" ? "bg-[#10b981] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]" : "bg-white text-black hover:bg-zinc-100"}`}
        >
          <Syringe className="w-5 h-5" /> Aşı Takvimi
        </button>
        <button 
          onClick={() => setActiveTab("receteler")}
          className={`flex-shrink-0 flex items-center gap-2 px-6 py-4 rounded-2xl border-4 border-black font-black uppercase transition-all ${activeTab === "receteler" ? "bg-[#f59e0b] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]" : "bg-white text-black hover:bg-zinc-100"}`}
        >
          <Pill className="w-5 h-5" /> Reçeteler
        </button>
        <button 
          onClick={() => setActiveTab("rontgenler")}
          className={`flex-shrink-0 flex items-center gap-2 px-6 py-4 rounded-2xl border-4 border-black font-black uppercase transition-all ${activeTab === "rontgenler" ? "bg-[#a855f7] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]" : "bg-white text-black hover:bg-zinc-100"}`}
        >
          <Activity className="w-5 h-5" /> Röntgenler
        </button>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        
        {/* Appointments Tab */}
        {activeTab === "randevular" && (
          appointments.length === 0 ? (
            <div className="border-4 border-black bg-white p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
              <h2 className="text-2xl font-black uppercase mb-2">Henüz Randevu Yok</h2>
              <p className="text-zinc-600 font-bold text-lg">VetAI asistanını kullanarak ilk randevunuzu oluşturun.</p>
            </div>
          ) : (
            appointments.map(app => (
              <div key={app.id} className="border-4 border-black bg-white p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-start flex-wrap gap-4 border-b-4 border-black pb-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-black uppercase">{app.petName} <span className="text-zinc-500 text-lg">({app.petSpecies})</span></h2>
                    <p className="text-zinc-700 font-bold text-lg">{app.provider?.name || "Bilinmiyor"} - {app.provider?.specialty || "Klinik"}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-emerald-300 border-4 border-black px-4 py-2 font-black uppercase rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">
                      {app.slot?.date ? new Date(app.slot.date).toLocaleDateString('tr-TR') : ""} {app.slot?.startTime}
                    </div>
                  </div>
                </div>

                {app.aiDiagnosis || app.aiAciliyet ? (
                  <div className="bg-zinc-100 border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="font-black uppercase mb-2">AI Teşhis Notları</h3>
                    <div className="flex gap-2 mb-2 flex-wrap">
                       {app.aiAciliyet && <span className="bg-orange-300 border-2 border-black px-2 py-1 font-bold text-sm rounded-full">Aciliyet: {app.aiAciliyet}</span>}
                       {app.aiHizmet && <span className="bg-cyan-300 border-2 border-black px-2 py-1 font-bold text-sm rounded-full">Hizmet: {app.aiHizmet}</span>}
                    </div>
                    <p className="font-bold">{app.aiOzeti}</p>
                  </div>
                ) : (
                  <p className="font-bold text-zinc-500 italic">Yapay zeka teşhisi kullanılmadan oluşturuldu.</p>
                )}
              </div>
            ))
          )
        )}

        {/* Vaccinations Tab */}
        {activeTab === "asilar" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockVaccinations.map((vac, idx) => (
              <div key={idx} className="border-4 border-black bg-white p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-16 h-16 ${vac.status === 'completed' ? 'bg-emerald-300' : 'bg-orange-300'} border-l-4 border-b-4 border-black flex items-center justify-center rounded-bl-2xl`}>
                  <Syringe className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black uppercase mb-2">{vac.name}</h3>
                <div className="space-y-2 mt-4 font-bold text-zinc-700">
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-black">Tarih:</span>
                    <span>{new Date(vac.date).toLocaleDateString('tr-TR')}</span>
                  </div>
                  {vac.nextDate && (
                    <div className="flex items-center gap-2">
                      <span className="w-24 text-black">Sonraki:</span>
                      <span className="text-red-600">{new Date(vac.nextDate).toLocaleDateString('tr-TR')}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-black">Hekim:</span>
                    <span>{vac.vetName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === "receteler" && (
          <div className="space-y-6">
            {mockPrescriptions.map((rec, idx) => (
              <div key={idx} className="border-4 border-black bg-white p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-4 flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-black uppercase text-[#f59e0b]">{rec.diagnosis}</h3>
                    <p className="font-bold text-zinc-600 mt-1">Hekim: {rec.vetName}</p>
                  </div>
                  <div className="bg-black text-white px-4 py-2 rounded-xl font-bold border-2 border-black">
                    {new Date(rec.date || rec.createdAt).toLocaleDateString('tr-TR')}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-black uppercase text-lg">İlaçlar</h4>
                  <ul className="space-y-2">
                    {rec.items?.map((item: any, i: number) => (
                      <li key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-zinc-100 border-2 border-black rounded-xl font-bold">
                        <div className="flex items-center gap-2">
                          <Pill className="w-5 h-5 text-zinc-500" />
                          <span>{item.name}</span>
                        </div>
                        <div className="text-zinc-600 text-sm sm:text-base mt-2 sm:mt-0">
                          {item.dosage} <span className="mx-2">•</span> Adet: {item.quantity}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* X-Rays Tab */}
        {activeTab === "rontgenler" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockXRays.map((xray, idx) => (
              <div key={idx} className="border-4 border-black bg-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
                <div className="h-48 bg-zinc-200 border-b-4 border-black relative">
                  {/* X-ray image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={xray.imageUrl} alt="Röntgen" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 py-1 rounded-lg font-bold text-sm">
                    {new Date(xray.date).toLocaleDateString('tr-TR')}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-black uppercase text-[#a855f7]">{xray.region}</h3>
                  <p className="font-bold text-zinc-600 text-sm mt-1">Hekim: {xray.vetName}</p>
                  <p className="mt-4 font-bold text-black border-l-4 border-[#a855f7] pl-3 py-1 bg-zinc-50 flex-grow">
                    {xray.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
