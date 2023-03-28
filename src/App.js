import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import Project from "./views/Project";
import Profile from "./views/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Project/:projectId" element={<Project />} />
          <Route path="/Profile/:userId" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
