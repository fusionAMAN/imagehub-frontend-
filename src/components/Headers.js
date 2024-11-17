import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
export const Headers = () => {
  return (
    <Navbar className="bg-dark" style={{height:"60 px"}}>
        <Container>
            <NavLink to="/" className="text-light text-decoration-none">Home</NavLink>
           
            <Navbar.Collapse className="justify-content-end">
                
                    <NavLink to="/register" className="text-light text-decoration-none">Register</NavLink>
                
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
export default Headers