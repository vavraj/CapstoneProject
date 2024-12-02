// to populate the database

const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Import Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/book'));
app.use('/api/borrow', require('./routes/borrow'));
app.use('/api/return', require('./routes/return'));

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
