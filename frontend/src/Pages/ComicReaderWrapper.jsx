import { useLocation } from "react-router-dom";
import ComicReader from "./comicReader";


export default function ComicReaderWrapper() {

  const location = useLocation();
  const { cbzFile } = location.state || {};

   // Captura 'cbzFile' del estado
  const file = cbzFile; 
  
  // Renombra 
  if (!file) return <p>Archivo no encontrado. Verifica que hayas comprado el cómic y navegado correctamente.</p>;

  
  const filePath = file.startsWith("/comics/") ? file : `/comics/${file}`;
  console.log("Ruta del archivo:", filePath); 
  return <ComicReader file={filePath} />;
}