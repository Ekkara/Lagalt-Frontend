// keycloak.js
import { createContext, useState } from 'react';
import Keycloak from 'keycloak-js';
import axios from 'axios';


export const KeycloakContext = createContext(null);

// NB! Leave the / or the relative path will use the Router path
const keycloak = new Keycloak("/keycloak.json");
export var currentUserId = -1;
/**
 * Initialize Keycloak and silently checking for an existing login.
 * @description Should be called before render() of app.
 * @returns { Promise<void> } Promise
 */
export const initialize = () => {
    const config = {
        checkLoginIframe: false,
        //onLoad: "check-sso",
        silentCheckSsoRedirectUri:
            window.location.origin, //+ "/silent-check-sso.html", Enable on deployment!
    };
    //when logging in, fetch the index of the user, if user don't exist with this token
    //one will be generated.
    keycloak.onAuthSuccess = async function(){
        await axios
          .get(`lagaltcase.azurewebsites.net/GetId?keycloakId=${keycloak.tokenParsed.sub}&username=${keycloak.tokenParsed.preferred_username}`,{ headers: {
            Authorization: "Bearer " + keycloak.token,
          }})
          .then((result) => {
            currentUserId = result.data;
          })
          .catch(error => {
            console.error(error);
          });
    }

    //when logging out, set the global token to an invalid index
    keycloak.onAuthLogout = function(){
        currentUserId = -1;
    }
    return keycloak.init(config);
};

/** @type { Keycloak } keycloak */
export default keycloak;
