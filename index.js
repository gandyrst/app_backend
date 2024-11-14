// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');

dotenv.config();
const PORT = process.env.PORT || 5000;


const app = express();
// Habilitar CORS para todas las rutas
app.use(cors());

// O puedes configurarlo para permitir solo ciertos orígenes
/*
const corsOptions = {
    origin: 'http://tudominio.com', // Cambia esto por el dominio que deseas permitir
    optionsSuccessStatus: 200 // Para algunos navegadores antiguos
};
app.use(cors(corsOptions));
*/

app.use(express.json()); // Para parsear JSON

// Rutas de autenticación
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
