const fs = require("fs");
const notesRouter = require("express").Router();
const db = "./db/db.json"

// GET Route for retrieving all the notes
notesRouter.get("/", (req, res) => {
    const notesUpdated = JSON.parse(fs.readFileSync(db));
    return res.json(notesUpdated);
});

// POST Route for a new note
notesRouter.post("/", (req, res) => {
    const newNote = req.body;
    const currentNotes = fs.readFileSync(db);
    let notesList = JSON.parse(currentNotes);
    //Empty at the start but counts up from 1 every new note 
    let idsCurrent = [];
    let idsNew = 0;
    let idsUnique = false;

    for (notes of notesList) {
        idsCurrent.push(parseInt(notes.id));
    }

    while (!idsUnique) {
        idsNew++;
        if (!idsCurrent.includes(idsNew)) {
            idsUnique = true;
        }
    }
    newNote.id = idsNew;
    notesList.push(newNote);
    fs.writeFileSync(db, JSON.stringify(notesList));
    res.json();
});

// Notes deleted via id as button targets the id and deleted it
notesRouter.delete("/:id", (req, res) => {
    const notesCurrent = fs.readFileSync(db);
    const notesID = req.params.id;
    let notesList = JSON.parse(notesCurrent);

    notesList = notesList.filter((note) => note.id != notesID);
    fs.writeFileSync(db, JSON.stringify(notesList));
    res.json();
});

module.exports = notesRouter;
