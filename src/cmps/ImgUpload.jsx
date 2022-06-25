import React from 'react'
import {uploadImg} from '../services/img-upload.service'

export const ImgUpload = ({handleImg}) => {
  const handleFile = (ev) => {
    const file = ev.target.files[0]
    onUploadImg(file)
  }

  const onUploadImg = async (file) => {
    const res = await uploadImg(file)
    handleImg(res.url)
  }

  return (
    <section>
      <input type="file" onChange={handleFile} />
    </section>
  )
}
