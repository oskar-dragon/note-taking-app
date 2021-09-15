import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

const app = document.getElementById("app");
const view = new NotesView(app, {
  onNoteSelect() {
    console.log("Note has been selected");
  },

  onNoteAdd() {
    console.log("Note has been added");
  },

  onNoteEdit(newTitle, newBody) {
    console.log(newTitle + " " + newBody);
  },
});

console.log(NotesAPI.getAllNotes());
