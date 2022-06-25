import React, {useEffect, useState} from 'react'
import {eventBus} from '../services/eventBusService'
import {noteService} from '../services/note.service'
import {Modal} from './Modal'
import {NotePreview} from './NotePreview'

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
    const notes = await noteService.query()
    setNotes(notes)
  }

  const handleClick = (note) => {
    setCurrNote(note)
    eventBus.emit('note', currNote)
    eventBus.emit('open', true)
  }

  const removeNote = async (noteId) => {
    await noteService.remove(noteId)
    loadNotes()
  }

  if (!notes) return <div>Loading...</div>
  return (
    <div className="note-list">
      <h2 className="text-center u">Notes</h2>
      <ul className="clean-list ">
        {notes.map((note) => (
          <NotePreview
            removeNote={removeNote}
            handleClick={handleClick}
            key={note._id}
            note={note}
          />
        ))}
      </ul>
      <Modal note={currNote} />
    </div>
  )
}
