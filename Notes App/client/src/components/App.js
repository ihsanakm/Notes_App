import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import Note from "./Note";
import LogInPage from "../pages/logInPage";
import { AuthProvider } from "./auth";

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
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
