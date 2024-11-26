import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
} from '../models/product.model.js';

export const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await getProductById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

export const createProduct = async (req, res) => {
    const { name, brand, description, price, stock, image } = req.body;
    try {
        const result = await addProduct(name, brand, description, price, stock, image);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

export const updateProductById = async (req, res) => {
    console.log(req.params)
    console.log(req.body)
    const { id } = req.params;
    const { name, description, price, stock, image } = req.body;
    try {
        const result = await updateProduct(id, name, description, price, stock, image);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

export const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteProduct(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
