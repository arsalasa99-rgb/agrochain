import React, { useState } from 'react';
import { User } from '../types';
import { Card, Badge, Button, Modal, Toast } from '../components/ui';
import { Star, Award, MapPin, Phone, Settings, LogOut, FileText, User as UserIcon } from 'lucide-react';

interface ProfileProps {
  user: User;
  onLogout?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [toast, setToast] = useState<{msg: string, type: 'success'} | null>(null);

  const handleSaveProfile = () => {
    setShowEditProfile(false);
    setToast({ msg: 'Profil berhasil diperbarui!', type: 'success' });
  };

  return (
    <div className="pb-24 animate-slide-up">
      <Toast message={toast?.msg || null} onClose={() => setToast(null)} />

      <div className="bg-agro-green pb-16 pt-8 px-6 rounded-b-[40px] shadow-lg text-center text-white relative">
         <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 border-4 border-white/30 flex items-center justify-center overflow-hidden">
            <span className="text-agro-green text-3xl font-bold">{user.name.charAt(0)}</span>
         </div>
         <h1 className="text-2xl font-bold">{user.name}</h1>
         <p className="opacity-90 flex items-center justify-center gap-1"><MapPin size={14}/> {user.location}</p>
         
         <div className="absolute -bottom-8 left-6 right-6">
            <Card className="flex justify-between items-center py-4 px-6 shadow-xl">
               <div className="text-center">
                  <p className="text-xs text-gray-500">Reputasi</p>
                  <div className="flex items-center gap-1 font-bold text-lg text-agro-dark">
                    <Star className="text-agro-gold fill-agro-gold" size={18} /> 4.8
                  </div>
               </div>
               <div className="w-px h-8 bg-gray-200"></div>
               <div className="text-center">
                  <p className="text-xs text-gray-500">Kontrak</p>
                  <p className="font-bold text-lg text-agro-dark">12x</p>
               </div>
               <div className="w-px h-8 bg-gray-200"></div>
               <div className="text-center">
                  <p className="text-xs text-gray-500">Role</p>
                  <Badge variant="blue">{user.role}</Badge>
               </div>
            </Card>
         </div>
      </div>

      <div className="mt-16 px-4 space-y-4">
         <h3 className="font-bold text-gray-800 px-2">Sertifikat & Badge</h3>
         <div className="flex gap-3 overflow-x-auto pb-2 px-2 no-scrollbar">
            <div className="min-w-[120px] bg-gradient-to-br from-yellow-100 to-yellow-50 p-3 rounded-xl border border-yellow-200 flex flex-col items-center text-center">
               <Award className="text-yellow-600 mb-2" />
               <p className="text-xs font-bold text-yellow-800">Petani Verifikasi</p>
            </div>
            <div className="min-w-[120px] bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-xl border border-blue-200 flex flex-col items-center text-center">
               <FileText className="text-blue-600 mb-2" />
               <p className="text-xs font-bold text-blue-800">Mitra Emas</p>
            </div>
         </div>

         <h3 className="font-bold text-gray-800 px-2 mt-6">Pengaturan Akun</h3>
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y">
            <div className="p-4 flex items-center justify-between cursor-pointer active:bg-gray-50" onClick={() => setShowEditProfile(true)}>
               <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-lg"><UserIcon size={18} className="text-gray-600"/></div>
                  <span className="text-sm font-medium">Edit Profil</span>
               </div>
            </div>
            <div className="p-4 flex items-center justify-between cursor-pointer active:bg-gray-50">
               <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-lg"><Phone size={18} className="text-gray-600"/></div>
                  <span className="text-sm font-medium">Ubah No WhatsApp</span>
               </div>
            </div>
             <div className="p-4 flex items-center justify-between cursor-pointer active:bg-gray-50">
               <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-lg"><Settings size={18} className="text-gray-600"/></div>
                  <span className="text-sm font-medium">Preferensi Aplikasi</span>
               </div>
            </div>
             <div 
               className="p-4 flex items-center justify-between cursor-pointer active:bg-gray-50 text-red-500"
               onClick={() => setShowLogoutConfirm(true)}
             >
               <div className="flex items-center gap-3">
                  <div className="bg-red-50 p-2 rounded-lg"><LogOut size={18} className="text-red-500"/></div>
                  <span className="text-sm font-medium">Keluar Aplikasi</span>
               </div>
            </div>
         </div>
         
         <div className="text-center text-gray-400 text-xs mt-8 mb-4">
           Agro-Chain Nusantara v1.0.0
           <br/>Pertanian Sejahtera, Indonesia Emas
         </div>
      </div>

      {/* Logout Modal */}
      <Modal
         isOpen={showLogoutConfirm}
         onClose={() => setShowLogoutConfirm(false)}
         title="Konfirmasi Keluar"
         footer={
           <div className="flex gap-2">
             <Button variant="ghost" onClick={() => setShowLogoutConfirm(false)} className="flex-1">Batal</Button>
             <Button variant="danger" onClick={onLogout} className="flex-1">Ya, Keluar</Button>
           </div>
         }
      >
        <p className="text-gray-600 text-center">Apakah Anda yakin ingin keluar dari akun ini?</p>
      </Modal>

      {/* Edit Profile Modal (Simulation) */}
      <Modal
         isOpen={showEditProfile}
         onClose={() => setShowEditProfile(false)}
         title="Edit Profil"
         footer={<Button className="w-full" onClick={handleSaveProfile}>Simpan Perubahan</Button>}
      >
        <div className="space-y-3">
           <div>
             <label className="text-xs text-gray-500 block mb-1">Nama Lengkap</label>
             <input className="w-full border rounded-lg p-2 text-sm" defaultValue={user.name} />
           </div>
           <div>
             <label className="text-xs text-gray-500 block mb-1">Lokasi</label>
             <input className="w-full border rounded-lg p-2 text-sm" defaultValue={user.location} />
           </div>
        </div>
      </Modal>

    </div>
  );
};

export default Profile;
