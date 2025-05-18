import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { doctors } from '../data/doctors';
import { Doctor } from '../types';
import DoctorCard from '../components/doctors/DoctorCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useLocation as useRouterLocation } from 'react-router-dom';
import { useLocation } from '../context/LocationContext';

const DoctorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'rating' | 'experience' | 'distance'>('default');
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { coordinates, calculateDistance } = useLocation();

  const location = useRouterLocation();
  const isNearbyPage = location.pathname === '/nearby-doctors';

  // Get unique specialties
  const specialties = Array.from(new Set(doctors.map(doctor => doctor.specialty))).sort();

  useEffect(() => {
    let results = [...doctors];

    // Add distance information if location is available
    if (coordinates) {
      results = results.map(doctor => ({
        ...doctor,
        // This is just a mock calculation for demo purposes
        distance: Math.floor(Math.random() * 10) + 1
      }));
    }

    // Apply filters
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        doctor => 
          doctor.name.toLowerCase().includes(term) ||
          doctor.specialty.toLowerCase().includes(term)
      );
    }

    if (selectedSpecialty) {
      results = results.filter(doctor => doctor.specialty === selectedSpecialty);
    }

    // For nearby doctors page, show only doctors within 10km and sort by distance
    if (isNearbyPage) {
      results = results.filter(doctor => (doctor.distance || 0) <= 10);
      results.sort((a, b) => (a.distance || 100) - (b.distance || 100));
    } else {
      // Apply sorting
      switch (sortBy) {
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'experience':
          results.sort((a, b) => b.experience - a.experience);
          break;
        case 'distance':
          if (coordinates) {
            results.sort((a, b) => (a.distance || 100) - (b.distance || 100));
          }
          break;
        default:
          // Default sorting can remain as is
          break;
      }
    }

    setFilteredDoctors(results);
  }, [searchTerm, selectedSpecialty, sortBy, coordinates, isNearbyPage]);

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isNearbyPage ? 'Doctors Near You' : 'Find Doctors'}
          </h1>
          <p className="text-gray-600">
            {isNearbyPage 
              ? 'Discover healthcare professionals in your area'
              : 'Search and connect with the best doctors for your health needs'}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="w-full md:w-1/2">
              <Input
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={18} />}
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-1/2">
              <div className="w-full md:w-2/3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="default">Sort By</option>
                  <option value="rating">Highest Rated</option>
                  <option value="experience">Most Experienced</option>
                  <option value="distance">Nearest</option>
                </select>
              </div>

              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                icon={<Filter size={18} />}
              >
                Filters
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialty
                  </label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map((specialty, index) => (
                      <option key={index} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Additional filters can be added here */}
              </div>
            </div>
          )}
        </div>

        {/* Location indicator for nearby page */}
        {isNearbyPage && coordinates && (
          <div className="mb-6 flex items-center text-gray-600">
            <MapPin className="h-5 w-5 text-blue-500 mr-2" />
            <span>Showing doctors within 10km of your location</span>
          </div>
        )}

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No doctors found</h3>
            <p className="text-gray-600">
              Try adjusting your search filters to find available doctors
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;