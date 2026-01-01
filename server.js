/**
 * Servidor Express para capturar ubicación mediante consentimiento del usuario.
 * Requisitos: npm install express body-parser
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Base de datos en memoria para demostración
let localizacionesRecibidas = [];

/**
 * Endpoint para recibir la ubicación desde el cliente
 */
app.post('/api/location', (req, res) => {
    const { latitude, longitude, accuracy, timestamp, userId } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Coordenadas faltantes' });
    }

    const nuevaUbicacion = {
        userId: userId || 'Anónimo',
        lat: latitude,
        lng: longitude,
        precision: accuracy,
        fecha: new Date(timestamp).toLocaleString(),
        googleMapsLink: `https://www.google.com/maps?q=${latitude},${longitude}`
    };

    localizacionesRecibidas.push(nuevaUbicacion);
    
    console.log('--- Nueva Ubicación Recibida ---');
    console.log(nuevaUbicacion);

    res.status(200).json({ status: 'success', message: 'Ubicación procesada' });
});

/**
 * Endpoint para que TÚ veas los resultados
 */
app.get('/api/admin/results', (req, res) => {
    res.json(localizacionesRecibidas);
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});