import Ace from "./images/ace.png";
import Card from "./Card";

export default function Gameboard() {
  return (
    // Outter div ensures the game board takes up the full width and height of viewport
    <div className="w-screen flex items-center justify-center">
      {/* <div className="grid grid-cols-5 grid-rows-3 gap-4 p-10"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-4 p-10">
      {/* Example card elements */}
        <Card pic={Ace} title="lol"/>
        <Card pic={Ace} title="lol"/>
        <Card pic={Ace} title="lol"/>
        <Card pic={Ace} title="lol"/>
        <Card pic={Ace} title="lol"/>

        <Card pic={Ace} title="lol"/>
        <Card pic={Ace} title="lol"/>
        <Card pic={Ace} title="lol"/>
        <Card pic={Ace} title="lol"/>
        <Card pic={Ace} title="lol"/>
      </div>
    </div>
  );
}
