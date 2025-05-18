import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Phone, UserRound, MapIcon, Building, HeartPulse, StethoscopeIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import { doctors } from '../data/doctors';
import { hospitals } from '../data/hospitals';
import DoctorCard from '../components/doctors/DoctorCard';
import HospitalCard from '../components/hospitals/HospitalCard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Your Health Is Our Top Priority
              </h1>
              <p className="text-xl text-white mb-8">
                Connect with trusted doctors, hospitals and healthcare services all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg" 
                  variant="white"
                  icon={<Search />}
                  onClick={() => navigate('/doctors')}
                >
                  Find a Doctor
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-700"
                  icon={<MapPin />}
                  onClick={() => navigate('/hospitals')}
                >
                  Find Hospitals
                </Button>
                <Button 
                  size="lg" 
                  variant="danger"
                  icon={<Phone />}
                  onClick={() => navigate('/emergency')}
                >
                  Emergency
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a wide range of healthcare services to meet your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard 
              icon={<UserRound size={40} className="text-blue-500" />}
              title="Find Doctors"
              description="Search and connect with specialized doctors based on your healthcare needs."
              onClick={() => navigate('/doctors')}
            />
            
            <ServiceCard 
              icon={<Building size={40} className="text-green-500" />}
              title="Find Hospitals"
              description="Locate nearby hospitals and medical facilities with comprehensive services."
              onClick={() => navigate('/hospitals')}
            />
            
            <ServiceCard 
              icon={<StethoscopeIcon size={40} className="text-purple-500" />}
              title="Online Consultation"
              description="Consult with doctors online through chat, audio, or video calls."
              onClick={() => navigate('/doctors')}
            />
            
            <ServiceCard 
              icon={<HeartPulse size={40} className="text-red-500" />}
              title="Emergency Help"
              description="Quick access to emergency services and contacts when you need it most."
              onClick={() => navigate('/emergency')}
            />
          </div>
        </div>
      </section>

      {/* Top Doctors Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Top Doctors</h2>
            <Button 
              variant="outline"
              onClick={() => navigate('/doctors')}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.slice(0, 3).map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hospitals Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Hospitals</h2>
            <Button 
              variant="outline"
              onClick={() => navigate('/hospitals')}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.slice(0, 3).map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Patients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our patients have to say about their experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="MediConnect made it so easy to find a specialist. I was able to book an appointment and consult with a doctor all in the same day!"
              name="Sarah Thompson"
              role="Patient"
              image="https://images.pexels.com/photos/3783958/pexels-photo-3783958.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            
            <TestimonialCard
              quote="The video consultation feature is a game-changer. I could talk to my doctor from the comfort of my home without taking time off work."
              name="Mark Johnson"
              role="Patient"
              image="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            
            <TestimonialCard
              quote="As someone living in a rural area, this platform has given me access to specialists I wouldn't otherwise be able to see easily."
              name="Emily Chen"
              role="Patient"
              image="https://images.pexels.com/photos/2387335/pexels-photo-2387335.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to take control of your health?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have found the right healthcare provider through MediConnect.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              variant="white"
              onClick={() => navigate('/login')}
            >
              Sign Up Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-700"
              onClick={() => navigate('/doctors')}
            >
              Find a Doctor
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, role, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4 text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
        </svg>
      </div>
      <p className="mb-6 text-gray-600">{quote}</p>
      <div className="flex items-center">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4" 
        />
        <div>
          <h4 className="font-bold text-gray-800">{name}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;