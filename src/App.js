import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";
import Projects from "./Projects";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path = "/" element={<Login/>}></Route>
          <Route path="/Main" element={<Main/>}/>
          <Route path="/Projects" element={<Projects/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
