import { poolPromise, sql } from '../config/db.js';

export const getAllUsers = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM usuarios');
        return result.recordset;
    } catch (error) {
        console.error('Database Query Error: ', error);
        throw error;
    }
};

export const createUser = async (name, email) => {
    try {
        const pool = await poolPromise;
        await pool
            .request()
            .input('Nombre', sql.NVarChar, name)
            .input('Correo', sql.NVarChar, email)
            .input('Contrasena', sql.NVarChar, email)
            .input('Rol', sql.NVarChar, email)
            .query('INSERT INTO usuarios (Nombre, Correo, Contrasena, Rol) VALUES (@Nombre, @Correo, @Contrasena, @Rol )');
        return { message: 'User created successfully' };
    } catch (error) {
        console.error('Database Query Error: ', error);
        throw error;
    }
};

export const loginUserDb = async (email, password) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
        .input('Correo', sql.NVarChar, email)
        .input('Contrasena', sql.NVarChar, password)
        .query('SELECT * FROM usuarios WHERE Correo = @Correo AND Contrasena = @Contrasena');
        if (result.recordset.length === 0) {
            throw new Error('Invalid email or password');
        }
        return result.recordset[0]; 
    } catch (error) {
        console.error('Database Query Error: ', error);
        throw error;
    }
}