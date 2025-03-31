export default function Header({ clickedCards, highScore }) {
  return (
    <div className="flex flex-col items-center pt-4 gap-2 px-20 text-center">
      <h1 className="text-4xl font-bold">MEMORY CARD</h1>
      <h3 className="text-gray-600">
        Get points by clicking on a card but dont click on any more than once!
      </h3>
      <h3 className="">Highscore: {highScore}</h3>
      <h2 className="text-2xl">{clickedCards.length} / 12</h2>
    </div>
  );
}
