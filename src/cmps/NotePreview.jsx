import React from 'react'

export const NotePreview = ({handleClick, onRemoveNote, note}) => {
  return (
    <div
      style={{backgroundColor: note.color}}
      onClick={() => handleClick(note)}
      key={note._id}
      className="note-info"
    >
      <h4>{note.txt}</h4>
      <button
        onClick={(ev) => {
          ev.stopPropagation()
          onRemoveNote(note._id)
        }}
      >
        {' '}
        Delete
      </button>
      {/* <img src={noteImg} alt="" /> */}
    </div>
  )
}
