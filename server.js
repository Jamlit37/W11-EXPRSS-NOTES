// Import express package
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

// Initialize our app variable by setting it to the value of express()
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Serve images, css files, js files from the public directory
// Allows us to reference files with their relative path
app.use(express.static('public'));

// GET route that returns index.html page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route that returns notes.html page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Listen for connections
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));