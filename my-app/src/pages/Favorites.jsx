import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

const Favorites = () => {
  const [favorites] = useLocalStorage('favorites', []);

  return (
    <div className="favorites-page">
      <h1>Your Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <ErrorMessage message="You haven't added any favorites yet. Browse recipes and click the 'Add Favorite' button!" />
      ) : (
        <div className="recipes-grid">
          {favorites.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.name} />
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              <p><strong>Cook Time:</strong> {recipe.cookTime}</p>
              <div className="recipe-actions">
                <Link to={`/recipedetails/${recipe.id}`} className="details-link">
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;