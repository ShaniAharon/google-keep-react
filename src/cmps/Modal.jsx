import React, {useEffect, useState} from 'react'
import {eventBus} from '../services/eventBusService'

export const Modal = () => {
  const [color, setColor] = useState('#826262')
  const [isShow, setShow] = useState(false)

  useEffect(() => {
    const unsubscribeModal = eventBus.on('open', (isOpen) => {
      setShow(isOpen)
    })

    return () => {
      unsubscribeModal()
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

  return (
    <div
      className={'modal pos-center pos-relative' + (isShow ? ' show' : ' hide')}
    >
      <h2 className="text-center u">Pick It</h2>
      <form onSubmit={onSaveColor} className="">
        <input
          type="color"
          onChange={handleChange}
          value={color}
          name="color"
          className="form-input"
        />
        <button className="btn btn-primary pos-center">Save</button>
        <button
          type="button"
          onClick={() => setShow(false)}
          className="btn btn-danger  m-4"
        >
          Cancel
        </button>
      </form>
    </div>
  )
}
