const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth.routes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
    res.json({ message: 'Auth Todo API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});