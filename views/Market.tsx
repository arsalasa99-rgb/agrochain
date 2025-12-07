import React, { useState } from 'react';
import { Card, Button, Badge, Modal, Toast, Input, LoadingRice } from '../components/ui';
import { Handshake, Truck, QrCode, MessageSquare, Check, FileCheck, Calendar, Map, BarChart3, ChevronRight, Package, Box } from 'lucide-react';

const Market: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'BURSA' | 'MY_CONTRACT' | 'TRACKING'>('BURSA');
  const [toast, setToast] = useState<{msg: string, type: 'success'} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- SMART CONTRACT STATE (Fitur 4) ---
  const [requests] = useState([
    { id: 1, buyer: 'PT Indofood', item: 'Kentang Granola', vol: '10 Ton', price: 'Rp 12.000/kg', loc: 'Jawa Tengah' },
    { id: 2, buyer: 'Superindo', item: 'Cabai Rawit', vol: '2 Ton', price: 'Rp 45.000/kg', loc: 'Jawa Barat' },
  ]);
  
  // Wizard State
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  // --- SUPPLY CHAIN STATE (Fitur 5) ---
  const [trackingStep, setTrackingStep] = useState<'GENERATE_QR' | 'MAP' | 'MARGIN'>('GENERATE_QR');
  const [qrGenerated, setQrGenerated] = useState(false);

  // Handlers
  const openContractWizard = (req: any) => {
    setSelectedRequest(req);
    setWizardStep(1);
    setShowWizard(true);
  };

  const signContract = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowWizard(false);
      setToast({ msg: 'Kontrak Digital Berhasil Ditandatangani & Masuk Blockchain!', type: 'success' });
    }, 2000);
  };

  return (
    <div className="pb-24 pt-6 px-4 animate-slide-up">
      <Toast message={toast?.msg || null} onClose={() => setToast(null)} />

      <h1 className="text-2xl font-bold text-agro-dark mb-4">Pasar & Transaksi</h1>
      
      <div className="flex bg-gray-200 p-1 rounded-xl mb-6">
        {[
          { id: 'BURSA', label: 'Bursa' },
          { id: 'MY_CONTRACT', label: 'Kontrakku' },
          { id: 'TRACKING', label: 'Lacak' }
        ].map(tab => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)} 
             className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === tab.id ? 'bg-white text-agro-dark shadow-sm' : 'text-gray-500'}`}
           >
             {tab.label}
           </button>
        ))}
      </div>

      {/* --- TAB 1: PASAR KONTRAK (Smart Contract 4.1) --- */}
      {activeTab === 'BURSA' && (
        <div className="space-y-4 animate-fade-in">
           {/* Filters */}
           <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
             {['Semua', 'Padi', 'Jagung', 'Cabai', 'Kentang'].map(f => (
               <span key={f} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600 whitespace-nowrap">{f}</span>
             ))}
           </div>

           {requests.map(req => (
             <Card key={req.id} className="border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                   <div>
                     <h4 className="font-bold text-gray-800">{req.buyer}</h4>
                     <p className="text-xs text-gray-500">{req.loc}</p>
                   </div>
                   <Badge variant="green">Open</Badge>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg grid grid-cols-2 gap-2 text-sm mb-3">
                   <div>
                     <p className="text-xs text-gray-500">Komoditas</p>
                     <p className="font-bold">{req.item}</p>
                   </div>
                   <div>
                     <p className="text-xs text-gray-500">Volume</p>
                     <p className="font-bold">{req.vol}</p>
                   </div>
                   <div className="col-span-2 border-t pt-2 mt-1">
                     <p className="text-xs text-gray-500">Harga Penawaran</p>
                     <p className="font-bold text-lg text-agro-green">{req.price}</p>
                   </div>
                </div>

                <Button className="w-full" onClick={() => openContractWizard(req)}>Ambil Kontrak</Button>
             </Card>
           ))}
        </div>
      )}

      {/* --- TAB 2: MANAJEMEN KONTRAK (Smart Contract 4.3) --- */}
      {activeTab === 'MY_CONTRACT' && (
        <div className="space-y-4 animate-fade-in">
           <Card className="bg-gradient-to-r from-agro-dark to-agro-green text-white">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold">Kontrak Aktif</h3>
                 <span className="bg-white/20 px-2 py-0.5 rounded text-xs">#CTR-8829</span>
              </div>
              <div className="space-y-2 mb-4">
                 <div className="flex justify-between text-sm"><span>Pembeli</span> <b>PT Indofood</b></div>
                 <div className="flex justify-between text-sm"><span>Deadline</span> <b>15 Oktober 2024</b></div>
                 <div className="flex justify-between text-sm"><span>Progress</span> <b>Panen (80%)</b></div>
              </div>
              
              {/* Milestone Payments */}
              <div className="bg-white/10 p-2 rounded-lg">
                 <p className="text-xs mb-2 opacity-80">Status Pembayaran Bertahap</p>
                 <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-black/20">
                    <div className="w-1/3 bg-green-400" title="DP 30%"></div>
                    <div className="w-1/3 bg-yellow-400" title="Termin 2"></div>
                    <div className="w-1/3 bg-gray-400" title="Pelunasan"></div>
                 </div>
                 <div className="flex justify-between text-[10px] mt-1 opacity-70">
                    <span>DP Cair</span>
                    <span>Proses</span>
                    <span>Terkunci</span>
                 </div>
              </div>
           </Card>

           <h3 className="font-bold text-gray-800 text-sm">Riwayat Selesai</h3>
           <Card className="opacity-70">
              <div className="flex justify-between">
                <span className="font-bold text-gray-700">CV Sumber Makmur</span>
                <span className="text-green-600 font-bold text-sm">Selesai</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">5 Ton Jagung • Rp 25.000.000</p>
           </Card>
        </div>
      )}

      {/* --- TAB 3: SUPPLY CHAIN TRACKER (Fitur 5) --- */}
      {activeTab === 'TRACKING' && (
        <div className="space-y-4 animate-fade-in">
           {/* Sub-Navigation for Tracking */}
           <div className="flex gap-2 mb-4">
              <button onClick={() => setTrackingStep('GENERATE_QR')} className={`px-3 py-1 rounded-full text-xs border ${trackingStep === 'GENERATE_QR' ? 'bg-agro-green text-white' : 'bg-white text-gray-600'}`}>QR Panen</button>
              <button onClick={() => setTrackingStep('MAP')} className={`px-3 py-1 rounded-full text-xs border ${trackingStep === 'MAP' ? 'bg-agro-green text-white' : 'bg-white text-gray-600'}`}>Peta Jalan</button>
              <button onClick={() => setTrackingStep('MARGIN')} className={`px-3 py-1 rounded-full text-xs border ${trackingStep === 'MARGIN' ? 'bg-agro-green text-white' : 'bg-white text-gray-600'}`}>Transparansi</button>
           </div>

           {/* 5.1 QR Code Generator */}
           {trackingStep === 'GENERATE_QR' && (
             <Card className="text-center py-8">
                {!qrGenerated ? (
                  <>
                    <Package size={48} className="mx-auto text-gray-300 mb-4"/>
                    <h3 className="font-bold text-gray-800 mb-2">Buat Identitas Panen</h3>
                    <p className="text-sm text-gray-500 mb-6">Generate QR Code unik untuk ditempel di karung hasil panen Anda agar terlacak.</p>
                    <Button onClick={() => setQrGenerated(true)} className="w-full">Generate QR Lot #001</Button>
                  </>
                ) : (
                  <div className="animate-fade-in">
                    <div className="bg-white p-4 inline-block rounded-xl border-2 border-agro-dark mb-4">
                       <QrCode size={120} className="text-black"/>
                    </div>
                    <p className="font-mono font-bold text-lg text-agro-dark tracking-widest mb-1">LOT-2024-XP99</p>
                    <p className="text-xs text-gray-500 mb-4">Kebun Cabai Utara • Grade A • 50kg</p>
                    <Button variant="outline" size="sm" onClick={() => window.print()}>Cetak Label</Button>
                  </div>
                )}
             </Card>
           )}

           {/* 5.2 Peta Perjalanan */}
           {trackingStep === 'MAP' && (
             <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 py-2">
                <div className="ml-6 relative">
                   <span className="absolute -left-[33px] bg-agro-green text-white p-1 rounded-full"><Check size={12}/></span>
                   <h4 className="font-bold text-sm">Kebun Petani (Anda)</h4>
                   <p className="text-xs text-gray-500">12 Agt, 08:00 • Dipanen</p>
                </div>
                <div className="ml-6 relative">
                   <span className="absolute -left-[33px] bg-agro-green text-white p-1 rounded-full"><Check size={12}/></span>
                   <h4 className="font-bold text-sm">Gudang Pengumpul</h4>
                   <p className="text-xs text-gray-500">12 Agt, 14:00 • Disortir (Grade A)</p>
                </div>
                <div className="ml-6 relative">
                   <span className="absolute -left-[33px] bg-blue-500 text-white p-1 rounded-full animate-pulse"><Truck size={12}/></span>
                   <h4 className="font-bold text-sm text-blue-600">Dalam Perjalanan</h4>
                   <p className="text-xs text-gray-500">Estimasi tiba: 13 Agt, 06:00</p>
                </div>
                <div className="ml-6 relative opacity-50">
                   <span className="absolute -left-[33px] bg-gray-300 text-white p-1 rounded-full"><Box size={12}/></span>
                   <h4 className="font-bold text-sm">Pabrik / Pembeli</h4>
                   <p className="text-xs text-gray-500">Menunggu penerimaan</p>
                </div>
             </div>
           )}

           {/* 5.3 Transparansi Margin */}
           {trackingStep === 'MARGIN' && (
             <div className="space-y-4">
                <Card className="bg-white">
                   <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                     <BarChart3 size={18} className="text-agro-green"/> Breakdown Harga Akhir
                   </h3>
                   
                   {/* Petani (Besar) */}
                   <div className="mb-4 p-4 bg-green-50 rounded-xl border border-green-100">
                      <div className="flex justify-between items-center mb-1">
                         <span className="font-bold text-agro-dark">PETANI (ANDA)</span>
                         <span className="text-xl font-bold text-agro-dark">78%</span>
                      </div>
                      <div className="w-full bg-green-200 h-3 rounded-full overflow-hidden">
                         <div className="bg-agro-green h-full" style={{width: '78%'}}></div>
                      </div>
                      <p className="text-xs text-right mt-1 text-gray-600">Rp 12.000 / kg</p>
                   </div>

                   {/* Middlemen (Kecil) */}
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs text-gray-600">
                         <span>Logistik & Transport</span>
                         <span>12% (Rp 1.800)</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full">
                         <div className="bg-yellow-400 h-full" style={{width: '12%'}}></div>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-gray-600">
                         <span>Margin Distributor</span>
                         <span>10% (Rp 1.500)</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full">
                         <div className="bg-blue-400 h-full" style={{width: '10%'}}></div>
                      </div>
                   </div>
                   
                   <div className="mt-6 pt-4 border-t flex justify-between font-bold text-sm">
                      <span>Harga Konsumen Akhir</span>
                      <span>Rp 15.300 / kg</span>
                   </div>
                </Card>
             </div>
           )}
        </div>
      )}

      {/* --- WIZARD MODAL (Fitur 4.2) --- */}
      <Modal 
        isOpen={showWizard} 
        onClose={() => setShowWizard(false)} 
        title={`Kontrak Digital (Langkah ${wizardStep}/3)`}
        footer={
           wizardStep < 3 ? (
             <Button className="w-full" onClick={() => setWizardStep(p => p + 1)}>Lanjut <ChevronRight/></Button>
           ) : (
             <Button className="w-full" onClick={signContract} isLoading={isLoading}>Tanda Tangan & Finalisasi</Button>
           )
        }
      >
         {selectedRequest && (
           <div className="min-h-[200px]">
              {/* Step 1: Review */}
              {wizardStep === 1 && (
                 <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">Review Pembeli</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                       <p className="text-sm"><b>Perusahaan:</b> {selectedRequest.buyer}</p>
                       <p className="text-sm"><b>Reputasi:</b> ⭐ 4.9/5.0 (Terpercaya)</p>
                       <p className="text-sm"><b>Lokasi Gudang:</b> {selectedRequest.loc}</p>
                    </div>
                    <p className="text-xs text-gray-500">Pastikan Anda menyanggupi volume <b>{selectedRequest.vol}</b> dengan kualitas sesuai standar.</p>
                 </div>
              )}

              {/* Step 2: Terms */}
              {wizardStep === 2 && (
                 <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">Syarat & Ketentuan</h4>
                    <ul className="text-xs space-y-2 text-gray-600 list-disc ml-4">
                       <li>Kadar air maksimal 14% (Standar SNI).</li>
                       <li>Pengiriman dilakukan maksimal 2 hari setelah panen raya.</li>
                       <li><b>Penalti:</b> Potongan harga 10% jika kualitas di bawah Grade B.</li>
                       <li><b>Pembayaran:</b> DP 30% saat tanda tangan, 70% setelah barang diterima (H+3).</li>
                    </ul>
                    <div className="flex items-center gap-2 mt-4 bg-yellow-50 p-2 rounded text-xs text-yellow-800">
                       <input type="checkbox" className="w-4 h-4" defaultChecked /> Saya menyetujui syarat di atas.
                    </div>
                 </div>
              )}

              {/* Step 3: Sign */}
              {wizardStep === 3 && (
                 <div className="space-y-4 text-center">
                    <FileCheck size={48} className="mx-auto text-agro-green"/>
                    <h4 className="font-bold text-gray-800">Tanda Tangan Digital</h4>
                    <p className="text-xs text-gray-500">Kontrak ini akan dienkripsi dan dicatat dalam blockchain sebagai bukti sah transaksi.</p>
                    
                    <div className="border-2 border-dashed border-gray-300 h-24 rounded-xl flex items-center justify-center bg-gray-50">
                       <span className="text-gray-400 text-sm font-handwriting italic">Klik tombol di bawah untuk TTD</span>
                    </div>
                    
                    <div className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
                       Hash: 0x8f2a...9d12 (Auto-Generated)
                    </div>
                 </div>
              )}
           </div>
         )}
      </Modal>

    </div>
  );
};

export default Market;
