
import { Link } from "react-router-dom";

const ComicCard = ({ comic }) => {
  return (
    <div className="bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl w-full">
      {/* Imagen: Sin cambios (altura bien, vertical) */}
      <div className="aspect-[3/4] w-full relative">
        <img
          src={comic.portada}
          alt={comic.titulo}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      {/* Contenido: Más compacto */}
      <div className="p-3"> 
        <h3 className="text-base font-semibold text-white truncate mb-1"> 
          {comic.titulo}
        </h3>
        <p className="text-xs text-gray-300 mb-1"> 
          ✍️ {comic.escritor}
        </p>
        <p className="text-xs text-gray-300"> 
          🎨 {comic.ilustrador}
        </p>

        <div className="mt-2"> 
          <Link
            to={`/comic/${comic.id}`}
            className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg" /* 👈 CAMBIO: text-xs y px-2 (botón más chico) */
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;