import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from './Components/Register';
import Podkast from './Components/Podcasts';
import Favorites from './Components/Favorites';
import PodcastDetails from './Components/PodcastDetails';
function App() {
  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} />
           <Route path="/podkasti" element={<Podkast />} />
          <Route path="/podkast/:podcastId" element={<PodcastDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
