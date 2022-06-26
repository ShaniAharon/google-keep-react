import React from 'react'

export const CanvasPaint = () => {
  return (
    <section>
      <div>CanvasPaint</div>
      <div className="btn-container">
        <button>Save</button>
        <button>Clear</button>
        <input type="color" />
      </div>
      <canvas width={500} height={500}></canvas>
    </section>
  )
}
