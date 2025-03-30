import Ace from "./images/ace.png";
import Card from "./Card";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Gameboard({ clickedCards, setClickedCards }) {
    //   The underscore _ is a convention for an unused variable
    const generateCards = Array.from({ length: 16 }, (_, index) => ({
      id: uuidv4(),
      pic: Ace,
      title: `Card ${index + 1}`, // Sets title as "Card 1", "Card 2", ..., "Card 16"
      // Add other properties (Title / Url source))
    }));

  // Keep cards array in a state
  const [cardsLayout, setCardsLayout] = useState(generateCards);


  // Key rule: TREAT STATE AS IMMUTABLE
  // Create a new array and pass to it all previous values and id of the clicked card
  // Add clicked card ID to clickedCards[]

  const markCard = (id) => {
    setClickedCards((previousCards) => [...previousCards, id]);
  };

  // On each change of clickedCards this code runs
  useEffect(() => {
    console.log(clickedCards);
    // setCardsLayout(shuffleCards(cardsLayout)); // This causes clickedCards to be underlined for some reason!
    setCardsLayout((prevCardsLayout) => shuffleCards(prevCardsLayout));
  }, [clickedCards]);

  // Fisher-Yates sorting algorithm
  function shuffleCards(array) {
    const shuffled = [...array]; // Create a copy to avoid mutating the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  return (
    // Outter div ensures the game board takes up the full width and height of viewport
    <div className="w-screen flex items-center justify-center">
      {/* <div className="grid grid-cols-5 grid-rows-3 gap-4 p-10"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-4 p-10">
        {/* Example card elements */}
        {/* Create a loop that runs 16 times and calls Card component */}

        {cardsLayout.map((card) => (
          <Card
            key={card.id}
            pic={Ace}
            title={card.title}
            // If you are passing arguments to function, this should be a function (infinite loop was created)
            onClick={() => markCard(card.id)}
          />
        ))}
      </div>
    </div>
  );
}
