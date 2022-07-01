import React, {useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {uploadImg} from '../services/img-upload.service'
import {noteService} from '../services/note.service'
import {saveNote} from '../store/actions/noteActions'
import {useDispatch} from 'react-redux'

export const CanvasPaint = () => {
  let navigate = useNavigate()
  const elCanvas = useRef(null)
  let ctx = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('elCanvas', elCanvas)
    console.log('elCanvas', elCanvas)
    ctx.current = elCanvas.current.getContext('2d')
  }, [])
  const goBack = () => {
    navigate('/')
  }

  const drawReact = (x, y) => {
    ctx.current.beginPath()
    ctx.current.rect(x, y, 100, 100)
    ctx.current.fillStyle = 'red' //gColor
    ctx.current.fillRect(x, y, 100, 100)
  }

  const draw = ({offsetX: x, offsetY: y}) => {
    console.log('ev', x, y)
    drawReact(x, y)
  }

  const clearCanavs = () => {
    ctx.current.clearRect(0, 0, elCanvas.current.width, elCanvas.current.height)
  }

  //TODO: allow to return and edit the canvas draw we have
  const getData = async () => {
    const data = elCanvas.current.toDataURL()
    const imgFile = await dataUrlToFile(data, 'test')
    const {url: imgUrl} = await uploadImg(imgFile)
    const canvasNote = noteService.getEmptyNoteCanvas()
    canvasNote.imgUrl = imgUrl
    canvasNote.dataUrl = data
    canvasNote.txt = 'my new canvas'
    dispatch(saveNote(canvasNote))
    navigate('/')
  }

  const dataUrlToFile = async (dataUrl, fileName) => {
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    return new File([blob], fileName, {type: 'image/png'})
  }

  return (
    <section>
      <div>CanvasPaint</div>
      <div className="btn-section">
        <button onClick={getData}>Save</button>
        <button onClick={clearCanavs}>Clear</button>
        <button onClick={goBack}>Back</button>
        <input type="color" />
      </div>
      <canvas
        onClick={({nativeEvent: ev}) => draw(ev)}
        ref={elCanvas}
        width={500}
        height={500}
      ></canvas>
    </section>
  )
}
