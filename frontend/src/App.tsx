import React from "react";
import {Routes, Route} from "react-router-dom";
import "./App.css";
import MainContent from "./components/MainContent";
import Layout from "./components/Layout";
import NoMatch from "./components/NoMatch";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainContent />} />
          <Route path="/f/:category" element={<MainContent />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
