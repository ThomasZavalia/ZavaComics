/*

import { useEffect, useState } from "react";
import { getComics } from "../Services/ComicService";
import ComicCard from "../Components/ComicCard";

export default function Home() {
  const [comics, setComics] = useState([]);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>
  );
}*/

import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth"; // 👈 Agregado para chequear admin
import { getComics, createComic } from "../Services/ComicService"; // 👈 Agregado createComic
import ComicCard from "../Components/ComicCard";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, CircularProgress, Alert } from "@mui/material"; // 👈 Agregado para modal

export default function Home() {
  const { user } = useAuth(); // 👈 Agregado
  const isAdmin = user && user.role === 'admin'; // 👈 Chequeo admin

  console.log("DEBUG Home - User:", user); // 👈 Debe mostrar {id, nombre, role: 'admin'}
console.log("DEBUG Home - isAdmin:", isAdmin);

  const [comics, setComics] = useState([]);

  // 👈 Estados para modal de agregar
  const [openAddModal, setOpenAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    titulo: '', escritor: '', ilustrador: '', sinopsis: '', precio: '', portada: '', urlLectura: ''
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

  // 👈 Handlers para modal agregar
  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async () => {
    setAddLoading(true);
    setAddError('');
    try {
      await createComic(addForm);
      alert('Cómic agregado exitosamente');
      setOpenAddModal(false);
      setAddForm({ titulo: '', escritor: '', ilustrador: '', sinopsis: '', precio: '', portada: '', urlLectura: '' });
      // Recarga la lista
      const data = await getComics();
      setComics(data);
    } catch (err) {
      setAddError('Error al agregar cómic: ' + (err.response?.data?.message || err.message));
    }
    setAddLoading(false);
  };

  return (
    <div className="p-6"> {/* 👈 Padding general para centrar el botón */}
      {/* 👈 BOTÓN AGREGAR SOLO PARA ADMIN */}
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

      {/* 👈 MODAL PARA AGREGAR */}
      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Agregar Nuevo Cómic</DialogTitle>
        <DialogContent>
          {addError && <Alert severity="error" sx={{ mb: 2 }}>{addError}</Alert>}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Título" name="titulo" value={addForm.titulo} onChange={handleAddChange} fullWidth required />
            <TextField label="Escritor" name="escritor" value={addForm.escritor} onChange={handleAddChange} fullWidth required />
            <TextField label="Ilustrador" name="ilustrador" value={addForm.ilustrador} onChange={handleAddChange} fullWidth required />
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

      {/* 👈 GRID EXISTENTE INTACTO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {comics.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </div>
    </div>
  );
}