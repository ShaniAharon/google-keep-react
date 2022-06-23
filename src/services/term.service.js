
import { storageService } from "./async-storage.service";

const STORAGE_KEY = 'terms'

export const termService = {
    getTerms,
    getEmptyTerm,
    createTerm,
    saveTerm,
    removeTerm,
    clearHistory
}

// const terms = [
//     { _id: makeId(), name: 'Greatplace', lat: 34, lng: -80 },
// ]

async function saveTerm({ name: searchTerm }) {
    console.log('term', searchTerm);
    return storageService.post(STORAGE_KEY, { searchTerm })
}

async function removeTerm(termId) {
    return storageService.remove(STORAGE_KEY, termId)
}

async function clearHistory() {
    return await storageService.clear(STORAGE_KEY)
}

function getEmptyTerm() {
    return {
        searchTerm: ''
    }
}

function createTerm({ searchTerm }) {
    return {
        searchTerm: ''
    }
}



async function getTerms() {
    const storageTerms = await storageService.query(STORAGE_KEY)
    if (storageTerms.length) return storageTerms
    return storageService.postMany(STORAGE_KEY, [])
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(terms);
    //     }, 1000)
    // });

}


