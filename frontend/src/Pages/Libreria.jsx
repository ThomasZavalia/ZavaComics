/*import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import api from "../Services/api";
import { Link } from "react-router-dom";

export default function Libreria() {
  const { user } = useAuth();
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBiblioteca = async () => {
      if (!user) {
        setErrorMessage("Debes iniciar sesión o registrarte para ver tu librería");
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/compras/my");
        setComics(res.data); // asumimos que devuelve un array de comics
      } catch (err) {
        console.error(err);
        setErrorMessage("Error al cargar tu librería");
      } finally {
        setLoading(false);
      }
    };

    fetchBiblioteca();
  }, [user]);

  if (loading) return <p className="text-center mt-10 text-gray-200">Cargando...</p>;

  if (errorMessage)
    return (
      <div className="text-center mt-10 text-gray-200">
        <p>{errorMessage}</p>
        <div className="mt-4 flex justify-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Registrarse
          </Link>
        </div>
      </div>
    );

  if (comics.length === 0)
    return (
      <p className="text-center mt-10 text-gray-200">
        No tienes comics en tu librería todavía
      </p>
    );

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Mi Librería</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {comics.map((comic) => (
          <div
            key={comic.id}
            className="bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={comic.portada}
              alt={comic.titulo}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-white">{comic.titulo}</h2>
              <p className="text-sm text-gray-300">Escritor: {comic.escritor}</p>
              <p className="text-sm text-gray-300">Ilustrador: {comic.ilustrador}</p>
              <Link
                to={`/comic/${comic.id}`}
                className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Ver detalle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
*/

import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import api from "../Services/api";
import { Link } from "react-router-dom";

export default function Libreria() {
  const { user } = useAuth();
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBiblioteca = async () => {
      if (!user) {
        setErrorMessage("Debes iniciar sesión o registrarte para ver tu librería");
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/compras/my");
        setComics(res.data); // asumimos que devuelve un array de comics
      } catch (err) {
        console.error(err);
        setErrorMessage("Error al cargar tu librería");
      } finally {
        setLoading(false);
      }
    };

    fetchBiblioteca();
  }, [user]);

  if (loading) return <p className="text-center mt-10 text-gray-200">Cargando...</p>;

  if (errorMessage)
    return (
      <div className="text-center mt-10 text-gray-200">
        <p>{errorMessage}</p>
        <div className="mt-4 flex justify-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Registrarse
          </Link>
        </div>
      </div>
    );

  if (comics.length === 0)
    return (
      <p className="text-center mt-10 text-gray-200">
        No tienes comics en tu librería todavía
      </p>
    );

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Mi Librería</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {comics.map((comic) => (
          <div
            key={comic.id}
            className="bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={comic.portada}
              alt={comic.titulo}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-white">{comic.titulo}</h2>
              <p className="text-sm text-gray-300">Escritor: {comic.escritor}</p>
              <p className="text-sm text-gray-300">Ilustrador: {comic.ilustrador}</p>

              <div className="flex gap-2 mt-3">
                <Link
                  to={`/comic/${comic.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Ver detalle
                </Link>

                <Link
                  to="/leer"
                  state={{ cbzFile: comic.urlLectura }} // 👈 pasamos la ruta al .cbz/.zip
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Leer
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
