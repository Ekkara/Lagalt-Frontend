// keycloak.js
import { createContext } from 'react';
import Keycloak from 'keycloak-js';

export const KeycloakContext = createContext(null);

// NB! Leave the / or the relative path will use the Router path
const keycloak = new Keycloak("/keycloak.json");
// keycloak.loadUserProfile().then((profile)=>{console.log(profile)});


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
    return keycloak.init(config);
};

/** @type { Keycloak } keycloak */
export default keycloak;
