import React, { useCallback } from "react";
import Model from "./Model";
import useAboutModel from "../hooks/useAboutModel";
import { eventInfo } from "../constants";
import Image from "next/image";

const About = () => {
  const { isOpen, onClose } = useAboutModel();

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-blue-700 mb-4">
            Welcome to the BitByte Event 🎉
          </h1>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-700">
            Explore the most exciting and engaging activities curated just for
            you!
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Activities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventInfo?.map((event, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
              >
                <Image
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={event.coverImage}
                  alt={event.name}
                  width={400}
                  height={200}
                  loading="lazy"
                />
                <div className="p-6 text-center">
                  <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {event.name}
                  </h5>
                  <p className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-400 border rounded-md inline-block px-4 py-2 shadow-sm">
                    {`Team Size: ${event.teamSize}`}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400 mb-6">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New Section: Who Can Participate */}
        <section className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-black mb-4">
            Who can participate in this event?
          </h2>
          <p className="text-lg md:text-xl font-medium text-gray-900 dark:text-gray-900">
            This event is open to all students of IUST.
          </p>
          <p className="text-black-600 dark:text-blue-500 mt-4">
            Whether you&apos;re a beginner or an expert, come join us for an
            exciting and enriching learning experience!
          </p>
        </section>

        <section className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-blue-800">
            Organized by Team CSE 🏅
          </h2>
        </section>
      </div>
    </Model>
  );
};

export default About;
