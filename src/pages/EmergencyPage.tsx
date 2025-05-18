import React from 'react';
import { Phone, Ambulance, AlertTriangle, MapPin, Clipboard, Clock, Heart } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';

const EmergencyPage: React.FC = () => {
  const emergencyNumbers = [
    { name: 'Medical Emergency', number: '911', icon: <Ambulance className="h-6 w-6 text-red-500" /> },
    { name: 'Poison Control', number: '1-800-222-1222', icon: <AlertTriangle className="h-6 w-6 text-orange-500" /> },
    { name: 'National Suicide Prevention', number: '988', icon: <Heart className="h-6 w-6 text-purple-500" /> },
    { name: 'Non-Emergency Medical', number: '311', icon: <Phone className="h-6 w-6 text-blue-500" /> },
  ];

  const handleCallAmbulance = () => {
    window.location.href = 'tel:911';
  };

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Emergency Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Emergency Services</h1>
          <p className="text-xl text-gray-600">
            Quick access to emergency medical services and information
          </p>
        </div>

        {/* Call Ambulance Button */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-10 text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            <AlertTriangle className="h-8 w-8 inline-block mr-2" />
            Medical Emergency?
          </h2>
          <p className="text-gray-700 mb-6">
            If you're experiencing a life-threatening emergency, call for an ambulance immediately.
          </p>
          <Button
            variant="danger"
            size="lg"
            icon={<Phone size={24} />}
            className="text-xl shadow-lg animate-pulse hover:animate-none"
            onClick={handleCallAmbulance}
            fullWidth
          >
            Call Ambulance (911)
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2">
            {/* Emergency Numbers */}
            <Card className="h-full">
              <CardContent>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Important Emergency Numbers</h2>
                <div className="space-y-4">
                  {emergencyNumbers.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition"
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-3 font-medium text-gray-800">{item.name}</span>
                      </div>
                      <a 
                        href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
                        className="flex items-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{item.number}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            {/* Emergency Information */}
            <Card className="h-full">
              <CardContent>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Emergency Guide</h2>
                <div className="space-y-4">
                  <EmergencyInfoItem
                    icon={<Clipboard className="h-5 w-5 text-blue-500" />}
                    title="What to Do"
                    text="Stay calm. Clear the area. Call 911. Follow dispatcher instructions."
                  />
                  <EmergencyInfoItem
                    icon={<Clock className="h-5 w-5 text-blue-500" />}
                    title="Response Time"
                    text="Emergency services typically arrive within 8-10 minutes in urban areas."
                  />
                  <EmergencyInfoItem
                    icon={<MapPin className="h-5 w-5 text-blue-500" />}
                    title="Share Location"
                    text="Use your phone to share your exact location with emergency services."
                  />
                  <EmergencyInfoItem
                    icon={<AlertTriangle className="h-5 w-5 text-blue-500" />}
                    title="Be Prepared"
                    text="Have medical info, allergies and medications list ready."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Nearby Emergency Facilities Map Placeholder */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nearby Emergency Facilities</h2>
          <div className="bg-gray-200 rounded-md h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Map showing nearby emergency facilities would appear here</p>
              <Button className="mt-4" variant="primary">
                View Full Map
              </Button>
            </div>
          </div>
        </div>

        {/* First Aid Tips */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Emergency First Aid Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FirstAidTipCard
              title="Heart Attack"
              steps={[
                "Call 911 immediately",
                "Have the person sit down and rest",
                "Loosen any tight clothing",
                "If the person is not allergic to aspirin and has no recent bleeding, they may chew one adult aspirin"
              ]}
            />
            <FirstAidTipCard
              title="Severe Bleeding"
              steps={[
                "Call 911 for serious bleeding",
                "Apply direct pressure to the wound",
                "If possible, raise the injured area above the heart",
                "Apply a clean cloth or bandage and maintain pressure"
              ]}
            />
            <FirstAidTipCard
              title="Choking"
              steps={[
                "Stand behind the person and lean them slightly forward",
                "Give 5 back blows between the shoulder blades",
                "If that fails, give 5 abdominal thrusts (Heimlich maneuver)",
                "Call 911 if the person becomes unconscious"
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface EmergencyInfoItemProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const EmergencyInfoItem: React.FC<EmergencyInfoItemProps> = ({ icon, title, text }) => {
  return (
    <div className="flex">
      <div className="mr-3">{icon}</div>
      <div>
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{text}</p>
      </div>
    </div>
  );
};

interface FirstAidTipCardProps {
  title: string;
  steps: string[];
}

const FirstAidTipCard: React.FC<FirstAidTipCardProps> = ({ title, steps }) => {
  return (
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
      <h3 className="text-lg font-semibold text-blue-700 mb-3">{title}</h3>
      <ol className="list-decimal list-inside space-y-2 text-gray-700">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default EmergencyPage;