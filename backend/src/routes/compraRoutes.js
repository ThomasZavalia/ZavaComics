const express = require("express");
const router = express.Router();
const compraController = require("../controllers/compraController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post
(
"/:comicId",authMiddleware,compraController.comprarComic
);

router.get("/my",authMiddleware,compraController.obtenerBiblioteca);

module.exports = router;