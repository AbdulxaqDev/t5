import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Log from "./components/Log";

function App() {
 return (
  <div className="App">
   <Routes>
    <Route path="/" element={<Log />} />
    <Route path="/dashboard" element={<Dashboard />} />
   </Routes>
  </div>
 );
}

export default App;
