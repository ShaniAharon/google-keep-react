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
      {note?.items && (
        <ul>
          {note?.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {note?.imgUrl && <img src={note.imgUrl} alt="img" />}
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
