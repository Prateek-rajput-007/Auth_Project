import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState(localStorage.getItem("rememberEmail") || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");

  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
    
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      setIsAuth(true);
      
      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberEmail");
        localStorage.removeItem("rememberMe");
      }

      navigate("/user");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
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
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">MelodyVerse Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input type="email" placeholder="Email" value={email} 
          onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg my-2" />
        <div className="relative w-full">
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} 
            onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg my-2" />
          <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
            👁️
          </button>
        </div>
        <div className="flex items-center justify-between my-2">
          <label className="flex items-center">
            <input type="checkbox" checked={rememberMe} 
              onChange={() => setRememberMe(!rememberMe)} className="mr-2" />
            Remember Me
          </label>
          <a href="#" className="text-purple-600 hover:underline">Forgot Password?</a>
        </div>
        <button onClick={handleLogin} className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700">
          Login
        </button>
        <p className="text-gray-600 text-center mt-4">
          Don't have an account? <a href="/signup" className="text-purple-600 font-semibold">Sign up</a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
