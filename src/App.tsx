import { useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="">Hello</h1>} />
    </Routes>
  );
}

export default App;
