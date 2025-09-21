/*export default function ComicDetail() {
  return <h1>Comic Detail Page (Lucas)</h1>;
}*/

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ComicService } from "../Services/ComicService";

function ComicsDetail() {
  const { id } = useParams();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    const fetchComic = async () => {
      const data = await ComicService.getComicById(id);
      setComic(data);
    };
    fetchComic();
  }, [id]);

  if (!comic) return <p>Cargando comic...</p>;

  return (
    <div>
      <h1>{comic.title}</h1>
      <img src={comic.cover} alt={comic.title} style={{ width: "250px" }} />
      <p>Año: {comic.year}</p>
      <p>Rating: ⭐ {comic.rating}</p>
      <p>aca va la descripcion (va a venir desde el backend)</p>
      <button>Comprar Comic</button>
    </div>
  );
}

export default ComicsDetail;

    