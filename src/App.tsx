  import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layouts/Layout'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
  const App = () => {

    const router = createBrowserRouter([{
        path:"" , element:<Layout /> , children : ([
            {index : true , element : <Login />} ,
            {path : "register" , element : <Register />} ,
            {path : "home" , element : <Home />}
        ])
    }])
    return (
      <RouterProvider router={router} ></RouterProvider>
    )
  }
  
  export default App