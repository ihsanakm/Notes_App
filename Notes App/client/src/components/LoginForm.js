// LoginForm.js
import axios from "axios";
import { useState } from "react";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const auth = useAuth()
  const navigate = useNavigate()

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
      const res = await axios.post("/login", logIn, { withCredentials: true });
      console.log(res);
      auth.login(logIn)
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
