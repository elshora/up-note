import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import Logo from "../imgs/up-logo.png";
import { useDispatch } from "react-redux";

import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Offcanvas,
} from "react-bootstrap";
import { logout, reset } from "../features/auth/authSlice";

export default function NavBar() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const onLogoutHandler = () => {
    dispatch(reset());
    dispatch(logout());
  };
  return (
    <Navbar sticky="top" key="lg" expand="lg" className="bg-white shadow-sm">
      <Container>
        <NavLink to="/">
          {<img src={Logo} alt="logo" width="50px" draggable="false" />}
        </NavLink>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar-expand-md"
          className={`border-0 p-0 shadow-none`}
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
          className="bg-white"
        >
          <Offcanvas.Header closeButton className="text-dark">
            <Offcanvas.Title
              id="offcanvasNavbarLabel-expand-md"
              className="text-dark"
            >
              <NavLink to="/" className="text-dark">
                <img
                  src={Logo}
                  alt="Up note Logo"
                  width="50px"
                  draggable="false"
                />
              </NavLink>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <NavLink className="nav-link flex-center fs-6 text-dark " to="/">
                Home
              </NavLink>
              <NavLink
                className={`nav-link flex-center fs-6  text-dark `}
                to="/about"
              >
                About
              </NavLink>
              <NavLink
                className="nav-link flex-center fs-6  text-dark"
                to="/contact"
              >
                Contact us
              </NavLink>
            </Nav>
            <Nav>
              <Nav.Item className={`nav-link position-relative `}></Nav.Item>
              <DropdownButton
                as={ButtonGroup}
                title={<FontAwesomeIcon icon={faUser} />}
                align="end"
                className={` bg-white  p-0  border-0 outline-0 d-block`}
                variant="none"
              >
                <Dropdown.Item as="button" variant="none">
                  <NavLink className="my-1 text-decoration-none d-block text-black">
                    Profile
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item className={` `} eventKey="1" as="button">
                  {user ? (
                    <li onClick={() => onLogoutHandler()} className={` `}>
                      Logout
                    </li>
                  ) : (
                    <li>
                      <NavLink
                        to="/login"
                        className="my-1 text-decoration-none d-block text-black"
                      >
                        Login
                      </NavLink>

                      <NavLink
                        to="/register"
                        className="my-1 text-decoration-none d-block text-black "
                      >
                        register
                      </NavLink>
                    </li>
                  )}
                </Dropdown.Item>
              </DropdownButton>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
