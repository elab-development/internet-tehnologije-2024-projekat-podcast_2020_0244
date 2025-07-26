import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Navigation.css';

const Navigation = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Uspešno ste se odjavili!");
    window.sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const userRole = sessionStorage.getItem('role');
    setRole(userRole);
  }, []);

  let navItems;

  if (role === 'admin') {
    navItems = (
      <ul className="nav-list">
        <li className="nav-item"><a href="/podkasti" className="nav-link">Podkasti</a></li>
        <li className="nav-item"><a href="/creators" className="nav-link">Kreatori</a></li>
        <li className="nav-item"><a href="/categories" className="nav-link">Kategorije</a></li>
      </ul>
    );
  } else if (role === 'creator') {
    navItems = (
      <ul className="nav-list">
        <li className="nav-item"><a href="/podkasti" className="nav-link">Podkasti</a></li>
        <li className="nav-item"><a href="/create-podcast" className="nav-link">Kreiraj Podkast</a></li>
        <li className="nav-item"><a href="/my-podcasts" className="nav-link">Moji Podkasti</a></li>
      </ul>
    );
  } else if (role === 'viewer') {
    navItems = (
      <ul className="nav-list">
        <li className="nav-item"><a href="/podkasti" className="nav-link">Podkasti</a></li>
        <li className="nav-item"><a href="/favorites" className="nav-link">Omiljeni Podkasti</a></li>
      </ul>
    );
  } else {
    navItems = (
      <p className="nav-error">Uloga nije prepoznata</p>
    );
  }

  return (
    <nav className="navigation">
      {navItems}
      <button onClick={handleLogout} className="logout-btn">Odjavi se</button>
    </nav>
  );
};

export default Navigation;
