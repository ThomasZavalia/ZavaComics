/*export default function Home() {
  return <h1>Home Page (Lucas)</h1>;
}*/

import { useEffect, useState } from "react";
import { getComics } from "../services/comicService";
import ComicCard from "../components/ComicCard";

export default function Home() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const data = await getComics();
        setComics(data);
      } catch (err) {
        console.error("Error al traer los cómics", err);
      }
    };
    fetchComics();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>
  );
}