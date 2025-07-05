import React, {useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import SignupLoginPic from '../assets/SignupLoginPic.jpg'

const BACKEND_URL = "https://kingsley-estate-backend.onrender.com";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        
        // Set loading state
        setIsLoading(true);
        
        // Check email format :-
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            // Toastify to show error message
            toast.error("Invalid email format");
            setIsLoading(false);
            return;
        }

        // Password validation :-
        if(password.length < 6) {
            toast.error("Password must be atleast 6 characters long");
            setIsLoading(false);
            return;
        }

        // Attempt to login
        try {
            const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
                email,
                password
            }, {
                withCredentials: true // Include cookies in the request
            });
            toast.success("Login successful!");
            // Navigate to home page after successful login
            setTimeout(() => {
                navigate('/');
                // Force a page reload to update navigation
                window.location.reload();
            }, 1500);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401) {
                    toast.error("Invalid email or password");
                    setIsLoading(false);
                    return;
                } else {
                    toast.error("Server error: " + error.response.data?.message || "Unknown error");
                    setIsLoading(false);
                    return;
                }
            } else {
                toast.error("Network error or backend is down");
                setIsLoading(false);
                return;
            }
        } finally {
            setIsLoading(false);
        }
    }

    function handleEmailChange(e) {
        const value = e.target.value;
        setEmail(value);
        console.log("email: ", value);
    }

    function handlePasswordChange(e) {
        const value = e.target.value;
        setPassword(value);
        console.log("password: ", value);
    }

  return (
    <div className='bg-cover bg-center h-screen relative pt-20' style={{ backgroundImage: `url(${SignupLoginPic})` }}>
      {/* Dark overlay for better visibility */}
      <div className='absolute inset-0 bg-black bg-opacity-50'></div>
      
      {/* Login form container */}
      <div className='relative z-10 flex items-center justify-center h-full'>
        <div className='bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl border border-white border-opacity-30'>
          {/* Kingsley Estates Branding */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-extrabold text-white mb-3 tracking-wider bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent pb-2'>Kingsley Estates</h1>
            <div className='w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-3 rounded-full'></div>
            <p className='text-white text-opacity-90 text-sm font-medium uppercase tracking-wider'>Premium Real Estate Solutions</p>
          </div>
          
          <h2 className='text-3xl font-bold text-white text-center mb-8'>Welcome Back</h2>
          
          <form className='space-y-6'>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className='block text-white text-sm font-medium mb-2'>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className='w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200'
                placeholder='Enter your email'
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className='block text-white text-sm font-medium mb-2'>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className='w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200'
                placeholder='Enter your password'
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              onClick={handleLogin}
              disabled={isLoading}
              className='w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              {isLoading ? (
                <div className='flex items-center justify-center space-x-1'>
                  <div className='w-2 h-2 bg-white rounded-full animate-bounce'></div>
                  <div className='w-2 h-2 bg-white rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
                  <div className='w-2 h-2 bg-white rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Signup link */}
          <p className='text-center text-white text-sm mt-6'>
            Don't have an account?{' '}
            <a href="/signup" className='text-yellow-300 hover:text-yellow-200 font-medium transition-colors duration-200'>
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
