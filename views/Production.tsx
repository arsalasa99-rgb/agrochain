import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Input, Badge, Modal, Toast, LoadingRice } from '../components/ui';
import { Camera, MapPin, Search, Bot, AlertTriangle, Hammer, CheckCircle2, Send, X, MoreVertical, Sparkles, Navigation } from 'lucide-react';

const Production: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PREDICTION' | 'AI_CHAT' | 'RENTAL'>('PREDICTION');
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Prediction State ---
  const [showCamera, setShowCamera] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Tanam', status: 'done', date: '15 Mei' },
    { id: 2, title: 'Pemupukan KCL', status: 'pending', date: 'Hari Ini' },
    { id: 3, title: 'Estimasi Panen', status: 'future', date: '15 Juli' }
  ]);

  // --- AI Chat State (Agro-AI Prover) ---
  const [chatMessage, setChatMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: 'Halo, saya Agro-AI. Asisten agronomi berlisensi Anda. Ada gejala hama atau kebutuhan konsultasi pupuk apa hari ini?', 
      time: '08:00' 
    }
  ]);

  // --- Rental State (Realtime Map) ---
  const [rentals, setRentals] = useState([
    { id: 1, name: 'Traktor Roda 4', owner: 'UD Tani Maju', dist: '0.8 km', price: '150rb', status: 'Available', coords: { top: '30%', left: '40%' } },
    { id: 2, name: 'Drone Sprayer', owner: 'Smart Tani', dist: '1.2 km', price: '250rb', status: 'Booked', coords: { top: '60%', left: '70%' } },
    { id: 3, name: 'Combine Harvester', owner: 'KUD Makmur', dist: '2.5 km', price: '400rb', status: 'Available', coords: { top: '20%', left: '80%' } }
  ]);
  const [selectedRental, setSelectedRental] = useState<any>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isAiTyping]);

  // --- Handlers ---
  
  const handleScan = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowCamera(false);
      setAnalysisResult({
        health: '85%',
        issue: 'Kekurangan Nitrogen Ringan',
        recommendation: 'Tambahkan Urea 5kg/ha segera.'
      });
      setToast({ msg: 'Analisis Selesai!', type: 'success' });
    }, 2000);
  };

  const completeTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'done' } : t));
    setToast({ msg: 'Tugas diselesaikan!', type: 'success' });
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMsg = { id: Date.now(), sender: 'user', text: chatMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setChatHistory(prev => [...prev, newMsg]);
    setChatMessage('');
    setIsAiTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      const aiResponses = [
        "Berdasarkan database penyakit tanaman padi 2024, gejala daun menguning di ujung mengindikasikan kekurangan Kalium (K). Saran: Aplikasikan pupuk KCl dosis 50kg/ha.",
        "Untuk tanah gambut dengan pH 4.5, saya merekomendasikan pengapuran (Dolomit) minimal 2 minggu sebelum tanam untuk menetralkan keasaman.",
        "Cuaca ekstrem diprediksi terjadi 3 hari ke depan. Sebaiknya tunda penyemprotan pestisida agar tidak tercuci air hujan."
      ];
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMsg = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: randomResponse, 
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      };
      setChatHistory(prev => [...prev, aiMsg]);
      setIsAiTyping(false);
    }, 2000);
  };

  const rentTool = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRentals(rentals.map(r => r.id === selectedRental.id ? { ...r, status: 'Booked' } : r));
      setSelectedRental(null);
      setToast({ msg: 'Sewa Berhasil! Unit sedang bergerak ke lokasi.', type: 'success' });
    }, 1500);
  };

  return (
    <div className="pb-24 pt-6 px-4 animate-slide-up h-full flex flex-col">
      <Toast message={toast?.msg || null} type={toast?.type} onClose={() => setToast(null)} />
      
      <h1 className="text-2xl font-bold text-agro-dark mb-4">Produksi Cerdas</h1>
      
      {/* TABS */}
      <div className="flex bg-gray-200 p-1 rounded-xl mb-6 shrink-0">
        {[
          { id: 'PREDICTION', label: 'Prediksi' },
          { id: 'AI_CHAT', label: 'AI Expert' },
          { id: 'RENTAL', label: 'Alsintan' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === tab.id ? 'bg-white text-agro-dark shadow-sm' : 'text-gray-500 hover:bg-gray-200/50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT: PREDICTION */}
      {activeTab === 'PREDICTION' && (
        <div className="space-y-4 animate-fade-in">
          <Card className="bg-gradient-to-br from-agro-green to-agro-dark text-white border-none overflow-hidden relative shadow-lg">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
            
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Sparkles className="text-agro-gold" size={20}/> Analisis Lahan AI</h3>
              <p className="text-sm opacity-90 mb-6 leading-relaxed">Ambil foto daun atau tanah, AI kami akan mendeteksi kesehatan tanaman Anda secara realtime.</p>
              
              {/* UPDATED BUTTON: HIGH CONTRAST */}
              <Button 
                onClick={() => setShowCamera(true)}
                className="w-full bg-agro-gold text-agro-dark hover:bg-yellow-400 font-bold border-2 border-transparent hover:border-white shadow-xl"
              >
                <Camera className="mr-2" size={20} /> BUKA KAMERA
              </Button>
            </div>
            
            {/* Analysis Result Box */}
            {analysisResult && (
              <div className="mt-4 bg-white/10 p-4 rounded-xl backdrop-blur-md animate-fade-in border border-white/20 relative z-10">
                 <div className="flex justify-between items-start mb-2">
                   <h4 className="font-bold text-agro-gold flex items-center gap-2"><CheckCircle2 size={16}/> Hasil Analisis</h4>
                   <button onClick={() => setAnalysisResult(null)}><X size={16} className="text-white/70"/></button>
                 </div>
                 <div className="space-y-2">
                   <div className="flex justify-between text-sm border-b border-white/10 pb-1">
                      <span>Kesehatan</span>
                      <span className="font-bold text-green-300">{analysisResult.health}</span>
                   </div>
                   <div className="text-sm">
                      <span className="opacity-70 text-xs block">Diagnosa:</span>
                      {analysisResult.issue}
                   </div>
                   <div className="bg-white/90 text-agro-dark p-2 rounded-lg text-xs font-medium mt-2">
                      💡 Saran: {analysisResult.recommendation}
                   </div>
                 </div>
              </div>
            )}
          </Card>

          <h3 className="font-bold text-gray-800 mt-6">Timeline Musim Ini</h3>
          <div className="relative border-l-2 border-gray-200 ml-3 space-y-6 pb-4">
            {tasks.map((task) => (
              <div key={task.id} className={`ml-6 relative transition-all duration-300 ${task.status === 'future' ? 'opacity-50' : 'opacity-100'}`}>
                <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${task.status === 'done' ? 'bg-agro-green' : task.status === 'pending' ? 'bg-agro-gold animate-pulse' : 'bg-gray-300'}`}>
                  {task.status === 'done' && <CheckCircle2 size={10} className="text-white"/>}
                </span>
                <h4 className={`text-sm font-bold ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {task.date} - {task.title}
                </h4>
                {task.status === 'pending' && (
                  <div className="mt-2 animate-fade-in">
                    <p className="text-xs text-gray-600 mb-2">Dosis: 50kg/Ha. Cuaca mendukung.</p>
                    <Button variant="outline" onClick={() => completeTask(task.id)} className="py-1 h-8 text-xs border-agro-green text-agro-green hover:bg-green-50">Tandai Selesai</Button>
                  </div>
                )}
                {task.status === 'done' && <p className="text-xs text-green-600 font-bold">Selesai</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT: AGRO-AI CHAT (REPLACED FORUM) */}
      {activeTab === 'AI_CHAT' && (
        <div className="flex flex-col h-[calc(100vh-200px)] animate-fade-in bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-agro-green p-4 flex items-center gap-3 text-white shadow-md z-10">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Bot size={24} className="text-agro-gold" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Agro-AI Expert</h3>
              <div className="flex items-center gap-1">
                 <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                 <p className="text-[10px] opacity-90">Lisensi Pertanian: #AG-2045-AI</p>
              </div>
            </div>
            <MoreVertical size={20} className="ml-auto opacity-70" />
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
             {chatHistory.map((msg) => (
               <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                   msg.sender === 'user' 
                     ? 'bg-agro-green text-white rounded-tr-none' 
                     : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                 }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-green-100' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                 </div>
               </div>
             ))}
             {isAiTyping && (
               <div className="flex justify-start">
                 <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 flex gap-1 items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                 </div>
               </div>
             )}
             <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
             <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
                <Input 
                  placeholder="Tanya tentang hama, pupuk, cuaca..." 
                  className="bg-transparent border-none p-0 focus:ring-0 text-sm h-auto"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
             </div>
             <button 
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
                className="w-10 h-10 bg-agro-green rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
             >
                <Send size={18} className={chatMessage.trim() ? "ml-0.5" : ""} />
             </button>
          </div>
        </div>
      )}

      {/* CONTENT: RENTAL (IMPROVED REALTIME MAP) */}
      {activeTab === 'RENTAL' && (
        <div className="h-full flex flex-col animate-fade-in">
          <div className="bg-gray-200 h-64 rounded-2xl mb-4 relative overflow-hidden shadow-inner border border-gray-300 group">
            {/* --- CUSTOM REALTIME MAP VISUALIZATION --- */}
            
            {/* 1. Base Map Layer (Simplified Fields) */}
            <div className="absolute inset-0 bg-[#e0eec0]"></div>
            
            {/* 2. Grid/Roads */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
               <defs>
                 <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                   <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#888" strokeWidth="0.5"/>
                 </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#smallGrid)" />
               {/* Main Roads */}
               <path d="M 0 50 Q 150 80 300 50 T 600 80" fill="none" stroke="white" strokeWidth="8" />
               <path d="M 200 0 L 200 300" fill="none" stroke="white" strokeWidth="6" />
            </svg>

            {/* 3. Fields/Plots Visualization */}
            <div className="absolute top-10 left-10 w-24 h-16 bg-[#c4db95] border border-white/50 opacity-60"></div>
            <div className="absolute top-40 right-20 w-32 h-20 bg-[#a3c975] border border-white/50 opacity-60"></div>
            <div className="absolute bottom-10 left-1/3 w-40 h-24 bg-[#a3c975] border border-white/50 opacity-60"></div>

            {/* 4. Live Tracking Indicators (Tractors) */}
            {rentals.map((rental) => (
              <div 
                key={rental.id}
                className={`absolute transition-all duration-[3000ms] ease-in-out cursor-pointer hover:scale-110 z-10 ${rental.status === 'Booked' ? 'grayscale opacity-70' : ''}`}
                style={{ top: rental.coords.top, left: rental.coords.left }}
                onClick={() => setSelectedRental(rental)}
              >
                 <div className="relative">
                    {/* Radar Pulse for Available Units */}
                    {rental.status === 'Available' && (
                      <div className="absolute -inset-3 bg-green-500/30 rounded-full animate-ping"></div>
                    )}
                    <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${rental.status === 'Available' ? 'bg-agro-green text-white' : 'bg-gray-500 text-gray-200'}`}>
                       <Hammer size={14} />
                    </div>
                    {/* Label */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/90 px-1.5 py-0.5 rounded text-[8px] font-bold whitespace-nowrap shadow-sm">
                       {rental.name}
                    </div>
                 </div>
              </div>
            ))}

            {/* 5. User Location (Blue Dot) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
               <div className="relative">
                 <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-pulse"></div>
                 <div className="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-md"></div>
               </div>
            </div>

            {/* Overlay UI */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm flex items-center gap-2">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
               </span>
               <span className="text-[10px] font-bold tracking-wider">LIVE MAP</span>
            </div>
            
            <div className="absolute bottom-3 right-3 bg-white p-2 rounded-lg shadow-lg" onClick={() => setToast({msg: 'Memusatkan lokasi...', type: 'success'})}>
               <Navigation size={16} className="text-gray-700"/>
            </div>
          </div>

          <h3 className="font-bold text-gray-800 mb-3 px-1">Unit Disekitar Anda (10km)</h3>
          <div className="space-y-3 flex-1 overflow-y-auto pb-4">
            {rentals.map((item) => (
              <Card 
                key={item.id} 
                className={`flex gap-4 p-3 cursor-pointer border hover:border-agro-green transition-all ${item.status === 'Booked' ? 'opacity-60 bg-gray-50' : 'bg-white'}`}
                onClick={() => setSelectedRental(item)}
              >
                 <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 shrink-0">
                    <Hammer size={20} />
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-start">
                     <h4 className="font-bold text-gray-800 text-sm truncate">{item.name}</h4>
                     <Badge variant={item.status === 'Available' ? 'green' : 'red'}>{item.status}</Badge>
                   </div>
                   <p className="text-xs text-gray-500 mb-2 truncate">Owner: {item.owner} • {item.dist} dari lokasi</p>
                   <div className="flex justify-between items-end mt-auto">
                      <p className="text-agro-dark font-bold text-sm">{item.price}<span className="text-[10px] font-normal text-gray-500">/jam</span></p>
                      <Button 
                        size="sm" 
                        className="py-1 px-3 text-xs h-7 min-h-0"
                        disabled={item.status === 'Booked'}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRental(item);
                        }}
                      >
                        {item.status === 'Booked' ? 'Disewa' : 'Sewa'}
                      </Button>
                   </div>
                 </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* --- MODALS --- */}
      <Modal 
        isOpen={showCamera} 
        onClose={() => setShowCamera(false)} 
        title="Scan Tanaman"
      >
        <div className="flex flex-col items-center">
          {isLoading ? (
            <LoadingRice text="Menganalisa..." />
          ) : (
            <>
              <div className="w-full h-64 bg-black rounded-xl mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-agro-gold shadow-[0_0_10px_rgba(251,202,56,0.8)] animate-pulse"></div>
                <p className="absolute bottom-4 left-0 right-0 text-center text-white text-sm animate-pulse">Sedang memindai klorofil daun...</p>
                {/* Fake target reticle */}
                <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-white/50"></div>
                <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-white/50"></div>
                <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-white/50"></div>
                <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-white/50"></div>
              </div>
              <Button onClick={handleScan} className="w-full bg-agro-green hover:bg-agro-dark">Ambil Foto</Button>
            </>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={!!selectedRental}
        onClose={() => setSelectedRental(null)}
        title="Konfirmasi Sewa Unit"
        footer={
           <div className="flex gap-2">
             <Button variant="ghost" onClick={() => setSelectedRental(null)} className="flex-1">Batal</Button>
             <Button onClick={rentTool} isLoading={isLoading} className="flex-1 bg-agro-blue hover:bg-blue-700">Bayar & Datangkan</Button>
           </div>
        }
      >
        {selectedRental && (
          <div className="space-y-4">
             <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
               <div className="bg-white p-2 rounded-lg shadow-sm text-agro-dark">
                  <Hammer size={24} />
               </div>
               <div>
                 <p className="text-sm font-bold">{selectedRental.name}</p>
                 <p className="text-xs text-gray-500">{selectedRental.owner} • {selectedRental.dist}</p>
               </div>
             </div>
             
             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Durasi Sewa</span>
                  <span className="font-bold">1 Jam (Minimal)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Biaya Operator</span>
                  <span className="font-bold text-green-600">Termasuk</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-dashed">
                  <span className="font-bold">Total Estimasi</span>
                  <span className="font-bold text-agro-dark text-lg">{selectedRental.price}</span>
                </div>
             </div>
             
             <div className="bg-blue-50 p-2 rounded-lg flex gap-2 items-start">
                <AlertTriangle size={14} className="text-blue-500 mt-0.5 shrink-0" />
                <p className="text-[10px] text-blue-700 leading-tight">
                  Unit akan tiba dalam estimasi 15-30 menit. Pastikan akses jalan ke lahan terbuka.
                </p>
             </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default Production;
