import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import NearbyDoctorsPage from './pages/NearbyDoctorsPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import HospitalsPage from './pages/HospitalsPage';
import HospitalDetailsPage from './pages/HospitalDetailsPage';
import EmergencyPage from './pages/EmergencyPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ConsultationPage from './pages/ConsultationPage';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/doctors" element={<Layout><DoctorsPage /></Layout>} />
      <Route path="/nearby-doctors" element={<Layout><NearbyDoctorsPage /></Layout>} />
      <Route path="/doctors/:id" element={<Layout><DoctorProfilePage /></Layout>} />
      <Route path="/hospitals" element={<Layout><HospitalsPage /></Layout>} />
      <Route path="/hospitals/:id" element={<Layout><HospitalDetailsPage /></Layout>} />
      <Route path="/emergency" element={<Layout><EmergencyPage /></Layout>} />
      <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/consultation/:id" 
        element={
          isAuthenticated ? <ConsultationPage /> : <Navigate to="/login" replace />
        } 
      />
    </Routes>
  );
};

export default App;