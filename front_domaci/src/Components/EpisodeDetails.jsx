import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from  "./Footer";
import BackButton from "./BackButton";
import "./EpisodeDetails.css";


const EpisodeDetails = () => {
  
  const location = useLocation();
  const episodeId = location.state?.episodeId || "0";
  const episodeTitle = location.state?.episodeTitle || "Nepoznato";
  const episodeDuration = location.state?.episodeDuration || "00:00";

  const episode = {
    id: episodeId,
    title: episodeTitle,
    duration: episodeDuration,
    audioUrl: "https://www.example.com/audio.mp3", 
  };

  return (
    <div>
      <Navigation/>
      <div className="episode-details-page">
        <BackButton/>
        <h1>{episode.title}</h1>
        <p>Trajanje: {episode.duration}</p>
        <audio controls>
          <source src={episode.audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <Footer/>
    </div>
  );
};

export default EpisodeDetails;
