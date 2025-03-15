const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const { sequelize } = require("./models/index");
const cors = require("cors"); // Importar cors
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Asegúrate de que esta línea esté presente para parsear JSON
app.use(cors({ origin: "http://localhost:5173" })); // Configuración de CORS
const uploadsPath = path.resolve(__dirname, "..", "uploads");
console.log("Sirviendo archivos estáticos desde:", uploadsPath);

// 🔹 Servir archivos estáticos correctamente
app.use("/uploads", express.static(uploadsPath));

// Routes
app.use("/api", routes);

// Database synchronization
sequelize
  .sync({ alter: true }) // Asegúrate de que esta línea esté presente para actualizar la estructura de las tablas
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
