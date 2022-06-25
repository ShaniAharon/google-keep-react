import { noteService } from "../../services/noteService"

export function loadNotes() {
    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().noteModule
            const notes = await noteService.query(filterBy)
            dispatch({ type: 'SET_ROBOTS', notes })
        } catch (err) {
            console.log('err:', err)
        }

    }
}

export function removeNote(noteId) {
    return async (dispatch) => {
        try {
            await noteService.remove(noteId)
            dispatch({ type: 'REMOVE_ROBOT', noteId })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}

// export function getNoteById(noteId) {
//     return async () => {
//         return await noteService.getById(noteId)
//     }
// }