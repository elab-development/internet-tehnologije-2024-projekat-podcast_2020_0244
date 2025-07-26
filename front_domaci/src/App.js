import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from './Components/Register';
import Podkast from './Components/Podcasts';
import PodcastDetails from './Components/PodcastDetails';
function App() {
  return (
    
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} />
           <Route path="/podkasti" element={<Podkast />} />
          <Route path="/podkast/:id" element={<PodcastDetails />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
