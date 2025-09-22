// components/ComicList.jsx
import ComicCard from "./ComiCard";

export default function ComicList({ comics }) {
  return (
    <div className="comic-grid">
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>
  );
}
