export default function Card({ pic, title, onClick }) {
  return (
    <div
      className="max-w-[280px] max-h-[350px] aspect-w-1 aspect-h-1 bg-white rounded-lg shadow-lg 
    overflow-hidden p-4 m-2 flex flex-col items-center 
    min-w-[240px]"
    >
      <img
        src={pic}
        alt={title}
        className="w-[265px] h-[265px] object-cover"
        onClick={onClick}
      />
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
    </div>
  );
}
