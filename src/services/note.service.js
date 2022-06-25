
import { storageService } from "./async-storage.service";

const STORAGE_KEY = 'notes'

export const noteService = {
    query,
    getEmptyNote,
    createNote,
    remove,
    save,
    clearHistory,
    getById,
    getEmptyNoteItems
}

async function query() {
    const storageNotes = await storageService.query(STORAGE_KEY)
    if (storageNotes.length) return storageNotes
    return storageService.postMany(STORAGE_KEY, [])
}

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

async function getById(noteId) {
    return storageService.get(STORAGE_KEY, noteId)
}



async function clearHistory() {
    return await storageService.clear(STORAGE_KEY)
}

function getEmptyNote() {
    return {
        type: 'txt',
        txt: '',
        color: '#ffffff'
    }
}

function getEmptyNoteItems() {
    return {
        type: 'items',
        items: [],
        txt: '',
        color: '#ffffff'
    }
}

function createNote({ searchNote }) {
    return {
        searchNote: ''
    }
}





