


import { useEffect, useState } from "react";
import JSZip from "jszip";

export default function ComicReader({ file }) {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCBZ = async () => {
      try {
        setLoading(true);
        setError(null);
        const zip = new JSZip();
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error(`Archivo no encontrado: ${response.status} ${response.statusText}. Verifica la ruta: ${file}`);
        }
        const data = await response.arrayBuffer();
        const zipContent = await zip.loadAsync(data);

        // 👈 DEBUG: Loggea TODOS los archivos para ver el contenido (puedes quitar si ya no lo necesitas)
        console.log("=== CONTENIDO DEL CBZ ===");
        console.log("Archivos totales:", Object.keys(zipContent.files));
        Object.keys(zipContent.files).forEach(name => {
          const fileObj = zipContent.files[name];
          console.log(`- ${name} (dir: ${fileObj.dir}, size: ${fileObj._data.uncompressedSize || 'N/A'})`);
        });
        console.log("=== FIN CONTENIDO ===");

        // Filtra imágenes: más formatos, ignora carpetas, maneja paths
        const imageFiles = Object.keys(zipContent.files)
          .filter(name => {
            const file = zipContent.files[name];
            if (file.dir) return false; // Ignora carpetas
            // Extrae nombre base (sin path de carpetas)
            const baseName = name.split('/').pop(); // ej: "carpeta/001.jpg" -> "001.jpg"
            return /\.(jpe?g|png|gif|webp|bmp|tiff?)$/i.test(baseName);
          })
          .map(name => name.split('/').pop()) // Usa solo baseName para sort y async
          .sort((a, b) => {
            // Orden numérico mejorado
            const numA = parseInt(a.match(/\d+/)?.[0] || 0);
            const numB = parseInt(b.match(/\d+/)?.[0] || 0);
            return numA - numB;
          });

        console.log("Archivos de imagen encontrados:", imageFiles); // 👈 DEBUG

        if (imageFiles.length === 0) {
          throw new Error(`No se encontraron imágenes en el CBZ. Archivos totales: ${Object.keys(zipContent.files).length}. Verifica extensiones (.jpg, .png, etc.) o recrea el CBZ.`);
        }

        const images = await Promise.all(
          imageFiles.map(async (baseName) => {
            // Busca el archivo original (con path si lo tiene)
            const originalName = Object.keys(zipContent.files).find(key => key.split('/').pop() === baseName);
            if (!originalName) throw new Error(`Archivo ${baseName} no encontrado en ZIP`);
            const base64 = await zipContent.files[originalName].async("base64");
            // Detecta MIME type
            const ext = baseName.toLowerCase();
            let mimeType = 'image/jpeg'; // Default
            if (ext.endsWith('.png')) mimeType = 'image/png';
            else if (ext.endsWith('.gif')) mimeType = 'image/gif';
            else if (ext.endsWith('.webp')) mimeType = 'image/webp';
            else if (ext.endsWith('.bmp')) mimeType = 'image/bmp';
            else if (ext.endsWith('.tiff') || ext.endsWith('.tif')) mimeType = 'image/tiff';
            return `data:${mimeType};base64,${base64}`;
          })
        );

        setPages(images);
        setCurrentPage(0);
      } catch (err) {
        console.error("Error cargando CBZ:", err);
        setError(err.message);
        setPages([]);
      } finally {
        setLoading(false);
      }
    };

    if (file) {
      loadCBZ();
    }
  }, [file]);

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  // Función para cerrar (usa history.back o prop onClose si la agregas)
  const handleClose = () => {
    window.history.back(); // O window.close() si es popup, o prop onClose
  };

  if (loading) return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      height: '100vh', background: 'black', color: 'white' 
    }}>
      <p>Cargando cómic... (puede tardar unos segundos)</p>
    </div>
  );

  if (error) return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
      height: '100vh', background: 'black', color: 'red' 
    }}>
      <p style={{ textAlign: 'center', padding: '20px' }}>Error: {error}</p>
      <button 
        onClick={handleClose} 
        style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Volver
      </button>
    </div>
  );

  if (!pages.length) return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      height: '100vh', background: 'black', color: 'white' 
    }}>
      <p>No hay páginas para mostrar.</p>
    </div>
  );

  
  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
      background: 'rgba(0, 0, 0, 0.95)', // Fondo negro semi-transparente para modal feel
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
      padding: '20px', boxSizing: 'border-box', overflow: 'hidden', zIndex: 1000 
    }}>
      {/* Botón Cerrar en esquina superior derecha */}
      <button 
        onClick={handleClose} 
        style={{ 
          position: 'absolute', top: '20px', right: '20px', 
          padding: '10px', background: 'rgba(255, 0, 0, 0.8)', color: 'white', 
          border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', 
          width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}
      >
        ×
      </button>

      {/* Contenedor de la imagen: Centrado vertical/horizontal */}
      <div style={{ 
        flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', 
        width: '100%', height: '100%', padding: '20px', boxSizing: 'border-box' 
      }}>
        <img
          src={pages[currentPage]}
          alt={`Página ${currentPage + 1}`}
          style={{ 
            maxWidth: '90vw', maxHeight: '90vh', 
            width: 'auto', height: 'auto', // Mantiene proporcion
            objectFit: 'contain',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5)', 
            borderRadius: '8px' 
          }}
          onError={(e) => console.error("Error cargando imagen:", e)}
        />
      </div>

      {/* Controles en la parte inferior: Centrados y responsive */}
      <div style={{ 
        padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', 
        gap: '20px', background: 'rgba(0, 0, 0, 0.7)', width: '100%', 
        flexShrink: 0 
      }}>
        <button 
          onClick={prevPage} 
          disabled={currentPage === 0}
          style={{ 
            padding: '12px 24px', background: currentPage === 0 ? 'gray' : '#4CAF50', 
            color: 'white', border: 'none', borderRadius: '8px', cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
            fontSize: '16px', minWidth: '100px', transition: 'background 0.3s'
          }}
          onMouseEnter={(e) => { if (currentPage > 0) e.target.style.background = '#45a049'; }}
          onMouseLeave={(e) => { if (currentPage > 0) e.target.style.background = '#4CAF50'; }}
        >
          Anterior
        </button>

        <span style={{ 
          color: 'white', fontSize: '18px', fontWeight: 'bold', 
          minWidth: '120px', textAlign: 'center' 
        }}>
          {currentPage + 1} / {pages.length}
        </span>

        <button 
          onClick={nextPage} 
          disabled={currentPage === pages.length - 1}
          style={{ 
            padding: '12px 24px', background: currentPage === pages.length - 1 ? 'gray' : '#2196F3', 
            color: 'white', border: 'none', borderRadius: '8px', cursor: currentPage === pages.length - 1 ? 'not-allowed' : 'pointer',
            fontSize: '16px', minWidth: '100px', transition: 'background 0.3s'
          }}
          onMouseEnter={(e) => { if (currentPage < pages.length - 1) e.target.style.background = '#1976D2'; }}
          onMouseLeave={(e) => { if (currentPage < pages.length - 1) e.target.style.background = '#2196F3'; }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}