import React from 'react'
import {useNavigate} from 'react-router-dom'
import {NotePreview} from './NotePreview'

export const NoteList = ({notes, onRemoveNote}) => {
  const navigate = useNavigate()
  const handleClick = (noteId) => {
    navigate('/edit/' + noteId)
  }

  if (!notes) return <div>Loading...</div>
  return (
    <div className="note-list ">
      <h2 className="text-center u">Notes</h2>
      <ul className="clean-list masonry ">
        {notes.map((note) => (
          <NotePreview
            onRemoveNote={onRemoveNote}
            handleClick={() => handleClick(note._id)}
            key={note._id}
            note={note}
          />
        ))}
      </ul>
    </div>
  )
}
