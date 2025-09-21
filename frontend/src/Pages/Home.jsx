/*export default function Home() {
  return <h1>Home Page (Lucas)</h1>;
}*/

import { useEffect, useState } from "react";
import { ComicService } from "../Services/ComicService";
import ComicList from "../Components/ComicList";

function Home() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchComics = async () => {
      const data = await ComicService.getAllComics();
      setComics(data);
    };
    fetchComics();
  }, []);

  return (
    <div>
      <h1>Todos los Comics</h1>
      <ComicList comics={comics} />
    </div>
  );
}

export default Home;

