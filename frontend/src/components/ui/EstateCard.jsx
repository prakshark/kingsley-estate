import React, { useState } from "react";
import { cn } from "../../utils/cn";
import { motion } from "motion/react";
import { QuoteForm } from "./QuoteForm";

export function EstateCard({ estate }) {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  
  const estateNames = [
    "Royal Villa Serenity",
    "Golden Heights Manor",
    "Crystal Bay Estate",
    "Emerald Gardens Villa",
    "Sapphire Coast Mansion",
    "Diamond Peak Residence",
    "Pearl Harbor Estate",
    "Ruby Ridge Villa",
    "Platinum Palace",
    "Silver Springs Manor",
    "Crown Jewel Estate",
    "Imperial Heights Villa",
    "Regal Gardens Mansion",
    "Noble Bay Residence",
    "Majestic Peak Estate",
    "Grandeur Villa",
    "Luxury Heights Manor",
    "Prestige Gardens Estate",
    "Elite Bay Villa",
    "Supreme Peak Mansion"
  ];

  const estateDescriptions = [
    "Luxurious waterfront property with panoramic ocean views and private beach access.",
    "Elegant mountain retreat featuring stunning architecture and breathtaking vistas.",
    "Modern urban oasis with state-of-the-art amenities and city skyline views.",
    "Historic mansion restored to perfection with contemporary luxury finishes.",
    "Contemporary villa with infinity pool and tropical garden paradise.",
    "Exclusive penthouse with rooftop terrace and 360-degree city views.",
    "Seaside cottage with rustic charm and modern comfort amenities.",
    "Country estate with sprawling grounds and equestrian facilities.",
    "Urban loft with industrial design and artistic flair.",
    "Garden villa with Mediterranean architecture and private courtyards.",
    "Luxury condo with concierge service and premium amenities.",
    "Mountain cabin with cozy interiors and outdoor adventure access.",
    "Beachfront property with direct ocean access and sunset views.",
    "Historic townhouse with period details and modern conveniences.",
    "Contemporary mansion with smart home technology and security.",
    "Rural farmhouse with organic gardens and sustainable living features.",
    "Coastal retreat with private dock and water sports facilities.",
    "Hilltop villa with panoramic valley views and helicopter pad.",
    "Desert oasis with private pool and stargazing deck.",
    "Forest lodge with wildlife viewing and hiking trails."
  ];

  const randomName = estateNames[Math.floor(Math.random() * estateNames.length)];
  const randomDescription = estateDescriptions[Math.floor(Math.random() * estateDescriptions.length)];

  return (
    <>
      <motion.div 
        className="max-w-sm w-full group/card"
        whileHover={isQuoteFormOpen ? {} : { y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={cn(
            "cursor-pointer overflow-hidden relative card h-96 rounded-lg shadow-2xl max-w-sm mx-auto flex flex-col justify-between p-6",
            "bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-400/30"
          )}>
          
          {/* Animated Background Image */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, -10, 0],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src={estate.image}
              alt={randomName}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full justify-end pb-6">
            {/* Bottom Section - Estate Name, Description and Button */}
            <div className="space-y-4">
              <h2 className="font-bold text-xl md:text-2xl text-white mb-2">
                {randomName}
              </h2>
              
              <p className="font-normal text-sm text-white leading-relaxed">
                {randomDescription}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsQuoteFormOpen(true)}
                className="w-full bg-transparent hover:bg-yellow-500/10 text-yellow-400 hover:text-yellow-300 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform border-2 border-yellow-400 hover:border-yellow-300"
              >
                Get Quote
              </motion.button>
            </div>
          </div>

          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20"></div>
        </div>
      </motion.div>
      
      {/* Quote Form Popup - Moved outside the card container */}
      <QuoteForm 
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
        estateName={randomName}
      />
    </>
  );
}
