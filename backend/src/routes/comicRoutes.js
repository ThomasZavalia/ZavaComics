const express = require("express");
const router = express.Router();
const comicController = require("../controllers/comicController");
const calificacionController = require("../controllers/calificacionController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");


router.post
(
    "/",authMiddleware,roleMiddleware(["admin"]),comicController.crearComic
);

router.put
(
    "/:id",authMiddleware,roleMiddleware(["admin"]),comicController.editarComic
);

router.delete
(
    "/:id",authMiddleware,roleMiddleware(["admin"]),comicController.eliminarComic
);

router.get("/",comicController.obtenerTodos);

router.post("/:id/calificar",authMiddleware,calificacionController.calificarComic);

router.get("/:id/promedio",comicController.obtenerComicPromedio);
router.get("/:id",comicController.obtenerComic);

module.exports = router;
