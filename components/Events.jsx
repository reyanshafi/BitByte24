import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const events = [
  {
    title: "Code Competition",
    description: "A coding challenge where participants solve algorithms.",
    date: "October 29, 2024",
    image: "/assets/coding.jpeg",
  },
  {
    title: "Tech Talk",
    description: "Industry leaders share their experiences in technology.",
    date: "October 30, 2024",
    image: "/assets/iot.jpg",
  },
  {
    title: "Hackathon",
    description: "A day-long hackathon to build innovative solutions.",
    date: "October 31, 2024",
    image: "/assets/web.webp",
  },
  {
    title: "Typing Competition",
    description: "Test your typing speed with accuracy challenges.",
    date: "October 31, 2024",
    image: "/assets/typing.avif",
  },
  {
    title: "Keyboard Jumble",
    description: "Challenge your friends in this fun team event.",
    date: "October 31, 2024",
    image: "/assets/keyboard.avif",
  },
];

const SlidingCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-full overflow-hidden pt-10 pb-10">
      <h1 className="text-3xl font-iceberg font-bold text-center mb-8">Tech Events</h1>

      <div className="relative flex justify-center items-center">
        {/* Left arrow */}
        <FaArrowLeft
          onClick={prevSlide}
          className="absolute left-4 z-10 text-3xl cursor-pointer text-gray-700 hover:text-gray-900"
        />

        {/* Cards container */}
        <div className="w-full max-w-4xl flex justify-center items-center">
          {/* Previous card (partially visible and slightly behind the main card) */}
          <motion.div
            key={currentIndex === 0 ? events.length - 1 : currentIndex - 1}
            className="relative w-1/3 opacity-70 scale-90 hidden md:block -translate-x-10 z-0"
            initial={{ x: -100, opacity: 0, scale: 0.85 }}
            animate={{ x: 0, opacity: 1, scale: 0.9 }}
            exit={{ x: -100, opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <img
              src={
                events[
                  currentIndex === 0 ? events.length - 1 : currentIndex - 1
                ].image
              }
              alt={
                events[
                  currentIndex === 0 ? events.length - 1 : currentIndex - 1
                ].title
              }
              className="w-full h-48 object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Main card */}
          <motion.div
            key={currentIndex}
            className="relative w-2/3 md:w-1/2 p-6 bg-white shadow-xl rounded-lg z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)" }}
          >
            <img
              src={events[currentIndex].image}
              alt={events[currentIndex].title}
              className="w-full h-64 object-cover rounded-lg mb-4 shadow-lg"
            />
            <h2 className="text-2xl font-semibold">{events[currentIndex].title}</h2>
            <p className="text-gray-600 mt-2">{events[currentIndex].description}</p>
            <p className="text-blue-500 font-semibold mt-4">{events[currentIndex].date}</p>
          </motion.div>

          {/* Next card (partially visible and slightly behind the main card) */}
          <motion.div
            key={(currentIndex + 1) % events.length}
            className="relative w-1/3 opacity-70 scale-90 hidden md:block translate-x-10 z-0"
            initial={{ x: 100, opacity: 0, scale: 0.85 }}
            animate={{ x: 0, opacity: 1, scale: 0.9 }}
            exit={{ x: 100, opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <img
              src={events[(currentIndex + 1) % events.length].image}
              alt={events[(currentIndex + 1) % events.length].title}
              className="w-full h-48 object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>

        {/* Right arrow */}
        <FaArrowRight
          onClick={nextSlide}
          className="absolute right-4 z-10 text-3xl cursor-pointer text-gray-700 hover:text-gray-900"
        />
      </div>
    </div>
  );
};

export default SlidingCards;
