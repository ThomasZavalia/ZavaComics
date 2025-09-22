/*export default function ComicDetail() {
  return <h1>Comic Detail Page (Lucas)</h1>;
}*/

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComicById } from "../services/comicService";

export default function ComicDetail() {
  const { id } = useParams();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const data = await getComicById(id);
        setComic(data);
      } catch (err) {
        console.error("Error al traer el cómic", err);
      }
    };
    fetchComic();
  }, [id]);

  if (!comic) return <p>Cargando cómic...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={comic.portadaUrl}
        alt={comic.titulo}
        className="w-full h-80 object-cover rounded-lg shadow"
      />
      <h1 className="text-3xl font-bold mt-4">{comic.titulo}</h1>
      <p className="mt-2 text-gray-700">{comic.descripcion}</p>
      <p className="mt-2 font-semibold">Precio: ${comic.precio}</p>
      <p className="mt-2 text-gray-600">Escritor: {comic.escritor}</p>
      <p className="text-gray-600">Ilustrador: {comic.ilustrador}</p>
    </div>
  );
}
