export default class NotesAPI {
  // Method that retrieves all notes from localStorage and returns sorted notes (by date).
  static getAllNotes() {
    // If there are no notes in the system, create an empty array.
    const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

    // Return an array with notes sorted by date and time. This will allow us to show
    // updated note at the top of the list.
    return notes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static updateNote(oldNote, newNote) {
    oldNote.title = newNote.title;
    oldNote.body = newNote.body;
    oldNote.updated = new Date().toISOString();

    return oldNote;
  }
  // An object is passed as a parameter to this method and then, and ID and date is added.
  // Once they are added, the note with id and date is returned
  static createNote(note) {
    note.id = Math.floor(Math.random() * 10000);
    note.updated = new Date().toISOString();

    return note;
  }

  // Method that adds new notes and update existing ones. It also checks if note exists.
  // If it does, then it updates the existing note. Otherwise, it pushes a new note.
  // Then, it saves it in a localStorage
  static saveNote(noteToSave) {
    const notes = this.getAllNotes();
    const existingNote = notes.find(note => note.id == noteToSave.id);

    if (existingNote) {
      this.updateNote(existingNote, noteToSave);
    } else {
      notes.push(NotesAPI.createNote(noteToSave));
    }

    localStorage.setItem(`notesapp-notes`, JSON.stringify(notes));
  }

  // Method that takes an ID of a note as a paramter, finds that note in a localStorage
  // if it finds it, it deletes it (filters through and array and returns a new array without
  // that object with id we passed in). Then it saves a new array in a localStorage
  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const newNotes = notes.filter(note => note.id != id);

    localStorage.setItem(`notesapp-notes`, JSON.stringify(newNotes));
  }
}
