import React, { createContext, useContext, useState, useEffect } from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationContextType {
  coordinates: Coordinates | null;
  locationError: string | null;
  loading: boolean;
  getLocation: () => Promise<void>;
  calculateDistance: (lat: number, lng: number) => number | null;
}

const LocationContext = createContext<LocationContextType>({
  coordinates: null,
  locationError: null,
  loading: false,
  getLocation: async () => {},
  calculateDistance: () => null
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setLocationError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('User denied the request for geolocation');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable');
            break;
          case error.TIMEOUT:
            setLocationError('The request to get user location timed out');
            break;
          default:
            setLocationError('An unknown error occurred');
        }
      } else {
        setLocationError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Simple distance calculation using Haversine formula
  const calculateDistance = (lat: number, lng: number): number | null => {
    if (!coordinates) return null;
    
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat - coordinates.latitude) * Math.PI / 180;
    const dLon = (lng - coordinates.longitude) * Math.PI / 180;
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coordinates.latitude * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    
    return parseFloat(distance.toFixed(1));
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ coordinates, locationError, loading, getLocation, calculateDistance }}>
      {children}
    </LocationContext.Provider>
  );
};