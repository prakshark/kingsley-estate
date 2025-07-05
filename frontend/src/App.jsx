// Functional imports :-
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Page imports :-
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import EstateDetails from './pages/EstateDetails'
import UserProfile from './pages/UserProfile'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Navigation } from './components/Navigation'

export default function App() {
  return (
    <>
      <Navigation />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fbbf24',
            border: '1px solid #fbbf24',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/estateDetails/" element={
          <ProtectedRoute>
            <EstateDetails />
          </ProtectedRoute>
        } />
        <Route path="/userProfile/:userId" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}