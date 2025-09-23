import { useEffect, useState } from "react";
import JSZip from "jszip";

export default function ComicReader({ cbzFile }) {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const loadCBZ = async () => {
      const zip = new JSZip();
      const data = await fetch(cbzFile).then((res) => res.arrayBuffer());
      const zipContent = await zip.loadAsync(data);

      const imageFiles = Object.keys(zipContent.files)
        .filter((name) => /\.(jpe?g|png)$/i.test(name))
        .sort();

      const images = await Promise.all(
        imageFiles.map((name) =>
          zipContent.files[name].async("base64").then((b64) => `data:image/png;base64,${b64}`)
        )
      );

      setPages(images);
    };

    loadCBZ();
  }, [cbzFile]);

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  if (!pages.length) return <p>Cargando comic...</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={pages[currentPage]}
        alt={`Página ${currentPage + 1}`}
        style={{ maxWidth: "80%", margin: "20px 0" }}
      />
      <div>
        <button onClick={prevPage} disabled={currentPage === 0}>
          Anterior
        </button>
        <span style={{ margin: "0 10px" }}>
          {currentPage + 1} / {pages.length}
        </span>
        <button onClick={nextPage} disabled={currentPage === pages.length - 1}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
