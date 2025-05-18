import React, { useState } from 'react';
import { useNavigate, useLocation as useRouterLocation, Link } from 'react-router-dom';
import { Mail, Lock, User, Heart, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  
  const location = useRouterLocation();
  const from = location.state?.from || '/';
  const action = location.state?.action;

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignupForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!signupData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!signupData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (signupData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    setIsLoading(true);
    try {
      await login(loginData.email, loginData.password, role);
      navigate(from);
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        form: 'Invalid email or password. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignupForm()) return;
    
    setIsLoading(true);
    try {
      await signup(signupData.name, signupData.email, signupData.password, role);
      navigate(from);
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({
        form: 'There was an error creating your account. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <Heart className="h-10 w-10 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
              {action === 'consultation' ? 'Login to Start Consultation' : 
                activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h1>
            <p className="text-center text-gray-600 mb-6">
              {activeTab === 'login' 
                ? 'Sign in to access your account'
                : 'Join our healthcare platform today'}
            </p>

            {/* Tabs */}
            <div className="flex border border-gray-200 rounded-lg mb-6">
              <button
                className={`flex-1 py-3 text-sm font-medium rounded-l-lg ${
                  activeTab === 'login'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                className={`flex-1 py-3 text-sm font-medium rounded-r-lg ${
                  activeTab === 'signup'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>

            {/* Role Selection */}
            <div className="flex border border-gray-200 rounded-lg mb-6">
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-l-lg ${
                  role === 'patient'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setRole('patient')}
              >
                I'm a Patient
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-r-lg ${
                  role === 'doctor'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setRole('doctor')}
              >
                I'm a Doctor
              </button>
            </div>

            {errors.form && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                {errors.form}
              </div>
            )}

            {activeTab === 'login' ? (
              <form onSubmit={handleLoginSubmit}>
                <div className="space-y-4 mb-6">
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    icon={<Mail size={18} />}
                    error={errors.email}
                  />
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    icon={<Lock size={18} />}
                    error={errors.password}
                  />
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Sign In'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit}>
                <div className="space-y-4 mb-6">
                  <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    icon={<User size={18} />}
                    error={errors.name}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    icon={<Mail size={18} />}
                    error={errors.email}
                  />
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    icon={<Lock size={18} />}
                    error={errors.password}
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    icon={<Lock size={18} />}
                    error={errors.confirmPassword}
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            )}
            
            <div className="mt-6 text-center text-gray-600 text-sm">
              By continuing, you agree to our{' '}
              <Link to="#" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;