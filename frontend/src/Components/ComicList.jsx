import ComicCard from "./ComicCard";

function ComicList({ comics }) {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {comics.map(c => <ComicCard key={c.id} comic={c} />)}
    </div>
  );
}

export default ComicList;
