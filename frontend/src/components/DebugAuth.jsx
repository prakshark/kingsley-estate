import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = "https://kingsley-estate-backend.onrender.com";

function DebugAuth() {
  const [result, setResult] = useState('Testing...');
  const [url, setUrl] = useState('');

  useEffect(() => {
    testAuth();
  }, []);

  const testAuth = async () => {
    const testUrl = `${BACKEND_URL}/api/auth/profile`;
    setUrl(testUrl);
    
    try {
      console.log('DebugAuth: Testing URL:', testUrl);
      const response = await axios.get(testUrl, {
        withCredentials: true
      });
      
      console.log('DebugAuth: Success:', response.data);
      setResult(`SUCCESS: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.log('DebugAuth: Error:', error);
      setResult(`ERROR: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8">Debug Authentication</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl text-white mb-4">Test URL:</h2>
          <div className="bg-gray-900 p-4 rounded text-green-400 font-mono text-sm break-all">
            {url}
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl text-white mb-4">Result:</h2>
          <div className="bg-gray-900 p-4 rounded text-white font-mono text-sm">
            {result}
          </div>
        </div>
        
        <button
          onClick={testAuth}
          className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
        >
          Test Again
        </button>
      </div>
    </div>
  );
}

export default DebugAuth; 