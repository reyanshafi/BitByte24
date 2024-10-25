import React from "react";

// Sample data for PS4 games
const games = [
  {
    id: 1,
    title: "FIFA 21",
    description: "Showcase your football skills in FIFA 21! Build your dream team and compete in thrilling matches to outscore your opponent",
    image: "/assets/fifa.jpg",
  },
  {
    id: 2,
    title: "WWE 2K18",
    description: "Step into the ring with WWE 2K18! Choose your favorite wrestling superstar and take down your opponents in an intense 1v1 battle. Bring your best moves and claim the championship title!.",
    image: "/assets/wwe.jpg",
  },
  {
    id: 3,
    title: "TEKKEN 7",
    description: "Get ready for explosive 1v1 combat in Tekken 7! Master your favorite fighter's moves and engage in epic battles. Prove your dominance in the arena and be crowned the Tekken champion!",
    image: "/assets/tekken.jpg",
  },
  {
    id: 4,
    title: "Gran Turismo",
    description: "Experience the thrill of high-speed racing with Gran Turismo! Compete on iconic tracks and test your driving skills in a head-to-head challenge. Are you ready to claim the top spot on the podium?",
    image: "/assets/turismo.jpg",
  },
  {
    id: 5,
    title: "Virtual Reality",
    description: "Step into the immersive world of Virtual Reality! Compete in thrilling VR games that challenge your reflexes, strategy, and skill. Get ready to dive into a whole new dimension of gaming!",
    image: "/assets/vr.webp",
  },
];

const PS5GamesDiagonal = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 mt-10">
      {/* Headline */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold font-iceberg text-blue-900 mb-4">
          Get in the Game: PS4 Challenges for Everyone!
        </h1>
        <p className="text-md md:text-xl text-gray-700">
          No waiting, no prep—just on-the-spot gaming fun. Jump in and take on your rivals!
        </p>
      </div>

      {/* Container for cards */}
      <div className="flex flex-col space-y-8 w-full max-w-4xl">
        {games.map((game) => (
          <div
            key={game.id}
            className="relative w-full h-80 md:h-96 lg:h-80 overflow-hidden shadow-xl rounded-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
          >
            {/* Image */}
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover rounded-lg"
            />
            {/* Overlay with description, hidden until hover */}
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white opacity-0 hover:opacity-100 transition-opacity duration-500">
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-sm text-center px-4">{game.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PS5GamesDiagonal;
