// client/src/app.js
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";


function App() {
    const user = localStorage.getItem('token');
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" exact element={<Login/>} />
      <Route path="/signup" exact element={<Signup/>} />
      {user && <Route path="/home" exact element={<Main/>} />}
      
    </Routes>
  );
}

export default App;
