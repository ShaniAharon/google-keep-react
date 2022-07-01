
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
    getEmptyNoteItems,
    getEmptyNoteImg,
    getEmptyNoteCanvas
}

async function query(filterBy) {
    const storageNotes = await storageService.query(STORAGE_KEY)
    let notes = storageNotes
    if (filterBy?.txt) {
        const { txt } = filterBy
        notes = notes.filter(note => note.txt.includes(txt.toLowerCase()))
    }
    if (notes.length) return notes
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

function getEmptyNoteImg() {
    return {
        type: 'img',
        imgUrl: '',
        txt: '',
        color: '#ffffff'
    }
}

function getEmptyNoteCanvas() {
    return {
        type: 'canvas',
        imgUrl: '',
        dataUrl: '',
        txt: '',
        color: '#ffffff'
    }
}

function createNote({ searchNote }) {
    return {
        searchNote: ''
    }
}





