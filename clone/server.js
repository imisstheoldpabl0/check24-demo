const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Handle root path - redirect to results.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'results.html'));
});

// Fallback for any other routes - serve results.html
app.get('*', (req, res) => {
    // Check if requested file exists, otherwise serve results.html
    const requestedPath = path.join(__dirname, req.path);
    if (requestedPath.endsWith('.html') || requestedPath.endsWith('.css') ||
        requestedPath.endsWith('.js') || requestedPath.endsWith('.svg') ||
        requestedPath.endsWith('.png') || requestedPath.endsWith('.jpg') ||
        requestedPath.endsWith('.webp')) {
        res.sendFile(requestedPath, (err) => {
            if (err) {
                res.status(404).send('File not found');
            }
        });
    } else {
        res.sendFile(path.join(__dirname, 'results.html'));
    }
});

// Start server
app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('  CHECK24 Insurance Clone Server');
    console.log('='.repeat(60));
    console.log(`\n  ✓ Server running at: http://localhost:${PORT}`);
    console.log(`  ✓ Open your browser and navigate to the URL above`);
    console.log(`\n  Pages available:`);
    console.log(`    • Results:        http://localhost:${PORT}/results.html`);
    console.log(`    • Details:        http://localhost:${PORT}/details.html`);
    console.log(`    • Personalize:    http://localhost:${PORT}/personalize.html`);
    console.log(`    • Contract Form:  http://localhost:${PORT}/contract-form.html`);
    console.log(`    • Payment:        http://localhost:${PORT}/payment.html`);
    console.log(`\n  Press Ctrl+C to stop the server`);
    console.log('='.repeat(60) + '\n');
});

// Handle errors
app.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${PORT} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${PORT} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});
