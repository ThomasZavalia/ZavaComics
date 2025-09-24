import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // 👈 Agregado para leer query
import { useAuth } from "../Hooks/useAuth";
import { getComics, createComic } from "../Services/ComicService";
import ComicCard from "../Components/ComicCard";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, CircularProgress, Alert } from "@mui/material";

export default function Home() {
  const { user } = useAuth();
  const isAdmin = user && user.role === 'admin';

  const [searchParams] = useSearchParams(); // 👈 Lee query ?q=...
  const query = searchParams.get('q') || ''; // 👈 Query de búsqueda

  const [comics, setComics] = useState([]);
  const [filteredComics, setFilteredComics] = useState([]); // 👈 Lista filtrada

  // Estados para modal de agregar (sin cambios)
  const [openAddModal, setOpenAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
  titulo: '', 
  escritor: '', 
  ilustrador: '', 
  editorial: '', // 👈 NUEVO: Campo editorial
  sinopsis: '', 
  precio: '', 
  portada: '', 
  urlLectura: ''
});
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const data = await getComics();
        setComics(data);
      } catch (err) {
        console.error("Error al traer los cómics", err);
      }
    };
    fetchComics();
  }, []);

  // 👈 NUEVO: Filtrar cómics por título (onChange de query o al cargar)
  useEffect(() => {
    if (query) {
      const lowerQuery = query.toLowerCase();
      const filtered = comics.filter(comic =>
        comic.titulo.toLowerCase().includes(lowerQuery) // 👈 Filtra por título (case insensitive)
      );
      setFilteredComics(filtered);
      console.log(`DEBUG Búsqueda: "${query}" - Encontrados: ${filtered.length}`); // 👈 Opcional debug
    } else {
      setFilteredComics(comics); // Muestra todos si no hay query
    }
  }, [comics, query]); // 👈 Re-filtra si cambian cómics o query

  // Handlers para modal agregar (sin cambios)
  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

const handleAddSubmit = async () => {
  setAddLoading(true);
  setAddError('');
  try {
    await createComic(addForm); // 👈 Envía todo, incluyendo editorial
    alert('Cómic agregado exitosamente');
    setOpenAddModal(false);
    setAddForm({ 
      titulo: '', escritor: '', ilustrador: '', editorial: '', sinopsis: '', precio: '', portada: '', urlLectura: '' // 👈 Reset con editorial
    });
    // Recarga la lista
    const data = await getComics();
    setComics(data);
  } catch (err) {
    setAddError('Error al agregar cómic: ' + (err.response?.data?.message || err.message));
  }
  setAddLoading(false);
};

  // Lista a mostrar: filtrada o todos
  const displayComics = filteredComics.length > 0 ? filteredComics : comics;

  return (
    <div className="p-6">
      {/* Botón agregar para admin (sin cambios) */}
      {isAdmin && (
        <div className="flex justify-center mb-6">
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenAddModal(true)}
            sx={{ py: 1.5, px: 4, fontWeight: 'bold' }}
          >
            + Agregar Nuevo Cómic
          </Button>
        </div>
      )}

      {/* 👈 MENSAJE SI HAY BÚSQUEDA */}
      {query && (
        <div className="text-center mb-4">
          <p className="text-gray-600">Mostrando resultados para: "{query}" ({displayComics.length} cómics)</p>
        </div>
      )}

      {/* Modal agregar (sin cambios) */}
      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)} maxWidth="sm" fullWidth>
  <DialogTitle>Agregar Nuevo Cómic</DialogTitle>
  <DialogContent>
    {addError && <Alert severity="error" sx={{ mb: 2 }}>{addError}</Alert>}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Título" name="titulo" value={addForm.titulo} onChange={handleAddChange} fullWidth required />
      <TextField label="Escritor" name="escritor" value={addForm.escritor} onChange={handleAddChange} fullWidth required />
      <TextField label="Ilustrador" name="ilustrador" value={addForm.ilustrador} onChange={handleAddChange} fullWidth required />
      {/* 👈 NUEVO: Campo Editorial */}
      <TextField label="Editorial" name="editorial" value={addForm.editorial} onChange={handleAddChange} fullWidth />
      <TextField label="Sinopsis" name="sinopsis" value={addForm.sinopsis} onChange={handleAddChange} multiline rows={3} fullWidth required />
      <TextField label="Precio" name="precio" type="number" value={addForm.precio} onChange={handleAddChange} fullWidth required />
      <TextField label="URL Portada (ej: /images/portada.jpg)" name="portada" value={addForm.portada} onChange={handleAddChange} fullWidth required />
      <TextField label="URL Lectura (ej: /comics/nombre.cbz)" name="urlLectura" value={addForm.urlLectura} onChange={handleAddChange} fullWidth required />
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenAddModal(false)}>Cancelar</Button>
    <Button onClick={handleAddSubmit} variant="contained" disabled={addLoading}>
      {addLoading ? <CircularProgress size={24} /> : 'Agregar'}
    </Button>
  </DialogActions>
</Dialog>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"> {/* 👈 CAMBIO: 2 en sm (tablet), 4 en md (desktop), 5 en lg (grande) */}
      {displayComics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>

      {/* Si no hay resultados */}
      {query && displayComics.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-500">No se encontraron cómics con "{query}". Intenta otra búsqueda.</p>
        </div>
      )}
    </div>
  );
}