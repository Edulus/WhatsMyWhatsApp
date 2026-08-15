import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import GetWords from "./pages/GetWords";
import Lookup from "./pages/Lookup";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/get" element={<GetWords />} />
      <Route path="/lookup" element={<Lookup />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
