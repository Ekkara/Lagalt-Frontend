import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Keycloakroute from "./routes/Keycloakroute";
import { ROLES } from "./const/roles";
import { STORAGE_KEY_USER } from "./storages/storageKeys";
import { storageRead, storageSave } from "./storages/storage";
import { getUserInfo } from "./api/user";
import { useEffect, useState } from "react";
import Loading from "./components/loading/Loading";
import Main from "./views/Main";
import Login from "./views/Login";
import Projects from "./Projects";
import Project from "./views/Project";
import ProjectAdmin from "./views/templates/ProjectAdmin"

//TODO: This should not exist in final product
import LegacyMain from "./components/_Temp/LegacyMain";
import Profile from "./views/Profile";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path="/" element={<Login />} /> {/* Set Main as the default route */}
          {/* <Route path="/Login" element={<Keycloakroute role={ROLES.User}><Login/></Keycloakroute>} /> */}
          {/* <Route path="/Main" element={<Keycloakroute role={ROLES.User}><Main/></Keycloakroute>} /> */}
          <Route path="/Main" element={<Main/>} />
          <Route path="/Projects" element={<Keycloakroute role={ROLES.User}><Projects/></Keycloakroute>} />
          <Route path="/Project/:projectId" element={<Keycloakroute role={ROLES.User}><Project/></Keycloakroute>} />
          <Route path="/LegacyMain" element={<Keycloakroute role={ROLES.User}><LegacyMain/></Keycloakroute>} />
          {/* <Route path="/Profile/:profileId" element={<Keycloakroute role={ROLES.User}><Profile/></Keycloakroute>} /> */}
          <Route path="/Profile/:userId" element={<Profile />} />

          <Route path="/projectAdmin/:projectId/admin" element={<ProjectAdmin/>} />
          <Route path="/projectAdmin/:projectId/admin" element={<Keycloakroute role={ROLES.User}><ProjectAdmin/></Keycloakroute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
