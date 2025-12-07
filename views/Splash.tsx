import React, { useEffect, useState } from 'react';
import { Button, LoadingRice } from '../components/ui';
import { Tractor, Sprout, Plane } from 'lucide-react';
import { APP_NAME, TAGLINE } from '../constants';

interface SplashProps {
  onComplete: () => void;
}

const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence animations
    const timers = [
      setTimeout(() => setStep(1), 500),  // Show Logo/Text
      setTimeout(() => setStep(2), 1500), // Icon 1
      setTimeout(() => setStep(3), 2200), // Icon 2
      setTimeout(() => setStep(4), 2900), // Icon 3
      setTimeout(() => setStep(5), 3500), // Button
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-screen w-full bg-agro-green flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className={`transition-all duration-700 transform ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-center mb-12 z-10`}>
        <div className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
           <img src="https://i.ibb.co/6yvC26X/logo-placeholder.png" alt="Logo" className="w-20 h-20 object-contain" onError={(e) => e.currentTarget.src = 'https://placehold.co/100x100?text=ACN'} />
        </div>
        <h1 className="text-3xl font-bold mb-2">{APP_NAME}</h1>
        <p className="text-agro-soil/90 text-sm max-w-xs mx-auto">{TAGLINE}</p>
      </div>

      <div className="flex gap-6 mb-16 z-10 h-24 items-end">
        <div className={`transition-all duration-500 transform ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 translate-y-4'} flex flex-col items-center`}>
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm mb-2">
            <Tractor size={32} className="text-agro-gold" />
          </div>
          <span className="text-xs font-medium">Modern</span>
        </div>
        
        <div className={`transition-all duration-500 delay-100 transform ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 translate-y-4'} flex flex-col items-center -mt-8`}>
           <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm mb-2">
            <Plane size={32} className="text-agro-gold" />
          </div>
          <span className="text-xs font-medium">Teknologi</span>
        </div>

        <div className={`transition-all duration-500 delay-200 transform ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 translate-y-4'} flex flex-col items-center`}>
           <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm mb-2">
            <Sprout size={32} className="text-agro-gold" />
          </div>
          <span className="text-xs font-medium">Makmur</span>
        </div>
      </div>

      <div className={`absolute bottom-10 w-full px-6 transition-all duration-700 ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Button onClick={onComplete} className="w-full bg-agro-gold text-agro-dark hover:bg-yellow-400 font-bold text-lg shadow-xl shadow-black/20">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Splash;
