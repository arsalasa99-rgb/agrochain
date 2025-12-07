import React, { useEffect, useState } from 'react';
import { Loader2, X, Check, AlertCircle } from 'lucide-react';

// --- Loading Component (Growing Rice) ---
export const LoadingRice: React.FC<{ text?: string, size?: 'sm' | 'md' | 'lg' }> = ({ text, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`relative ${sizeClasses[size]}`}>
         <svg viewBox="0 0 100 100" className="w-full h-full text-agro-gold animate-grow origin-bottom">
            <path d="M50 90 Q30 60 40 30" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 90 Q70 60 60 30" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 90 V 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* Grains */}
            <ellipse cx="40" cy="30" rx="3" ry="6" fill="currentColor" className="animate-pulse" />
            <ellipse cx="60" cy="30" rx="3" ry="6" fill="currentColor" className="animate-pulse" style={{animationDelay: '0.2s'}} />
            <ellipse cx="50" cy="20" rx="3" ry="6" fill="currentColor" className="animate-pulse" style={{animationDelay: '0.4s'}} />
         </svg>
      </div>
      {text && <p className="text-agro-dark font-medium animate-pulse">{text}</p>}
    </div>
  );
};

// --- Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', size = 'md', className = '', isLoading, ...props 
}) => {
  const baseStyles = "rounded-xl font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3",
    lg: "px-6 py-4 text-lg"
  };

  const variants = {
    primary: "bg-agro-green text-white shadow-lg shadow-agro-green/30 hover:bg-agro-dark",
    secondary: "bg-agro-blue text-white shadow-lg shadow-agro-blue/30 hover:bg-blue-700",
    outline: "border-2 border-agro-green text-agro-dark bg-transparent hover:bg-agro-green/10",
    ghost: "bg-transparent text-agro-dark hover:bg-gray-100",
    danger: "bg-agro-alert text-white hover:bg-red-700"
  };

  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className} ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
    </button>
  );
};

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-agro-soil rounded-2xl p-4 shadow-sm border border-gray-100 ${onClick ? 'cursor-pointer active:scale-98 transition-transform' : ''} ${className}`}
  >
    {children}
  </div>
);

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-agro-dark mb-1">{label}</label>}
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>}
      <input 
        className={`w-full bg-white border ${error ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-agro-green/50 ${icon ? 'pl-10' : ''} ${className}`}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode, variant?: 'gold' | 'green' | 'red' | 'blue', className?: string }> = ({ children, variant = 'gold', className = '' }) => {
  const styles = {
    gold: "bg-agro-gold/20 text-yellow-800 border-agro-gold",
    green: "bg-green-100 text-agro-dark border-agro-green",
    red: "bg-red-100 text-red-800 border-red-500",
    blue: "bg-blue-100 text-blue-800 border-blue-500"
  };
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-bold border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

// --- Modal ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl transform transition-all animate-slide-up relative z-10 overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-lg text-agro-dark">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        {footer && (
          <div className="p-4 border-t bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Toast ---
export const Toast: React.FC<{ message: string | null, type?: 'success' | 'error', onClose: () => void }> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-[110] animate-slide-up">
      <div className={`rounded-xl p-4 shadow-lg flex items-center gap-3 text-white ${type === 'success' ? 'bg-agro-green' : 'bg-red-500'}`}>
        {type === 'success' ? <Check size={24} /> : <AlertCircle size={24} />}
        <p className="font-medium text-sm">{message}</p>
      </div>
    </div>
  );
};