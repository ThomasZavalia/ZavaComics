import api from "./api";

// Traer todos los cómics
export const getComics = async () => {
  const res = await api.get("/comics");
  return res.data;
};


 export const getComicById = async (id) => {
  const res = await api.get(`/comics/${id}`);
  return res.data;
};

export const createComic = async (comicData) => {
  const res = await api.post('/comics', comicData); // Usa auth/rol middleware en backend
  return res.data;
};
export const updateComic = async (id, comicData) => {
  const res = await api.put(`/comics/${id}`, comicData); // O patch si prefieres
  return res.data;
};
export const deleteComic = async (id) => {
  const res = await api.delete(`/comics/${id}`);
  return res.data;
};