import React from 'react';
import { Dropdown, Nav } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

const NavigationMenu = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <Nav className="justify-content-center">
      <Dropdown>
        <Dropdown.Toggle variant="primary">
          Menu
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/Main" onClick={(e) => handleClick(e, '/Main')}>
            Home
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/Profile" onClick={(e) => handleClick(e, '/Profile')}>
            Profile
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/Projects" onClick={(e) => handleClick(e, '/Projects')}>
            Projects
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={`/Project/${projectId}`} onClick={(e) => handleClick(e, `/Project/${projectId}`)}>
            Project
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={`/projectAdmin/${projectId}/admin`} onClick={(e) => handleClick(e, `/projectAdmin/${projectId}/admin`)}>
            Project Admin
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
};

export default NavigationMenu;
