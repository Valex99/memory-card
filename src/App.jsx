import Header from "./Header";
import Gameboard from "./Gameboard";
import { useState } from "react";

// Lift the state up for both child components to access it

export default function App() {
  const [clickedCards, setClickedCards] = useState([]);

  return (
    <div className="min-w-[320px]">
      <Header clickedCards={clickedCards} />
      <Gameboard
        clickedCards={clickedCards}
        setClickedCards={setClickedCards}
      />
    </div>
  );
}
