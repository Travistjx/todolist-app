import "./App.css";
import Task from "./components/Task";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/todolist" element={<Task />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
