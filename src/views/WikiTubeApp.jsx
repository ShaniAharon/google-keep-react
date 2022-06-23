import React, {useEffect, useState} from 'react'
import {WikiPreview} from '../cmps/WikiPreview'
import {VideoList} from '../cmps/VideoList'
import {eventBus} from '../services/eventBusService'
import {Modal} from '../cmps/Modal'

export const WikiTubeApp = () => {
  const [videoId, setVideoId] = useState('tgbNymZ7vqY')

  useEffect(() => {
    const unSubscribeVideo = eventBus.on('videoClicked', (videoId) => {
      setVideoId(videoId)
    })
    return () => {
      unSubscribeVideo()
    }
  }, [videoId])

  return (
    <section className="map-app-container container  container-clean">
      <div>
        <VideoList />
      </div>
      <div className="video-container">
        <iframe
          width="490"
          height="315"
          title="youtube-video"
          src={`https://www.youtube.com/embed/${videoId}`}
        ></iframe>
        <WikiPreview />
      </div>
      <Modal />
    </section>
  )
}
