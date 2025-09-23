


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComicById } from "../Services/ComicService";
import api from "../Services/api";
import { useAuth } from "../Hooks/useAuth";
import { Button } from "@mui/material";

export default function ComicsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isComprado, setIsComprado] = useState(false);

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
    navigate(`/leer/${comic.id}`);
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
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Escritor:</span> {comic.escritor}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Ilustrador:</span> {comic.ilustrador}
          </p>
          <p className="text-gray-600 mb-6">{comic.sinopsis}</p>

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
        </div>
      </div>
    </div>
  );
}
