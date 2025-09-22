// components/ComicCard.jsx
export default function ComicCard({ comic }) {
  return (
    <div className="comic-card">
      <img
        src={comic.portada}
        alt={comic.titulo}
        className="comic-cover"
      />
      <h3>{comic.titulo}</h3>
      <p><strong>Autor:</strong> {comic.autor}</p>
      <p><strong>Ilustrador:</strong> {comic.ilustrador}</p>
    </div>
  );
}
