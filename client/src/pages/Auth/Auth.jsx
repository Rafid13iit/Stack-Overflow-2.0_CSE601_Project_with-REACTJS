import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, User, Lock } from 'lucide-react';
import icon from '../../assets/icon.png';
import AboutAuth from './AboutAuth';
import { signup, login } from '../../actions/auth';
import './Auth.css';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setErrors({});
    setName('');
    setEmail('');
    setPassword('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (isSignup && !name) newErrors.name = 'Name is required';
    
    if (password && password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isSignup) {
      dispatch(signup({ name, email, password }, navigate));
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };

  const InputWrapper = ({ children, error }) => (
    <div className={`relative group ${error ? 'shake-animation' : ''}`}>
      {children}
      {error && (
        <p className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-center gap-8">
        {isSignup && (
          <div className="w-full max-w-md lg:w-1/2 transform hover:scale-[1.02] transition-all duration-300">
            <AboutAuth />
          </div>
        )}

        <div className={`w-full ${isSignup ? 'lg:w-1/2' : ''} max-w-md`}>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="text-center mb-8">
              {!isSignup && (
                <img 
                  src={icon} 
                  alt="stack-overflow" 
                  className="mx-auto mb-6 w-20 h-20 transform hover:scale-110 transition-transform duration-300" 
                />
              )}
              <h2 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                {isSignup ? 'Create your account' : 'Welcome back'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignup && (
                <InputWrapper error={errors.name}>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Display name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-gray-400"
                    />
                  </div>
                </InputWrapper>
              )}

              <InputWrapper error={errors.email}>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-gray-400"
                  />
                </div>
              </InputWrapper>

              <InputWrapper error={errors.password}>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </InputWrapper>

              {isSignup && (
                <p className="text-xs text-gray-500">
                  Passwords must contain at least eight characters, including at least 1 letter and 1 number.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200"
              >
                {isSignup ? 'Create Account' : 'Sign In'}
              </button>

              {isSignup && (
                <p className="text-xs text-gray-500 mt-4">
                  By clicking "Create Account", you agree to our{' '}
                  <a href="#" className="text-orange-600 hover:text-orange-700 hover:underline">
                    terms of service
                  </a>
                  ,{' '}
                  <a href="#" className="text-orange-600 hover:text-orange-700 hover:underline">
                    privacy policy
                  </a>
                  , and{' '}
                  <a href="#" className="text-orange-600 hover:text-orange-700 hover:underline">
                    cookie policy
                  </a>
                  .
                </p>
              )}
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-center text-sm text-gray-600">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  className="text-orange-600 hover:text-orange-700 font-medium hover:underline focus:outline-none"
                  onClick={handleSwitch}
                >
                  {isSignup ? 'Sign In' : 'Create Account'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
