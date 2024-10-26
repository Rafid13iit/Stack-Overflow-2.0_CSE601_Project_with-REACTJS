import React, { useState, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, User, Lock } from 'lucide-react';
import icon from '../../assets/icon.svg';
import AboutAuth from './AboutAuth';
import { signup, login } from '../../actions/auth';

// Memoized Input Component
const Input = memo(({ 
  type, 
  name, 
  placeholder, 
  value, 
  onChange, 
  onBlur, 
  error, 
  icon: Icon,
  showPassword,
  onTogglePassword 
}) => {
  return (
    <div className="relative mb-6">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-gray-400"
      />
      {error && (
        <p className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">
          {error}
        </p>
      )}
      {type === 'password' && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
});

// Form Container Component
const AuthForm = memo(({ isSignup, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= 8 && hasLetter && hasNumber;
  };

  const validateField = useCallback((name, value) => {
    const fieldErrors = {};

    switch (name) {
      case 'name':
        if (!value.trim() && isSignup) {
          fieldErrors.name = 'Name is required';
        } else if (value.trim().length < 2 && isSignup) {
          fieldErrors.name = 'Name must be at least 2 characters';
        }
        break;

      case 'email':
        if (!value.trim()) {
          fieldErrors.email = 'Email is required';
        } else if (!validateEmail(value)) {
          fieldErrors.email = 'Please enter a valid email address';
        }
        break;

      case 'password':
        if (!value) {
          fieldErrors.password = 'Password is required';
        } else if (!validatePassword(value)) {
          fieldErrors.password = 'Password must be at least 8 characters with 1 letter and 1 number';
        }
        break;

      default:
        break;
    }

    return fieldErrors;
  }, [isSignup]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const fieldErrors = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldErrors = validateField(name, value);
    setErrors(prev => ({ ...prev, ...fieldErrors }));
  }, [validateField]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    const touchedFields = {};
    Object.keys(formData).forEach(key => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);

    const formErrors = {};
    Object.keys(formData).forEach(key => {
      if (isSignup || (key !== 'name' && !isSignup)) {
        const fieldErrors = validateField(key, formData[key]);
        Object.assign(formErrors, fieldErrors);
      }
    });
    
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      onSubmit(formData);
    }
  }, [formData, isSignup, validateField, onSubmit]);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSignup && (
        <Input
          type="text"
          name="name"
          placeholder="Display name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          icon={User}
        />
      )}

      <Input
        type="email"
        name="email"
        placeholder="Email address"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        icon={Mail}
      />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
        icon={Lock}
        showPassword={showPassword}
        onTogglePassword={togglePassword}
      />

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
  );
});

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback((formData) => {
    if (isSignup) {
      dispatch(signup({ ...formData }, navigate));
    } else {
      dispatch(login({ email: formData.email, password: formData.password }, navigate));
    }
  }, [isSignup, dispatch, navigate]);

  const handleSwitch = useCallback(() => {
    setIsSignup(prev => !prev);
  }, []);

  return (
    <section className="flex justify-center items-center min-h-screen bg-orange-50">
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

            <AuthForm isSignup={isSignup} onSubmit={handleSubmit} />

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