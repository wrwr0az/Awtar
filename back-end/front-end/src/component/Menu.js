import React, { Component } from "react";
import Cookies from "js-cookie";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  render() {
    return (
      <Navbar className="nav-bar" bg="light" expand="lg" fixed="top">
        <img
          className="logo"
          src="https://instagram.fjed6-1.fna.fbcdn.net/v/t51.2885-19/s150x150/81219990_180301129711226_7872102624621756416_n.jpg?_nc_ht=instagram.fjed6-1.fna.fbcdn.net&_nc_ohc=YqmQM5SUi2QAX8_GYL9&tp=1&oh=238da4ee45ad1a26faae14d77f1dee8c&oe=6040A6E7"
        />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav menu">
          <Nav className="mr-auto menu-nav">
            <Nav.Link className="menu-button" href="/#Home">
              HOME
            </Nav.Link>
            <Nav.Link as={Link} className="menu-button" to="/Projects">
              PROJECTS
            </Nav.Link>
            <Nav.Link className="menu-button" href="/#contact-section">
              CONTACT US
            </Nav.Link>
            <Nav.Link as={Link} className="menu-button" to="/services">
              SERVICES
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
