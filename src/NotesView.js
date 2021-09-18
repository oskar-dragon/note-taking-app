export default class NotesView {
  //
  constructor(
    // root refers to a div with a class of "notes" and id "app". When application is initialised
    // the whole div is going to be passed to root.
    // The other parameter is an object that is destructurised
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `
      <div class="notes__sidebar">
        <button class="notes__add" type="button">Add Note</button>
        <div class="notes__list"></div>
      </div>
      <div class="notes__preview">
        <input class="notes__title" type="text" placeholder="New Note"
        />
        <textarea class="notes__body" placeholder="Take note..."></textarea>
      </div>
    `;

    const btnAddNote = this.root.querySelector(".notes__add");
    const inpTitle = this.root.querySelector(".notes__title");
    const inpBody = this.root.querySelector(".notes__body");
    const notesListEl = this.root.querySelector("notes__list");

    // When addButton is clicked, it will add a new note.
    btnAddNote.addEventListener("click", () => {
      this.onNoteAdd();
    });

    // When title or body input field is left, it will update the note that is being currently edited.
    // It takes both and passes it as a parameter to onNoteEdit function that calls
    // another function that is responsible for saving new notes into a localStorage
    // and refreshing it.
    [inpTitle, inpBody].forEach(inputField => {
      inputField.addEventListener("blur", () => {
        const updatedTitle = inpTitle.value.trim();
        const updatedBody = inpBody.value.trim();

        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });

    this.updateNotePreviewVisibility(false);
  }

  // This method creates an HTML that will crete an HTMl for a sidebar.
  _createListItemHTML(id, title, body, updated) {
    // This is for shorting out the body length, so the whole text doesn't render out.
    const MAX_BODY_LENGTH = 60;

    return `
    <div class="notes__list-item" data-note-id="${id}">
      <h2 class="notes__small-title">${title}</h2>
      <p class="notes__small-body">${body.substring(0, MAX_BODY_LENGTH)}</p>
      <p class="notes__small-updated">${updated.toLocaleString(undefined, {
        dateStyle: "full",
        timeStyle: "short",
      })}</p>
  </div>
    `;
  }

  // This method is responsible for updating noteList. It takes an array of notes
  // as a parameter from NotesAPI
  updateNoteList(notes) {
    // it takes an element with a note list where we can append a new note.
    const notesListContainer = this.root.querySelector(".notes__list");

    // Empty list
    notesListContainer.innerHTML = "";

    // Add all notes to a sidebar list
    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );

      // Inserts HTML before the end of the container (one after another)
      notesListContainer.insertAdjacentHTML("beforeend", html);
    }

    // Add select/delete events for each list item
    notesListContainer
      .querySelectorAll(".notes__list-item")
      .forEach(noteListItem => {
        noteListItem.addEventListener("click", () => {
          this.onNoteSelect(noteListItem.dataset.noteId);
        });

        // When user doubleclicks the note, it will ask if user is sure of it and
        // if confirmed it will delete
        noteListItem.addEventListener("dblclick", () => {
          const doDelete = confirm(
            "Are you sure you want to delete this note?"
          );

          if (doDelete) {
            this.onNoteDelete(noteListItem.dataset.noteId);
          }
        });
      });
  }

  // This method id responsible for showing the note that we clicked on. It takes
  // a note as a param. It also selects the note visually on a sidebar.
  updateActiveNote(note) {
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;

    // If any of notes from a sidebar have that class, the class is being removed
    this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
      noteListItem.classList.remove("notes__list-item--selected");
    });

    // Class is assigned to an element with the id
    this.root
      .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
      .classList.add("notes__list-item--selected");
  }

  // Hides the note input fields if visible flag is false.
  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes__preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
