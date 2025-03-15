const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const { sequelize } = require("./models/index");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Servir archivos estáticos correctamente
const uploadsPath = path.resolve(__dirname, "..", "uploads");
console.log("Sirviendo archivos estáticos desde:", uploadsPath);
app.use("/uploads", express.static(uploadsPath));

// Routes
app.use("/api", routes);

// Database synchronization
sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

module.exports = app;
