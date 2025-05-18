export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  photo: string;
  rating: number;
  experience: number;
  location: string;
  distance?: number;
  available: boolean;
  availableTimes?: string[];
  hospital?: string;
  about: string;
  consultationFee?: number;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  type: string;
  services: string[];
  rating: number;
  photo: string;
  location: string;
  distance?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  photo?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}