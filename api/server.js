const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const chatRoutes = require('./routes/chat');

// Load environment variables from root directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.SERVER_PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`OpenAI API Key configured: ${process.env.OPENAI_API_KEY ? '✓' : '✗'}`);
});

module.exports = app;

