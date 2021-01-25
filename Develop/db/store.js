const util = require("util");
const fs = require("fs");

const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class STore {
    read() {
        return readFileAsync("db/db.json", "utf8");
    }
    write(note) {
        return writeFileAsync("db/db.json", "utf8");
    }
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNOtes = [];
            }
            return parsedNotes;
        });
    }
    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            
        }
    }
}