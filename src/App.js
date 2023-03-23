import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import UserDetails from "./components/UserDetails/userDetail";
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
        <Route path="/" element={<Main />} /> {/* Set Main as the default route */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Main" element={<Main/>}/>
          <Route path="/Projects" element={<Projects/>}/>
          <Route path="/Project/:projectId" element={<Project />} />
          <Route path="/LegacyMain" element={<LegacyMain/>}/>
          <Route path="/Profile/:profileId" element={<Profile/>}/>
          <Route path="/projectAdmin/:projectId/admin" element={<ProjectAdmin/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
