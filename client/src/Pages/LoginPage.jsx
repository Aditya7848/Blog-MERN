import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import "./LoginPage.css";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
      setRedirect(true);
    } else {
      alert("wrong credentials");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="form-login" action="Submit" onSubmit={login}>
      <h1 className="h1-login">Login</h1>
      <input
        className="input-login"
        type="text"
        id="userName"
        placeholder="Enter the Display Name"
        value={userName}
        onChange={(ev) => setUserName(ev.target.value)}
      />
      <input
        className="input-login"
        type="password"
        id="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button className="input-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginPage;
