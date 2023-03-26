import React from "react";
import { Dropdown, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import keycloak from "../../keycloak";
import { idToken } from "../../keycloak";

const NavigationMenu = () => {
  const navigate = useNavigate();

  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <Nav className="justify-content-center">
      <Dropdown>
        <Dropdown.Toggle variant="primary">Menu</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/" onClick={(e) => handleClick(e, `/Profile/${idToken}`)}>
            Profile
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/" onClick={(e) => handleClick(e, "/")}>
            Home
          </Dropdown.Item>
          <Dropdown.Item onClick={() => keycloak.logout()}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
};

export default NavigationMenu;
