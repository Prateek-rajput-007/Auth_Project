import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
  const { user, isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!isAuth) {
    return <h2 className="text-center text-red-500">Please log in first.</h2>;
  }

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 p-6 text-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-white shadow-lg rounded-lg p-8 w-96 text-center"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.img 
          src={"data:image/jpeg;base64,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"} 
          alt="User Avatar"
          className="w-24 h-24 mx-auto rounded-full border-4 border-purple-400"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <h2 className="text-2xl font-bold text-purple-600 mt-3">
          {user.name ? `Welcome, ${user.name} 🎵` : "Welcome!"}
        </h2>

        <p className="text-gray-700 mt-1"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-700"><strong>Member since:</strong> {user.createdAt?.slice(0, 10)}</p>
        <p className="text-gray-700"><strong>Last Login:</strong> {user.lastLogin || "Unknown"}</p>
        <p className="text-gray-700"><strong>Role:</strong> {user.role || "User"}</p>
        <p className="text-gray-700"><strong>Subscription:</strong> {user.subscription || "Free"}</p>
        <p className="text-gray-700"><strong>Favorite Genre:</strong> {user.favoriteGenre || "Not specified"}</p>
        <p className="text-gray-700"><strong>Account Status:</strong> {user.accountStatus || "Active"}</p>
        <p className="text-gray-700"><strong>Songs Liked:</strong> {user.likedSongs || 0}</p>
        <p className="text-gray-700"><strong>Playlists Created:</strong> {user.playlists || 0}</p>
        <p className="text-gray-700"><strong>Location:</strong> {user.location || "Unknown"}</p>
        <p className="text-gray-700 italic mt-2">"{user.bio || "No bio available"}"</p>

        <motion.button 
          onClick={handleLogout} 
          className="mt-5 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
