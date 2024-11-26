import { getAllUsers, createUser, loginUserDb } from '../models/user.model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

export const addUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await createUser(name, email);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await loginUserDb(email, password);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            message: 'Usuario o Contraseña Incorrectos', 
            error: error.message
        });
    }
};