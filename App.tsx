import React, { useState, useEffect } from 'react';
import Splash from './views/Splash';
import Onboarding from './views/Onboarding';
import Dashboard from './views/Dashboard';
import Production from './views/Production';
import Finance from './views/Finance';
import Market from './views/Market';
import Profile from './views/Profile';
import { User } from './types';
import { Home, Sprout, Wallet, ShoppingBag, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<'SPLASH' | 'ONBOARDING' | 'APP'>('SPLASH');
  const [currentAppView, setCurrentAppView] = useState('home');
  const [user, setUser] = useState<User | null>(null);

  // Load user from local storage on mount (simulation)
  useEffect(() => {
    // In a real app, check auth token
  }, []);

  const handleSplashComplete = () => {
    const savedUser = localStorage.getItem('agroUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setViewState('APP');
    } else {
      setViewState('ONBOARDING');
    }
  };

  const handleOnboardingComplete = (data: any) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      phone: data.phone,
      location: data.location,
      role: data.role,
      reputationScore: 4.5
    };
    setUser(newUser);
    localStorage.setItem('agroUser', JSON.stringify(newUser));
    setViewState('APP');
  };

  const handleLogout = () => {
    localStorage.removeItem('agroUser');
    setUser(null);
    setViewState('ONBOARDING');
    setCurrentAppView('home');
  };

  const renderCurrentView = () => {
    if (!user) return null;
    switch (currentAppView) {
      case 'home': return <Dashboard user={user} setCurrentView={setCurrentAppView} />;
      case 'production': return <Production />;
      case 'finance': return <Finance />;
      case 'market': return <Market />;
      case 'profile': return <Profile user={user} onLogout={handleLogout} />;
      default: return <Dashboard user={user} setCurrentView={setCurrentAppView} />;
    }
  };

  // --- Main Render ---
  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 max-w-md mx-auto shadow-2xl relative overflow-hidden">
      
      {viewState === 'SPLASH' && <Splash onComplete={handleSplashComplete} />}
      
      {viewState === 'ONBOARDING' && <Onboarding onComplete={handleOnboardingComplete} />}
      
      {viewState === 'APP' && (
        <>
          <main className="h-screen overflow-y-auto no-scrollbar bg-gray-50">
            {renderCurrentView()}
          </main>

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 rounded-t-2xl shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'production', icon: Sprout, label: 'Produksi' },
              { id: 'finance', icon: Wallet, label: 'Dana' },
              { id: 'market', icon: ShoppingBag, label: 'Jual' },
              { id: 'profile', icon: UserIcon, label: 'Akun' },
            ].map(item => {
              const isActive = currentAppView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentAppView(item.id)}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-agro-green transform -translate-y-1' : 'text-gray-400'}`}
                >
                  <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'fill-agro-green/10' : ''} />
                  <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </>
      )}
    </div>
  );
};

export default App;
