// It ties everything together
import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());

    // When the application is first started up, it will load notes
    this._refreshNotes();
  }

  _refreshNotes() {
    const notes = NotesAPI.getAllNotes();

    //it calls our UI and shows notes. 
    this._setNotes(notes);

    // If there more than one note, it should set the first note as active. 
    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  // It takes all notes and updates them.
  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }

  // it makes a note as active
  _setActiveNote(note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }

  _handlers() {
    return {
      // the ID of a selected note is passed in as parameter. selectedNote holds an object
      // on a note with that ID. Then, it is being passed to _setActiveNote method that puts
      // this note into an editor.
      onNoteSelect: noteId => {
        const selectedNote = this.notes.find(note => note.id == noteId);
        this._setActiveNote(selectedNote);
      },

      // When add button is clicked, it will create an object with an empty title and body and,
      // then it will be passed to a save note function that will save it in a localStorage
      // then refresh element. 
      onNoteAdd: () => {
        const newNote = {
          title: "",
          body: "",
        };

        NotesAPI.saveNote(newNote);
        this._refreshNotes();
      },

      // When editing, take a note and save it in a localStorage
      onNoteEdit: (title, body) => {
        NotesAPI.saveNote({
          id: this.activeNote.id,
          title,
          body,
        });

        this._refreshNotes();
      },
      // id of the note that we want to delete is passed. 
      onNoteDelete: noteId => {
        NotesAPI.deleteNote(noteId);
        this._refreshNotes();
      },
    };
  }
}
