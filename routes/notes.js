const fs = require("fs");
const notesRouter = require("express").Router();
const db = "./db/db.json"

notesRouter.get("/", (req, res) => {
    const notesUpdated = JSON.parse(fs.readFileSync(db));
    return res.json(notesUpdated);
});

notesRouter.post("/", (req, res) => {
    const newNote = req.body;
    const currentNotes = fs.readFileSync(db);
    let notesList = JSON.parse(currentNotes);

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

notesRouter.delete("/:id", (req, res) => {
    const notesCurrent = fs.readFileSync(db);
    const notesID = req.params.id;
    let notesList = JSON.parse(notesCurrent);

    notesList = notesList.filter((note) => note.id != notesID);
    fs.writeFileSync(db, JSON.stringify(notesList));
    res.json();
});

module.exports = notesRouter;
