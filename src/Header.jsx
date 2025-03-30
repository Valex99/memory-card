export default function Header({ clickedCards }) {
  return (
    <div className="flex flex-col items-center py-4 gap-2">
      <h1 className="text-4xl font-bold">MEMORY CARD</h1>
      <h3 className="text-gray-600">
        Get points by clicking on a card but dont click on any more than oncde!
      </h3>
      <h2 className="text-2xl">{clickedCards.length} / 16</h2>
    </div>
  );
}
