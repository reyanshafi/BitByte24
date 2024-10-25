import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import useRegistrationModel from "../hooks/useRegistrationForm"; // Import the registration modal hook

const events = [
  {
    title: "Coding Competition",
    description:
      "This solo event challenges participants to solve coding problems within a set time limit. Bring your programming expertise and see if you can rise to the top!",
    date: "October 29, 2024",
    image: "/assets/coding.jpg",
  },
  {
    title: "Build 1.0",
    description:
      "Participants will receive IoT kits containing sensors and equipment, and will be tasked with building a solution based on the given problem statement. Let your innovation shine in this hardware-based event!",
    date: "October 30, 2024",
    image: "/assets/iot.jpg",
  },
  {
    title: "Gaming (BGMI -Valorant)",
    description:
      "Form your squad and compete in two action-packed games: Valorant and PUBG. Prepare for a thrilling competition of strategy, skill, and teamwork.",
    date: "October 31, 2024",
    image: "/assets/web.webp",
  },
  {
    title: "Typing Competition",
    description:
      "A two-level solo event where participants are evaluated on their typing speed and accuracy. Speed up those fingers and aim for the top spot!",
    date: "October 31, 2024",
    image: "/assets/typing.avif",
  },
  {
    title: "Web Designing",
    description:
      "Participants in duo, will have to design and develop a website based on a given problem statement. Showcase your creativity and web development skills.",
    date: "October 31, 2024",
    image: "/assets/keyboard.avif",
  },
  {
    title: "Keyboard Jumble",
    description:
      "A duo challenge where each team is given 1 minute to arrange scrambled keys on a keyboard. The event features two levels, testing participant's speed, accuracy, and teamwork under pressure.",
    date: "October 31, 2024",
    image: "/assets/keyboard.avif",
  },
  {
    title: "Find the Keyword",
    description:
      "A solo game where participants guess keywords based on provided hints. This fun and fast-paced game will challenge your problem-solving and critical thinking skills.",
    date: "October 31, 2024",
    image: "/assets/keyboard.avif",
  },
  {
    title: "Debate",
    description:
      "Teams of two will battle it out in this classic debate format with the opponent team, arguing either in favor or against a topic. Bring your best arguments and persuasive skills to the table!",
    date: "October 31, 2024",
    image: "/assets/keyboard.avif",
  },
  {
    title: "Quiz-Buzzer Round",
    description:
      "A fast-paced duo quiz competition where teams race to press the buzzer and answer questions correctly. Test your knowledge and quick thinking in this exciting quiz show format.",
    date: "October 31, 2024",
    image: "/assets/keyboard.avif",
  },
];

const SlidingCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Import the registration modal trigger hook
  const registerForm = useRegistrationModel();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const handleRegisterClick = () => {
    registerForm.onOpen(); // Trigger the same registration modal
  };

  return (
    <div className="relative w-full  text-justify overflow-hidden mt-10 pt-10 pb-10">
      <h1 className="text-5xl font-iceberg font-bold text-center mb-14">TECH EVENTS</h1>

      <div className="relative flex justify-center items-center">
        {/* Left arrow */}
        <FaArrowLeft
          onClick={prevSlide}
          className="absolute left-4 z-10 text-3xl cursor-pointer text-gray-700 hover:text-gray-900"
        />

        {/* Cards container */}
        <div className="w-full max-w-4xl flex justify-center items-center">
          {/* Previous card (partially visible, blurred, and slightly behind the main card) */}
          <motion.div
            key={currentIndex === 0 ? events.length - 1 : currentIndex - 1}
            className="relative w-1/3 opacity-70 scale-90 hidden md:block -translate-x-10 z-0 filter blur-sm"
            initial={{ x: -100, opacity: 0, scale: 0.85 }}
            animate={{ x: 0, opacity: 1, scale: 0.9 }}
            exit={{ x: -100, opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Image
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
              width={400}
              height={300}
              className="w-full h-48 object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Main card (larger) */}
          <motion.div
            key={currentIndex}
            className="relative w-2/3 md:w-2/3 p-6 bg-white shadow-2xl rounded-lg z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={{
              scale: 1.15,
              boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Image
              src={events[currentIndex].image}
              alt={events[currentIndex].title}
              width={400}
              height={400}
              className="w-full h-64 object-cover rounded-lg mb-4 shadow-lg"
            />
            <h2 className="text-2xl font-semibold">
              {events[currentIndex].title}
            </h2>
            <p className="text-gray-600 mt-2">
              {events[currentIndex].description}
            </p>
            <p className="text-blue-500 font-semibold mt-4">
              {events[currentIndex].date}
            </p>

            {/* Register Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleRegisterClick}
                className="cursor-pointer inline-flex justify-center items-center py-3 px-5 sm:py-4 sm:px-6 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:shadow-md hover:shadow-blue-900 hover:bg-blue-700 dark:focus:ring-blue-800 z-20"
              >
                Register Now
              </button>
            </div>
          </motion.div>

          {/* Next card (partially visible, blurred, and slightly behind the main card) */}
          <motion.div
            key={(currentIndex + 1) % events.length}
            className="relative w-1/3 opacity-70 scale-90 hidden md:block translate-x-10 z-0 filter blur-sm"
            initial={{ x: 100, opacity: 0, scale: 0.85 }}
            animate={{ x: 0, opacity: 1, scale: 0.9 }}
            exit={{ x: 100, opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Image
              src={events[(currentIndex + 1) % events.length].image}
              alt={events[(currentIndex + 1) % events.length].title}
              width={400}
              height={300}
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
