import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../images/logo.jpg';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
    <Navbar.Brand href="#">
          <img
            src={logo}
            alt="Logo"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Student List</Nav.Link>
          <Nav.Link href="#">Teacher List</Nav.Link>
          <Nav.Link href="#">sign Out</Nav.Link>
          <Nav.Link href="#"></Nav.Link>
          {/* Add more Nav.Link components for other menu items */}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Header;
