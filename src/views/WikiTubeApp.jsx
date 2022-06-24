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
        <div className="input-content-container"></div>
      </div>
      <div>
        <VideoList />
      </div>

      <WikiPreview />
      <Modal />
    </section>
  )
}
