import React from "react";
import Image from "next/image";

// Sample data for PS5 games with correct descriptions
const games = [
  {
    id: 1,
    title: "FIFA 21",
    description: "Show off your football skills in FIFA 21 showdown! Compete against your peers for ultimate bragging rights at the university.",
    image: "/assets/fifa.jpg", // Ensure the image path is correct
  },
  {
    id: 2,
    title: "WWE 2K18",
    description: "Step into the ring and face off in a 1v1 WWE 2K18 match. Take down your opponent and claim the title of the ultimate university champion!",
    image: "/assets/wwe.jpg", // Ensure the image path is correct
  },
  {
    id: 3,
    title: "TEKKEN 7",
    description: "Get ready for intense 1v1 battles in TEKKEN 7! Prove your fighting skills and outplay your opponent in this university tournament.",
    image: "/assets/tekken.jpg",
  },
  {
    id: 4,
    title: "GRAN TURISMO",
    description: "Race head-to-head in a 1v1 Gran Turismo challenge. Test your driving skills and see who reigns supreme on the virtual track!",
    image: "/assets/turismo.jpg",
  },
];

const PS5Games = () => {
  return (
    <div
      className="p-6 bg-gray-200 mt-10 bg-cover bg-center bg-no-repeat max-w-7xl"
    
    >
      {/* Interactive Heading */}
      <div className="text-center mb-4">
        <p className="text-4xl font-vt323 font-bold mb-4 animate-fadeInUp transition-transform duration-500 hover:scale-105">
          Ready to play?
        </p>
        <p className="text-2xl font-iceberg animate-fadeInUp transition-transform duration-500 hover:scale-105">
          It is 1v1 time on PS4 – face off and see who is the best!
        </p>
      </div>

      {/* Grid for PS5 games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-black-400"
            style={{
              boxShadow: "0 4px 20px rgba(0, 0, 255, 0.5)", // Reflection effect
            }}
          >
            {/* Image */}
            <Image
              src={game.image}
              alt={game.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            {/* Game Title and Description */}
            <div className="p-6">
              <h3 className="text-3xl font-bold font-sans text-gray-900 mb-2">
                {game.title}
              </h3>
              <p className="text-gray-700 text-justify font-mono">{game.description}</p>
              {/* Venue Information */}
              <p className="text-sm text-gray-600 mt-4 font-bold">
                Venue: Hardware and Networking Lab - AB IV
              </p>
            </div>
            {/* Animation effect border */}
            <div className="absolute inset-0 rounded-lg border-2 border-transparent hover:border-blue-400 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Animated content below the cards */}
      <div className="mt-10 text-center animate-slideInUp">
        <p className="text-xl font-iceberg text-blue-600">
          And many more exciting challenges await you!
        </p>
        <p className="text-md text-gray-700 mt-2">
          Join the competition, test your skills, and become the ultimate champion.
        </p>
      </div>
    </div>
  );
};

export default PS5Games;

