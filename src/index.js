import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initialize as initializeKeycloak, KeycloakContext, default as keycloak } from "../src/keycloak";
import Loading from "./components/loading/Loading";

const root = ReactDOM.createRoot(document.getElementById('root'));
// Display a loading screen when connecting to Keycloak
root.render(<Loading message="Connecting to Lagalt Network..." />)

// Initialize Keycloak
initializeKeycloak()
  .then(() => { // If No Keycloak Error occurred - Display the App
    root.render(
      <React.StrictMode>
        <KeycloakContext.Provider value={keycloak}>
          <App />
        </KeycloakContext.Provider>
      </React.StrictMode>
    );
  })
  .catch(() => {
    root.render(
      <p>Could Not Connect To Keycloak.</p>
    );
  });
