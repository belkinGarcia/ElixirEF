import express from 'express';

import { createProduct, deleteProductById, getProducts, updateProductById } from '../controllers/products.controller.js';

const router = express.Router();

router.get('/products', getProducts);
router.post('/add-product', createProduct)
router.put('/update-product/:id', updateProductById)
router.delete('/delete-product/:id', deleteProductById)

export default router;
