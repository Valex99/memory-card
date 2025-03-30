import Ace from "./images/ace.png";
import Card from "./Card";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Gameboard() {
  const [clickedCards, setClickedCards] = useState([]);

  const cards = Array.from({ length: 16 }, () => ({
    id: uuidv4(),
    pic: Ace,
    title: "Card Title",
    // Add other properties (Title / Url source))
  }));

  // Key rule: TREAT STATE AS IMMUTABLE
  // Create a new array and pass to it all previous values and id of the clicked card
  // Add clicked card ID to clickedCards[]
  const markCard = (id) => {
    setClickedCards((previousCards) => [...previousCards, id]);

    console.log(clickedCards);
  };

  return (
    // Outter div ensures the game board takes up the full width and height of viewport
    <div className="w-screen flex items-center justify-center">
      {/* <div className="grid grid-cols-5 grid-rows-3 gap-4 p-10"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-4 p-10">
        {/* Example card elements */}
        {/* Create a loop that runs 16 times and calls Card component */}

        {cards.map((card) => (
          <Card
            key={card.id}
            pic={Ace}
            title="aaa"
            // If you are passing arguments to function, this should be a function (infinite loop was created)
            onClick={() => markCard(card.id)}
          />
        ))}
      </div>
    </div>
  );
}
