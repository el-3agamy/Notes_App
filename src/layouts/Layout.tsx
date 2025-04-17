import React from 'react'
import Footer from '../components/Footer/Footer'
// import { Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import NavbarCom from '../components/Navbar/Navbar'

const Layout = () => {
    return (
        <div>
            {/* <Navbar /> */}
            <NavbarCom />
            <Outlet />
            {/* <Footer /> */}
        </div>
    )
}

export default Layout