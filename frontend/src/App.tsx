import React from 'react'
import Pages from './pages/Pages'
import { BrowserRouter } from 'react-router-dom'

const App: React.FC = (): React.ReactElement => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </div>
  )
}

export default App
