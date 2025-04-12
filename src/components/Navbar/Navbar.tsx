import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink} from 'react-router-dom';

const NavbarCom = () => {
  return (
   <>
   <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="">My Notes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink  className="navLink"  to="">login</NavLink>
            <NavLink className="navLink"  to="register">Register</NavLink>
            <NavLink  className="navLink" to="home">Home</NavLink>

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   </>
  )
}

export default NavbarCom