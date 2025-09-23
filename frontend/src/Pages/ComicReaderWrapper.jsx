import { useLocation } from "react-router-dom";
import ComicReader from "./comicReader";

export default function ComicReaderWrapper() {
  const location = useLocation();
  const { cbzFile } = location.state || {};
  
  if (!cbzFile) return <p>Archivo no encontrado</p>;

  return <ComicReader cbzFile={cbzFile} />;
}
