const express = require("express");
const router = express.Router();
const comicController = require("../controllers/comicController");
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

module.exports = router;
