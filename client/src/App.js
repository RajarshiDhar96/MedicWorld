import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'


import { Button } from 'antd'

function App() {
  return (
    <div>
      <BrowserRouter>

        <Routes>

          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>

        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
