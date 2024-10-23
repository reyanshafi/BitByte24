"use client";
import Image from "next/image";
import logo from "../public/assets/logo.png";
import { TypewriterEffect } from "./ui/TypewriterEffect";
import CountdownTimer from "../components/Counter";
import useAboutModel from "../hooks/useAboutModel";
import useRegistrationModel from "../hooks/useRegistrationForm";
import { MdEmojiEvents } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import Games from "../components/Games";



const Hero = () => {
  const aboutModel = useAboutModel();
  const registerForm = useRegistrationModel();

  const onClick = () => {
    return aboutModel.onOpen();
  };

  const words = [
    { text: "Code." },
    { text: "Create." },
    { text: "Collaborate." },
    { text: "BitByte!", className: "text-blue-500 dark:text-blue-500 " },
  ];

  const handleGetStarted = () => {
    return registerForm.onOpen();
  };

  return (
    <div className="relative flex flex-col items-center p-2 z-10 md:mt-50">
      {/* Logo container with responsive margin */}
      <div className="flex justify-center mb-4 md:mb-6 lg:mb-8">
        <Image
          src={logo}
          width={100}
          height={100}
          alt="IUST logo"
          className="max-w-full h-auto"
        />
      </div>

      <p className="text-gray-800 dark:text-gray-1500 text-md font-semibold my-2 mx-auto leading-relaxed">
        Presents
      </p>

      <TypewriterEffect words={words} />

      <div className="flex flex-col space-around items-center mt-3 w-full">
        <p className="text-gray-800 dark:text-black text-xs sm:text-base text-center sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto leading-relaxed">
          &quot;BitByte&quot; is a dynamic university event celebrating the
          world of computer science! Dive into a blend of tech talks, coding
          challenges, and hands-on workshops. Whether you&apos;re a coding
          enthusiast, tech innovator, or just curious about the digital world,
          BitByte is your gateway to explore, innovate, and connect with
          like-minded techies.
        </p>
        <CountdownTimer />
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 mt-5 pointer-events-auto">
        <button
          onClick={handleGetStarted}
          className="cursor-pointer inline-flex justify-center items-center py-3 px-5 sm:py-4 sm:px-6 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:shadow-md hover:shadow-blue-900 hover:bg-blue-700 dark:focus:ring-blue-800 z-20"
        >
          Register Now
          <span>
            <FaArrowRight className="ml-2" size={20} />
          </span>
        </button>
        <button
          onClick={onClick}
          className="cursor-pointer inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center hover:shadow-md hover:shadow-gray-900 text-black rounded-lg border border-black hover:bg-gray-100 z-20"
        >
          About BitByte
          <span>
            <MdEmojiEvents className="ml-2" size={20} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
