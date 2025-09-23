import { Link } from "react-router-dom";

const ComicCard = ({ comic }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl w-64">
      <img
        src={comic.portada}
        alt={comic.titulo}
        className="h-72 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {comic.titulo}
        </h3>
        <p className="text-sm text-gray-600">✍️ {comic.escritor}</p>
        <p className="text-sm text-gray-600">🎨 {comic.ilustrador}</p>

        <div className="mt-3">
          <Link
            to={`/comic/${comic.id}`}
            className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-700 transition"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;
