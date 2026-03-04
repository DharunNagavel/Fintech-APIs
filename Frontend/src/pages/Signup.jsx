import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    mail: "",
    panFile: null,
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [showOtpField, setShowOtpField] = useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "panFile") {
      setFormData({ ...formData, panFile: files[0] });
    } else if (name === "otp") {
      // Allow only 5 digits
      const otpValue = value.replace(/\D/g, "").slice(0, 5);
      setFormData({ ...formData, otp: otpValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:1000/mail/send-otp", {
        mail: formData.mail,
      });
      alert("OTP sent to your email");
      setShowOtpField(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      mail: formData.mail,
      phone: formData.mobile,
      dob: "2005-01-01", 
      address: formData.address,
      pan_number: "ABCDE1234F", 
      password: formData.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:1000/auth/signup",
        payload,
      );
      alert("Signup successful");
      console.log(res.data);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          {/* Last Name */}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          {/* Mobile */}
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            maxLength="10"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          {/* Address */}
          <textarea
            name="address"
            placeholder="Address"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.address}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="mail"
            placeholder="Email"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* PAN Card Upload */}
          <div>
            <label className="block mb-1 font-medium">Upload PAN Card</label>
            <input
              type="file"
              name="panFile"
              accept="image/*,.pdf"
              className="w-full border p-2 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {!showOtpField && (
            <button
              onClick={handleGenerateOtp}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Generate OTP
            </button>
          )}
          {showOtpField && (
            <>
              <input
                type="text"
                name="otp"
                placeholder="Enter 5-digit OTP"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.otp}
                onChange={handleChange}
                maxLength="5"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                onClick={handleSubmit}
              >
                Verify & Submit
              </button>
            </>
          )}
        </form>
        <div className="m-3 text-center">
          Already have an account?
          <Link to="/signin" className="text-[15px] text-blue-600">
            {" "}
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
