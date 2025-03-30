import Header from "./Header";
import Gameboard from "./Gameboard";

// Lift the state up for both child components to access it

export default function App() {
  return (
    <div>
      <Header />
      <Gameboard />
    </div>
  );
}
