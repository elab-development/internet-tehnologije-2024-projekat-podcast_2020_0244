import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from './Navigation';
import Footer from  "./Footer";
import './EditPodcast.css';

const EditPodcast = () => {
  const location = useLocation();  
  const [podcastId, setPodcastId] = useState('');
  const [podcastName, setPodcastName] = useState('');
  const [podcastDescription, setPodcastDescription] = useState('');
  const [podcastThumbnail, setPodcastThumbnail] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (location.state) {
      setPodcastName(location.state.podcastName || ''); 
      setPodcastDescription(location.state.podcastDescription || ''); 
      setPodcastId(location.state.podcastId || 0);
    }
  }, [location.state]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Podkast je uspešno izmenjen!");

    navigate(`/podkast/${podcastId}`);
  };

  return (
    <div>
      <Navigation />
      <div className="edit-podcast-page">
        <h1>Izmeni Podkast</h1>
        <form onSubmit={handleFormSubmit} className="edit-podcast-form">
          <div className="form-group">
            <label htmlFor="podcastName">Naziv Podkasta</label>
            <input 
              type="text" 
              id="podcastName" 
              value={podcastName} 
              onChange={(e) => setPodcastName(e.target.value)} 
              required 
              placeholder={podcastName} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="podcastDescription">Opis Podkasta</label>
            <textarea 
              id="podcastDescription" 
              value={podcastDescription} 
              onChange={(e) => setPodcastDescription(e.target.value)} 
              required 
              placeholder={podcastDescription} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="podcastThumbnail">Thumbnail Slika</label>
            <input 
              type="file" 
              id="podcastThumbnail" 
              onChange={(e) => setPodcastThumbnail(e.target.files[0])} 
            />
          </div>

          <button type="submit" className="btn edit-podcast-btn">Izmeni Podkast</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default EditPodcast;
