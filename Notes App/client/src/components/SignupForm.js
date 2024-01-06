import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate()

  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });

  function handleSign(e) {
    const { name, value } = e.target;
    setSignin({
      ...signin,
      [name]: value,
    });
  }

  async function handleSigninSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/signup", signin, { withCredentials: true });
      console.log(res);
      navigate('/login')

    } catch (error) {
      console.error("Error during sign:", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSigninSubmit}>
        <input
          onChange={handleSign}
          value={signin.email}
          type="email"
          name="email"
        />
        <input
          onChange={handleSign}
          value={signin.password}
          type="password"
          name="password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
