import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { initialize as initializeKeycloak, KeycloakContext, default as keycloak } from "../../keycloak";
import UserDetails from "../../components/UserDetails/userDetail";
import NavigationMenu from '../../components/Navbar/NavigationMenu';
import "../../components/Template/TemplateStyle.css";
import keycloak from "../../keycloak";


const Template = ({ children,  projectId }) => {
  // const navigate = useNavigate(); // Create a new navigate instance

  // const handleLogin = () => {
  //   initializeKeycloak()
  //     .then((keycloakInstance) => {
  //       keycloakInstance.login().then(() => {
  //         if (keycloakInstance.authenticated) {
  //           navigate("/Profile"); // Navigate to the Profile route after successful login
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error initializing Keycloak", error);
  //     });
  // };
  return (
    <div className="site-container">
      <header>
        <Link to="/Main" className="btn btn-primary">
          home
        </Link>
        <UserDetails />
        <div id="search-field">
          <input type="text" placeholder="Search..."></input>
        </div>
        <Link to="/Profile/[user]" className="btn btn-primary">
          Profile
        </Link>
        {keycloak.authenticated ? (
          <>       
          <button className="btn btn-primary" onClick={() => keycloak.logout()}>
            LogOut
          </button>
          <NavigationMenu  projectId={projectId}/>
          </>
        ) : (
         ""
        )}
      </header>
      <div className="d-flex same-height">
        <aside></aside>
        <main>{children}</main>
      </div>
    </div>
  );
};
export default Template;
