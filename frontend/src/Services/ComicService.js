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