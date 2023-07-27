import Create from "./components/create";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Read from "./components/read";
import Update from "./components/update";

function App() {
  
  return (
    <div className="container mt-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
