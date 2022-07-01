import React from 'react'
import {useNavigate} from 'react-router-dom'

export const CanvasPaint = () => {
  let navigate = useNavigate()
  const goBack = () => {
    navigate('/')
  }
  //TODO: get a empty canvas note ,
  // on save put the dataurl in it also create an img and save the url
  return (
    <section>
      <div>CanvasPaint</div>
      <div className="btn-section">
        <button>Save</button>
        <button>Clear</button>
        <button onClick={goBack}>Back</button>
        <input type="color" />
      </div>
      <canvas width={500} height={500}></canvas>
    </section>
  )
}
