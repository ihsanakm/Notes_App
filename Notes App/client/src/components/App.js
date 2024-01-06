import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import Note from "./Note";
import LogInPage from "../pages/logInPage";
import { AuthProvider } from "./auth";
import SigninPage from "../pages/signinPage";

function App() {

  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Log In
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Sign Up
        </NavLink>


        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Note />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SigninPage />} />

        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
