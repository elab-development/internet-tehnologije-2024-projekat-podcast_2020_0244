import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]); 
  const [newCategory, setNewCategory] = useState(''); 
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); 


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/kategorije', {
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
          },
        });

        setCategories(response.data.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); 

  
  const handleAddCategory = async (e) => {
    e.preventDefault();

  
    if (!newCategory.trim()) {
      setErrors({ category: 'Naziv kategorije je obavezan' });
      return;
    }

    const categoryData = { naziv: newCategory };

    try {
     
      const response = await axios.post('http://localhost:8000/api/kategorije', categoryData, {
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'), 
        }
      }); 

    
      setCategories((prevCategories) => [...prevCategories, response.data.data]);
      setNewCategory('');
      setErrors({}); 
      setSuccessMessage('Kategorija uspešno dodata!');

    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors({ category: 'Naziv kategorije mora biti jedinstven' });
      } else {
        setErrors({ category: 'Došlo je do greške pri dodavanju kategorije' });
      }

      setSuccessMessage('');
    }
  };

  return (
    <div className="categories-page">
    
      <Navigation role="administrator" />

    
      <div className="categories-container">
        <h2>Kategorije</h2>

      
        {errors.category && <div style={{ color: 'red' }}>{errors.category}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

      
        
      
        <ul className="categories-list">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id} className="category-item">
                {category.naziv}
              </li>
            ))
          ) : (
            <p>Nemate kategorija još uvek.</p>
          )}
        </ul>
        <form onSubmit={handleAddCategory}>
          <div>
            <input
              type="text"
              placeholder="Dodajte novu kategoriju"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="add-category-input"
            />
            <button type="submit" className="add-category-button">
              Dodaj
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Categories;
