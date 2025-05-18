import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Globe, User, Building, Clock } from 'lucide-react';
import { hospitals } from '../data/hospitals';
import { doctors } from '../data/doctors';
import Button from '../components/ui/Button';
import DoctorCard from '../components/doctors/DoctorCard';

const HospitalDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'about' | 'doctors' | 'services'>('about');

  const hospital = hospitals.find(h => h.id === id);
  
  // For demo purposes, we'll show some doctors as if they work at this hospital
  const hospitalDoctors = doctors.slice(0, 3);

  if (!hospital) {
    return (
      <div className="pt-20 pb-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Hospital Not Found</h1>
          <p className="text-gray-600 mb-8">The hospital you are looking for does not exist.</p>
          <Button onClick={() => navigate('/hospitals')}>Back to Hospitals</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Hospital Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={hospital.photo}
                alt={hospital.name}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-1">{hospital.name}</h1>
                  <p className="text-blue-600 font-medium">{hospital.type}</p>
                </div>
                <div className="flex items-center bg-blue-50 px-3 py-2 rounded-md">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="font-bold text-lg">{hospital.rating}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">{hospital.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">{hospital.phone}</span>
                </div>
                {hospital.email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-700">{hospital.email}</span>
                  </div>
                )}
                {hospital.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-500 mr-2" />
                    <a 
                      href={`https://${hospital.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {hospital.website}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  icon={<User size={18} />}
                  onClick={() => setSelectedTab('doctors')}
                >
                  View Doctors
                </Button>
                <Button
                  variant="outline"
                  icon={<Phone size={18} />}
                  onClick={() => window.location.href = `tel:${hospital.phone.replace(/[^0-9]/g, '')}`}
                >
                  Call Hospital
                </Button>
                <Button
                  variant="secondary"
                  icon={<MapPin size={18} />}
                  onClick={() => window.open(`https://maps.google.com/?q=${hospital.name} ${hospital.address}`, '_blank')}
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <nav className="flex">
              <button
                className={`px-6 py-3 font-medium text-sm flex items-center ${
                  selectedTab === 'about' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setSelectedTab('about')}
              >
                About
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm flex items-center ${
                  selectedTab === 'doctors' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setSelectedTab('doctors')}
              >
                Doctors
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm flex items-center ${
                  selectedTab === 'services' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setSelectedTab('services')}
              >
                Services
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {selectedTab === 'about' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {hospital.name}</h2>
              <p className="text-gray-700 mb-6">
                {hospital.name} is a premier healthcare facility providing comprehensive medical services to the community. 
                With state-of-the-art equipment and a team of dedicated healthcare professionals, we strive to deliver 
                exceptional patient care and medical excellence.
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Facilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FacilityItem 
                    icon={<Building className="h-5 w-5 text-blue-500" />}
                    title="Modern Infrastructure"
                    description="State-of-the-art medical facilities and equipment"
                  />
                  <FacilityItem 
                    icon={<Clock className="h-5 w-5 text-blue-500" />}
                    title="24/7 Emergency Care"
                    description="Round-the-clock emergency medical services"
                  />
                  <FacilityItem 
                    icon={<User className="h-5 w-5 text-blue-500" />}
                    title="Expert Medical Staff"
                    description="Team of skilled doctors and healthcare professionals"
                  />
                  <FacilityItem 
                    icon={<Star className="h-5 w-5 text-blue-500" />}
                    title="Quality Care"
                    description="Patient-centered approach with high quality standards"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Location & Hours</h3>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:space-x-8">
                    <div className="mb-4 md:mb-0">
                      <h4 className="font-medium text-gray-800 mb-2">Address</h4>
                      <p className="text-gray-700">{hospital.address}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Working Hours</h4>
                      <ul className="text-gray-700">
                        <li>Monday - Friday: 8:00 AM - 8:00 PM</li>
                        <li>Saturday: 8:00 AM - 5:00 PM</li>
                        <li>Sunday: 10:00 AM - 2:00 PM</li>
                        <li>Emergency: 24/7</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'doctors' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Doctors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hospitalDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'services' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hospital.services.map((service, index) => (
                  <div 
                    key={index}
                    className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">{service}</h3>
                    <p className="text-gray-700">
                      Our {service.toLowerCase()} services provide comprehensive care with the latest medical techniques and equipment.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface FacilityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FacilityItem: React.FC<FacilityItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex">
      <div className="mr-3">{icon}</div>
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default HospitalDetailsPage;