"use client";
import Image from "next/image";
import logo from "../public/assets/logo.png";
import { TypewriterEffect } from "./ui/TypewriterEffect";
import CountdownTimer from "../components/Counter";
import useRegistrationModel from "../hooks/useRegistrationForm";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  const registerForm = useRegistrationModel();

  const words = [
    { text: "Code  " },
    { text: "Create  " },
    { text: "Collaborate " },
    { text: "BitByte!", className: "text-blue-500 dark:text-blue-500" },
  ];

  const handleGetStarted = () => {
    return registerForm.onOpen();
  };

  return (
    <div
      className="mb-0 w-screen flex flex-col items-center z-10 bg-no-repeat bg-cover bg-center lg:bg-top md:bg-center sm:bg-bottom pt-20 pb-10 shadow-downward"
      style={{
        backgroundImage: 'url(/assets/bgx.png )',
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Hero content */}
      <div className="flex justify-center mb-4 md:mb-6 lg:mb-8">
        <Image
          src={logo}
          width={100}
          height={100}
          alt="IUST logo"
          className="max-w-full h-auto"
        />
      </div>

      <p className="font-iceberg text-center md:text-s text-white text-xl text-center sm:text-s">
        Departmenttt of Computer Science & Engineering
      </p>

      <p className="text-blue-400 dark:text-gray-1500 text-xl font-semibold my-2 mx-auto mb-0 leading-relaxed">
        Presents
      </p>

      <TypewriterEffect words={words} />

      <div className="flex flex-col space-around items-center mt-3 w-full">
        <CountdownTimer />
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 mt-10 pointer-events-auto w-full justify-evenly">
        <button
          onClick={handleGetStarted}
          className="cursor-pointer inline-flex justify-center items-center py-3 px-5 sm:py-4 sm:px-6 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:shadow-md hover:shadow-blue-900 hover:bg-blue-700 dark:focus:ring-blue-800 z-20 sm:w-auto w-[90%] mx-auto"
        >
          Register Now
          <span>
            <FaArrowRight className="ml-2" size={20} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
