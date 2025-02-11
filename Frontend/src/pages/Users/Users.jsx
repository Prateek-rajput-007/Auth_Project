import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { motion } from "framer-motion";

axios.defaults.withCredentials = true;

const Users = () => {
  const { user, setUser, isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user", {
        withCredentials: true,
      });
      const data = await res.data;
      setUser(data.user);
      setIsAuth(true);
    } catch (err) {
      console.error("Error fetching user:", err);
      setIsAuth(false);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
        <motion.div
          className="text-3xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isAuth ? (
        <motion.div
          className="bg-white/20 backdrop-blur-lg shadow-lg rounded-lg p-6 w-96 text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h2 className="text-3xl font-bold text-white mb-3">
            Welcome, {user.name} 🎵
          </h2>
          <p className="text-gray-200">Email: {user.email}</p>
          <p className="text-gray-200">Role: {user.role || "User"}</p>
          <p className="text-gray-200">Bio: {user.bio || "No bio available"}</p>
          <p className="text-gray-200">Member since: {user.createdAt?.slice(0, 10)}</p>

          <motion.button
            className="mt-4 px-5 py-2 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 transition"
            whileHover={{ scale: 1.1 }}
            onClick={handleLogout}
          >
            Logout
          </motion.button>
        </motion.div>
      ) : (
        <h2 className="text-xl font-semibold text-red-500">
          Please log in to access your profile.
        </h2>
      )}
    </motion.div>
  );
};

export default Users;
