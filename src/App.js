import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";
import Projects from "./Projects";
import Project from "./views/Project";

//TODO: This should not exist in final product
import LegacyMain from "./components/_Temp/LegacyMain";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path = "/" element={<Login/>}></Route>
          <Route path="/Main" element={<Main/>}/>
          <Route path="/Projects" element={<Projects/>}/>
          <Route path="/Project/:projectId" element={<Project />} />
          <Route path="/LegacyMain" element={<LegacyMain/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
