import React, { useState } from 'react';
import { Button, Card, Input, Badge, Modal, Toast, LoadingRice } from '../components/ui';
import { ShieldCheck, TrendingUp, AlertCircle, CheckCircle, PieChart, Landmark, Leaf, Coins, HandCoins, User as UserIcon } from 'lucide-react';

const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'LOAN' | 'INVEST' | 'REPAY'>('LOAN');
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- LOAN STATE ---
  const [loanForm, setLoanForm] = useState({ amount: 2000000, purpose: 'Pupuk', type: 'SYARIAH' });
  const [creditScore, setCreditScore] = useState(850); // Mock score

  // --- INVEST STATE ---
  const [projects, setProjects] = useState([
    { id: 1, name: 'Perluasan Lahan Jagung', farmer: 'Pak Yanto', return: '12%', progress: 70, target: 5000000, collected: 3500000 },
    { id: 2, name: 'Hidroponik Melon', farmer: 'Bu Susi', return: '15%', progress: 30, target: 10000000, collected: 3000000 },
  ]);

  // --- REPAY STATE ---
  const [activeLoan, setActiveLoan] = useState({ 
    id: 'L-2024001', amount: 5000000, remaining: 2500000, nextDue: '15 Agustus 2024', status: 'Lancar' 
  });
  const [showPayModal, setShowPayModal] = useState(false);

  // Handlers
  const handleApplyLoan = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setToast({ msg: 'Pengajuan terkirim! Sistem sedang memverifikasi skor kredit Anda.', type: 'success' });
    }, 2000);
  };

  const handleInvest = (id: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setProjects(projects.map(p => p.id === id ? { ...p, collected: p.collected + 50000, progress: Math.min(100, p.progress + 1) } : p));
      setIsLoading(false);
      setToast({ msg: 'Investasi Rp 50.000 berhasil! Terima kasih telah membantu petani lain.', type: 'success' });
    }, 1500);
  };

  const handleRepay = (method: 'CASH' | 'HARVEST') => {
    setIsLoading(true);
    setTimeout(() => {
      setShowPayModal(false);
      setIsLoading(false);
      const reduction = method === 'CASH' ? 500000 : 1000000; // Mock amounts
      setActiveLoan(prev => ({...prev, remaining: Math.max(0, prev.remaining - reduction)}));
      setToast({ 
        msg: method === 'CASH' ? 'Pembayaran tunai diterima.' : 'Pengajuan bayar dengan panen (In-Kind) diproses.', 
        type: 'success' 
      });
    }, 2000);
  };

  return (
    <div className="pb-24 pt-6 px-4 animate-slide-up">
      <Toast message={toast?.msg || null} type={toast?.type} onClose={() => setToast(null)} />
      
      <h1 className="text-2xl font-bold text-agro-dark mb-4">Pembiayaan & Investasi</h1>

      <div className="flex bg-gray-200 p-1 rounded-xl mb-6">
        {[
          { id: 'LOAN', label: 'Ajukan' },
          { id: 'INVEST', label: 'Investasi' },
          { id: 'REPAY', label: 'Cicilan' }
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

      {/* --- TAB 1: AJUKAN PINJAMAN (Crowdfunding & Pembiayaan 6.1) --- */}
      {activeTab === 'LOAN' && (
        <div className="space-y-4 animate-fade-in">
          {/* Credit Score Visualization */}
          <Card className="bg-gradient-to-r from-agro-dark to-agro-green text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs opacity-80 mb-1">Skor Kredit Petani</p>
                <h2 className="text-4xl font-bold">{creditScore}</h2>
                <Badge variant="green" className="mt-2 bg-white/20 text-white border-none">Sangat Layak</Badge>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <ShieldCheck size={32} className="text-agro-gold" />
              </div>
            </div>
            <p className="text-xs mt-4 opacity-80">*Skor dihitung otomatis dari riwayat panen & kontrak Anda.</p>
          </Card>

          <Card>
            <h3 className="font-bold text-gray-800 mb-4">Formulir Pengajuan</h3>
            
            {/* Amount Slider */}
            <div className="mb-4">
               <label className="text-sm text-gray-600 block mb-2 flex justify-between">
                 <span>Butuh Dana Berapa?</span>
                 <span className="font-bold text-agro-green">Rp {loanForm.amount.toLocaleString()}</span>
               </label>
               <input 
                 type="range" min="500000" max="10000000" step="100000"
                 value={loanForm.amount}
                 onChange={(e) => setLoanForm({...loanForm, amount: Number(e.target.value)})}
                 className="w-full accent-agro-green h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
               />
            </div>

            {/* Purpose Select */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-2">Tujuan Penggunaan</label>
              <div className="grid grid-cols-3 gap-2">
                {['Pupuk', 'Benih', 'Alsintan'].map(p => (
                  <div 
                    key={p} 
                    onClick={() => setLoanForm({...loanForm, purpose: p})}
                    className={`p-2 border rounded-lg text-center text-sm cursor-pointer ${loanForm.purpose === p ? 'bg-agro-green text-white border-agro-green' : 'bg-white text-gray-600'}`}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Type Toggle (Syariah/Conv) */}
            <div className="mb-6">
               <label className="text-sm text-gray-600 block mb-2">Jenis Pembiayaan</label>
               <div className="flex bg-gray-100 p-1 rounded-lg">
                 <button 
                   onClick={() => setLoanForm({...loanForm, type: 'SYARIAH'})}
                   className={`flex-1 py-2 text-sm rounded-md flex items-center justify-center gap-1 ${loanForm.type === 'SYARIAH' ? 'bg-white shadow-sm text-green-700 font-bold' : 'text-gray-500'}`}
                 >
                   <Leaf size={14} /> Syariah (Bagi Hasil)
                 </button>
                 <button 
                   onClick={() => setLoanForm({...loanForm, type: 'KONVENSIONAL'})}
                   className={`flex-1 py-2 text-sm rounded-md flex items-center justify-center gap-1 ${loanForm.type === 'KONVENSIONAL' ? 'bg-white shadow-sm text-blue-700 font-bold' : 'text-gray-500'}`}
                 >
                   <Landmark size={14} /> Konvensional
                 </button>
               </div>
            </div>

            <Button onClick={handleApplyLoan} isLoading={isLoading} className="w-full">
              Ajukan Sekarang
            </Button>
          </Card>
        </div>
      )}

      {/* --- TAB 2: INVESTASI (Crowdfunding 6.2) --- */}
      {activeTab === 'INVEST' && (
        <div className="space-y-4 animate-fade-in">
           <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
              <div className="bg-blue-100 p-2 rounded-full h-fit"><Coins className="text-blue-600" size={20}/></div>
              <div>
                <h4 className="font-bold text-blue-800 text-sm">Bantu Sesama Petani</h4>
                <p className="text-xs text-blue-600 mt-1">Investasi mulai Rp 50.000 pada proyek nyata. Bagi hasil menarik saat panen.</p>
              </div>
           </div>

           {projects.map(proj => (
             <Card key={proj.id} className="border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-800">{proj.name}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><UserIcon size={12}/> {proj.farmer}</p>
                  </div>
                  <Badge variant="green">ROI {proj.return}</Badge>
                </div>

                <div className="mt-4 mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Terkumpul: {Math.round((proj.collected/proj.target)*100)}%</span>
                    <span className="font-bold text-agro-dark">Rp {proj.collected.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-agro-gold h-full rounded-full" style={{width: `${proj.progress}%`}}></div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                   <p className="text-xs text-gray-400">Target: Rp {proj.target.toLocaleString()}</p>
                   <Button size="sm" onClick={() => handleInvest(proj.id)} disabled={isLoading}>Danai Rp 50rb</Button>
                </div>
             </Card>
           ))}
        </div>
      )}

      {/* --- TAB 3: CICILAN (Kelola Cicilan 6.3) --- */}
      {activeTab === 'REPAY' && (
        <div className="space-y-4 animate-fade-in">
           <Card className="border-l-4 border-l-red-500 bg-red-50">
              <div className="flex justify-between">
                 <p className="text-sm font-bold text-gray-700">Tagihan Berikutnya</p>
                 <Badge variant="red">Jatuh Tempo: 15 Agt</Badge>
              </div>
              <h2 className="text-2xl font-bold text-red-600 mt-1">Rp 500.000</h2>
              <p className="text-xs text-gray-500 mt-1">Pinjaman ID: {activeLoan.id}</p>
           </Card>

           <Card>
              <h3 className="font-bold text-gray-800 mb-4">Status Pinjaman Aktif</h3>
              <div className="space-y-3">
                 <div className="flex justify-between text-sm border-b pb-2">
                    <span className="text-gray-500">Total Pinjaman</span>
                    <span className="font-bold">Rp {activeLoan.amount.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-sm border-b pb-2">
                    <span className="text-gray-500">Sisa Pokok</span>
                    <span className="font-bold text-agro-dark">Rp {activeLoan.remaining.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-sm pb-2">
                    <span className="text-gray-500">Status</span>
                    <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded text-xs">Lancar Jaya</span>
                 </div>
              </div>

              <div className="mt-6 flex gap-2">
                 <Button variant="outline" className="flex-1 text-xs" onClick={() => setShowPayModal(true)}>Restrukturisasi</Button>
                 <Button className="flex-1 text-xs" onClick={() => setShowPayModal(true)}>Bayar Cicilan</Button>
              </div>
           </Card>

           {/* Fitur 6.3: Opsi bayar dengan hasil panen */}
           <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-4 rounded-xl flex gap-3 items-center" onClick={() => setShowPayModal(true)}>
              <div className="bg-white p-2 rounded-full shadow-sm"><Leaf className="text-orange-500" size={20}/></div>
              <div>
                 <h4 className="font-bold text-orange-800 text-sm">Bayar Pakai Gabah?</h4>
                 <p className="text-xs text-orange-600">Gunakan stok panen Anda untuk potong cicilan langsung.</p>
              </div>
           </div>
        </div>
      )}

      {/* REPAYMENT MODAL */}
      <Modal 
        isOpen={showPayModal} 
        onClose={() => setShowPayModal(false)}
        title="Pilih Metode Bayar"
      >
         <div className="space-y-3">
            <button onClick={() => handleRepay('CASH')} className="w-full p-4 border rounded-xl flex items-center justify-between hover:bg-gray-50">
               <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full"><HandCoins className="text-green-600" size={20}/></div>
                  <div className="text-left">
                     <p className="font-bold text-sm">Tunai / Transfer</p>
                     <p className="text-xs text-gray-500">Via Dompet Tani</p>
                  </div>
               </div>
            </button>

            <button onClick={() => handleRepay('HARVEST')} className="w-full p-4 border border-agro-gold bg-yellow-50 rounded-xl flex items-center justify-between hover:bg-yellow-100">
               <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-full"><Leaf className="text-agro-gold" size={20}/></div>
                  <div className="text-left">
                     <p className="font-bold text-sm text-yellow-900">Potong Hasil Panen (In-Kind)</p>
                     <p className="text-xs text-yellow-700">Otomatis saat panen tiba</p>
                  </div>
               </div>
               <Badge variant="gold">Rekomen</Badge>
            </button>
         </div>
      </Modal>

    </div>
  );
};

export default Finance;