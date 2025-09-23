const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const comicRoutes = require("./routes/comicRoutes");
const compraRoutes = require("./routes/compraRoutes");

app.use(cors({
  origin: "http://localhost:5173", // <-- donde corre tu React
  credentials: true, // opcional, si manejas cookies
}));
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/comics",comicRoutes)
app.use("/api/compras",compraRoutes);

module.exports = app;