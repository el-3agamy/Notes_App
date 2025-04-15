import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate} from 'react-router-dom';

const NavbarCom = () => {
  let userToken = localStorage.getItem("token") ;
  let navigate = useNavigate()
  function removeToken() {
    localStorage.removeItem("token") ;
    navigate("")
  }
  return (
   <>
   <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="">My Notes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         {
          userToken == null ?  <Nav className="ms-auto">
          <NavLink  className="navLink"  to="">login</NavLink>
          <NavLink className="navLink"  to="register">Register</NavLink>

          
        </Nav>:  <Nav className="ms-auto">
            <NavLink onClick={removeToken} className="navLink"  to="">Logout</NavLink>
        
          </Nav>
         }
        </Navbar.Collapse>
      </Container>
    </Navbar>
   </>
  )
}

export default NavbarCom