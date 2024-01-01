// LoginForm.js
import axios from "axios";
import React, { useContext, useState } from "react";
import { authContext } from "./RequireAuth";

function LoginForm() {
  const { logedIn, updateLogedIn} = useContext(authContext);

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
      console.log("from login form", logedIn);

      updateLogedIn();
      console.log("from login form", logedIn);

      // Add any further logic to handle the response, e.g., redirecting to another page
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return logedIn ? "" : (
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
