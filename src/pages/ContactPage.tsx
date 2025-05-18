import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [activeTab, setActiveTab] = useState<'contact' | 'faq'>('contact');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a backend
    console.log('Form submitted:', formData);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // Show success message
    alert('Your message has been sent successfully!');
  };

  return (
    <div className="pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help you with any inquiries you might have.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10 max-w-5xl mx-auto">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 font-medium text-sm flex-1 flex justify-center items-center ${
                activeTab === 'contact'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('contact')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Us
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm flex-1 flex justify-center items-center ${
                activeTab === 'faq'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('faq')}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQs
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'contact' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Phone Number"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                      />
                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select a subject</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Appointment Issue">Appointment Issue</option>
                          <option value="Billing Question">Billing Question</option>
                          <option value="Feedback">Feedback</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      icon={<Send size={18} />}
                      className="w-full sm:w-auto"
                    >
                      Send Message
                    </Button>
                  </form>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <ContactInfo
                      icon={<MapPin className="h-6 w-6 text-blue-500" />}
                      title="Our Location"
                      content="123 Medical Avenue, Health City, HC 10001"
                    />
                    <ContactInfo
                      icon={<Phone className="h-6 w-6 text-blue-500" />}
                      title="Phone Number"
                      content="+1 (555) 123-4567"
                    />
                    <ContactInfo
                      icon={<Mail className="h-6 w-6 text-blue-500" />}
                      title="Email Address"
                      content="contact@mediconnect.com"
                    />
                  </div>

                  <div className="mt-10">
                    <h3 className="font-bold text-gray-800 mb-3">Office Hours</h3>
                    <table className="w-full text-gray-700">
                      <tbody>
                        <tr>
                          <td className="py-1 font-medium">Monday - Friday:</td>
                          <td className="py-1">9:00 AM - 6:00 PM</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Saturday:</td>
                          <td className="py-1">10:00 AM - 4:00 PM</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Sunday:</td>
                          <td className="py-1">Closed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <FaqItem
                    question="How do I book an appointment with a doctor?"
                    answer="You can book an appointment by visiting the doctor's profile page and selecting an available time slot. You'll need to be logged in to complete the booking."
                  />
                  <FaqItem
                    question="What payment methods do you accept?"
                    answer="We accept credit/debit cards, PayPal, and health insurance for qualified consultations. Payment details are securely processed during the booking."
                  />
                  <FaqItem
                    question="How do virtual consultations work?"
                    answer="Virtual consultations take place through our secure platform. You can choose between text chat, audio call, or video call depending on your preference and the doctor's availability."
                  />
                  <FaqItem
                    question="Can I cancel or reschedule my appointment?"
                    answer="Yes, you can cancel or reschedule your appointment up to 2 hours before the scheduled time without any penalty. Log in to your account and go to 'My Appointments' to make changes."
                  />
                  <FaqItem
                    question="Is my medical information secure?"
                    answer="Yes, we take patient privacy very seriously. All your medical information is protected with bank-level security and encryption. We comply with all healthcare data protection regulations."
                  />
                  <FaqItem
                    question="What should I do in case of a medical emergency?"
                    answer="In case of a medical emergency, call 911 immediately or visit the nearest emergency room. Our platform is not designed for emergency situations that require immediate medical attention."
                  />
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-bold text-gray-800 mb-2">Still have questions?</h3>
                  <p className="text-gray-600 mb-4">If you couldn't find the answer to your question, feel free to contact our support team.</p>
                  <Button 
                    variant="primary" 
                    onClick={() => setActiveTab('contact')}
                    icon={<MessageCircle size={18} />}
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map Section - In a real app, this would be a Google Map */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Us</h2>
          <div className="bg-gray-200 rounded-md h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Interactive map would appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, content }) => {
  return (
    <div className="flex">
      <div className="mr-4">{icon}</div>
      <div>
        <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h3 className="font-bold text-gray-800 mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
};

export default ContactPage;