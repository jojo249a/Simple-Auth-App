import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home.jsx";
import Nav from "./components/nav.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";

function AppContent() {
  const location = useLocation();
  const hideNav = location.pathname == "/signup" || location.pathname == "/signin";

  return (
      <div className="page-container">
        {!hideNav && <Nav />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}