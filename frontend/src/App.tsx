import React from 'react'
import Pages from './pages/Pages'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext'

const App: React.FC = (): React.ReactElement => {
  return (
    <div className='App'>
      <BrowserRouter>
        <AppContextProvider>
          <Pages />
        </AppContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
