
import { storageService } from "./async-storage.service";

const STORAGE_KEY = 'notes'

export const noteService = {
    getNotes,
    getEmptyNote,
    createNote,
    saveNote,
    removeNote,
    clearHistory
}

// const notes = [
//     { _id: makeId(), name: 'Greatplace', lat: 34, lng: -80 },
// ]

async function saveNote(note) {
    console.log('note', note);
    return storageService.post(STORAGE_KEY, note)
}

async function removeNote(noteId) {
    return storageService.remove(STORAGE_KEY, noteId)
}

async function clearHistory() {
    return await storageService.clear(STORAGE_KEY)
}

function getEmptyNote() {
    return {
        txt: '',
        color: ''
    }
}

function createNote({ searchNote }) {
    return {
        searchNote: ''
    }
}



async function getNotes() {
    const storageNotes = await storageService.query(STORAGE_KEY)
    if (storageNotes.length) return storageNotes
    console.log('example');
    return storageService.postMany(STORAGE_KEY, [])
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(notes);
    //     }, 1000)
    // });

}


