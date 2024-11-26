import { poolPromise, sql } from '../config/db.js';

// Get all products
export const getAllProducts = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM productos');
        return result.recordset; // Returns the array of rows
    } catch (error) {
        console.error('Database Query Error: ', error);
        throw error;
    }
};

// Get a product by ID
export const getProductById = async (id) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input('ProductID', sql.Int, id)
            .query('SELECT * FROM productos WHERE PerfumeID = @ProductID');
        return result.recordset[0]; // Returns a single product
    } catch (error) {
        console.error('Database Query Error: ', error);
        throw error;
    }
};

// Add a new product
export const addProduct = async (name, brand, description, price, stock, image) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input('Name', sql.NVarChar, name)
            .input('Marca', sql.NVarChar, brand)
            .input('Description', sql.NVarChar, description)
            .input('Price', sql.Decimal, price)
            .input('Stock', sql.Int, stock)
            .input('Imagen', sql.NVarChar, image)
            .query(
                'INSERT INTO productos (Nombre, Marca, Descripcion, Precio, Stock, Imagen) VALUES (@Name, @Marca, @Description, @Price, @Stock, @Imagen)'
            );
        return { message: 'Product added successfully', productId: result.recordset };
    } catch (error) {
        console.error('Database Query Error: ', error);
        throw error;
    }
};

// Update a product by ID
export const updateProduct = async (id, name, description, price, stock, image) => {
    try {
        const pool = await poolPromise;
        console.log(id)
        await pool
            .request()
            .input('PerfumeID', sql.Int, id)
            .input('Nombre', sql.NVarChar, name)
            .input('Descripcion', sql.NVarChar, description)
            .input('Precio', sql.Decimal, price)
            .input('Stock', sql.Int, stock)
            .input('Imagen', sql.NVarChar, image)
            .query(
                'UPDATE productos SET Nombre = @Nombre, Descripcion = @Descripcion, Precio = @Precio, Stock = @Stock, Imagen = @Imagen WHERE PerfumeID = @PerfumeID'
            );
        return { message: 'Product updated successfully' };
    } catch (error) {
        console.error('Database Query Error: ', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const pool = await poolPromise;
        await pool
            .request()
            .input('ProductID', sql.Int, id)
            .query('DELETE FROM productos WHERE PerfumeID = @ProductID');
        return { message: 'Product deleted successfully' };
    } catch (error) {
        console.error('Database Query Error: ', error);
        throw error;
    }
};
