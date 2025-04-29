const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Invitacion = require("../models/Invitacion");

exports.register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = new User({username, email, password});
        await user.save();
        res.status(201).json({message: "Usuario registrado con éxito"});
    } catch (error) {
        res.status(400).json({error: "Error al registrar usuario"});
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({error: "Credenciales inválidas"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
        res.json({token, user});
    } catch (error) {
        res.status(400).json({error: "Error al iniciar sesión"});
    }
};

//listar usuarios
exports.listUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({error: "Error al listar usuarios"});
    }
};

exports.verificarInvitacion = async (req, res) => {
    try {
        const {codigo, clave} = req.body;

        const invitacion = await Invitacion.findOne({_id: codigo});

        if (!invitacion) {
            return res.json(false);
        }else{
            console.log('invitacion encontrada');
        }

        if (!clave || !(await bcrypt.compare(clave, invitacion.clave))) {
            return res.json(false);
        }

        if (!invitacion) {
            return res.json(false);
        }
        const token = jwt.sign({id: invitacion._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
        res.json({token, invitacion});
    } catch (error) {
        res.status(400).json({error: "Error al verificar invitación"});
    }
};

exports.actualizarUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id , req.body , {new: true});
        res.json(user);
    } catch (error) {
        res.status(400).json({error: "Error al actualizar usuario"});
    }
};