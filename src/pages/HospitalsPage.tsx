import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { hospitals } from '../data/hospitals';
import { Hospital } from '../types';
import HospitalCard from '../components/hospitals/HospitalCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useLocation } from '../context/LocationContext';

const HospitalsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { coordinates, calculateDistance } = useLocation();

  // Get unique hospital types and services
  const hospitalTypes = Array.from(new Set(hospitals.map(hospital => hospital.type))).sort();
  const services = Array.from(
    new Set(hospitals.flatMap(hospital => hospital.services))
  ).sort();

  useEffect(() => {
    let results = [...hospitals];

    // Add distance information if location is available
    if (coordinates) {
      results = results.map(hospital => ({
        ...hospital,
        // This is just a mock calculation for demo purposes
        distance: Math.floor(Math.random() * 15) + 1
      }));
    }

    // Apply filters
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        hospital =>
          hospital.name.toLowerCase().includes(term) ||
          hospital.address.toLowerCase().includes(term)
      );
    }

    if (selectedType) {
      results = results.filter(hospital => hospital.type === selectedType);
    }

    if (selectedService) {
      results = results.filter(hospital =>
        hospital.services.includes(selectedService)
      );
    }

    setFilteredHospitals(results);
  }, [searchTerm, selectedType, selectedService, coordinates]);

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Hospitals</h1>
          <p className="text-gray-600">
            Discover and connect with top healthcare facilities in your area
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="w-full md:w-1/2">
              <Input
                placeholder="Search hospitals by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={18} />}
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-1/2">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                icon={<Filter size={18} />}
                className="w-full md:w-auto"
              >
                Filters
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    {hospitalTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Services Offered
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Services</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Location indicator when available */}
        {coordinates && (
          <div className="mb-6 flex items-center text-gray-600">
            <MapPin className="h-5 w-5 text-blue-500 mr-2" />
            <span>Using your current location</span>
          </div>
        )}

        {/* Hospitals Grid */}
        {filteredHospitals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No hospitals found</h3>
            <p className="text-gray-600">
              Try adjusting your search filters to find available hospitals
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalsPage;