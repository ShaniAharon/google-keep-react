import React, {useEffect, useState} from 'react'
import {eventBus} from '../services/eventBusService'
import {noteService} from '../services/note.service'

export const NoteList = () => {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    eventBus.on('note', () => {
      loadNotes()
    })
  }, [])

  const loadNotes = async () => {
    const notes = await noteService.getNotes()
    setNotes(notes)
  }

  const handleClick = (noteId) => {
    console.log('noteId', noteId)
    eventBus.emit('noteClicked', noteId)
  }

  if (!notes) return <div>Loading...</div>
  return (
    <div className="note-list pos-relative">
      <h2 className="text-center u">Notes</h2>
      <ul className="clean-list ">
        {notes.map(({_id, txt}) => (
          <div onClick={() => handleClick(_id)} key={_id} className="note-info">
            <h4>{txt}</h4>
            {/* <img src={noteImg} alt="" /> */}
          </div>
        ))}
      </ul>
    </div>
  )
}
