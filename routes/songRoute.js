const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const { protect } = require("../middlewares/authMiddleware");


router.post('/save-song',  songController.saveSong);

module.exports = router;