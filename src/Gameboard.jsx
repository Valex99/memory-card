import Card from "./Card";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import fetchPokemonImg from "./fetchImagesAPI";
import pokemonNames from "./pokemons";

let isDataFetched = false;

export default function Gameboard({
  clickedCards,
  setClickedCards,
  highScore,
  setHighScore,
}) {
  // The underscore _ is a convention for an unused variable
  const generateCards = Array.from({ length: 12 }, (_, index) => ({
    id: uuidv4(),
    pic: "",
    title: "",
    index: index,
  }));

  // Keep cards array in a state
  // Key rule: TREAT STATE AS IMMUTABLE
  // Create a new array and pass to it all ids of the clicked cards
  const [cardsLayout, setCardsLayout] = useState(generateCards);
  const [cardData, setCardData] = useState([]);

  // The issue with checking if clickedCards.length is 12 here is asynchronous nature of React’s setState updates
  // When you update clickedCards using setClickedCards([...previousCards, id]), the update does not happen immediately
  // React schedules the update and re-renders the component later (You are checking the old value of clickedCards).

  // Function that adds the clicked card into array, checks for duplication and handles game logic
  const markCard = (id) => {
    if (!clickedCards.includes(id)) {
      setClickedCards((previousCards) => [...previousCards, id]);
    } else {
      if (clickedCards.length > highScore) {
        setHighScore(clickedCards.length);
      }
      alert("GAME OVER - same card clicked twice");
      setClickedCards([]);
    }
  };

  // Trick, add a small timeout - small delay to let UI update first
  useEffect(() => {
    if (clickedCards.length === 12) {
      setTimeout(() => {
        alert("YOU WON!");
        setHighScore(clickedCards.length);
        setClickedCards([]); // Reset the array for new game
      }, 0);
    }
  }, [clickedCards]); // Linter error if only clickedCards is dependency array
  // For that error to go away you need to include state setter function into array as well
  // That would look like: [clickedCards, setClickedCards, setHighScore]
  // If setClickedCards and setHighScore come from useState you should ignore the warning because React guarantees these state setter functions never change between renders
  // If they come from props or context, they should be included in the array

  // This code runs on the initial render of the page and each time clickedCards changes
  // On the initial render because clickedCards also changes - declaration
  useEffect(() => {
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

      // Capitalize the first letter of each Pokémon name in the results array
      const updatedResults = results.map((pokemon) => {
        return {
          ...pokemon,
          name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        };
      });

      // Update state setter function with the modified results
      // Set isDataFetched which renders the cards
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
    // First i had w-screen applied to container div (it overflows because it doesnt count for margin and padding)
    <div className="w-full flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-10">
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
