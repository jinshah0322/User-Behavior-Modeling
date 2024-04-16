import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa6";

const NavBar = () => {
  const { totalItems } = useSelector((state) => state.cart);
  const [expand, setExpand] = useState(false);
  const id = localStorage.getItem("id");

  const logout = () => {
    localStorage.removeItem("id");
    window.location.href = "/login";
  };

  return (
    <Navbar fixed="top" expand="md" className="navbar fixed">
      <Container className="navbar-container">
        <Navbar.Brand>
          <Link
            aria-label="Go to Home Page"
            className="navbar-link"
            to="/"
            onClick={() => setExpand(false)}
          >
            <ion-icon name="bag" style={{ color: "black" }}></ion-icon>
            <h1 className="logo">Quickmart</h1>
          </Link>
        </Navbar.Brand>

        <div className="d-flex">
          <div className="media-cart">
          </div>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => {
              setExpand(expand ? false : "expanded");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Item>
              <Link
                aria-label="Go to Home Page"
                className="navbar-link"
                to="/"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Home</span>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link
                aria-label="Go to Shop Page"
                className="navbar-link"
                to="/shop"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Shop</span>
              </Link>
            </Nav.Item>

            {!id && (
              <Nav.Item>
                <Link
                  aria-label="Go to Login Page"
                  className="navbar-link"
                  to="/login"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">Login</span>
                </Link>
              </Nav.Item>
            )}

            {id && (
              <>
                <Nav.Item>
                  <Link to="/profile">
                    <button className="items-center justify-center flex my-2">
                      <FaUser />
                    </button>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <button
                    onClick={logout}
                    className="items-center justify-center flex my-2"
                  >
                    <IoMdLogOut />
                  </button>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
