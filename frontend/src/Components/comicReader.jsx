import { useEffect, useState } from "react";
import JSZip from "jszip";

export default function ComicReader({ urlLectura }) {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const loadComic = async () => {
      const res = await fetch(urlLectura);
      const blob = await res.blob();
      const zip = await JSZip.loadAsync(blob);

      const imgs = await Promise.all(
        Object.keys(zip.files)
          .filter(name => /\.(jpg|jpeg|png)$/i.test(name))
          .sort()
          .map(async name => {
            const fileData = await zip.files[name].async("base64");
            return `data:image/png;base64,${fileData}`;
          })
      );

      setImages(imgs);
    };

    loadComic();
  }, [urlLectura]);

  if (!images.length) return <p>Cargando comic...</p>;

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <img
        src={images[currentPage]}
        alt={`Página ${currentPage + 1}`}
        className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
      />
      <div className="flex gap-4 mt-2">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(p => p - 1)}
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          Anterior
        </button>
        <span>
          Página {currentPage + 1} de {images.length}
        </span>
        <button
          disabled={currentPage === images.length - 1}
          onClick={() => setCurrentPage(p => p + 1)}
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
