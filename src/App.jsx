import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SongDetail } from './pages/SongDetail'
import { SpotiApp } from './pages/SpotiApp'

export const App = () => {  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SpotiApp />} />
          <Route path='/song'>
            <Route path=':songId' element={<SongDetail />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
