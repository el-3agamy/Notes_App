import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { Button } from 'react-bootstrap';

import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CounterContext } from '../../contexts/CounterContextProvider';

const NavbarCom = () => {
  let userToken = localStorage.getItem("token");
  let navigate = useNavigate();

const {counter} = useContext(CounterContext)

  function removeToken() {
    localStorage.removeItem("token");
    navigate("")
  }


  return (
    <>
      <Navbar expand="lg" className="bg-success-subtle">
        <Container>
          <Navbar.Brand href="">My Notes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {
              userToken == null ?

                <Nav className="ms-auto">
                  <NavLink className="navLink" to="">Login</NavLink>
                  <NavLink className="navLink" to="register">Register</NavLink>
                </Nav>

                :
                <>

                  <Navigate to="home" />
                  <Button variant="primary">
                    Profile <Badge bg="secondary">{counter}</Badge>
                    <span className="visually-hidden">unread messages</span>
                  </Button>
                  <Nav className="ms-auto">
                    <NavLink onClick={removeToken} className="navLink" to="">Logout</NavLink>
                  </Nav>
                </>


            }

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarCom