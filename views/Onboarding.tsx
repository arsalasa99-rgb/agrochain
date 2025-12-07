import React, { useState } from 'react';
import { Button, Input, Card, LoadingRice } from '../components/ui';
import { UserRole } from '../types';
import { LOCATIONS, COMMODITIES } from '../constants';
import { ChevronRight, Globe, User, Users, Briefcase, Factory } from 'lucide-react';

interface OnboardingProps {
  onComplete: (userData: any) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'LOGIN' | 'ROLE' | 'DETAILS' | 'SURVEY'>('LOGIN');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    role: UserRole.OWNER,
    commodity: '',
    problems: [] as string[],
    feature: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate OTP process
    setTimeout(() => {
      setLoading(false);
      setStep('ROLE');
    }, 1500);
  };

  const selectRole = (role: UserRole) => {
    setFormData({ ...formData, role });
    setStep('DETAILS');
  };

  const submitDetails = () => {
    if (!formData.location) return; // Simple validation
    setStep('SURVEY');
  };

  const finishOnboarding = () => {
    setLoading(true);
    setTimeout(() => {
      onComplete(formData);
    }, 2000); // Simulate creating account
  };

  const toggleProblem = (problem: string) => {
    setFormData(prev => {
      const exists = prev.problems.includes(problem);
      return {
        ...prev,
        problems: exists ? prev.problems.filter(p => p !== problem) : [...prev.problems, problem]
      };
    });
  };

  if (loading && step === 'SURVEY') {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center p-6">
        <LoadingRice text="Menyiapkan Kebun Digital Anda..." />
      </div>
    );
  }

  // --- Step 1: Login ---
  if (step === 'LOGIN') {
    return (
      <div className="min-h-screen bg-agro-soil flex flex-col p-6">
        <div className="flex justify-between items-center mb-8 mt-4">
          <h2 className="text-2xl font-bold text-agro-dark">Masuk / Daftar</h2>
          <button className="flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border shadow-sm">
            <Globe size={14} /> Bahasa
          </button>
        </div>

        <Card className="flex-1 flex flex-col justify-center mb-6">
           <div className="text-center mb-6">
             <div className="w-16 h-16 bg-agro-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
               <User className="text-agro-green w-8 h-8" />
             </div>
             <h3 className="text-lg font-bold text-gray-800">Selamat Datang Petani!</h3>
             <p className="text-gray-500 text-sm">Masukan nomor WA untuk kode OTP</p>
           </div>
           
           <form onSubmit={handleLogin} className="space-y-4">
             <Input 
               label="Nama Lengkap" 
               placeholder="Contoh: Budi Santoso" 
               value={formData.name}
               onChange={e => setFormData({...formData, name: e.target.value})}
               required
             />
             <Input 
               label="Nomor WhatsApp" 
               placeholder="08xxxxxxxxxx" 
               type="tel" 
               value={formData.phone}
               onChange={e => setFormData({...formData, phone: e.target.value})}
               required
             />
             <Button type="submit" className="w-full mt-4" isLoading={loading}>
               Kirim OTP
             </Button>
           </form>
           
           <p className="text-xs text-center text-gray-400 mt-6">
             Dengan mendaftar, Anda menyetujui Syarat & Ketentuan Agro-Chain Nusantara.
           </p>
        </Card>
      </div>
    );
  }

  // --- Step 2: Select Role ---
  if (step === 'ROLE') {
    return (
      <div className="min-h-screen bg-agro-green p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Siapa Anda?</h2>
        <p className="opacity-90 mb-8">Pilih peran yang paling sesuai untuk pengalaman terbaik.</p>

        <div className="grid grid-cols-1 gap-4">
          <div onClick={() => selectRole(UserRole.OWNER)} className="bg-white text-agro-dark p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition shadow-lg">
            <div className="bg-green-100 p-3 rounded-full"><User size={24} /></div>
            <div>
              <h3 className="font-bold">Petani Pemilik Lahan</h3>
              <p className="text-xs text-gray-500">Saya punya lahan sendiri</p>
            </div>
          </div>

          <div onClick={() => selectRole(UserRole.WORKER)} className="bg-white/90 text-agro-dark p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white transition shadow-lg">
            <div className="bg-yellow-100 p-3 rounded-full"><Briefcase size={24} /></div>
            <div>
              <h3 className="font-bold">Petani Penggarap</h3>
              <p className="text-xs text-gray-500">Saya mengelola lahan orang lain</p>
            </div>
          </div>

           <div onClick={() => selectRole(UserRole.GROUP)} className="bg-white/90 text-agro-dark p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white transition shadow-lg">
            <div className="bg-blue-100 p-3 rounded-full"><Users size={24} /></div>
            <div>
              <h3 className="font-bold">Kelompok Tani</h3>
              <p className="text-xs text-gray-500">Mewakili organisasi tani</p>
            </div>
          </div>

          <div className="bg-agro-dark/30 text-white p-4 rounded-2xl flex items-center gap-4 cursor-pointer border border-white/20">
            <div className="bg-gray-700 p-3 rounded-full"><Factory size={24} /></div>
            <div>
              <h3 className="font-bold">Pembeli / Industri</h3>
              <p className="text-xs opacity-70">Akan dialihkan ke aplikasi mitra</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Step 3: Location ---
  if (step === 'DETAILS') {
    return (
      <div className="min-h-screen bg-white p-6 flex flex-col">
        <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
          <div className="bg-agro-green h-full w-1/2"></div>
        </div>

        <h2 className="text-2xl font-bold text-agro-dark mb-6">Dimana Lokasi Kebun?</h2>
        
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Pilih Desa / Kelurahan</label>
          <select 
            className="w-full p-4 rounded-xl border border-gray-300 bg-white"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          >
            <option value="">-- Pilih Lokasi --</option>
            {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </div>

        <div className="flex-1"></div>
        <Button onClick={submitDetails} disabled={!formData.location} className="w-full">
          Lanjut <ChevronRight />
        </Button>
      </div>
    );
  }

  // --- Step 4: Survey ---
  if (step === 'SURVEY') {
    return (
      <div className="min-h-screen bg-white p-6 flex flex-col overflow-y-auto">
        <div className="w-full bg-gray-200 h-2 rounded-full mb-6 overflow-hidden sticky top-0">
          <div className="bg-agro-green h-full w-3/4"></div>
        </div>

        <h2 className="text-xl font-bold text-agro-dark mb-4">Personalisasi Akun</h2>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3">Apa komoditas utamamu?</h3>
          <div className="grid grid-cols-2 gap-3">
            {COMMODITIES.map(c => (
              <div 
                key={c.name}
                onClick={() => setFormData({...formData, commodity: c.name})}
                className={`p-3 rounded-xl border-2 cursor-pointer flex items-center gap-2 ${formData.commodity === c.name ? 'border-agro-green bg-green-50' : 'border-gray-100'}`}
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="font-medium text-sm">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3">Apa kendala terbesarmu? (Pilih max 3)</h3>
          <div className="flex flex-wrap gap-2">
            {['Harga Jatuh', 'Hama & Penyakit', 'Modal Tanam', 'Cuaca Ekstrem', 'Pupuk Mahal'].map(p => (
              <span 
                key={p}
                onClick={() => toggleProblem(p)}
                className={`px-3 py-2 rounded-lg text-sm border cursor-pointer ${formData.problems.includes(p) ? 'bg-red-100 border-red-500 text-red-800' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
           <h3 className="text-sm font-semibold mb-3">Fitur Prioritas?</h3>
           <div className="grid grid-cols-3 gap-2">
             {['Modal', 'Kontrak', 'Pakar'].map(f => (
               <div 
                  key={f} 
                  onClick={() => setFormData({...formData, feature: f})}
                  className={`text-center p-3 rounded-xl border cursor-pointer ${formData.feature === f ? 'bg-agro-blue text-white' : 'bg-gray-50'}`}
               >
                 <div className="font-bold text-sm">{f}</div>
               </div>
             ))}
           </div>
        </div>

        <Button onClick={finishOnboarding} className="w-full mt-auto mb-4" disabled={!formData.commodity}>
          Selesai & Masuk Dashboard
        </Button>
      </div>
    );
  }

  return null;
};

export default Onboarding;
