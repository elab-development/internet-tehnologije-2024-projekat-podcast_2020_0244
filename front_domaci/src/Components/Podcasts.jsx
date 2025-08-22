import React, { useState } from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import useCreators from "./UseCreators"; 
import Footer from  "./Footer";
import "./Podcasts.css";

const Podkast = () => {
  const { creators } = useCreators(); 

  const podkasti = [
    {
      id: 1,
      thumbnail: "/images/tech_talks.jpg",
      naziv: "Tech Talks",
      opis: "Diskusije o najnovijim tehnologijama i inovacijama.",
      kreator: "Marko Jovanović",
      epizode: [
        { id: 1, naziv: "Uvod u AI", trajanje: "25:30", opis: "Razgovaramo o osnovama veštačke inteligencije." },
        { id: 2, naziv: "Osnove cloud computinga", trajanje: "30:15", opis: "Šta je cloud computing i kako funkcioniše?" },
        { id: 3, naziv: "Budućnost kvantnog računanja", trajanje: "20:45", opis: "Razmatramo napredak kvantnog računanja." },
      ],
    },
    {
      id: 2,
      thumbnail: "/images/history_unfolded.jpg",
      naziv: "History Unfolded",
      opis: "Priče iz prošlosti koje oblikuju sadašnjost.",
      kreator: "Ana Petrović",
      epizode: [
        { id: 1, naziv: "Uspon drevnih civilizacija", trajanje: "22:30", opis: "Proučavamo nastanak prvih velikih civilizacija." },
        { id: 2, naziv: "Prvi svetski rat: Duboko zaranjanje", trajanje: "35:10", opis: "Detaljan pregled Prvog svetskog rata." },
      ],
    },
    {
      id: 3,
      thumbnail: "/images/health_wellness.jpg",
      naziv: "Health & Wellness",
      opis: "Saveti i diskusije o zdravlju i blagostanju.",
      kreator: "Milan Nikolić",
      epizode: [
        { id: 1, naziv: "Osnove zdravog života", trajanje: "27:00", opis: "Kako održati zdrav životni stil?" },
        { id: 2, naziv: "Mentalno zdravlje i prevencija", trajanje: "30:30", opis: "Saveti za mentalno blagostanje." },
      ],
    },
    {
      id: 4,
      thumbnail: "/images/coding_corner.jpg",
      naziv: "Coding Corner",
      opis: "Sve o programiranju, od početnika do eksperta.",
      kreator: "Ivana Ilić",
      epizode: [
        { id: 1, naziv: "Osnove JavaScript-a", trajanje: "18:40", opis: "Uvod u JavaScript i osnovne funkcionalnosti." },
        { id: 2, naziv: "Rad sa funkcijama", trajanje: "22:10", opis: "Kako koristiti funkcije u JavaScript-u." },
        { id: 3, naziv: "Napredni trikovi u Pythonu", trajanje: "28:20", opis: "Nauči kako efikasno koristiti Python za kompleksne zadatke." },
      ],
    },
  ];

  const [selectedKreator, setSelectedKreator] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filtriraniPodkasti = selectedKreator
    ? podkasti.filter((podkast) => podkast.kreator === selectedKreator)
    : podkasti;

  const indexOfLastPodkast = currentPage * itemsPerPage;
  const indexOfFirstPodkast = indexOfLastPodkast - itemsPerPage;
  const currentPodkasti = filtriraniPodkasti.slice(indexOfFirstPodkast, indexOfLastPodkast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filtriraniPodkasti.length / itemsPerPage);

  return (
    <div className="home-page">
      <Navigation />

      <div className="content">
        <aside className="sidebar">
          <h2>Kreatori</h2>
          <ul>
            <li className={!selectedKreator ? "active" : ""} onClick={() => setSelectedKreator("")}>
              Prikaži sve
            </li>
            {creators.map((creator) => (
              <li
                key={creator.id}
                className={selectedKreator === creator.username ? "active" : ""}
                onClick={() => setSelectedKreator(creator.username)}
              >
                {creator.username}
              </li>
            ))}
          </ul>
        </aside>

        {/* Glavni sadržaj */}
        <main className="main-content">
          {currentPodkasti.map((podkast) => (
            <Link to={`/podkast/${podkast.id}`} className="podcast-link" key={podkast.id} state={{ podkast }}>
              <div className="podcast-card">
                <img src={podkast.thumbnail} alt={podkast.naziv} className="podcast-thumbnail" />
                <div className="podcast-details">
                  <h3>{podkast.naziv}</h3>
                  <p>{podkast.opis}</p>
                  <p className="podcast-creator">Kreator: {podkast.kreator}</p>
                </div>
              </div>
            </Link>
          ))}

          <div className="pagination">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Prethodna
            </button>
            <span>
              Strana {currentPage} od {totalPages}
            </span>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              Sledeća
            </button>
          </div>
        </main>
      </div>
      <Footer/>
    </div>
  );
};

export default Podkast;
