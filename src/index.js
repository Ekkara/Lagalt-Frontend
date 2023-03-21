import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeKeycloak } from "../src/keycloak";
import Loading from "./components/loading/Loading";

const root = ReactDOM.createRoot(document.getElementById('root'));
// Display a loading screen when connecting to Keycloak
root.render(<Loading message="Connecting to Lagalt Network..." />)

// Initialize Keycloak
initializeKeycloak()
  .then(() => { // If No Keycloak Error occurred - Display the App
    root.render(
      <>
        <App />
      </>
    );
  })
  .catch(() => {
    root.render(
      <p>Could Not Connect To Keycloak.</p>
    );
  });
