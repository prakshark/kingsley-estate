"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

// Import all images
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'
import img4 from '../../assets/img4.jpg'
import img5 from '../../assets/img5.jpg'
import img6 from '../../assets/img6.jpg'
import img7 from '../../assets/img7.jpg'
import img8 from '../../assets/img8.jpg'
import img9 from '../../assets/img9.jpg'
import img10 from '../../assets/img10.jpg'
import img11 from '../../assets/img11.jpg'
import img12 from '../../assets/img12.jpg'
import img13 from '../../assets/img13.jpg'
import img14 from '../../assets/img14.jpg'
import img15 from '../../assets/img15.jpg'
import img16 from '../../assets/img16.jpg'
import img17 from '../../assets/img17.jpg'
import img18 from '../../assets/img18.jpg'
import img19 from '../../assets/img19.jpg'
import img20 from '../../assets/img20.jpg'

export const Hero = () => {
  const navigate = useNavigate();
  const products = [
    {
      title: "Luxury Villa",
      link: "#",
      thumbnail: img1,
    },
    {
      title: "Modern Apartment",
      link: "#",
      thumbnail: img2,
    },
    {
      title: "Beachfront Property",
      link: "#",
      thumbnail: img3,
    },
    {
      title: "Mountain Retreat",
      link: "#",
      thumbnail: img4,
    },
    {
      title: "City Penthouse",
      link: "#",
      thumbnail: img5,
    },
    {
      title: "Country Estate",
      link: "#",
      thumbnail: img6,
    },
    {
      title: "Garden Villa",
      link: "#",
      thumbnail: img7,
    },
    {
      title: "Waterfront Home",
      link: "#",
      thumbnail: img8,
    },
    {
      title: "Historic Mansion",
      link: "#",
      thumbnail: img9,
    },
    {
      title: "Contemporary House",
      link: "#",
      thumbnail: img10,
    },
    {
      title: "Luxury Condo",
      link: "#",
      thumbnail: img11,
    },
    {
      title: "Rural Farmhouse",
      link: "#",
      thumbnail: img12,
    },
    {
      title: "Urban Loft",
      link: "#",
      thumbnail: img13,
    },
    {
      title: "Seaside Cottage",
      link: "#",
      thumbnail: img14,
    },
    {
      title: "Mountain Cabin",
      link: "#",
      thumbnail: img15,
    },
    {
      title: "Condominimum",
      link: "#",
      thumbnail: img16,
    },
    {
      title: "Premium Apartments",
      link: "#",
      thumbnail: img17,
    },
    {
      title: "Mansions",
      link: "#",
      thumbnail: img18,
    },
    {
      title: "Beautiful Decor",
      link: "#",
      thumbnail: img19,
    },
    {
      title: "Sea Side View",
      link: "#",
      thumbnail: img20,
    },
  ];

  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const fourthRow = products.slice(15, 20);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 150, damping: 20, bounce: 0 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 800]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -800]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [10, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.3, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [10, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-500, 300]), springConfig);

  return (
    <div
      ref={ref}
      className="h-[300vh] py-4 my-0 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="">
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 md:space-x-20 mb-8 md:mb-10">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-8 md:mb-10 space-x-8 md:space-x-20">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 md:space-x-20 mb-8 md:mb-10">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row space-x-8 md:space-x-20">
          {fourthRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  
  const handleExploreClick = async () => {
    try {
      // Check if user is logged in by making a request to the backend
      const response = await axios.get(`${BACKEND_URL}/api/auth/profile`, {
        withCredentials: true
      });
      
      if (response.status === 200) {
        navigate('/estateDetails/');
      }
    } catch (error) {
      // If we get a 401, user is not authenticated
      navigate('/login');
    }
  };
  
  return (
    <div className="max-w-7xl relative mx-auto py-16 md:py-32 px-4 w-full left-0 top-0">
      {/* Kingsley Estates Branding */}
      <div className="text-left mb-12">
        <h1 className="text-4xl md:text-8xl font-extrabold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4 tracking-wider">
          KINGSLEY ESTATES.
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-0 mb-6 rounded-full"></div>
        <p className="text-yellow-300 text-lg md:text-xl font-medium uppercase tracking-widest">
          Premium Real Estate Solutions.
        </p>
      </div>
      
      <p className="max-w-3xl text-lg md:text-2xl mt-8 text-gray-300 text-left leading-relaxed">
        Discover exclusive properties in the most desirable locations. <br /><br />
      </p>

      <motion.button
        onClick={handleExploreClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 mt-8 bg-transparent hover:bg-yellow-500/10 text-yellow-400 hover:text-yellow-300 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform border-2 border-yellow-400 hover:border-yellow-300 inline-block cursor-pointer"
      >
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
      </motion.button>
      <br /><br /><br />

      <p className="max-w-3xl text-lg md:text-2xl mt-8 text-gray-300 text-left leading-relaxed">
        <span className="text-yellow-500">Or scroll down to have a glimpse of what we offer.</span>
      </p>

    </div>
  );
};

const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-64 md:h-96 w-[20rem] md:w-[30rem] relative shrink-0">
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title} />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"></div>
      <h2 className="absolute bottom-4 md:bottom-6 left-4 md:left-6 opacity-0 group-hover/product:opacity-100 text-white text-lg md:text-2xl font-bold">
        {product.title}
      </h2>
      <div className="absolute top-4 right-4 opacity-0 group-hover/product:opacity-100">
        <div className="w-2 md:w-3 h-2 md:h-3 bg-yellow-400 rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default Hero;
