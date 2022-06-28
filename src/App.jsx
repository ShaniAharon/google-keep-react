import {Route, Routes} from 'react-router-dom'
import {AppHeader} from './cmps/AppHeader'
import {KeepApp} from './views/KeepApp.jsx'
import {useEffect} from 'react'
import {eventBus} from './services/eventBusService'
import {NoteEdit} from './views/NoteEdit'
import {CanvasPaint} from './views/CanvasPaint'

function App() {
  //TODO: use context and add toggle dark mode
  useEffect(() => {
    eventBus.on('color', (color) => {
      document.querySelector('body').style.backgroundColor = color
    })
  }, [])

  return (
    <section className=" ">
      <AppHeader />
      <Routes>
        <Route path="/edit" element={<NoteEdit />}>
          <Route path=":id" element={<NoteEdit />} />
        </Route>
        <Route path="/canvas" element={<CanvasPaint />} />
        <Route path="/" element={<KeepApp />} />
      </Routes>
      {/* <AppFooter /> */}
    </section>
  )
}

export default App
