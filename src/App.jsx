import Header from "./Header";
import Gameboard from "./Gameboard";
import { useState } from "react";

// Lift the state up for both child components to access it

export default function App() {
  const [clickedCards, setClickedCards] = useState([]);
  const [highScore, setHighScore] = useState(0);

  return (
    <div className="min-w-[320px]">
      <Header
        clickedCards={clickedCards}
        setClickedCards={setClickedCards}
        highScore={highScore}
      />

      <Gameboard
        clickedCards={clickedCards}
        setClickedCards={setClickedCards}
        highScore={highScore}
        setHighScore={setHighScore}
      />
    </div>
  );
}
