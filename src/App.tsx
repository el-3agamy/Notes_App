// import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layouts/Layout'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
// import ProtectedRouts from './protected/ProtectedRouts'
import AuthContextProvider from './contexts/AuthContext'
const App = () => {

  const router = createBrowserRouter([{
    path: "", element: <Layout />, children: ([
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "home", element: <Home /> }
    ])
  }])
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} ></RouterProvider>

      </AuthContextProvider>
    </>
  )
}

export default App