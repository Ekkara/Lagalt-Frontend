import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path = "/" element={<Login/>}></Route>
          <Route path="/Main" element={<Main/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
