import React from 'react'
// import './App.css'
import { Provider } from 'react-redux'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { store } from './store/store'
import NotFoundPage from './pages/NotFoundPage'
import PrivateRoute from './helper/privateRoutes'
import HomePage from './pages/HomePage'

function App() {
  const isAuthenticated = !!localStorage.getItem('accessToken')

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
  }, []);

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated}><HomePage /></PrivateRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Provider>
  )
}

export default App


