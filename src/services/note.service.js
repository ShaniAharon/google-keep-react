
import { storageService } from "./async-storage.service";

const STORAGE_KEY = 'notes'

export const noteService = {
    query,
    getEmptyNote,
    createNote,
    remove,
    save,
    clearHistory
}

// const notes = [
//     { _id: makeId(), name: 'Greatplace', lat: 34, lng: -80 },
// ]



async function save(note) {
    if (note._id) {
        console.log('note update', note);
        return storageService.put(STORAGE_KEY, note)
    } else {
        console.log('note save', note);
        return storageService.post(STORAGE_KEY, note)
    }

}





async function remove(noteId) {
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



async function query() {
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


