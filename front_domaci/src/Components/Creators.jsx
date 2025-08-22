import React from "react";
import Navigation from "./Navigation";
import useCreators from "./UseCreators";
import Footer from  "./Footer";
import "./Creators.css";

const Creators = () => {
  const { creators, selectedCreator, handleRemoveClick, confirmRemove, cancelRemove } = useCreators();

  return (
    <div className="creators-page">
      <Navigation />
      <div className="creators-container">
        <h2>Kreatori</h2>
        <table className="creators-table">
          <thead>
            <tr>
              <th>Korisničko ime</th>
              <th>Broj podkasta</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {creators.map((creator) => (
              <tr key={creator.id}>
                <td>{creator.username}</td>
                <td>{creator.podcasts}</td>
                <td>
                  <button className="remove-button" onClick={() => handleRemoveClick(creator)}>
                    Ukloni Kreatora
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCreator && (
        <div className="modal">
          <div className="modal-content">
            <p>
              Da li ste sigurni da želite da uklonite kreatora <strong>{selectedCreator.username}</strong>?
            </p>
            <div className="modal-actions">
              <button className="confirm-button" onClick={confirmRemove}>
                Da
              </button>
              <button className="cancel-button" onClick={cancelRemove}>
                Ne
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Creators;
