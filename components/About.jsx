import React, { useCallback } from "react";
import Model from "./Model";
import useAboutModel from "../hooks/useAboutModel";
import eventInfo from "../constants";
import Image from "next/image";

const About = () => {
  const { isOpen, onClose } = useAboutModel();

  // Memoized function to prevent re-creation on each render
  const handleOnChange = useCallback(
    (open) => {
      if (!open) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <Model
      title=""
      description=""
      onChange={handleOnChange}
      isOpen={isOpen}
      type="about"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-blue-400 mb-4">
            Welcome to the BitByte Event 🎉
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Explore the most exciting and engaging activities curated just for
            you!
          </p>
        </header>

        {/* Activities Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Activities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventInfo.map((event, index) => (
              <div
                key={index} // Unique key for each event
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <Image
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={event.coverImage}
                  alt={event.name}
                  width={400}
                  height={200}
                  loading="lazy"
                />
                <div className="p-6">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {event.name}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {event.discription}
                  </p>
                  <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                    {`Team size: ${event.teamSize}`}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
                  >
                    Register
                    <svg
                      className="rtl:rotate-180 w-4 h-4 ms-2"
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
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Organized By Section */}
        <section className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Organized by Team CSE 🏅
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Join us for an unforgettable learning experience.
          </p>
        </section>
      </div>
    </Model>
  );
};

export default About;
