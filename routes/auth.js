const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();


// Ruta para el registro de usuarios :D
router.post('/register', async (req, res) => {
    const nombre = req.body.username
    const psswd = req.body.password
    const sql = 'INSERT INTO usuarios (nombre, contrasena) VALUES (?, ?)';

    db.query(sql, [nombre, psswd], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).send('Error en la consulta a la base de datos');
        }
        res.status(200).send("Se ha insertado correctamente en la base de datos")
        console.log("Se ha insertado correctamente en la base de datos")
    });
});

// Ruta para el inicio de sesión :D
router.post('/login', (req, res) => {
    const nombre = req.body.user
    const psswd = req.body.password
    console.log('Usuario: ', nombre, ' Contraseña: ', psswd);

    // Consulta SQL para verificar si el usuario y la contraseña existen
    const sql = 'SELECT * FROM usuarios WHERE nombre = ? AND contrasena = ?';
    db.query(sql, [nombre, psswd], (err, results) => {
        if (err) {
            console.error('Error al verificar el usuario: ', err);
            return res.status(500).send('Error en la consulta a la base de datos');
        }

        // Verifica si se encontró un usuario
        if (results.length > 0) {
            const token = jwt.sign({ username: nombre.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const resp = {
                'ok': 'success',
                'token': token,
                'msg': 'Usuario autenticado correctamente'
            }
            res.status(200).send(resp);
            // localStorage.setItem(res.json({ token }));
            console.log(token)
            console.log('Usuario autenticado correctamente')
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    });
});

// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     // Verificar si el usuario existe
//     const user = users.find(user => user.username === username);
//     if (!user) {
//         return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
//     }

//     // Verificar la contraseña
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
//     }

//     // Generar un token JWT
//     const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
// });

module.exports = router;