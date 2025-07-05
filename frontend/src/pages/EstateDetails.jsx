import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { EstateCard } from '../components/ui/EstateCard';

// Import all detail images
import detail1 from '../assets/detail1.jpg'
import detail2 from '../assets/detail2.jpg'
import detail3 from '../assets/detail3.jpg'
import detail4 from '../assets/detail4.jpg'
import detail5 from '../assets/detail5.jpg'
import detail6 from '../assets/detail6.jpg'
import detail7 from '../assets/detail7.jpg'
import detail8 from '../assets/detail8.jpg'
import detail9 from '../assets/detail9.jpg'
import detail10 from '../assets/detail10.jpg'
import detail11 from '../assets/detail11.jpg'
import detail12 from '../assets/detail12.jpg'
import detail13 from '../assets/detail13.jpg'
import detail14 from '../assets/detail14.jpg'
import detail15 from '../assets/detail15.jpg'
import detail16 from '../assets/detail16.jpg'
import detail17 from '../assets/detail17.jpg'
import detail18 from '../assets/detail18.jpg'
import detail19 from '../assets/detail19.jpg'
import detail20 from '../assets/detail20.jpg'

// Import all img images
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.jpg'
import img6 from '../assets/img6.jpg'
import img7 from '../assets/img7.jpg'
import img8 from '../assets/img8.jpg'
import img9 from '../assets/img9.jpg'
import img10 from '../assets/img10.jpg'
import img11 from '../assets/img11.jpg'
import img12 from '../assets/img12.jpg'
import img13 from '../assets/img13.jpg'
import img14 from '../assets/img14.jpg'
import img15 from '../assets/img15.jpg'
import img16 from '../assets/img16.jpg'
import img17 from '../assets/img17.jpg'
import img18 from '../assets/img18.jpg'
import img19 from '../assets/img19.jpg'
import img20 from '../assets/img20.jpg'

function EstateDetails() {
  const [estates, setEstates] = useState([]);
  const BACKEND_URL = "http://localhost:3000";

  useEffect(() => {
    // Create estate objects with detail images and img images
    const detailImages = [
      detail1, detail2, detail3, detail4, detail5,
      detail6, detail7, detail8, detail9, detail10,
      detail11, detail12, detail13, detail14, detail15,
      detail16, detail17, detail18, detail19, detail20
    ];

    const imgImages = [
      img1, img2, img3, img4, img5,
      img6, img7, img8, img9, img10,
      img11, img12, img13, img14, img15,
      img16, img17, img18, img19, img20
    ];

    // Combine both sets of images
    const allImages = [...detailImages, ...imgImages];

    const estateObjects = allImages.map((image, index) => ({
      id: index + 1,
      image: image,
      name: `Estate ${index + 1}`,
      description: `Luxury property ${index + 1}`
    }));

    setEstates(estateObjects);
    console.log('Estates created:', estateObjects);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header Section */}
      <div className="relative z-20 py-16 md:py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent uppercase mb-4">
            At The Heart Of Luxury
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Discover our exclusive collection of luxury estates and premium properties
          </p>
        </div>

        {/* Estate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {estates.map((estate) => (
            <EstateCard key={estate.id} estate={estate} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EstateDetails
