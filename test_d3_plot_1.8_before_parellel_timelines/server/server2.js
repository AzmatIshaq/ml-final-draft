const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;  // Choose any available port

app.use(cors());  // Enable CORS for all routes

// Middleware to serve static files from 'public' directory
app.use(express.static('public'));

// Route to serve the JSON data from a specific path
app.get('/data', (req, res) => {

    // Make sure 'line2.json' is inside a folder named 'data' in the root of your project
    res.sendFile(path.join(__dirname, 'data', 'line2.json'));
});

// Example route to test CORS
app.get('/products/:id', (req, res, next) => {
  res.json({msg: 'This is CORS-enabled for all origins!'});
});

app.listen(PORT, () => {
    console.log(`CORS-enabled web server listening on port ${PORT}`);
    console.log(`Server is running on http://localhost:${PORT}`);
});
