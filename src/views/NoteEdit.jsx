import React, {useEffect} from 'react'
import {useForm} from '../hooks/useForm'
import {noteService} from '../services/note.service'
import {useNavigate, useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {saveNote} from '../store/actions/noteActions'

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

  const goBack = (ev) => {
    ev.preventDefault()
    navigate('/')
  }

  if (!note) return <div>Loading...</div>
  return (
    <section className="note-edit">
      <pre>{JSON.stringify(note)}</pre>
      <div className="outer-container">
        <div className="input-content-container">
          <input
            type="text"
            className="txt-input"
            placeholder="Take a note…"
            onChange={handleChange}
            value={note.txt}
            name="txt"
          />
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
