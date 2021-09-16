// import NotesAPI from "./NotesAPI.js";
// import NotesView from "./NotesView.js";

import App from "./App.js";

const root = document.getElementById("app");
const app = new App(root);
// const view = new NotesView(app, {
//   onNoteSelect(id) {
//     console.log("Note has been selected" + id);
//   },

//   onNoteAdd() {
//     console.log("Note has been added");
//   },

//   onNoteDelete(id) {
//     console.log("Note Deleted " + id);
//   },

//   onNoteEdit(newTitle, newBody) {},
// });

// const notes = NotesAPI.getAllNotes();

// view.updateNoteList(notes);
// view.updateActiveNote(notes[0]);
