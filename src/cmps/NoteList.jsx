import React, {useEffect, useState} from 'react'
import {eventBus} from '../services/eventBusService'
import {noteService} from '../services/note.service'
import {Modal} from './Modal'

export const NoteList = () => {
  const [notes, setNotes] = useState(null)
  const [currNote, setCurrNote] = useState(null)

  useEffect(() => {
    eventBus.on('note', () => {
      loadNotes()
    })
    loadNotes()
  }, [])

  const loadNotes = async () => {
    const notes = await noteService.getNotes()
    setNotes(notes)
  }

  const handleClick = (note) => {
    setCurrNote(note)
    eventBus.emit('note', currNote)
    eventBus.emit('open', true)
  }

  const removeNote = async (noteId) => {
    await noteService.removeNote(noteId)
    loadNotes()
  }

  if (!notes) return <div>Loading...</div>
  return (
    <div className="note-list">
      <h2 className="text-center u">Notes</h2>
      <ul className="clean-list ">
        {notes.map(({_id, txt}) => (
          <div
            onClick={() => handleClick({_id, txt})}
            key={_id}
            className="note-info"
          >
            <h4>{txt}</h4>
            <button
              onClick={(ev) => {
                ev.stopPropagation()
                removeNote(_id)
              }}
            >
              {' '}
              Delete
            </button>
            {/* <img src={noteImg} alt="" /> */}
          </div>
        ))}
      </ul>
      <Modal note={currNote} />
    </div>
  )
}
