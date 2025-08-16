const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Security headers for the assignment
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Serve static files
app.use(express.static(__dirname));

// Main route - serve your notes app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint (useful for monitoring)
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Sensi Notes App running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});