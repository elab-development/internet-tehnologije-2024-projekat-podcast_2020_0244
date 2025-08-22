import React from 'react';
import { Link } from 'react-router-dom'; 
import Navigation from './Navigation'; 
import Footer from  "./Footer";
import './MyPodcasts.css';

const MyPodcasts = () => {
  const mojiPodkasti = [
    {
      id: 3,
      thumbnail: '/images/health_wellness.jpg',
      naziv: 'Health & Wellness',
      opis: 'Saveti i diskusije o zdravlju i blagostanju.',
      kreator: 'Milan Nikolić',
      epizode: [
        { id: 1, naziv: 'Osnove zdravog života', trajanje: '27:00', opis: 'Kako održati zdrav životni stil?' },
        { id: 2, naziv: 'Mentalno zdravlje i prevencija', trajanje: '30:30', opis: 'Saveti za mentalno blagostanje.' },
      ]
    },
  ];

  return (
    <div className="my-podcasts-page">
      <Navigation/>
      <main className="main-content">
        {mojiPodkasti.map((podkast) => (
          <Link 
            to={`/podkast/${podkast.id}`} 
            className="podcast-link" 
            key={podkast.id} 
            state={{ podkast }} 
          >
            <div className="podcast-card">
              <img
                src={podkast.thumbnail}
                alt={podkast.naziv}
                className="podcast-thumbnail"
              />
              <div className="podcast-details">
                <h3>{podkast.naziv}</h3>
                <p>{podkast.opis}</p>
              </div>
            </div>
          </Link>
        ))}
      </main>
      <Footer/>
    </div>
  );
};

export default MyPodcasts;
