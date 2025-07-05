import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = "https://kingsley-estate-backend.onrender.com";

export function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        // Make request to backend to check authentication status
        const response = await axios.get(`${BACKEND_URL}/api/auth/profile`, {
          withCredentials: true // This is important for sending cookies
        });
        
        console.log('Auth response:', response.status, response.data);
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log('Auth error:', error.response?.status, error.response?.data);
        // If we get a 401, user is not authenticated
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return children;
} 