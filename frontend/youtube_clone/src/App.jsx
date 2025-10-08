import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Channel from "./pages/Channel";
import CreateChannel from "./pages/CreateChannel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/create-channel" element={<CreateChannel />} />
      <Route path="/channel" element={<Channel />} />
    </Routes>
  );
}

export default App;
