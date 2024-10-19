"use client";
import Image from "next/image";
import logo from "/assets/logo.webp";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import CountdownTimer from "../components/Counter";
import useAboutModel from "../hooks/useAboutModel";

const Hero = () => {
  const aboutModel = useAboutModel();
  const onClick = () => {
    return aboutModel.onOpen();
    //handle click
  };

  const words = [
    { text: "Code." },
    { text: "Create." },
    { text: "Connect." },
    { text: "Conquer." },
    { text: "BitByte!", className: "text-blue-500 dark:text-blue-500" },
  ];

  const handleGetStarted = () => {
    console.log("Get started clicked");
  };

  return (
    <div className="relative flex flex-col items-center pt-1 z-10">
      <Image src={logo} width={300} height={200} alt="IUST logo" />
      <p className="text-neutral-600 text-md text-semibold my-3 mx-auto leading-relaxed">
        Presents
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col space-around items-center mt-3 w-full">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto leading-relaxed">
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
          className="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-500 hover:shadow-md hover:shadow-blue-900 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 z-20"
        >
          Register Now
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
        <button
          onClick={onClick}
          className="cursor-pointer inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center hover:shadow-md hover:shadow-gray-900 text-black rounded-lg border border-black hover:bg-gray-100 focus:ring-4 focus:ring-gray-400 z-20"
        >
          About BitByte
        </button>
      </div>
    </div>
  );
};

export default Hero;
