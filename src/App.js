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

  // const [user, setUser] = useState()
  // const [loading, setLoading] = useState(true); // Add this line

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getUserInfo();
  //     storageSave(STORAGE_KEY_USER, data);
  //     setUser(data);
  //     setLoading(false); // Set loading to false once user data has been fetched
  //   };

  //   const userData = storageRead(STORAGE_KEY_USER);
  //   if (userData) {
  //     setUser(userData);
  //     setLoading(false); // Set loading to false if user data is already available in storage
  //   } else {
  //     fetchData();
  //   }
  // }, []);

  // if (loading) {
  //   return <Loading message="Loading..." />;
  // }
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path="/" element={<Main />} />
          {/* <Route path="/Login" element={<Keycloakroute role={ROLES.User}><Login/></Keycloakroute>} /> */}
          {/* <Route path="/Main" element={<Keycloakroute role={ROLES.User}><Main/></Keycloakroute>} /> */}
          {/* <Route path="/Main" element={<Main/>} /> */}
          {/* <Route path="/Projects" element={<Keycloakroute role={ROLES.User}><Projects/></Keycloakroute>} /> */}
          <Route path="/Project/:projectId" element={<Project/>} />
          <Route path="/Profile/:userId" element={<Profile/>} />
          {/* <Route path="/Profile/:userId" element={<Keycloakroute><Profile/></Keycloakroute>} /> */}
          {/* <Route path="/projectAdmin/:projectId/admin" element={<ProjectAdmin/>} /> */}
          {/* <Route path="/projectAdmin/:projectId/admin" element={<Keycloakroute role={ROLES.User}><ProjectAdmin/></Keycloakroute>} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
