import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ComicsDetail from "./Pages/ComicsDetail";
import Libreria from "./Pages/Libreria";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ComicReaderPage from "./Pages/comicReader";

import ComicReaderWrapper from "./Pages/ComicReaderWrapper";

import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comic/:id" element={<ComicsDetail />} />
        <Route path="/libreria" element={<Libreria />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/leer" element={<ComicReaderWrapper />} />
      </Routes>
    </>
  );
}

export default App;
