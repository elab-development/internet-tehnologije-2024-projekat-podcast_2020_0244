import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from './Navigation';
import './AddEpisode.css';

const AddEpisode = () => {
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [episodeDuration, setEpisodeDuration] = useState('');
  const [episodeFile, setEpisodeFile] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Epizoda je uspešno dodata!");
    navigate('/podkast');
  };

  return (
    <div>
      <Navigation/>
      <div className="add-episode-page">
        <h1>Dodaj Epizodu</h1>
        <form onSubmit={handleFormSubmit} className="add-episode-form">
          <div className="form-group">
            <label htmlFor="episodeTitle">Naziv Epizode</label>
            <input 
              type="text" 
              id="episodeTitle" 
              value={episodeTitle} 
              onChange={(e) => setEpisodeTitle(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="episodeFile">Audio/Video Fajl</label>
            <input 
              type="file" 
              id="episodeFile" 
              onChange={(e) => setEpisodeFile(e.target.files[0])} 
              required 
            />
          </div>

          <button type="submit" className="btn add-episode-btn">Dodaj Epizodu</button>
        </form>
      </div>
    </div>
  );
};

export default AddEpisode;
