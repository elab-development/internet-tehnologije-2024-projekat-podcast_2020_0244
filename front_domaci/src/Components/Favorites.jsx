import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import useCreators from './UseCreators'; 
import Footer from  "./Footer";
import './Favorites.css';

const Favorites = () => {
  const omiljeniPodkasti = [
    {
      id: 1,
      thumbnail: '/images/tech_talks.jpg',
      naziv: 'Tech Talks',
      opis: 'Diskusije o najnovijim tehnologijama i inovacijama.',
      kreator: 'Marko Jovanović',
      epizode: [
        { id: 1, naziv: 'Uvod u AI', trajanje: '25:30', opis: 'Razgovaramo o osnovama veštačke inteligencije.' },
        { id: 2, naziv: 'Osnove cloud computinga', trajanje: '30:15', opis: 'Šta je cloud computing i kako funkcioniše?' },
        { id: 3, naziv: 'Budućnost kvantnog računanja', trajanje: '20:45', opis: 'Razmatramo napredak kvantnog računanja.' },
      ]
    },
    {
      id: 2,
      thumbnail: '/images/history_unfolded.jpg',
      naziv: 'History Unfolded',
      opis: 'Priče iz prošlosti koje oblikuju sadašnjost.',
      kreator: 'Ana Petrović',
      epizode: [
        { id: 1, naziv: 'Uspon drevnih civilizacija', trajanje: '22:30', opis: 'Proučavamo nastanak prvih velikih civilizacija.' },
        { id: 2, naziv: 'Prvi svetski rat: Duboko zaranjanje', trajanje: '35:10', opis: 'Detaljan pregled Prvog svetskog rata.' },
      ]
    },
  ];

  const { creators, selectedCreator, handleRemoveClick } = useCreators();

  const filteredPodcasts = selectedCreator
    ? omiljeniPodkasti.filter(podkast => podkast.kreator === selectedCreator.username)
    : omiljeniPodkasti;

  return (
    <div className="favorites-page">
      <Navigation />

      <div className="content">
        <aside className="sidebar">
          <h2>Kreatori</h2>
          <ul>
            {creators.map((creator) => (
              <li
                key={creator.id}
                onClick={() => handleRemoveClick(creator)} 
                style={{ cursor: 'pointer', fontWeight: selectedCreator?.id === creator.id ? 'bold' : 'normal' }}
              >
                {creator.username}
              </li>
            ))}
          </ul>
        </aside>

        <main className="main-content">
          {filteredPodcasts.length > 0 ? (
            filteredPodcasts.map((podkast) => (
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
            ))
          ) : (
            <p>Nema podkasta za selektovanog kreatora.</p>
          )}
        </main>
      </div>
      <Footer/>
    </div>
  );
};

export default Favorites;
