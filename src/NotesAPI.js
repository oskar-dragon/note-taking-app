export default class NotesAPI {
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

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

  static createNote(note) {
    note.id = Math.floor(Math.random() * 10000);
    note.updated = new Date().toISOString();

    return note;
  }

  // This is going to add new notes and update them
  static saveNote(noteToSave) {
    const notes = NotesAPI.getAllNotes();
    const existingNote = notes.find(note => note.id == noteToSave.id);

    if (existingNote) {
      this.updateNote(existingNote, noteToSave);
    } else {
      notes.push(this.createNote(noteToSave));
    }

    localStorage.setItem(`notesapp-notes`, JSON.stringify(notes));
  }

  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const newNotes = notes.filter(note => note.id != id);

    localStorage.setItem(`notesapp-notes`, JSON.stringify(newNotes));
  }
}
