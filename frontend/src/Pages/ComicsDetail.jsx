


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComicById, updateComic, deleteComic } from "../Services/ComicService"; // 👈 Agregado updateComic, deleteComic
import api from "../Services/api";
import { useAuth } from "../Hooks/useAuth";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, CircularProgress, Alert } from "@mui/material"; // 👈 Agregado para modales

export default function ComicsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user && user.role === 'admin'; // 👈 Agregado chequeo admin

  console.log("DEBUG Detail - User:", user);
console.log("DEBUG Detail - isAdmin:", isAdmin);

  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isComprado, setIsComprado] = useState(false);

  // 👈 Estados para modales admin
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchComic = async () => {
      const data = await getComicById(id);
      setComic(data);

      // Verificamos si el usuario tiene el cómic comprado
      if (user) {
        try {
          const res = await api.get("/compras/my"); // devuelve los comics comprados
          const comicsComprados = res.data; // array de comics
          const comprado = comicsComprados.some(c => c.id === data.id);
          setIsComprado(comprado);
        } catch (err) {
          console.error("Error al obtener la librería", err);
        }
      }
    };

    fetchComic();
  }, [id, user]);

  if (!comic) return <p className="text-center mt-10">Cargando...</p>;

  // 👈 Handlers para editar
 const handleEditOpen = () => {
  setEditForm({
    titulo: comic.titulo,
    escritor: comic.escritor,
    ilustrador: comic.ilustrador,
    editorial: comic.editorial || '', 
    sinopsis: comic.sinopsis,
    precio: comic.precio,
    portada: comic.portada,
    urlLectura: comic.urlLectura
  });
  setOpenEditModal(true);
};

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    setEditLoading(true);
    setEditError('');
    try {
      await updateComic(id, editForm);
      alert('Cómic actualizado exitosamente');
      setOpenEditModal(false);
      // Recarga datos
      const updatedComic = await getComicById(id);
      setComic(updatedComic);
    } catch (err) {
      setEditError('Error al editar cómic: ' + (err.response?.data?.message || err.message));
    }
    setEditLoading(false);
  };

  // 👈 Handler para eliminar
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteComic(id);
      alert('Cómic eliminado exitosamente');
      navigate('/'); // Vuelve a home
    } catch (err) {
      alert('Error al eliminar: ' + (err.response?.data?.message || err.message));
    }
    setDeleteLoading(false);
    setOpenDeleteModal(false);
  };

  const handleComprar = async () => {
    if (!user) {
      alert("Debes iniciar sesión para comprar este cómic");
      return;
    }

    const numeroTarjeta = prompt("Ingrese número de tarjeta (fake)");
    const cvv = prompt("Ingrese CVV (fake)");

    if (!numeroTarjeta || !cvv) return alert("Compra cancelada");

    setLoading(true);
    try {
      await api.post(`/compras/${comic.id}`, { numeroTarjeta, cvv });
      alert(`¡Has comprado ${comic.titulo}!`);
      setIsComprado(true);
    } catch (err) {
      console.error(err);
      alert("Error al comprar el cómic");
    }
    setLoading(false);
  };

  const handleLeer = () => {
    if (!isComprado) return alert("Debes comprar el comic primero");
    navigate("/leer", { state: { cbzFile: comic.urlLectura } });
  };

 return (
  <div className="container mx-auto px-6 py-8">
    <div className="flex flex-col md:flex-row items-start gap-6">
      <img
        src={comic.portada}
        alt={comic.titulo}
        className="w-full md:w-1/3 h-auto rounded-lg shadow-lg"
      />
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{comic.titulo}</h1>
        <p className="text-gray-300 mb-2">
          <span className="font-semibold">Escritor:</span> {comic.escritor}
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-semibold">Ilustrador:</span> {comic.ilustrador}
        </p>

        <p className="text-gray-300 mb-2">
          <span className="font-semibold">Editorial:</span> {comic.editorial || 'No especificada'}
        </p>
        
        {/* 👈 SINOPSIS MEJORADA: Más grande, espaciada y con margen abajo */}
        <p className="text-sm text-gray-300 leading-relaxed mb-6"> {/* 👈 CAMBIOS: text-sm (más grande), leading-relaxed (interlineado lindo), mb-6 (espacio antes de botones) */}
          {comic.sinopsis}
        </p>

        {/* 👈 BOTONES: Agregado margen superior para separar de sinopsis */}
        <div className="flex flex-wrap gap-2 items-center mt-6"> {/* 👈 CAMBIO: Agregado mt-6 para espaciado */}
          {isComprado ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleLeer}
              sx={{
                py: 1.5,
                px: 4,
                fontWeight: "bold",
                transition: "all 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              Leer
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handleComprar}
              disabled={loading}
              sx={{
                py: 1.5,
                px: 4,
                fontWeight: "bold",
                transition: "all 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              {loading ? "Comprando..." : `Comprar $${comic.precio}`}
            </Button>
          )}

          {/* BOTONES ADMIN SOLO SI ES ADMIN (sin cambios) */}
          {isAdmin && (
            <>
              <Button
                variant="outlined"
                color="warning"
                onClick={handleEditOpen}
                sx={{ py: 1.5, px: 4, fontWeight: 'bold' }}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpenDeleteModal(true)}
                sx={{ py: 1.5, px: 4, fontWeight: 'bold' }}
              >
                Eliminar
              </Button>
            </>
          )}
        </div>
      </div>
    </div>

    {/* MODAL PARA EDITAR (sin cambios) */}
   <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Cómic</DialogTitle>
      <DialogContent>
        {editError && <Alert severity="error" sx={{ mb: 2 }}>{editError}</Alert>}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField label="Título" name="titulo" value={editForm.titulo || ''} onChange={handleEditChange} fullWidth required />
          <TextField label="Escritor" name="escritor" value={editForm.escritor || ''} onChange={handleEditChange} fullWidth required />
          <TextField label="Ilustrador" name="ilustrador" value={editForm.ilustrador || ''} onChange={handleEditChange} fullWidth required />
          {/* 👈 NUEVO: Campo Editorial */}
          <TextField label="Editorial" name="editorial" value={editForm.editorial || ''} onChange={handleEditChange} fullWidth />
          <TextField label="Sinopsis" name="sinopsis" value={editForm.sinopsis || ''} onChange={handleEditChange} multiline rows={3} fullWidth required />
          <TextField label="Precio" name="precio" type="number" value={editForm.precio || ''} onChange={handleEditChange} fullWidth required />
          <TextField label="URL Portada" name="portada" value={editForm.portada || ''} onChange={handleEditChange} fullWidth required />
          <TextField label="URL Lectura" name="urlLectura" value={editForm.urlLectura || ''} onChange={handleEditChange} fullWidth required />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenEditModal(false)}>Cancelar</Button>
        <Button onClick={handleEditSubmit} variant="contained" disabled={editLoading}>
          {editLoading ? <CircularProgress size={24} /> : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>

    {/* MODAL PARA CONFIRMAR ELIMINAR (sin cambios) */}
    <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
      <DialogTitle>¿Estás seguro de eliminar "{comic.titulo}"?</DialogTitle>
      <DialogContent>
        <p>Esta acción no se puede deshacer.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDeleteModal(false)}>Cancelar</Button>
        <Button onClick={handleDelete} variant="contained" color="error" disabled={deleteLoading}>
          {deleteLoading ? <CircularProgress size={24} /> : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
}