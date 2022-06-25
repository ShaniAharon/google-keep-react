import React, {useEffect} from 'react'
import {useForm} from '../hooks/useForm'
import {noteService} from '../services/note.service'
import {useNavigate, useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {saveNote} from '../store/actions/noteActions'
import {ImgUpload} from '../cmps/ImgUpload'

export const NoteEdit = () => {
  const [note, handleChange, setNote] = useForm(null)

  let navigate = useNavigate()
  let params = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    loadNote()
    // eslint-disable-next-line
  }, [])

  const loadNote = async () => {
    const id = params.id
    const note = id ? await noteService.getById(id) : noteService.getEmptyNote()
    setNote(note)
  }

  const onSaveNote = async () => {
    dispatch(saveNote(note))
    setNote(noteService.getEmptyNote())
    navigate('/')
  }

  const enterItems = () => {
    const items = [...note.txt.trim().split(' ')]
    setNote((prevNote) => ({...prevNote, items}))
  }

  const goBack = (ev) => {
    ev.preventDefault()
    navigate('/')
  }

  //TODO: make it one func for change note type
  const changeToItemsList = () => {
    setNote(noteService.getEmptyNoteItems())
  }
  const changeToImg = () => {
    setNote(noteService.getEmptyNoteImg())
  }

  const handleImg = (imgUrl) => {
    //TODO: can block the save button until the img url ready , or show loading
    setNote((prevNote) => ({...prevNote, imgUrl}))
  }

  //TODO: add canvas note

  const renderSwitch = (type) => {
    switch (type) {
      case 'txt':
        return (
          <input
            type="text"
            className="txt-input"
            placeholder="Take a note…"
            onChange={handleChange}
            value={note.txt}
            name="txt"
          />
        )
      case 'items':
        return (
          <>
            <input
              type="text"
              className="txt-input"
              placeholder="Enter list items..."
              onChange={handleChange}
              value={note.txt}
              name="txt"
            />
            <button onClick={enterItems}>Enter items</button>
          </>
        )
      case 'img':
        return <ImgUpload handleImg={handleImg} />
      default:
        return <h1>No type</h1>
    }
  }

  if (!note) return <div>Loading...</div>
  return (
    <section className="note-edit">
      <pre>{JSON.stringify(note)}</pre>

      <div className="outer-container">
        <div className="input-content-container">
          {renderSwitch(note.type)}
          {/* <input
              type="text"
              className="txt-input"
              placeholder="Take a note…"
              onChange={handleChange}
              value={note.txt}
              name="txt"
            /> */}
          <button onClick={changeToItemsList}>list</button>
          <button onClick={changeToImg}>img</button>
        </div>
      </div>
      <input
        type="color"
        className="color-input"
        onChange={handleChange}
        value={note.color}
        name="color"
      />
      <div className="btn-group">
        <button onClick={onSaveNote} className="btn btn-success">
          save
        </button>
        <button onClick={(ev) => goBack(ev)} className="btn btn-danger-text">
          cancel
        </button>
      </div>
    </section>
  )
}
