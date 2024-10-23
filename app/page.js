"use client";
import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PS5Games from "../components/PS5Games";

const Home = () => {
  return (
    <>
      <div className="main">
        <div className="gradient" />
        {/* <BackgroundBeams /> */}
        <div className="relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6 md:mt-30">
          <Navbar />
          <Hero />
        </div>
      </div>
    </>
  );
};
export default Home;
