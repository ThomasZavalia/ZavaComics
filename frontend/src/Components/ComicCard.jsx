/*import { Link } from "react-router-dom";
//import "./App.css";

function ComicCard({ comic }) {
  return (
    <div className="comic-card" style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
      <img src={comic.cover} alt={comic.title} style={{ width: "150px", height: "220px" }} />
      <h3>{comic.title}</h3>
      <p>{comic.year}</p>
      <p>⭐ {comic.rating}</p>
      <Link to={`/comic/${comic.id}`}>Ver Detalles</Link>
    </div>
  );
}

export default ComicCard;*/

import { Link } from "react-router-dom";

function ComicCard({ comic }) {
  return (
    <div className="comic-card">
      <img src={comic.cover} alt={comic.title} />
      <h3>{comic.title}</h3>
      <p>{comic.year}</p>
      <p>⭐ {comic.rating}</p>
      <Link to={`/comic/${comic.id}`}>Ver Detalles</Link>
    </div>
  );
}

export default ComicCard;

