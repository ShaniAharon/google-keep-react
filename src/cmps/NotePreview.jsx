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

  const changeNoteColor = (color) => {
    note.color = color
    dispatch(saveNote(note))
  }

  const getColors = () => {
    const colors = [
      {name: 'red', color: '#e91e63'},
      {name: 'purple', color: '#9c27b0'},
      {name: 'blue', color: '#3f51b5'},
      {name: 'yellow', color: '#ffeb3b'},
      {name: 'green', color: '#4caf50'},
    ]
    return colors
  }

  return (
    <div
      style={{backgroundColor: note.color}}
      onClick={() => handleClick(note)}
      key={note._id}
      className="note-info pos-relative grid-preview"
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
        <i
          onClick={(ev) => {
            ev.stopPropagation()
            onRemoveNote(note._id)
          }}
          class="fa-solid fa-circle-minus minus"
        ></i>

        <div
          onClick={(ev) => {
            ev.stopPropagation()
            showColorPalate()
          }}
          className="palette"
        ></div>

        {/* <button
          onClick={(ev) => {
            ev.stopPropagation()
            showColorPalate()
          }}
        >
          Colors
        </button> */}
      </div>
      <div
        className={
          'color-picker-container' + (isShowColor ? ' show-color-btn' : ' hide')
        }
        onClick={(ev) => ev.stopPropagation()}
      >
        {getColors().map(({name, color}) => {
          return (
            <div
              className={'color-box bclr-' + name}
              onClick={(ev) => {
                ev.stopPropagation()
                changeNoteColor(color)
              }}
              key={color}
            ></div>
          )
        })}
      </div>
    </div>
  )
}
