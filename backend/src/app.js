const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const comicRoutes = require("./routes/comicRoutes");
const compraRoutes = require("./routes/compraRoutes");


app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/comics",comicRoutes)
app.use("/api/compras",compraRoutes);

module.exports = app;