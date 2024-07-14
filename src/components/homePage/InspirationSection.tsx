import Image from "next/image";
import { useMemo } from "react";

const InspirationSection = () => {
  const destinationsWithColors = useMemo(() => {
    const lightColors = [
      "bg-red-400",
      "bg-yellow-700",
      "bg-green-500",
      "bg-blue-600",
      "bg-indigo-700",
      "bg-purple-800",
      "bg-pink-700",
      "bg-cyan-500",
      "bg-teal-600",
      "bg-orange-600",
      "bg-rose-800",
      "bg-fuchsia-700",
    ];

    const getRandomColor = () => {
      return lightColors[Math.floor(Math.random() * lightColors.length)];
    };
    const destinations = [
      { name: "Nashville", distance: "53 miles away", image: "/firstCard.png" },
      {
        name: "South Haven",
        distance: "168 miles away",
        image: "/secondCard.png",
      },
      { name: "Stanton", distance: "192 miles away", image: "/thirdCard.png" },
      {
        name: "New Buffalo",
        distance: "130 miles away",
        image: "/secondCard.png",
      },
    ];
    return destinations.map((destination) => ({
      ...destination,
      color: getRandomColor(),
    }));
  }, []);

  return (
    <section className="py-16 px-12">
      <h2 className="text-2xl font-bold mb-4">
        Inspiration for your next trip
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {destinationsWithColors.map((destination) => (
          <div
            key={destination.name}
            className="rounded-lg overflow-hidden h-80"
          >
            <Image
              width={400}
              height={200}
              src={destination.image}
              alt={destination.name}
            />
            <div
              className={`bg-black bg-opacity-50 text-white p-2 pb-40 h-80 ${destination.color}`}
            >
              <h3 className="text-lg">{destination.name}</h3>
              <p className="text-sm">{destination.distance}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InspirationSection;
