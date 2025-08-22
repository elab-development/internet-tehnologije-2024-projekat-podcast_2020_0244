import React from 'react';
import { useNavigate } from 'react-router-dom';


const BackButton = () => {

  const navigate = useNavigate();


  const goBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={goBack}
      className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 mt-4 shadow-md"
    >
      &larr; Nazad
    </button>
  );
};

export default BackButton;
