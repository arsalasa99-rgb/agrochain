export enum UserRole {
  OWNER = 'OWNER',
  WORKER = 'WORKER',
  GROUP = 'GROUP',
  BUYER = 'BUYER'
}

export interface User {
  id: string;
  name: string;
  phone: string;
  location: string;
  role: UserRole;
  avatar?: string;
  reputationScore: number;
}

export interface Farm {
  id: string;
  name: string;
  commodity: string;
  area: number; // in hectares
  plantingDate: string;
  status: 'PREPARING' | 'PLANTING' | 'GROWING' | 'HARVEST_READY';
  progress: number; // 0-100
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'ALERT' | 'SUCCESS' | 'PROMO';
  timestamp: string;
  read: boolean;
}

export interface MarketItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  seller: string;
  location: string;
  grade: 'A' | 'B' | 'C';
  imageUrl: string;
}

export interface Contract {
  id: string;
  buyerName: string;
  commodity: string;
  amount: number; // tons
  pricePerKg: number;
  deadline: string;
  status: 'OPEN' | 'NEGOTIATING' | 'ACTIVE' | 'COMPLETED';
}
