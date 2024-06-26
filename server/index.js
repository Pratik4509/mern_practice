const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/items', require('./routes/items'));
app.use('/requests', require('./routes/requests'))
app.get('/', (req, res) => {
    res.send('Welcome to the MERN CRUD API');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});