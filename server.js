const { json } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

const notes = [];

require("./Develop/db/db.json")
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
})

app.get("/api/notes", (req, res) => {
    const noteList = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));

    res.json(noteList);
})

app.post("/api/notes", (req, res) => {

    var newNote = req.body;
    // add unique ID to note
    // add test functionality to determine if ID already exists, if it does: generate new ID;
    newNote.id = newNote.title.substring(0, 3) + newNote.text.substring(0, 3) + Math.floor(Math.random() * 100);
    console.log("New Note to add: " + JSON.stringify(newNote));

    // get previously generated notes
    let noteArr = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    // append new note to array
    noteArr.push(newNote);
    // write array back into db.json
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteArr), "utf8");
    res.json(noteArr);
})

app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    // console.log("Target ID: " + id);

    let noteArr = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    // console.log("Notes: " + JSON.stringify(noteArr));

    for (let i = 0; i < noteArr.length; i++) {
        if (noteArr[i].id === id) {
            console.log("Note to delete: " + JSON.stringify(noteArr[i]));
            noteArr.splice(i, 1);
            break;
        }
    }

    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteArr), "utf8");
    res.json(noteArr);
});

// server listener
app.listen(PORT, () => console.log("App listening on PORT: " + PORT));