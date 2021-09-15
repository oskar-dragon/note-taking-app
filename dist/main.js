/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/NotesAPI.js":
/*!*************************!*\
  !*** ./src/NotesAPI.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NotesAPI)\n/* harmony export */ });\nclass NotesAPI {\r\n  static getAllNotes() {\r\n    const notes = JSON.parse(localStorage.getItem(\"notesapp-notes\") || \"[]\");\r\n\r\n    return notes.sort((a, b) => {\r\n      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;\r\n    });\r\n  }\r\n\r\n  static updateNote(oldNote, newNote) {\r\n    oldNote.title = newNote.title;\r\n    oldNote.body = newNote.body;\r\n    oldNote.updated = new Date().toISOString();\r\n\r\n    return oldNote;\r\n  }\r\n\r\n  static createNote(note) {\r\n    note.id = Math.floor(Math.random() * 10000);\r\n    note.updated = new Date().toISOString();\r\n\r\n    return note;\r\n  }\r\n\r\n  // This is going to add new notes and update them\r\n  static saveNote(noteToSave) {\r\n    const notes = NotesAPI.getAllNotes();\r\n    const existingNote = notes.find(note => note.id == noteToSave.id);\r\n\r\n    if (existingNote) {\r\n      this.updateNote(existingNote, noteToSave);\r\n    } else {\r\n      notes.push(this.createNote(noteToSave));\r\n    }\r\n\r\n    localStorage.setItem(`notesapp-notes`, JSON.stringify(notes));\r\n  }\r\n\r\n  static deleteNote(id) {\r\n    const notes = NotesAPI.getAllNotes();\r\n    const newNotes = notes.filter(note => note.id != id);\r\n\r\n    localStorage.setItem(`notesapp-notes`, JSON.stringify(newNotes));\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://note-taking-app/./src/NotesAPI.js?");

/***/ }),

/***/ "./src/NotesView.js":
/*!**************************!*\
  !*** ./src/NotesView.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NotesView)\n/* harmony export */ });\nclass NotesView {\r\n  //\r\n  constructor(\r\n    root,\r\n    { onNotesSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}\r\n  ) {\r\n    this.root = root;\r\n    this.onNotesSelect = onNotesSelect;\r\n    this.onNoteAdd = onNoteAdd;\r\n    this.onNoteEdit = onNoteEdit;\r\n    this.onNoteDelete = onNoteDelete;\r\n    this.root.innerHTML = `\r\n      <div class=\"notes__sidebar\">\r\n        <button class=\"notes__add\" type=\"button\">Add Note</button>\r\n        <div class=\"notes__list\"></div>\r\n      </div>\r\n      <div class=\"notes__preview\">\r\n        <input class=\"notes__title\" type=\"text\" placeholder=\"New Note\"\r\n        />\r\n        <textarea class=\"notes__body\" placeholder=\"Take note...\"></textarea>\r\n      </div>\r\n    `;\r\n\r\n    const btnAddNote = this.root.querySelector(\".notes__add\");\r\n    const inpTitle = this.root.querySelector(\".notes__title\");\r\n    const inpBody = this.root.querySelector(\".notes__body\");\r\n    const notesListEl = this.root.querySelector(\"notes__list\");\r\n\r\n    btnAddNote.addEventListener(\"click\", () => {\r\n      this.onNoteAdd();\r\n    });\r\n\r\n    [inpTitle, inpBody].forEach(inputField => {\r\n      inputField.addEventListener(\"blur\", () => {\r\n        const updatedTitle = inpTitle.value.trim();\r\n        const updatedBody = inpBody.value.trim();\r\n\r\n        this.onNoteEdit(updatedTitle, updatedBody);\r\n      });\r\n    });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://note-taking-app/./src/NotesView.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _NotesAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotesAPI.js */ \"./src/NotesAPI.js\");\n/* harmony import */ var _NotesView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotesView.js */ \"./src/NotesView.js\");\n\r\n\r\n\r\nconst app = document.getElementById(\"app\");\r\nconst view = new _NotesView_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](app, {\r\n  onNoteSelect() {\r\n    console.log(\"Note has been selected\");\r\n  },\r\n\r\n  onNoteAdd() {\r\n    console.log(\"Note has been added\");\r\n  },\r\n\r\n  onNoteEdit(newTitle, newBody) {\r\n    console.log(newTitle + \" \" + newBody);\r\n  },\r\n});\r\n\r\nconsole.log(_NotesAPI_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getAllNotes());\r\n\n\n//# sourceURL=webpack://note-taking-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;