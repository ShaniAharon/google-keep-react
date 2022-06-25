import React from 'react'

export const NotePreview = ({handleClick, removeNote, note}) => {
  return (
    <div onClick={() => handleClick(note)} key={note._id} className="note-info">
      <h4>{note.txt}</h4>
      <button
        onClick={(ev) => {
          ev.stopPropagation()
          removeNote(note._id)
        }}
      >
        {' '}
        Delete
      </button>
      {/* <img src={noteImg} alt="" /> */}
    </div>
  )
}
