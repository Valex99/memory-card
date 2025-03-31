import Ace from "./images/ace.png";
import Card from "./Card";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import fetchPokemonImg from "./fetchImagesAPI";
import pokemonNames from "./pokemons";

let isDataFetched = false;

export default function Gameboard({ clickedCards, setClickedCards }) {
  //   The underscore _ is a convention for an unused variable
  const generateCards = Array.from({ length: 12 }, (_, index) => ({
    id: uuidv4(),
    pic: Ace,
    title: `Card ${index + 1}`, // Sets title as "Card 1", "Card 2", ..., "Card 16"
    index: index,
    // Add other properties (Title / Url source))
  }));

  // Keep cards array in a state
  const [cardsLayout, setCardsLayout] = useState(generateCards);
  const [cardData, setCardData] = useState([]);

  // Key rule: TREAT STATE AS IMMUTABLE
  // Create a new array and pass to it all previous values and id of the clicked card
  // Add clicked card ID to clickedCards[]

  const markCard = (id) => {
    if (!clickedCards.includes(id)) {
      setClickedCards((previousCards) => [...previousCards, id]);
    } else {
      alert("GAME OVER - same card clicked twice");
      setClickedCards([]);
    }
  };

  // On each change of clickedCards this code runs
  useEffect(() => {
    console.log(clickedCards);
    // setCardsLayout(shuffleCards(cardsLayout)); // This causes clickedCards to be underlined for some reason!
    setCardsLayout((prevCardsLayout) => shuffleCards(prevCardsLayout));
  }, [clickedCards]);

  useEffect(() => {
    const fetchAllPokemonImages = async () => {
      // Map doesn't wait for the fetch function to return results -> use Promise.all or async/await.
      const fetchedPromises = pokemonNames.map(async (pokemon) => {
        // Call the function which already returns pokemon name and image url
        return fetchPokemonImg(pokemon);
      });

      // Wait for all fetched promises to complete
      const results = await Promise.all(fetchedPromises);

      console.log("All pokemon images fetched");
      console.log(results); // Should log the results, not fetchedPromises

      // Capitalize the first letter of each Pokémon name in the results array
      const updatedResults = results.map((pokemon) => {
        return {
          ...pokemon,
          name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        };
      });

      // Update state setter function with the modified results
      setCardData(updatedResults);
      isDataFetched = true;
    };

    fetchAllPokemonImages(); // Call the async function to initiate the asynchronous logic
  }, []); // Empty dependency array -> code only runs once on component mount

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

        {isDataFetched &&
          cardsLayout.map((card) => (
            <Card
              key={card.id}
              pic={cardData[card.index].img}
              title={cardData[card.index].name}
              // If you are passing arguments to function, this should be a function (infinite loop was created)
              onClick={() => markCard(card.id)}
            />
          ))}
      </div>
    </div>
  );
}
