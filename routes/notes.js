const notesRouter = require('express').Router();
const fs = require('fs');

notesRouter.get('/', (req, res) =>
  readFromFile('./db/db.json')
  .then((data) => res.json(JSON.parse(data)))
);

