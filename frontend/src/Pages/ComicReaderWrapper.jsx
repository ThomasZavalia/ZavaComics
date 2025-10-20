import { useLocation } from "react-router-dom";
import ComicReader from "./comicReader";
export default function ComicReaderWrapper() {
  const location = useLocation();
  const { cbzFile } = location.state || {}; // 👈 Captura 'cbzFile' del estado
  const file = cbzFile; // Renombra para consistencia
  if (!file) return <p>Archivo no encontrado. Verifica que hayas comprado el cómic y navegado correctamente.</p>;
  // Normaliza la ruta: si no empieza con /comics/, agrégalo
  const filePath = file.startsWith("/comics/") ? file : `/comics/${file}`;
  console.log("Ruta del archivo:", filePath); // 👈 Para debug: mira la consola del navegador
  return <ComicReader file={filePath} />; // 👈 Pasa filePath en lugar de file
}