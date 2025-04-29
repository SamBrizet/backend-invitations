const express = require("express");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Ruta protegida
router.get("/", protect, (req, res) => {
    res.json({
        message: "Ruta protegida. Usuario autenticado.",
        user: req.user, // Contiene los datos del token decodificado
    });
});

module.exports = router;
