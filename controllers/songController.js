const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// Cargar credenciales desde el archivo JSON
const credentialsPath = path.join(__dirname, "../config/credentials.json");
const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = "1y08Mcqr15R09x5zDcnC7gb8jev9Ej7gzTcKrnAkdadk"; // Reemplázalo con el ID de tu Google Sheet

exports.saveSong = async (req, res) => {
  try {
    const { guestName, songName, songUrl, message } = req.body;

    if (!songName || !songUrl) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Formatear los datos a insertar
    const values = [[guestName, songName, songUrl, message, new Date().toISOString()]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sugerencias!A:E", // Reemplaza con la hoja y el rango correcto
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: { values },
    });

    res.status(201).json({ message: "Canción guardada en Google Sheets" });
  } catch (error) {
    console.error("Error al guardar la canción:", error);
    res.status(500).json({ error: "Error al guardar la canción" });
  }
};
