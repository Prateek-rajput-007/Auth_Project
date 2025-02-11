import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!formData.termsAccepted) {
      setError("You must accept the Terms & Conditions.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/signup", formData);
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">MelodyVerse Signup</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 border rounded-lg my-2" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded-lg my-2" />
        <div className="relative w-full">
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 border rounded-lg my-2" />
          <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
            👁️
          </button>
        </div>
        <div className="relative w-full">
          <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full p-3 border rounded-lg my-2" />
          <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3">
            👁️
          </button>
        </div>
        <label className="flex items-center my-2">
          <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mr-2" />
          I accept the Terms & Conditions
        </label>
        <button onClick={handleSignup} className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
          Sign Up
        </button>
        <p className="text-gray-600 text-center mt-4">
          Already have an account? <a href="/login" className="text-purple-600 font-semibold">Login</a>
        </p>
        <p className="text-gray-600 text-center mt-4">
          By signing up, you agree to our <a href="#" className="text-purple-600 font-semibold">Terms of Service</a> and <a href="#" className="text-purple-600 font-semibold">Privacy Policy</a>.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
