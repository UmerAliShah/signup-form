import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/auth/Register";
import Signin from "./pages/auth/Signin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Register />} />
        <Route path="signin" element={<Signin />} />
      </Route>
    </Routes>
  );
}

export default App;
