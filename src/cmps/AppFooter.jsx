import React, {useEffect, useState} from 'react'
import {eventBus} from '../services/eventBusService'
import {noteService} from '../services/note.service'

export const AppFooter = () => {
  const [terms, setTerms] = useState(null)

  const handleClick = () => {
    //show modal use promise to wait for use response then clear it
    noteService.clearHistory()
  }

  return (
    <footer className="main-footer">
      <div className="logo">
        <h2>
          <span className="clr-yellow">Go</span>Keep
        </h2>
      </div>
      <div className="search-container">
        <button onClick={handleClick} className="btn btn-primary">
          Clear History
        </button>
      </div>
      <ul className="clean-list">
        <h3>Your history</h3>
        {terms &&
          terms.map(({searchTerm, _id}) => <li key={_id}>{searchTerm}</li>)}
      </ul>
    </footer>
  )
}
