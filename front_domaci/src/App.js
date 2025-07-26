import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from './Components/Register';
import Podkast from './Components/Podcasts';
import PodcastDetails from './Components/PodcastDetails';
import Favorites from './Components/Favorites';
import MyPodcasts from './Components/MyPodcasts';
import CreatePodcast from './Components/CreatePodcast';
function App() {
  return (
    
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} />
           <Route path="/podkasti" element={<Podkast />} />
          <Route path="/podkast/:id" element={<PodcastDetails />} />
           <Route path="/favorites" element={<Favorites />} />
          <Route path="/my-podcasts" element={<MyPodcasts />} />
          <Route path="/create-podcast" element={<CreatePodcast />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
