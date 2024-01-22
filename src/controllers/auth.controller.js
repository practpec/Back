const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_JWT } = process.env;
const Usuario = require('../models/usuario.model');

const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!validateEmail(email)) {
            return res.status(400).json({
                message: "Email o contraseña incorrecta"
            });
        }

        if (password.length < 3) {
            return res.status(400).json({
                message: "Email o contraseña incorrecta"
            });
        }

        const usuario = await Usuario.getById(email);
        console.log("aiuda");
        if (usuario.length === 0) {
            console.log("aiuda");
            return res.status(400).json({
                message: "Email o contraseña incorrecta"
            });
        }

        const passwordCorrecta = bcrypt.compareSync(password, usuario.password);
        if (!passwordCorrecta) {
            return res.status(400).json({
                message: "Email o contraseña incorrecta"
            });
        }

        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        const token = jwt.sign(payload, SECRET_JWT, { expiresIn: '1h' });

        return res.status(200).json({
            message: "Acceso concedido",
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al intentar loguearse",
            error: error.message
        });
    }
};

module.exports = {
    login
};