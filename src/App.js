import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Template from "./views/templates/Template";
import Projects from "./Projects";
import Project from "./views/Project";
import LegacyMain from "./components/_Temp/LegacyMain";
import Profile from "./views/Profile";
import Main from "./views/Main";
import { initializeKeycloak } from "./keycloak";

function App() {
  useEffect(() => {
    initializeKeycloak();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Template>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Profile/:userId" element={<Profile />} />
            <Route path="/Profile/:projectId" element={<Profile />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Project/:projectId" element={<Project />} />
            <Route path="/LegacyMain" element={<LegacyMain />} />
          </Routes>
        </Template>
      </div>
    </BrowserRouter>
  );
}

export default App;
