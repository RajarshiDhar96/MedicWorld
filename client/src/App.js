import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'


import { Button } from 'antd'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import ApplyDoctor from './pages/ApplyDoctor'
import Notifications from './pages/Notifications'

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <div>
      <BrowserRouter>
        {loading && (<div className='spinner-parent'>
          <div class="spinner-border" role="status">

          </div>
        </div>)}

        <Toaster
          position="top-center"
          reverseOrder={false}
        />

        <Routes>
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>}></Route>
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>}></Route>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path='/apply-doctor' element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>}></Route>
          <Route path='/notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>}></Route>

        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
