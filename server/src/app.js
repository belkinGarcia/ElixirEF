import express from 'express';
import cors from 'cors'; // Import the CORS middleware
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';

const app = express();

// Enable CORS for all routes
app.use(cors()); 

// Parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', userRoutes);
app.use('/api', productRoutes);

export default app;
