import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NoteList} from '../cmps/NoteList'
import {loadNotes, removeNote} from '../store/actions/noteActions'
import {Link} from 'react-router-dom'

export const KeepApp = () => {
  const {notes} = useSelector((state) => state.noteModule)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadNotes())
    // eslint-disable-next-line
  }, [])

  const onRemoveNote = async (noteId) => {
    dispatch(removeNote(noteId))
  }

  if (!notes) return <div>Loading...</div>
  return (
    <section className="map-app-container container  container-clean">
      <Link to="/edit">Add Note</Link>
      <div>
        <NoteList onRemoveNote={onRemoveNote} notes={notes} />
      </div>
    </section>
  )
}
