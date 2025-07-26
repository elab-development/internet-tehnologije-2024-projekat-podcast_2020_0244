import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from './Components/Register';
import Podkast from './Components/Podcasts';
import Favorites from './Components/Favorites';
import PodcastDetails from './Components/PodcastDetails';
import MyPodcasts from './Components/MyPodcasts';
import CreatePodcast from './Components/CreatePodcast';
import Creators from './Components/Creators';
import Categories from './Components/Categories';
import AddEpisode from './Components/AddEpisode';
import EditPodcast from './Components/EditPodcast';
import EpisodeDetails from './Components/EpisodeDetails';
import YouTube from './Components/YouTube';

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
            <Route path="/my-podcasts" element={<MyPodcasts />} />
          <Route path="/create-podcast" element={<CreatePodcast />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/podkast/:podcastId/add-episode" element={<AddEpisode />} />
          <Route path="/podkast/:podcastId/edit" element={<EditPodcast />} />
          <Route path="/podkast/:podcastId/episode/:episodeId" element={<EpisodeDetails />} />
           <Route path="/youtube" element={<YouTube />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
