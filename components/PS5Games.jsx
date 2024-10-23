import React from "react";

// Sample data for PS5 games
const games = [
  {
    id: 1,
    title: "Spider-Man: Miles Morales",
    description: "Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.",
    image: "/path-to-image/spiderman.jpg",
  },
  {
    id: 2,
    title: "Demon's Souls",
    description: "Rebuilt from the ground up, this remake invites you to experience the unsettling story and ruthless combat of Demon’s Souls.",
    image: "/path-to-image/demonsouls.jpg",
  },
  {
    id: 3,
    title: "Ratchet & Clank: Rift Apart",
    description: "Blast your way through an interdimensional adventure with Ratchet and Clank as they take on an evil emperor from another reality.",
    image: "/path-to-image/ratchetandclank.jpg",
  },
  // Add more games as needed
];

const PS5Games = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">PS5 Games</h2>

      <div className="space-y-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row"
          >
            {/* Image Section */}
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-64 object-cover md:w-1/3"
            />

            {/* Content Section */}
            <div className="p-6 flex flex-col justify-between">
              <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
              <p className="text-gray-700 mb-4">{game.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PS5Games;
