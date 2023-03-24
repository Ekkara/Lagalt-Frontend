import React, { useContext } from "react";
import { KeycloakContext } from "../../keycloak"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import "../UserDetails/userDetailStyle.css";


const UserDetails = () => {
  const keycloak = useContext(KeycloakContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    keycloak.logout();
    navigate("/Main"); // Navigate back to the main page
  };

  if (!keycloak.authenticated) {
    return null;
  }

  return (
    <div className="user-details">
      <p>Username: {keycloak.tokenParsed.preferred_username}</p>
      <p>User ID: {keycloak.tokenParsed.sub}</p>
      <p>Token: {keycloak.token}</p>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default UserDetails;
