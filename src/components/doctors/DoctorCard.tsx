import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import { Doctor } from '../../types';
import Card, { CardContent, CardImage } from '../ui/Card';
import Button from '../ui/Button';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/doctors/${doctor.id}`);
  };

  return (
    <Card hoverable className="h-full flex flex-col">
      <CardImage 
        src={doctor.photo} 
        alt={doctor.name}
        className="h-48" 
      />
      <CardContent className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600">{doctor.name}</h3>
          <div className="flex items-center bg-blue-50 px-2 py-1 rounded text-sm">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="font-medium">{doctor.rating}</span>
          </div>
        </div>
        
        <p className="text-blue-600 font-medium mb-1">{doctor.specialty}</p>
        <p className="text-gray-500 text-sm mb-2">{doctor.qualification}</p>
        
        <div className="flex items-center text-gray-700 text-sm mb-2">
          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
          <span>{doctor.location}</span>
          {doctor.distance && <span className="ml-1 text-blue-600 font-medium">({doctor.distance} km)</span>}
        </div>
        
        <div className="flex items-center text-gray-700 text-sm mb-4">
          <Clock className="h-4 w-4 text-gray-500 mr-1" />
          <span>{doctor.experience} years experience</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm">
              <span className="font-medium">Status: </span>
              {doctor.available ? (
                <span className="text-green-600 font-medium">Available</span>
              ) : (
                <span className="text-red-500">Unavailable</span>
              )}
            </div>
            {doctor.consultationFee && (
              <div className="text-blue-600 font-bold">
                ${doctor.consultationFee}
              </div>
            )}
          </div>
          
          <Button 
            variant="primary" 
            fullWidth 
            onClick={handleViewProfile}
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;