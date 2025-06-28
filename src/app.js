const express = require('express');
const app = express();

// Prometheus metrics
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Sample API endpoint
app.get('/api/welcome', (req, res) => {
    res.json({ message: 'Welcome to Cloud Counselage DevOps Project!' });
});

// New /massage endpoint
app.get('/massage', (req, res) => {
    res.json({ message: 'This is the massage endpoint.' });
});

module.exports = app;
