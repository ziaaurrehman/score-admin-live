import { Routes, Route } from "react-router-dom";
import "./App.css";
import Portal from "./components/pages/Portal.jsx";
import Login from "./components/pages/Login.jsx";
import {} from "./Api.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Portal />} /> */}
        </Routes>
        <Portal />
        <ToastContainer />
      </UserContextProvider>
    </>
  );
}

export default App;
