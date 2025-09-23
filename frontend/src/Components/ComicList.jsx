import { useEffect, useState } from "react";
import { getComics } from "../Services/ComicService";
import { Link } from "react-router-dom";

export default function ComicsList() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getComics();
      setComics(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Cómics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {comics.map((comic) => (
          <div
            key={comic.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={comic.portada}
              alt={comic.titulo}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{comic.titulo}</h2>
              <p className="text-sm text-gray-600">
                Escritor: {comic.escritor}
              </p>
              <p className="text-sm text-gray-600">
                Ilustrador: {comic.ilustrador}
              </p>
              <Link
                to={`/comic/${comic.id}`}
                className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
