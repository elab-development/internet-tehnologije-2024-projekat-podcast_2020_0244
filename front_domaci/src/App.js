import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from './Components/Register';

function App() {
  return (
    
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
