"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PS5Games from "../components/PS5Games";  // Import PS5Games component
import Events from "../components/Events";
import { FaServer, FaDatabase, FaLaptopCode, FaMobileAlt, FaCloud, FaCode } from "react-icons/fa";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <div className="main">
        <div className="gradient" />
        <div className="relative z-10 flex justify-center items-center flex-col max-w-full mx-auto sm:px-16 px-6 md:mt-30">
          <Navbar />
          <Hero />
          <Events  />
          <PS5Games />
        </div>
      </div>

      

      {/* Website Link in Monospace Font */}
      <div className="mt-10 mb-4 text-center">
      <p className="font-mono text-lg text-gray-700 dark:text-gray-600">
         www.bitbyte.iust.ac.in
      </p>
      </div>

      {/* Simple animated tech icons above the footer */}
      <div className="w-50 bg-gray-900 py-8 flex justify-center items-center overflow-hidden">
        <div className="flex space-x-10 animate-slide">
          <FaServer className="text-5xl text-blue-400 hover:text-blue-300 transition-all duration-300" />
          <FaDatabase className="text-5xl text-green-400 hover:text-green-300 transition-all duration-300" />
          <FaLaptopCode className="text-5xl text-red-400 hover:text-red-300 transition-all duration-300" />
          <FaMobileAlt className="text-5xl text-yellow-400 hover:text-yellow-300 transition-all duration-300" />
          <FaCloud className="text-5xl text-purple-400 hover:text-purple-300 transition-all duration-300" />
          <FaCode className="text-5xl text-pink-400 hover:text-pink-300 transition-all duration-300" />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-gray-300 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6 space-y-4 sm:space-y-0">
          {/* Left side: Copyright info */}
          <p className="text-sm">&copy; {new Date().getFullYear()} BIT-BYTE.  All Rights Reserved.</p>

          {/* Center: Social Media Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/bitbyte24"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/bitbyte"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <FaLinkedin className="text-2xl" />
            </a>
          </div>

          {/* Right side: Developed by */}
          <p className="text-sm">Developed by Reyan Shafi and Mujeeb Nazir</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
