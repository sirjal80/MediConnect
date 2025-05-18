import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Phone } from 'lucide-react';
import { Hospital } from '../../types';
import Card, { CardContent, CardImage } from '../ui/Card';
import Button from '../ui/Button';

interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/hospitals/${hospital.id}`);
  };

  return (
    <Card hoverable className="h-full flex flex-col">
      <CardImage 
        src={hospital.photo} 
        alt={hospital.name}
        className="h-48" 
      />
      <CardContent className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600">{hospital.name}</h3>
          <div className="flex items-center bg-blue-50 px-2 py-1 rounded text-sm">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="font-medium">{hospital.rating}</span>
          </div>
        </div>
        
        <p className="text-blue-600 font-medium mb-1">{hospital.type}</p>
        
        <div className="flex items-center text-gray-700 text-sm mb-2">
          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
          <span>{hospital.address}</span>
          {hospital.distance && <span className="ml-1 text-blue-600 font-medium">({hospital.distance} km)</span>}
        </div>
        
        <div className="flex items-center text-gray-700 text-sm mb-4">
          <Phone className="h-4 w-4 text-gray-500 mr-1" />
          <span>{hospital.phone}</span>
        </div>

        <div className="mt-2">
          <h4 className="font-medium text-gray-700 mb-1">Services:</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {hospital.services.slice(0, 3).map((service, index) => (
              <span 
                key={index}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
              >
                {service}
              </span>
            ))}
            {hospital.services.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{hospital.services.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto">
          <Button 
            variant="primary" 
            fullWidth 
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HospitalCard;