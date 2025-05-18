import { Doctor } from '../types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    qualification: 'MD, FACC',
    photo: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    experience: 12,
    location: 'Medical Center Hospital',
    available: true,
    availableTimes: ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'],
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience. She specializes in preventive cardiology and heart disease management.',
    consultationFee: 150
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    qualification: 'MD, PhD',
    photo: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    experience: 15,
    location: 'City Neurology Center',
    available: true,
    availableTimes: ['10:00 AM', '1:00 PM', '3:30 PM'],
    about: 'Dr. Michael Chen is a leading neurologist specializing in stroke prevention and treatment. He has published numerous research papers in prestigious medical journals.',
    consultationFee: 180
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    qualification: 'MD, FAAP',
    photo: 'https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    experience: 8,
    location: 'Children\'s Wellness Clinic',
    available: true,
    availableTimes: ['8:30 AM', '10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM'],
    about: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence.',
    consultationFee: 120
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedic Surgeon',
    qualification: 'MD, FAAOS',
    photo: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    experience: 18,
    location: 'Metropolitan Orthopedic Center',
    available: false,
    about: 'Dr. James Wilson specializes in joint replacement surgery and sports medicine. He has treated professional athletes and has developed innovative surgical techniques.',
    consultationFee: 200
  },
  {
    id: '5',
    name: 'Dr. Priya Patel',
    specialty: 'Dermatologist',
    qualification: 'MD, FAAD',
    photo: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    experience: 10,
    location: 'Skin Health Institute',
    available: true,
    availableTimes: ['9:00 AM', '12:00 PM', '3:00 PM', '5:00 PM'],
    about: 'Dr. Priya Patel is a board-certified dermatologist specializing in medical, surgical, and cosmetic dermatology. She has a special interest in treating skin conditions in patients of all skin types.',
    consultationFee: 160
  },
  {
    id: '6',
    name: 'Dr. Robert Thompson',
    specialty: 'Psychiatrist',
    qualification: 'MD, FAPA',
    photo: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    experience: 14,
    location: 'Mental Wellness Center',
    available: true,
    availableTimes: ['11:00 AM', '2:00 PM', '4:00 PM'],
    about: 'Dr. Robert Thompson is a psychiatrist with expertise in mood disorders, anxiety, and PTSD. He takes a holistic approach to mental health, combining medication management with therapy.',
    consultationFee: 170
  }
];