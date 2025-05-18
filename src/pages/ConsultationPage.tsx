import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Send, Phone, Video, Paperclip, Mic, Image, X, ChevronLeft, MoreVertical, Volume2 } from 'lucide-react';
import { doctors } from '../data/doctors';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../types';

const ConsultationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const consultationType = searchParams.get('type') || 'chat';
  const navigate = useNavigate();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isCallActive, setIsCallActive] = useState(consultationType !== 'chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const doctor = doctors.find(d => d.id === id);

  useEffect(() => {
    if (!doctor || !user) {
      navigate('/doctors');
      return;
    }

    // Add initial message from doctor
    const initialMessage: ChatMessage = {
      id: '1',
      senderId: doctor.id,
      receiverId: user.id,
      message: `Hello! I'm ${doctor.name}. How can I help you today?`,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages([initialMessage]);
  }, [doctor, user, navigate]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!doctor || !user) {
    return null;
  }

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId: doctor.id,
      message: message.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessage('');

    // Simulate doctor's response after a delay
    setTimeout(() => {
      const doctorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: doctor.id,
        receiverId: user.id,
        message: `I understand. Can you please provide more details about your symptoms?`,
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prevMessages => [...prevMessages, doctorResponse]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleEndCall = () => {
    if (window.confirm('Are you sure you want to end this consultation?')) {
      setIsCallActive(false);
      if (consultationType !== 'chat') {
        navigate(`/doctors/${id}`);
      }
    }
  };

  const handleBackClick = () => {
    if (window.confirm('Are you sure you want to leave this consultation?')) {
      navigate(`/doctors/${id}`);
    }
  };

  return (
    <div className="h-screen bg-gray-100 pt-16">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={handleBackClick} className="mr-3">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="h-10 w-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h2 className="font-bold text-gray-800">{doctor.name}</h2>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                </div>
              </div>
            </div>
            <button>
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {(consultationType === 'video' || consultationType === 'audio') && isCallActive && (
            <div className="bg-gray-900 relative flex-1 flex items-center justify-center">
              {consultationType === 'video' ? (
                <div className="w-full h-full">
                  {/* Video call placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute text-center">
                      <img
                        src={doctor.photo}
                        alt={doctor.name}
                        className="h-32 w-32 rounded-full object-cover mx-auto"
                      />
                      <h3 className="text-white font-bold mt-4">{doctor.name}</h3>
                      <p className="text-gray-300">{consultationType === 'video' ? 'Video Call' : 'Audio Call'}</p>
                    </div>
                  </div>
                  
                  {/* Patient's video (small overlay) */}
                  <div className="absolute right-4 top-4 w-40 h-60 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                    <img
                      src={user?.photo || 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=600'}
                      alt="You"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-blue-600 rounded-full p-8 mb-6 inline-block">
                    <Volume2 className="h-16 w-16 text-white" />
                  </div>
                  <h2 className="text-white text-2xl font-bold">{doctor.name}</h2>
                  <p className="text-gray-300 mb-2">Audio Call in progress</p>
                  <p className="text-gray-400">00:03:45</p>
                </div>
              )}

              {/* Call Controls */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4">
                <button className="bg-gray-700 p-4 rounded-full hover:bg-gray-600 transition">
                  <Mic className="h-6 w-6 text-white" />
                </button>
                {consultationType === 'video' && (
                  <button className="bg-gray-700 p-4 rounded-full hover:bg-gray-600 transition">
                    <Video className="h-6 w-6 text-white" />
                  </button>
                )}
                <button 
                  className="bg-red-500 p-4 rounded-full hover:bg-red-600 transition"
                  onClick={handleEndCall}
                >
                  <Phone className="h-6 w-6 text-white transform rotate-135" />
                </button>
              </div>
            </div>
          )}

          {/* Chat Area (always visible for text consultation, or side chat for video/audio) */}
          <div className={`${(consultationType !== 'chat' && isCallActive) ? 'hidden md:flex md:w-1/3 md:border-l border-gray-200' : 'flex-1'} flex flex-col bg-white`}>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.senderId !== user.id && (
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="h-8 w-8 rounded-full mr-2 mt-1"
                    />
                  )}
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                      msg.senderId === user.id
                        ? 'bg-blue-500 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.senderId === user.id ? 'text-blue-100' : 'text-gray-500'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.senderId === user.id && (
                    <img
                      src={user?.photo || 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=600'}
                      alt="You"
                      className="h-8 w-8 rounded-full ml-2 mt-1"
                    />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

            <div className="border-t border-gray-200 px-4 py-3">
              <div className="flex items-center">
                <button className="text-gray-500 hover:text-gray-700 mr-2">
                  <Paperclip className="h-5 w-5" />
                </button>
                <button className="text-gray-500 hover:text-gray-700 mr-2">
                  <Image className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={`ml-2 p-2 rounded-full ${
                    message.trim() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;