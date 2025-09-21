// cuando zavalia termine el backend esto se reemplazara con las API calls
const mockComics = [
  { id: 1, title: "Batman: Damned", year: 2018, rating: 4.2, cover: "/batman_damned.jpg" },
  { id: 2, title: "Superman: Legacy", year: 2023, rating: 5, cover: "/superman_legacy.jpg" },
  { id: 3, title: "Amazing Spider-Man", year: 2023, rating: 5, cover: "/amazing_spider_man.jpg" }
];

export const ComicService = {
  getAllComics: async () => {
    return mockComics; // despues API call
  },

  getComicById: async (id) => {
    return mockComics.find(c => c.id === Number(id)); // despues API call
  }
};
