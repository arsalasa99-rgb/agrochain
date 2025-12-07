import { UserRole, Notification, MarketItem, Contract } from './types';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Sewa Traktor Tersedia',
    message: 'Traktor tersedia sewa di RW 05, Rp 50k/jam. Pesan sekarang sebelum kehabisan.',
    type: 'INFO',
    timestamp: '10 Menit lalu',
    read: false
  },
  {
    id: '2',
    title: 'Harga Cabai Naik!',
    message: 'Harga cabai rawit naik 15% di Pasar Induk. Rekomendasi: Tunda penjualan 3 hari.',
    type: 'SUCCESS',
    timestamp: '1 Jam lalu',
    read: false
  },
  {
    id: '3',
    title: 'Peringatan Cuaca',
    message: '7 hari ke depan curah hujan tinggi. Segera cek saluran air lahan Anda.',
    type: 'ALERT',
    timestamp: '3 Jam lalu',
    read: true
  }
];

export const MOCK_MARKET_ITEMS: MarketItem[] = [
  {
    id: '1',
    name: 'Beras Organik Mentik Wangi',
    price: 14500,
    unit: 'kg',
    seller: 'Kelompok Tani Subur',
    location: 'Klaten',
    grade: 'A',
    imageUrl: 'https://picsum.photos/200/200?random=1'
  },
  {
    id: '2',
    name: 'Cabai Rawit Merah',
    price: 45000,
    unit: 'kg',
    seller: 'Pak Budi',
    location: 'Magelang',
    grade: 'B',
    imageUrl: 'https://picsum.photos/200/200?random=2'
  },
  {
    id: '3',
    name: 'Jagung Hibrida Kering',
    price: 5200,
    unit: 'kg',
    seller: 'UD Tani Jaya',
    location: 'Grobogan',
    grade: 'A',
    imageUrl: 'https://picsum.photos/200/200?random=3'
  }
];

export const MOCK_CONTRACTS: Contract[] = [
  {
    id: 'c1',
    buyerName: 'PT Indofood Sukses Makmur',
    commodity: 'Kentang Granola',
    amount: 5,
    pricePerKg: 12000,
    deadline: '2024-08-15',
    status: 'ACTIVE'
  },
  {
    id: 'c2',
    buyerName: 'CV Sumber Pangan',
    commodity: 'Padi IR64',
    amount: 10,
    pricePerKg: 6500,
    deadline: '2024-09-01',
    status: 'OPEN'
  }
];

export const LOCATIONS = ['Desa Sukajaya', 'Desa Makmur', 'Desa Cibaduyut', 'Desa Karanganyar'];
export const COMMODITIES = [
  { name: 'Padi', icon: '🌾' },
  { name: 'Jagung', icon: '🌽' },
  { name: 'Cabai', icon: '🌶️' },
  { name: 'Kopi', icon: '☕' }
];

export const APP_NAME = "Agro-Chain Nusantara";
export const TAGLINE = "Pertanian Sejahtera untuk Indonesia Emas 2045";
