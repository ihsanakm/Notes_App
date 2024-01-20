import { Routes, Route } from "react-router-dom";
import Note from "./Note";
import LogInPage from "../pages/logInPage";
import SigninPage from "../pages/signinPage";
import RequireAuth from "./RequireAuth";
import NavigationBar from "./NavigationBar";

function App() {
  return (
    <div className="App">
      <>
          <NavigationBar />

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
      </>
    </div>
  );
}

export default App;
