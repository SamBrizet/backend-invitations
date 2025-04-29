const { google } = require('googleapis');
const Invitado = require('../models/invitado');
const path = require('path');
const fs = require('fs');
const {constants} = require('buffer');

const sheets = google.sheets('v4');

async function getSheetData(spreadsheetId, range) {
  const credentialsPath = path.join(__dirname, '../config/credentials.json');
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const client = await auth.getClient();

  const response = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId,
    range
  });

  const rows = response.data.values;

  return rows;

}

exports.insertarInvitadosDesdeSheetsNovio = async (req, res) => {
  try {
    const spreadsheetId = '181HsYhABYSEKF5tUpK1ZsR98kyXVJEdESRK2ZNQaa38';
    const range = 'Invitados';

    const rows = await getSheetData(spreadsheetId, range);

    const cabeceras = rows[0];
    const datos = rows.slice(1);

    const normalize = str => str.toLowerCase().replace(/\s+/g, '');

    const invitadosAgrupados = cabeceras.map((cabecera, index) => {
      const personas = datos
        .map(row => row[index])
        .filter(nombre => nombre)
        .map(nombre => ({ nombre }));

      return {
        nombre_principal: normalize(cabecera),
        personas,
        invitacion: "6744003740f869a3a9fe0ff4", 
        confirmado: true,
        claveInvitaccion: normalize(cabecera),
        relacion: "novio"
      };
    });

    // validar si existen invitados con la misma clave, insertar solo los que no existan y actualizar los que si
    for (const invitado of invitadosAgrupados) {
      const invitadoExistente = await Invitado.findOne({ claveInvitaccion: invitado.claveInvitaccion });

      if (invitadoExistente) {
        invitadoExistente.personas = invitado.personas;
        await invitadoExistente.save();
      } else {
        await Invitado.create(invitado);
      }
    }

    res.status(201).json(invitadosAgrupados);
  } catch (error) {
    console.error('Error al insertar invitados desde Google Sheets:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.insertarInvitadosDesdeSheetsNovia = async (req, res) => {
  try {
    const spreadsheetId = '1gW9XmMJV7iAygx4_9YqnqHjZS7c81HpXEJUKNABurpA';
    const range = 'Invitados';
    

    const rows = await getSheetData(spreadsheetId, range);

    const cabeceras = rows[0];
    const datos = rows.slice(1);

    const normalize = str => str.toLowerCase().replace(/\s+/g, '');

    const invitadosAgrupados = cabeceras.map((cabecera, index) => {
      const personas = datos
        .map(row => row[index])
        .filter(nombre => nombre)
        .map(nombre => ({ nombre }));

      return {
        nombre_principal: normalize(cabecera),
        personas,
        invitacion: "6744003740f869a3a9fe0ff4", 
        confirmado: true,
        claveInvitaccion: normalize(cabecera),
        relacion: "novia"
      };
    });

    // validar si existen invitados con la misma clave, insertar solo los que no existan y actualizar los que si
    for (const invitado of invitadosAgrupados) {
      const invitadoExistente = await Invitado.findOne({ claveInvitaccion: invitado.claveInvitaccion });

      if (invitadoExistente) {
        invitadoExistente.personas = invitado.personas;
        await invitadoExistente.save();
      } else {
        await Invitado.create(invitado);
      }
    }

    res.status(201).json(invitadosAgrupados);
  } catch (error) {
    console.error('Error al insertar invitados desde Google Sheets:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerInvitadosNovia = async (req, res) => {
  try {
    const invitados = await Invitado.find({ relacion: 'novia' });

    // respuesta personalizada solo mostrar nombre_principal
    const invitadosPersonalizados = invitados.map(invitado => {
      return {
        nombre_principal: invitado.nombre_principal,
        url: 'https://wedding-invitations-l.netlify.app/marriage/6744003740f869a3a9fe0ff4/' + invitado.claveInvitaccion,
        cantidad_personas: invitado.personas.length
      };
    });
    res.status(200).json(invitadosPersonalizados);
  } catch (error) {
    console.error('Error al obtener invitados novia:', error);
    res.status(400).json({ message: error.message });
  }
}

exports.obtenerInvitadosNovio = async (req, res) => {
  try {
    const invitados = await Invitado.find({ relacion: 'novio' });

    const invitadosPersonalizados = invitados.map(invitado => {
      return {
        nombre_principal: invitado.nombre_principal,
        url: 'https://wedding-invitations-l.netlify.app/marriage/6744003740f869a3a9fe0ff4/' + invitado.claveInvitaccion,
        cantidad_personas: invitado.personas.length
      };
    });
    res.status(200).json(invitadosPersonalizados);
  }
  catch (error) {
    console.error('Error al obtener invitados novio:', error);
    res.status(400).json({ message: error.message });
  }
}