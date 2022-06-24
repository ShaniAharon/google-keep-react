import React, {useEffect, useState} from 'react'
import {NoteList} from '../cmps/NoteList'
import {eventBus} from '../services/eventBusService'
import {noteService} from '../services/note.service.js'

export const KeepApp = () => {
  const [txt, setText] = useState('')
  const [note, setNote] = useState(null)

  useEffect(() => {
    //async update , soo you can use other effect to track a change
    //then save in the service or do an action
    setNote(noteService.getEmptyNote())
  }, [])

  useEffect(() => {
    if (!note || !note.txt) return
    saveNewNote()
  }, [note])

  const saveNewNote = async () => {
    await noteService.saveNote(note)
    eventBus.emit('note')
  }

  const handleChange = ({target}) => {
    console.log('target.value', target.value)
    setText(target.value)
  }

  const handleClick = () => {
    setNote((prevNote) => ({...prevNote, txt}))
  }

  return (
    <section className="map-app-container container  container-clean">
      <div>
        <div className="input-content-container">
          {/* <div
            contentEditable="true"
            aria-multiline="true"
            role="textbox"
            className="content-edit IZ65Hb-YPqjbf fmcmS-x3Eknd h1U9Be-YPqjbf"
            aria-label="Take a note…"
            tabIndex="0"
            spellCheck="false"
            value={txt}
          ></div> */}
          <input type="text" onChange={handleChange} value={txt} name="txt" />
          <button onClick={handleClick}>Create</button>
        </div>
        <p>{txt}</p>
        <pre>{JSON.stringify(note)}</pre>
      </div>
      <div>
        <NoteList />
      </div>
    </section>
  )
}
