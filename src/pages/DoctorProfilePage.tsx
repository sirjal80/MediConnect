import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, MessageCircle, Video, Phone, Award } from 'lucide-react';
import { doctors } from '../data/doctors';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const DoctorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'about' | 'reviews' | 'availability'>('about');

  const doctor = doctors.find(d => d.id === id);

  if (!doctor) {
    return (
      <div className="pt-20 pb-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Doctor Not Found</h1>
          <p className="text-gray-600 mb-8">The doctor you are looking for does not exist.</p>
          <Button onClick={() => navigate('/doctors')}>Back to Doctors</Button>
        </div>
      </div>
    );
  }

  const handleStartConsultation = (type: 'chat' | 'video' | 'audio') => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/doctors/${id}`, action: 'consultation' } });
      return;
    }
    navigate(`/consultation/${id}?type=${type}`);
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Doctor Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 p-6">
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-1">{doctor.name}</h1>
                  <p className="text-blue-600 font-medium text-xl mb-1">{doctor.specialty}</p>
                  <p className="text-gray-600">{doctor.qualification}</p>
                </div>
                <div className="flex items-center bg-blue-50 px-3 py-2 rounded-md">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="font-bold text-lg">{doctor.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">{doctor.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">{doctor.experience} years experience</span>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <span className="font-medium text-gray-700 mr-2">Status:</span>
                {doctor.available ? (
                  <span className="text-green-600 font-medium">Available for Consultation</span>
                ) : (
                  <span className="text-red-500">Currently Unavailable</span>
                )}
              </div>

              {doctor.consultationFee && (
                <div className="mb-6">
                  <p className="text-gray-700">
                    <span className="font-medium">Consultation Fee:</span>{' '}
                    <span className="text-blue-600 font-bold">${doctor.consultationFee}</span>
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  icon={<MessageCircle size={18} />}
                  disabled={!doctor.available}
                  onClick={() => handleStartConsultation('chat')}
                >
                  Chat Consultation
                </Button>
                <Button
                  variant="secondary"
                  icon={<Video size={18} />}
                  disabled={!doctor.available}
                  onClick={() => handleStartConsultation('video')}
                >
                  Video Call
                </Button>
                <Button
                  variant="outline"
                  icon={<Phone size={18} />}
                  disabled={!doctor.available}
                  onClick={() => handleStartConsultation('audio')}
                >
                  Audio Call
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
                  selectedTab === 'availability' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setSelectedTab('availability')}
              >
                Availability
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm flex items-center ${
                  selectedTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setSelectedTab('reviews')}
              >
                Reviews
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {selectedTab === 'about' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About Doctor</h2>
              <p className="text-gray-700 mb-6">
                {doctor.about}
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {doctor.specialty}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    General Consultation
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    Preventive Care
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Education & Experience</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="mr-4">
                      <Award className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Medical Degree</p>
                      <p className="text-gray-600">Prestigious Medical School, Graduated {new Date().getFullYear() - doctor.experience - 4}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4">
                      <Award className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Residency</p>
                      <p className="text-gray-600">University Hospital, Completed {new Date().getFullYear() - doctor.experience}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4">
                      <Award className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Board Certification</p>
                      <p className="text-gray-600">{doctor.specialty}, Certified {new Date().getFullYear() - doctor.experience + 1}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'availability' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Availability</h2>
              {doctor.availableTimes && doctor.availableTimes.length > 0 ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Today's Available Slots</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {doctor.availableTimes.map((time, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md border border-blue-200 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition"
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Button 
                      variant="primary" 
                      icon={<Calendar size={18} />}
                      disabled={!doctor.available}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-gray-700">No available slots at the moment. Please check back later.</p>
              )}
            </div>
          )}

          {selectedTab === 'reviews' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Reviews</h2>
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-lg font-bold">{doctor.rating}</span>
                  <span className="text-gray-600 ml-2">(28 reviews)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <ReviewCard
                  name="John D."
                  date="2 weeks ago"
                  rating={5}
                  comment="Dr. Sarah was extremely thorough and took the time to explain everything to me. She answered all my questions and made me feel at ease. Highly recommend!"
                />
                <ReviewCard
                  name="Maria S."
                  date="1 month ago"
                  rating={4}
                  comment="Very professional doctor with excellent bedside manner. The video consultation was smooth and convenient. Would definitely consult again."
                />
                <ReviewCard
                  name="Robert T."
                  date="2 months ago"
                  rating={5}
                  comment="Dr. Sarah is knowledgeable, patient, and caring. She provided me with detailed information about my condition and a comprehensive treatment plan."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ReviewCardProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, date, rating, comment }) => {
  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800">{name}</h3>
        <span className="text-gray-500 text-sm">{date}</span>
      </div>
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
        ))}
      </div>
      <p className="text-gray-600">{comment}</p>
    </div>
  );
};

export default DoctorProfilePage;