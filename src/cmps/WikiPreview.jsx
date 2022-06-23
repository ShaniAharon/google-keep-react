import React, {useEffect, useState} from 'react'
import {eventBus} from '../services/eventBusService'

export const WikiPreview = () => {
  const [wikiData, setWikiData] = useState(null)

  useEffect(() => {
    const unsubscribeWiki = eventBus.on('wikis', (wikiData) => {
      setWikiData(wikiData)
    })

    return () => {
      unsubscribeWiki()
    }
  }, [])

  const removeTags = (str) => {
    return str
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim()
  }

  if (!wikiData) return <div>Wiki data Loading...</div>
  return (
    <section className="wiki-preview pos-relative">
      <h1 className="u">Wiki Info</h1>
      {/* <pre>{JSON.stringify([wiki, main], 0, 4)}</pre> */}
      <section className="clean-list wiki-list pos-center">
        {wikiData.map(({title, snippet}) => (
          <div key={title}>
            <h2>{title}</h2>
            <p>{removeTags(snippet)}</p>
          </div>
        ))}
      </section>
    </section>
  )
}
