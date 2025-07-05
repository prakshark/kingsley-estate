"use client";

import React, { useRef } from "react";
import { cn } from "../../utils/cn";
import { motion, useScroll, useTransform, useSpring } from "framer-motion"; // ✅ Correct import

// Main HeroParallax component
export const HeroParallax = ({ products = [] }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const fourthRow = products.slice(15,20);

  const ref = useRef(null);

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
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 md:space-x-20 mb-12 md:mb-20">
          {firstRow.map((product, index) => (
            <ProductCard product={product} translate={translateX} key={index} />
          ))}
        </motion.div>

        <motion.div className="flex flex-row space-x-8 md:space-x-20 mb-12 md:mb-20">
          {secondRow.map((product, index) => (
            <ProductCard product={product} translate={translateXReverse} key={index} />
          ))}
        </motion.div>

        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 md:space-x-20">
          {thirdRow.map((product, index) => (
            <ProductCard product={product} translate={translateX} key={index} />
          ))}
        </motion.div>

        <motion.div className="flex flex-row space-x-8 md:space-x-20 mb-12 md:mb-20">
          {fourthRow.map((product, index) => (
            <ProductCard product={product} translate={translateXReverse} key={index} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// Header section
export const Header = () => {
  return (
    <div className="max-w-7xl mx-auto py-20 md:py-40 px-4 w-full">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        The Ultimate <br /> Development Studio
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers who love building amazing products.
      </p>
    </div>
  );
};

// Product Card
export const ProductCard = ({ product, translate }) => {
  if (!product || typeof product !== "object") return null;

  const { title, thumbnail, link } = product;

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{ y: -20 }}
      className="group/product h-64 md:h-96 w-[20rem] md:w-[30rem] relative shrink-0"
    >
      <a href={link || "#"} className="block group-hover/product:shadow-2xl">
        <img
          src={thumbnail || "https://via.placeholder.com/600"}
          alt={title || "Product"}
          className="object-cover object-left-top absolute h-full w-full inset-0"
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-lg md:text-xl">
        {title || "Untitled"}
      </h2>
    </motion.div>
  );
};
