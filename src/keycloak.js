// keycloak.js
import Keycloak from "keycloak-js";

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

export { keycloak, initializeKeycloak };
