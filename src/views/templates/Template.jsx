import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { initialize as initializeKeycloak, KeycloakContext, default as keycloak } from "../../keycloak";
import UserDetails from "../../components/UserDetails/userDetail";
import NavigationMenu from "../../components/Navbar/NavigationMenu";
import "../../components/Template/TemplateStyle.css";
import keycloak from "../../keycloak";

const Template = ({ mainContent, asideContent }) => {
  const navigate = useNavigate(); // Create a new navigate instance

  return (
    <div className="site-container">
      <header>
        <Link to="/" className="btn btn-primary">
          home
        </Link>
        <UserDetails />
      

        {keycloak.authenticated ? (
          <NavigationMenu />
        ) : (
          <button
          className="btn btn-primary"
          onClick={() =>
            keycloak.login()
          }
        >
          Login
        </button>
        )}
      </header>
      <div className="d-flex same-height">
        <aside>{asideContent}</aside>
        <main>{mainContent}</main>
      </div>
    </div>
  );
};
export default Template;
