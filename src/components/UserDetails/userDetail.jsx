import React, { useContext } from "react";
import { KeycloakContext } from "../../keycloak"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import "../UserDetails/userDetailStyle.css";


const UserDetails = () => {
  const keycloak = useContext(KeycloakContext);

  if (!keycloak.authenticated) {
    return null;
  }

  return (
    <div className="user-details">
      <p>Username: {keycloak.tokenParsed.preferred_username}</p>
    </div>
  );
};

export default UserDetails;
