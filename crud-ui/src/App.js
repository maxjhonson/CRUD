import React from "react";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginSucess from "./components/LoginSucess";
import PrincipalPage from "./pages/PrincipalPage";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route exac path="/LoginSucess" element={<LoginSucess />}></Route>
        <Route
          exac
          path="/PrincipalPage"
          element={
            <RequireAuth>
              <PrincipalPage />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
