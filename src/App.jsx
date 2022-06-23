import {Routes, Route} from 'react-router-dom'
import {AppHeader} from './cmps/AppHeader'
import {AppFooter} from './cmps/AppFooter'
import {WikiTubeApp} from './views/WikiTubeApp.jsx'
import {useEffect} from 'react'
import {eventBus} from './services/eventBusService'

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
        <Route path="/" element={<WikiTubeApp />}></Route>
      </Routes>
      <AppFooter />
    </section>
  )
}

export default App
