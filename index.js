require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/errorMiddleware");
const routes = require("./routes"); // Importar rutas centralizadas

const app = express();

// Middleware global
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado a MongoDB"))
    .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Usar rutas centralizadas
app.use("/api", routes);

// Middleware de errores
app.use(errorHandler);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
const SERVER = process.env.SERVER || "localhost";
app.listen(PORT, () => console.log(`Servidor iniciado en http://${SERVER}:${PORT}`));
