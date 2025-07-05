import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = "https://kingsley-estate-backend.onrender.com";

function TestAuth() {
  const [authStatus, setAuthStatus] = useState('Checking...');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('TestAuth: Checking authentication...');
      const response = await axios.get(`${BACKEND_URL}/api/auth/profile`, {
        withCredentials: true
      });
      
      console.log('TestAuth: Success response:', response.data);
      setAuthStatus('Authenticated');
      setUserData(response.data);
      setError(null);
    } catch (error) {
      console.log('TestAuth: Error response:', error.response?.data);
      setAuthStatus('Not authenticated');
      setError(error.response?.data?.message || error.message);
      setUserData(null);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8">Authentication Test</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl text-white mb-4">Status: {authStatus}</h2>
          
          {userData && (
            <div className="mb-4">
              <h3 className="text-lg text-yellow-400 mb-2">User Data:</h3>
              <pre className="bg-gray-900 p-4 rounded text-green-400 overflow-auto">
                {JSON.stringify(userData, null, 2)}
              </pre>
            </div>
          )}
          
          {error && (
            <div className="mb-4">
              <h3 className="text-lg text-red-400 mb-2">Error:</h3>
              <div className="bg-gray-900 p-4 rounded text-red-400">
                {error}
              </div>
            </div>
          )}
          
          <button
            onClick={checkAuth}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
          >
            Check Again
          </button>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg text-yellow-400 mb-2">Instructions:</h3>
          <ul className="text-gray-300 space-y-2">
            <li>• This page tests if you're authenticated</li>
            <li>• If you see "Authenticated" and user data, you're logged in</li>
            <li>• If you see "Not authenticated", you need to log in</li>
            <li>• Check the browser console for detailed logs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TestAuth; 