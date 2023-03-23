// keycloak.js
import Keycloak from "keycloak-js";
import React, { createContext } from "react";
const keycloakConfig = {
  url: "https://lemur-3.cloud-iam.com/auth/",
  realm: "projectlagaltfullstack",
  clientId: "test-client",
};

const keycloak = new Keycloak(keycloakConfig);

const initializeKeycloak = () => {
  return new Promise((resolve, reject) => {
    keycloak
      .init({
        onLoad: "check-sso",
      })
      .then((authenticated) => {
        console.log("Keycloak initialized", authenticated);
        resolve(keycloak);
      })
      .catch((error) => {
        console.error("Error initializing Keycloak", error);
        reject(error);
      });
  });
};
const KeycloakContext = createContext(); // Create the KeycloakContext
export { keycloak, initializeKeycloak, KeycloakContext  }; // Export the KeycloakContext
