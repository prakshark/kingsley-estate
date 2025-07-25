import React, { useState } from 'react'
import MasonryTest from '../components/test/MasonryTest'
import GalleryTest from '../components/test/GalleryTest'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "https://kingsley-estate-backend.onrender.com";

function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleExploreClick = async () => {
    if (isLoading) return; // Prevent multiple clicks

    setIsLoading(true);
    try {
      // Check if user is logged in by making a request to the backend
      const response = await axios.get(`${BACKEND_URL}/api/auth/profile`, {
        withCredentials: true,
        timeout: 10000 // 10 second timeout
      });

      if (response.status === 200 && response.data) {
        navigate('/estateDetails');
        return;
      } else {
        navigate('/login');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        navigate('/login');
      } else if (error.message.includes('Network Error') || error.message.includes('ERR_BLOCKED_BY_CLIENT')) {
        navigate('/login');
      } else {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen pt-20">
      {/* Hero Section with MasonryTest as background */}
      <div className="relative h-screen overflow-hidden">
        {/* MasonryTest as background */}
        <div className="absolute inset-0 z-0">
          <MasonryTest />
        </div>
        
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 z-5 bg-black/80"></div>
        
        {/* Text overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl relative mx-auto py-16 md:py-32 px-4 w-full left-0 top-0">
            {/* Kingsley Estates Branding */}
            <div className="text-left mb-12">
              <h1 className="text-4xl md:text-8xl font-extrabold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-4 tracking-wider drop-shadow-2xl">
                KINGSLEY ESTATES.
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-300 to-yellow-500 mx-0 mb-6 rounded-full shadow-lg"></div>
              <p className="text-yellow-200 text-lg md:text-xl font-semibold uppercase tracking-widest drop-shadow-lg">
                Premium Real Estate Solutions.
              </p>
            </div>

            <p className="max-w-3xl text-lg md:text-2xl mt-8 text-gray-100 text-left leading-relaxed drop-shadow-lg font-medium">
              Discover exclusive properties in the most desirable locations. <br /><br />
            </p>

            <motion.button
              onClick={handleExploreClick}
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.05 } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
              className={`relative z-10 mt-8 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform border-2 inline-block cursor-pointer ${
                isLoading 
                  ? 'bg-yellow-500/20 text-yellow-300 border-yellow-300/50 cursor-not-allowed' 
                  : 'bg-transparent hover:bg-yellow-500/10 text-yellow-400 hover:text-yellow-300 border-yellow-400 hover:border-yellow-300'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Checking authentication...</span>
                </div>
              ) : (
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center space-x-2"
                >
                  <span>Explore our premium listings here.</span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </motion.div>
              )}
            </motion.button>
            <br /><br /><br />

            <motion.div 
              className="flex justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-yellow-400/20 border-2 border-yellow-400/50 flex items-center justify-center cursor-pointer hover:bg-yellow-400/30 transition-colors"
                animate={{ 
                  y: [0, -8, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.2,
                  backgroundColor: "rgba(250, 204, 21, 0.3)"
                }}
              >
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-yellow-400"
                  animate={{ 
                    y: [0, 2, 0]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Curated Luxury Living Section */}
      <div className="relative z-20 py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-6 tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            CURATED LUXURY LIVING
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8 rounded-full"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          />
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Discover our handpicked collection of premium properties, each carefully selected to embody the pinnacle of sophisticated living.
          </motion.p>
        </div>
      </div>
      
      <GalleryTest />
      <Footer />
    </div>
  )
}

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-yellow-400/30 mt-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/5 to-yellow-400/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
              KINGSLEY ESTATES
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6 rounded-full"></div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              Premium real estate solutions for discerning clients. We specialize in luxury properties and exclusive estates that define sophisticated living.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-center justify-center hover:bg-yellow-400/20 transition-colors">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-center justify-center hover:bg-yellow-400/20 transition-colors">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </div>
              <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-center justify-center hover:bg-yellow-400/20 transition-colors">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-yellow-400 font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Our Properties</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-yellow-400 font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 text-yellow-400">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <span className="text-gray-300">Noida, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 text-yellow-400">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <span className="text-gray-300">+91 9999 9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 text-yellow-400">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <span className="text-gray-300">info@demokingsleys.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-yellow-400/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © Kingsley Estates. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm">
              Created by: <span className="text-yellow-400 font-semibold">Prakhar Srivastava</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
    </footer>
  );
};

export default Home
