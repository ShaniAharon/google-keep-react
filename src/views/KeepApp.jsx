import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NoteList} from '../cmps/NoteList'
import {eventBus} from '../services/eventBusService'
import {noteService} from '../services/note.service.js'
import {loadNotes, removeNote} from '../store/actions/noteActions'
import {Link, useNavigate} from 'react-router-dom'

export const KeepApp = () => {
  const [txt, setTxt] = useState('')
  const [note, setNote] = useState(null)

  const {notes} = useSelector((state) => state.noteModule)
  const dispatch = useDispatch()

  let navigate = useNavigate()

  useEffect(() => {
    dispatch(loadNotes())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    //async update , soo you can use other effect to track a change
    //then save in the service or do an action
    setNote(noteService.getEmptyNote())
  }, [])

  const onRemoveNote = async (noteId) => {
    dispatch(removeNote(noteId))
  }

  useEffect(() => {
    if (!note || !note.txt) return
    saveNewNote()
    // eslint-disable-next-line
  }, [note])

  const saveNewNote = async () => {
    await noteService.save(note)
    eventBus.emit('note')
  }

  const handleChange = ({target}) => {
    console.log('target.value', target.value)
    setTxt(target.value)
  }

  const handleClick = () => {
    setNote((prevNote) => ({...prevNote, txt}))
    setTxt('')
  }

  if (!notes) return <div>Loading...</div>
  return (
    <section className="map-app-container container  container-clean">
      <div className="outer-container">
        <div className="input-content-container">
          <input
            type="text"
            className="txt-input"
            placeholder="Take a note…"
            onChange={handleChange}
            value={txt}
            name="txt"
          />
          <button onClick={handleClick}>Create</button>
        </div>
        <p>{txt}</p>
        <pre>{JSON.stringify(notes)}</pre>
        <Link to="/edit">Add Note</Link>
      </div>
      <div>
        <NoteList onRemoveNote={onRemoveNote} notes={notes} />
      </div>
    </section>
  )
}
