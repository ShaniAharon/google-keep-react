import React, {useEffect, useState} from 'react'
import {eventBus} from '../services/eventBusService'

export const VideoList = () => {
  const [videos, setVideos] = useState(null)

  useEffect(() => {
    eventBus.on('videos', (videos) => {
      setVideos(videos)
    })
  }, [videos])

  const handleClick = (videoId) => {
    console.log('videoId', videoId)
    eventBus.emit('videoClicked', videoId)
  }

  if (!videos) return <div>Loading...</div>
  return (
    <div className="video-list pos-relative">
      <h2 className="text-center u">Videos</h2>
      <ul className="clean-list ">
        {videos.map(({videoId, videoImg, title}) => (
          <div
            onClick={() => handleClick(videoId)}
            key={videoId}
            className="video-info"
          >
            <h4>{title}</h4>
            <img src={videoImg} alt="" />
          </div>
          // <iframe
          //   width="420"
          //   height="155"
          //   title={title}
          //   key={videoId}
          //   src={`https://www.youtube.com/embed/${videoId}`}
          // ></iframe>
        ))}
      </ul>
    </div>
  )
}
