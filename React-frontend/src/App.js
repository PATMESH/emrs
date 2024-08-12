import React, { useState } from "react";
import Login from './Components/Login';
import Register from './Components/Register';
import MainPage from "./Components/MainPage";

function App() {
  const [auth, setAuth] = useState({
    authenticated: false,
    token: "",
  });
  const[isRegister, setIsRegister] = useState(false);

  return (
    <div className="App">
      {!auth.authenticated ? (
        isRegister ? 
          <Register setAuth={setAuth} setIsRegister={setIsRegister} /> : 
          <Login setAuth={setAuth} setIsRegister={setIsRegister} />
      ) : (
        <MainPage/>
      )}
    </div>
  );
}

export default App;
