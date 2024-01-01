import { useEffect, useState, useContext} from "react";
import Note from "./Note";
import LogInPage from "../pages/logInPage";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { authContext } from "./RequireAuth";

function App() {

  return (
    <div className="App">
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
          log In
        </NavLink>

        <Routes>
          <Route index element={<RequireAuth><Note /></RequireAuth>} />
          <Route path="/login" element={<LogInPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
