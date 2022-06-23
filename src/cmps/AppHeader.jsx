import React from 'react'
import {useForm} from '../hooks/useForm'
import {eventBus} from '../services/eventBusService'
import {youtubeService} from '../services/youtube.service'
import {wikiService} from '../services/wiki.service'
import {termService} from '../services/term.service'

export const AppHeader = () => {
  //TODO: try the ragular two way binding here
  const [search, handleChange, setSearch] = useForm('')

  const handleClick = async () => {
    const res = await youtubeService.getTop5Res(search)
    const wikiData = await wikiService.getWikiData(search)
    eventBus.emit('videos', res)
    eventBus.emit('wikis', wikiData)
    termService.saveTerm(search)
    setSearch('')
  }

  const openModal = () => {
    eventBus.emit('open', true)
  }

  return (
    <header className="main-header">
      <div className="logo flex">
        <svg className="svg-burger" focusable="false" viewBox="0 0 24 24">
          <path
            className="p-svg"
            d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
          ></path>
        </svg>
        <h1>
          <span className="clr-teal">Go</span>Notes
        </h1>
      </div>
      <div className="search-container">
        <form action="" className="flex">
          <button className="btn-search">
            <svg
              className="search-icon"
              focusable="false"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
              <path d="M0,0h24v24H0V0z" fill="none"></path>
            </svg>
          </button>
          <div className="input-container">
            <input
              type="text"
              onChange={handleChange}
              value={search.name || ''}
              name="name"
              placeholder="Search"
            />
          </div>
          {/* <button></button> */}
        </form>

        {/* <button onClick={handleClick} className="btn btn-primary">
          Search
        </button> */}
      </div>
      {/* <button onClick={openModal} className="btn btn-success">
          Change Background Color
        </button> */}
    </header>
  )
}
