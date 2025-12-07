import React, { useState } from 'react';
import { User } from '../types';
import { Card, Badge, Button, Toast } from '../components/ui';
import { Sun, CloudRain, Bell, Wallet, Sprout, ShoppingCart, TrendingUp, User as UserIcon } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../constants';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface DashboardProps {
  user: User;
  setCurrentView: (view: string) => void;
}

// Mock Data for mini chart
const priceData = [
  { name: 'Sn', price: 4000 },
  { name: 'Sl', price: 4200 },
  { name: 'Rb', price: 4100 },
  { name: 'Km', price: 4500 },
  { name: 'Jm', price: 4800 },
  { name: 'Sb', price: 5000 },
  { name: 'Mg', price: 5000 },
];

const Dashboard: React.FC<DashboardProps> = ({ user, setCurrentView }) => {
  const [hasUnread, setHasUnread] = useState(true);
  const [showNotifToast, setShowNotifToast] = useState(false);

  const handleNotifClick = () => {
    setHasUnread(false);
    setShowNotifToast(true);
  };

  return (
    <div className="pb-24 animate-fade-in">
      <Toast message={showNotifToast ? "Semua notifikasi ditandai sudah dibaca" : null} onClose={() => setShowNotifToast(false)} />

      {/* HEADER */}
      <div className="bg-agro-green pt-8 pb-16 px-6 rounded-b-[30px] shadow-lg relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="text-white">
            <h1 className="text-2xl font-bold">Halo, Pak {user.name.split(' ')[0]}!</h1>
            <p className="opacity-90 text-sm flex items-center gap-1">📍 {user.location}</p>
          </div>
          <div 
            className="bg-white/20 p-2 rounded-full relative cursor-pointer active:scale-95 transition hover:bg-white/30"
            onClick={handleNotifClick}
          >
             <Bell className="text-white w-6 h-6" />
             {hasUnread && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>}
          </div>
        </div>

        <div className="flex items-center gap-4 text-white">
          <Sun className="w-10 h-10 text-yellow-300 animate-pulse" />
          <div>
            <div className="text-3xl font-bold">32°C</div>
            <div className="text-sm opacity-90">Cerah Berawan • Lembap 70%</div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-10 relative z-20">
        {/* PERSONAL BANNER */}
        <div className="bg-gradient-to-r from-agro-blue to-blue-600 rounded-2xl p-4 text-white shadow-xl mb-6">
          <h3 className="font-bold text-lg mb-1">Musim Tanam Optimal!</h3>
          <p className="text-sm opacity-90 mb-3">Prediksi cuaca mendukung untuk tanam Cabai 2 minggu lagi.</p>
          <button 
            onClick={() => setCurrentView('production')}
            className="bg-white text-agro-blue px-4 py-2 rounded-lg text-sm font-bold shadow-sm active:scale-95 transition"
          >
            Lihat Prediksi
          </button>
        </div>

        {/* SHORTCUTS */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { label: 'Panen', icon: <Sprout size={20} />, color: 'bg-green-100 text-green-700', view: 'production' },
            { label: 'Modal', icon: <Wallet size={20} />, color: 'bg-blue-100 text-blue-700', view: 'finance' },
            { label: 'Pakar', icon: <UserIcon size={20} />, color: 'bg-yellow-100 text-yellow-700', view: 'production' },
            { label: 'Harga', icon: <TrendingUp size={20} />, color: 'bg-purple-100 text-purple-700', view: 'market' }
          ].map((item, idx) => (
            <div key={idx} onClick={() => setCurrentView(item.view)} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition group">
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                {item.icon}
              </div>
              <span className="text-xs font-medium text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>

        {/* LAND STATUS */}
        <h3 className="font-bold text-agro-dark text-lg mb-3">Status Lahan</h3>
        <Card className="mb-6 border-l-4 border-l-agro-green">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-gray-800">Kebun Cabai Utara</h4>
            <Badge variant="green">Sehat</Badge>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
             <div className="bg-agro-green h-full w-[60%] rounded-full relative">
               <span className="absolute right-0 -top-1 w-4 h-4 bg-white border-2 border-agro-green rounded-full shadow"></span>
             </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-4">
            <span>Tanam</span>
            <span className="font-bold text-agro-dark">Perawatan (Hari 45)</span>
            <span>Panen</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 py-2 text-xs" onClick={() => setCurrentView('production')}>Catat Pupuk</Button>
            <Button variant="secondary" className="flex-1 py-2 text-xs" onClick={() => setCurrentView('production')}>Cek Hama</Button>
          </div>
        </Card>

        {/* PRICE CHECKER */}
        <h3 className="font-bold text-agro-dark text-lg mb-3">Harga Pasar (Cabai Rawit)</h3>
        <Card className="mb-6 p-4 cursor-pointer active:scale-98 transition" onClick={() => setCurrentView('market')}>
          <div className="h-32 w-full pointer-events-none">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#43A046" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#43A046" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                <Tooltip />
                <Area type="monotone" dataKey="price" stroke="#43A046" fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-end mt-2">
             <div>
                <p className="text-xs text-gray-500">Pasar Induk Terdekat</p>
                <p className="text-xl font-bold text-agro-dark">Rp 50.000 <span className="text-sm font-normal text-gray-500">/kg</span></p>
             </div>
             <Badge variant="green">+5% Hari ini</Badge>
          </div>
        </Card>

        {/* NOTIFICATIONS */}
        <h3 className="font-bold text-agro-dark text-lg mb-3">Info Penting</h3>
        <div className="space-y-3">
          {MOCK_NOTIFICATIONS.map(notif => (
            <Card key={notif.id} className={`p-3 border-l-4 ${notif.type === 'ALERT' ? 'border-l-red-500 bg-red-50' : notif.type === 'SUCCESS' ? 'border-l-green-500' : 'border-l-blue-500'}`}>
              <div className="flex gap-3">
                <div className={`mt-1 p-1 rounded-full h-fit ${notif.type === 'ALERT' ? 'text-red-500' : 'text-agro-blue'}`}>
                   {notif.type === 'ALERT' ? <CloudRain size={16} /> : <Bell size={16} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">{notif.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{notif.message}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{notif.timestamp}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
