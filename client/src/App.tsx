// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./landing"; // Assuming you named your original component file Home.tsx
import Page from "./learnMore"; // Assuming you named your new component file Page.tsx
import "./App.css";

// Note: You may need to adjust the import paths for Home and Page based on your actual file structure.

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-more" element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
}
