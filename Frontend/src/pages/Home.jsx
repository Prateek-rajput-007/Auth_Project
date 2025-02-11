import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";

const Home = () => {
  const { isAuth, user } = useContext(AuthContext);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-blue-900 animate-pulse opacity-30"></div>

      {/* Hero Section */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center p-8 mt-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-400">
          Welcome to MelodyVerse 🎵
        </h1>
        <p className="mt-4 text-lg max-w-2xl text-gray-300">
          Your gateway to endless music. Stream, discover, and create
          personalized playlists that match your vibe.
        </p>

        {/* Authentication Links */}
        {isAuth ? (
          <motion.h2 
            className="text-2xl font-semibold mt-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Hey, {user.name}! 🎶
          </motion.h2>
        ) : (
          <motion.div 
            className="flex space-x-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/login">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                className="px-6 py-3 text-lg font-semibold bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition"
              >
                Login
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                className="px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
              >
                Sign Up
              </motion.button>
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* Music Wave Animation */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent flex items-center justify-center">
        <motion.div
          className="h-10 w-10 text-white text-4xl"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          <FaPlayCircle />
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div 
        className="relative z-10 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {[
          { title: "🎧 Explore New Music", text: "Find fresh tracks and discover trending hits tailored to your taste." },
          { title: "📀 Create Playlists", text: "Organize songs, share with friends, and craft your personal music journey." },
          { title: "🚀 High-Quality Streaming", text: "Enjoy seamless playback with crystal-clear sound quality." }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.2 }}
          >
            <h3 className="text-2xl font-bold text-purple-300">{feature.title}</h3>
            <p className="mt-2 text-gray-300">{feature.text}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Trending Artists Section */}
      <motion.div 
        className="relative z-10 mt-16 w-full max-w-4xl px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-200">🔥 Trending Artists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {["Billie Eilish", "Drake", "Post Malone", "Ariana Grande", "Doja Cat", "Dua Lipa"].map((artist, index) => (
            <motion.div 
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg shadow-md text-center text-purple-300 font-semibold"
              whileHover={{ scale: 1.1 }}
            >
              {artist}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        className="relative z-10 mt-16 text-center text-sm opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        &copy; 2025 MelodyVerse. All Rights Reserved.
      </motion.footer>
    </div>
  );
};

export default Home;
