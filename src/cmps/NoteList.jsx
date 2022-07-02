import React, {useState} from 'react'
import {eventBus} from '../services/eventBusService'
import {Modal} from './Modal'
import {NotePreview} from './NotePreview'

export const NoteList = ({notes, onRemoveNote}) => {
  const [currNote, setCurrNote] = useState(null)

  const handleClick = (note) => {
    setCurrNote(note)
    eventBus.emit('note', currNote)
    eventBus.emit('open', true)
  }

  if (!notes) return <div>Loading...</div>
  return (
    <div className="note-list ">
      <h2 className="text-center u">Notes</h2>
      <ul className="clean-list masonry ">
        {notes.map((note) => (
          <NotePreview
            onRemoveNote={onRemoveNote}
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
