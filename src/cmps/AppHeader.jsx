import React, {useCallback} from 'react'
import {setFilterBy, loadNotes} from '../store/actions/noteActions'
import {NoteFilter} from './NoteFilter'
import {useDispatch} from 'react-redux'

export const AppHeader = () => {
  const dispatch = useDispatch()

  const onChangeFilter = useCallback(async (filterBy) => {
    await dispatch(setFilterBy(filterBy))
    dispatch(loadNotes())
  }, [])

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
          <span className="clr-yellow">Go</span>Keep
        </h1>
      </div>
      <NoteFilter onChangeFilter={onChangeFilter} />
    </header>
  )
}
