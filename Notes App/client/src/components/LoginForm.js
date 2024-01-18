// LoginForm.js
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {userLoggedIn } from "./redux/userAction";

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [logIn, setLogIn] = useState({
    email: "",
    password: "",
  });

  function handleLogin(e) {
    const { name, value } = e.target;
    setLogIn({
      ...logIn,
      [name]: value,
    });
  }

  async function handleLogInSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/login", logIn, { withCredentials: true });
      dispatch(userLoggedIn())
      navigate('/')

    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  // Render the LoginForm component
  return (
    <div>
      <form onSubmit={handleLogInSubmit}>
        <input
          onChange={handleLogin}
          value={logIn.email}
          type="email"
          name="email"
        />
        <input
          onChange={handleLogin}
          value={logIn.password}
          type="password"
          name="password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;
