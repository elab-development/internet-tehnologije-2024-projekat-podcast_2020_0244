import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navigation from './Navigation';
import "./PodcastDetails.css";

const PodcastDetails = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const podcast = location.state?.podkast || {};

  const [currentUser, setCurrentUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    const userId = sessionStorage.getItem('userId') || 1;
    if (role && userId) {
      setCurrentUser({ id: userId, role });
    }
  }, []);

  const handleDeletePodcast = () => {
    alert(`Podkast "${podcast.name}" je obrisan.`);
    navigate("/podkasti");
  };

  const handleAddEpisode = () => {
    navigate(`/podkast/${podcast.id}/add-episode`);
  };

  const handleEditPodcast = () => {
    navigate(`/podkast/${podcast.id}/edit`, {
      state: {
        podcastName: podcast.naziv,
        podcastDescription: podcast.opis,
        podcastId: podcast.id
      }
    });
  };

  const handleEpisodeClick = (episodeId, episodeTitle, episodeDuration) => {
    navigate(`/podkast/${podcast.id}/episode/${episodeId}`, {
      state: { episodeTitle, episodeDuration }
    });
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      alert("Podkast je izbačen iz omiljenih");
    } else {
      alert("Podkast je dodat u omiljene");
    }
    setIsFavorite(!isFavorite);
  };

  if (!currentUser) {
    return <div>Učitavanje...</div>;
  }

  return (
    <div>
      <Navigation />
      <div className="podcast-details-page">
        <div className="podcast-details-header">
          <img
            src={podcast.thumbnail}
            alt={podcast.name}
            className="podcast-details-thumbnail"
          />
          <div className="podcast-details-info">
            <h1 className="podcast-details-title">{podcast.naziv}</h1>
            <p className="podcast-details-description">{podcast.opis}</p>
          </div>
        </div>

        <div className="podcast-episodes">
          <h2>Epizode</h2>
          <ul className="episode-list">
            {podcast.epizode?.map((episode) => (
              <li
                key={episode.id}
                className="episode-item"
                onClick={() => handleEpisodeClick(episode.id, episode.naziv, episode.trajanje)}
              >
                <span className="episode-number">Ep {episode.id}:</span>
                <span className="episode-title">{episode.naziv}</span>
                <span className="episode-duration">{episode.trajanje}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="podcast-actions">
          {currentUser.role === "creator" && (
            <>
              <button onClick={handleAddEpisode} className="btn add-episode">Dodaj Epizodu</button>
              <button onClick={handleEditPodcast} className="btn edit-podcast">Izmeni Podkast</button>
              <button onClick={handleDeletePodcast} className="btn delete-podcast">Obriši Podkast</button>
            </>
          )}

          {currentUser.role === "admin" && (
            <>
              <button onClick={handleEditPodcast} className="btn edit-podcast">Izmeni Podkast</button>
              <button onClick={handleDeletePodcast} className="btn delete-podcast">Obriši Podkast</button>
            </>
          )}

          {currentUser.role === "viewer" && (
            <button onClick={toggleFavorite} className="btn favorite-podcast">
              {isFavorite ? "Izbaci iz omiljenih" : "Dodaj u omiljene"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastDetails;
