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
  }, [])

  const loadNote = async () => {
    const id = params.id
    const note = id ? await noteService.getById(id) : noteService.getEmptyNote()
    setNote(note)
  }

  const onSaveNote = async (ev) => {
    ev.preventDefault()
    dispatch(saveNote(note))
  }

  if (!note) return <div>Loading...</div>
  return (
    <section className="note-edit">
      <pre>{JSON.stringify(note)}</pre>
      <form onSubmit={onSaveNote} className="form">
        <div className="form-control">
          <label htmlFor="txt" className="form-label">
            TEXT
          </label>
          <input
            onChange={handleChange}
            value={note.txt}
            className="form-input"
            type="text"
            name="txt"
            id="txt"
          />
        </div>
      </form>
    </section>
  )
}
