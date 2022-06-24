import React, {useEffect, useState} from 'react'
import {eventBus} from '../services/eventBusService'
import {noteService} from '../services/note.service'

export const Modal = ({note}) => {
  const [color, setColor] = useState('#826262')
  const [isShow, setShow] = useState(false)
  const [myNote, setMyNote] = useState(null)

  //part 2 25:18, can help
  useEffect(() => {
    const unsubscribeModal = eventBus.on('open', (isOpen) => {
      setShow(isOpen)
    })
    const unsubscribeNote = eventBus.on('note', (note) => {
      //fix problem with not showing the right txt
      setMyNote(note)
    })
    return () => {
      unsubscribeModal()
      unsubscribeNote()
    }
  }, [])

  const onSaveColor = async (ev) => {
    ev.preventDefault()
    eventBus.emit('color', color)
    setShow(false)
  }

  const handleChange = ({target}) => {
    setColor(target.value)
  }

  const changeNote = ({target}) => {
    setMyNote((prevNote) => ({...prevNote, txt: target.value}))
  }

  return (
    <div
      className={'modal pos-center pos-relative' + (isShow ? ' show' : ' hide')}
    >
      <h2 className="text-center u">Pick It</h2>
      <form onSubmit={onSaveColor} className="modal-form">
        {myNote && (
          <input type="text" onChange={changeNote} value={myNote.txt} />
        )}

        <input
          type="color"
          onChange={handleChange}
          value={color}
          name="color"
          className="form-input"
        />
        <button className="btn btn-primary btn-save ">Save</button>
        {/* <button
          type="button"
          onClick={() => setShow(false)}
          className="btn btn-danger  m-4"
        >
          Cancel
        </button> */}
      </form>
    </div>
  )
}
