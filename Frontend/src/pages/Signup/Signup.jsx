// ===== File: src/pages/Signup/Signup.jsx =====
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { validateEmail, validatePhone, validatePassword, validateFile } from '../../utils/validators';
import './signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [panPreview, setPanPreview] = useState(null);
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    panCardPhoto: null,
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});

  // OTP Timer
  useEffect(() => {
    let timer;
    if (step === 2 && otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    } else if (otpTimer === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [step, otpTimer]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Create preview URL
      if (file) {
        if (panPreview) {
          URL.revokeObjectURL(panPreview);
        }
        setPanPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    
    // Date of Birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      }
    }
    
    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    // File validation
    if (!formData.panCardPhoto) {
      newErrors.panCardPhoto = 'PAN card photo is required';
    } else {
      const fileValidation = validateFile(formData.panCardPhoto);
      if (fileValidation !== true) {
        newErrors.panCardPhoto = fileValidation;
      }
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleGenerateOTP = async () => {
    const newErrors = validateStep1();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    // Simulate OTP generation
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setOtpTimer(60);
      setCanResend(false);
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setErrors({ otp: 'Please enter 6-digit OTP' });
      return;
    }
    
    setLoading(true);
    
    try {
      const isValid = await authService.verifyOTP(otp);
      
      if (isValid) {
        // Prepare data for signup
        const signupData = {
          ...formData,
          // Remove confirm password as it's not needed
          confirmPassword: undefined
        };
        
        const result = await signup(signupData);
        
        if (result.success) {
          navigate('/dashboard');
        } else {
          setErrors({ form: result.error });
        }
      } else {
        setErrors({ otp: 'Invalid OTP. Please try again.' });
      }
    } catch (error) {
      setErrors({ form: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    if (!canResend) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpTimer(60);
      setCanResend(false);
      setErrors({});
      // Show success message
      alert('OTP resent to your email!');
    }, 1000);
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return null;
    if (password.length < 6) return 'weak';
    if (password.length < 8) return 'medium';
    if (/[!@#$%^&*]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 'strong';
    return 'medium';
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2 className="signup-title">
            {step === 1 ? 'Create Account' : 'Verify Email'}
          </h2>
          <p className="signup-subtitle">
            {step === 1 ? 'Step 1: Personal Details' : 'Step 2: Email Verification'}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="signup-progress">
          <div className="signup-step">
            <div className={`signup-step-number ${step === 1 ? 'signup-step-active' : 'signup-step-completed'}`}>
              {step === 1 ? '1' : '✓'}
            </div>
            <div className={`signup-step-line ${step === 1 ? 'signup-step-line-pending' : 'signup-step-line-active'}`}></div>
          </div>
          <div className="signup-step">
            <div className={`signup-step-number ${step === 2 ? 'signup-step-active' : 'signup-step-pending'}`}>
              2
            </div>
          </div>
        </div>

        {step === 1 ? (
          <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
            {errors.form && (
              <div className="signup-error">
                {errors.form}
              </div>
            )}
            
            <div className="signup-form-scrollable">
              {/* First Name - Full Width */}
              <div className="signup-field">
                <label htmlFor="firstName" className="signup-label signup-label-required">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`signup-input ${errors.firstName ? 'signup-input-error' : ''}`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="signup-error-text">{errors.firstName}</p>}
              </div>
              
              {/* Last Name - Full Width */}
              <div className="signup-field">
                <label htmlFor="lastName" className="signup-label signup-label-required">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`signup-input ${errors.lastName ? 'signup-input-error' : ''}`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="signup-error-text">{errors.lastName}</p>}
              </div>

              {/* Email - Full Width */}
              <div className="signup-field">
                <label htmlFor="email" className="signup-label signup-label-required">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`signup-input ${errors.email ? 'signup-input-error' : ''}`}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="signup-error-text">{errors.email}</p>}
              </div>

              {/* Phone Number - Full Width */}
              <div className="signup-field">
                <label htmlFor="phone" className="signup-label signup-label-required">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`signup-input ${errors.phone ? 'signup-input-error' : ''}`}
                  placeholder="1234567890"
                  maxLength="10"
                />
                {errors.phone && <p className="signup-error-text">{errors.phone}</p>}
                <p className="signup-help-text">Enter 10 digit mobile number</p>
              </div>

              {/* Date of Birth - Full Width */}
              <div className="signup-field">
                <label htmlFor="dateOfBirth" className="signup-label signup-label-required">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`signup-input ${errors.dateOfBirth ? 'signup-input-error' : ''}`}
                />
                {errors.dateOfBirth && <p className="signup-error-text">{errors.dateOfBirth}</p>}
              </div>

              {/* Address - Full Width */}
              <div className="signup-field">
                <label htmlFor="address" className="signup-label signup-label-required">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className={`signup-input ${errors.address ? 'signup-input-error' : ''}`}
                  placeholder="Enter your full address"
                />
                {errors.address && <p className="signup-error-text">{errors.address}</p>}
              </div>

              {/* PAN Card Photo - Full Width */}
              <div className="signup-field">
                <label className="signup-label signup-label-required">
                  PAN Card Photo
                </label>
                <div className={`signup-file-upload ${formData.panCardPhoto ? 'signup-file-upload-active' : ''}`}>
                  <input
                    type="file"
                    name="panCardPhoto"
                    id="pan-upload"
                    onChange={handleChange}
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <label htmlFor="pan-upload" className="cursor-pointer block">
                    <svg className="signup-file-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="signup-file-upload-text">
                      {formData.panCardPhoto ? formData.panCardPhoto.name : 'Click to upload PAN card photo'}
                    </p>
                    <p className="signup-file-upload-format">JPG, JPEG, PNG (Max 2MB)</p>
                  </label>
                </div>
                {panPreview && (
                  <div className="signup-preview-container">
                    <img src={panPreview} alt="PAN Preview" className="signup-preview-image" />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, panCardPhoto: null }));
                        setPanPreview(null);
                      }}
                      className="signup-preview-remove"
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                )}
                {errors.panCardPhoto && <p className="signup-error-text">{errors.panCardPhoto}</p>}
              </div>

              {/* Password - Full Width (after PAN card) */}
              <div className="signup-field">
                <label htmlFor="password" className="signup-label signup-label-required">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`signup-input ${errors.password ? 'signup-input-error' : ''}`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="signup-error-text">{errors.password}</p>}
                {passwordStrength && (
                  <div className="mt-2">
                    <div className={`signup-password-strength signup-password-strength-${passwordStrength}`} />
                    <p className="text-xs mt-1 text-gray-500">
                      Password strength: <span className="capitalize">{passwordStrength}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password - Full Width */}
              <div className="signup-field">
                <label htmlFor="confirmPassword" className="signup-label signup-label-required">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`signup-input ${errors.confirmPassword ? 'signup-input-error' : ''}`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="signup-error-text">{errors.confirmPassword}</p>}
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerateOTP}
              className="signup-button-primary mt-6"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="signup-spinner mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating OTP...
                </div>
              ) : 'Generate OTP'}
            </button>

            <p className="signup-footer">
              Already have an account?{' '}
              <Link to="/login" className="signup-link">
                Sign in
              </Link>
            </p>
          </form>
        ) : (
          <div className="signup-otp-container">
            {errors.form && (
              <div className="signup-error">
                {errors.form}
              </div>
            )}
            
            <div className="signup-otp-message">
              <p className="font-medium">OTP sent successfully!</p>
              <p className="text-sm mt-1">We've sent a 6-digit verification code to {formData.email}</p>
            </div>

            <div className="signup-field">
              <label htmlFor="otp" className="signup-label">
                Enter Verification Code
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setOtp(value);
                  if (errors.otp) {
                    setErrors(prev => ({ ...prev, otp: '' }));
                  }
                }}
                className={`signup-input signup-otp-input ${errors.otp ? 'signup-input-error' : ''}`}
                placeholder="••••••"
                maxLength="6"
              />
              {errors.otp && <p className="signup-error-text">{errors.otp}</p>}
            </div>

            <button
              type="button"
              onClick={handleVerifyOTP}
              className="signup-button-primary"
              disabled={loading || otp.length !== 6}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="signup-spinner mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Verifying...
                </div>
              ) : 'Verify OTP'}
            </button>

            <div className="text-center mt-4">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="signup-otp-resend"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="signup-otp-timer">
                  Resend OTP in {otpTimer} seconds
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setErrors({});
                if (panPreview) {
                  URL.revokeObjectURL(panPreview);
                  setPanPreview(null);
                }
              }}
              className="signup-otp-back mt-4"
            >
              ← Back to Personal Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;