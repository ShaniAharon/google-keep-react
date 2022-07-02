import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {saveNote} from '../store/actions/noteActions'

export const NotePreview = ({handleClick, onRemoveNote, note}) => {
  //TODO: can use the switchRender func to render the right stuff in the note
  const [isShow, setIsShow] = useState(false)
  const [isShowColor, setIsShowColor] = useState(false)
  const dispatch = useDispatch()

  const onHover = () => {
    setIsShow(true)
  }

  const onOut = () => {
    setIsShow(false)
  }

  const showColorPalate = () => {
    setIsShowColor((prev) => !prev)
  }

  const changeNoteColor = () => {
    note.color = 'antiquewhite'
    dispatch(saveNote(note))
  }

  return (
    <div
      style={{backgroundColor: note.color}}
      onClick={() => handleClick(note)}
      key={note._id}
      className="note-info pos-relative"
      onMouseOver={onHover}
      onMouseOut={onOut}
    >
      <div className="main-note-container">
        <h4>{note.txt}</h4>
        {note?.items && (
          <ul>
            {note?.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {note?.imgUrl && <img src={note.imgUrl} alt="img" />}
      </div>

      <div className={'btn-container' + (isShow ? ' vis' : ' not-vis')}>
        <button
          onClick={(ev) => {
            ev.stopPropagation()
            onRemoveNote(note._id)
          }}
        >
          Delete
        </button>
        <button
          onClick={(ev) => {
            ev.stopPropagation()
            showColorPalate()
          }}
        >
          Colors
        </button>
      </div>
      <div
        className={'color-picker-container' + (isShowColor ? ' show' : ' hide')}
      >
        <div
          className="color-box"
          onClick={(ev) => {
            ev.stopPropagation()
            changeNoteColor()
          }}
        ></div>
      </div>
    </div>
  )
}
