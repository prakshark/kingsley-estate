import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-hot-toast';

export function QuoteForm({ isOpen, onClose, estateName }) {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    timeSlot: '',
    shareInfo: false
  });

  // Generate time slots for next 3 days
  const generateTimeSlots = () => {
    const slots = [];
    const today = new Date();
    
    for (let day = 0; day < 3; day++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + day);
      
      const dateString = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
      
      const daySlots = [];
      for (let hour = 10; hour <= 19; hour++) {
        const timeString = `${hour.toString().padStart(2, '0')}:00`;
        daySlots.push({
          value: `${dateString} ${timeString}`,
          label: `${timeString} IST`
        });
      }
      
      slots.push({
        date: dateString,
        slots: daySlots
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (!formData.phoneNumber.trim()) {
      toast.error('Please enter your phone number');
      return;
    }
    
    if (!formData.timeSlot) {
      toast.error('Please select a time slot');
      return;
    }
    
    if (!formData.shareInfo) {
      toast.error('Please agree to share your information');
      return;
    }
    
    toast.success('Slot booked');
    onClose();
    setFormData({ phoneNumber: '', timeSlot: '', shareInfo: false });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black border-2 border-yellow-400 rounded-lg p-10 max-w-2xl w-full mx-4 relative z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-yellow-400 mb-3">
                Get Quote
              </h2>
              <p className="text-white text-lg mb-2">
                {estateName}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Phone Number */}
              <div>
                <label className="block text-yellow-400 text-lg font-semibold mb-3">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-transparent border-2 border-yellow-400/50 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors text-lg"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-yellow-400 text-lg font-semibold mb-3">
                  Preferred Time Slot *
                </label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-black border-2 border-yellow-400/50 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors text-lg appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fbbf24' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px',
                    paddingRight: '48px'
                  }}
                >
                  <option value="" className="bg-black text-white py-2">Select a time slot</option>
                  {timeSlots.map((dayGroup, dayIndex) => (
                    <optgroup key={dayIndex} label={dayGroup.date} className="bg-black text-yellow-400 font-semibold">
                      {dayGroup.slots.map((slot, slotIndex) => (
                        <option 
                          key={`${dayIndex}-${slotIndex}`} 
                          value={slot.value} 
                          className="bg-black text-white py-2 pl-4"
                        >
                          {slot.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Checkbox */}
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  name="shareInfo"
                  checked={formData.shareInfo}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-yellow-400 bg-transparent border-2 border-yellow-400 rounded focus:ring-yellow-400 focus:ring-2"
                />
                <label className="text-white text-lg">
                  Share Name and Email with Kingsley Estates *
                </label>
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full md:flex-1 px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors font-semibold text-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full md:flex-1 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  Schedule a Call
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 