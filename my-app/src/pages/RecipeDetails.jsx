import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

// Mock recipe data - replace with your actual data source
const mockRecipes = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish",
    image: "/images/carbonara.jpg",
    ingredients: ["pasta", "eggs", "cheese", "bacon"],
    instructions: ["Cook pasta", "Mix eggs and cheese", "Combine everything"],
    cookTime: "30 min",
    difficulty: "Medium"
  },
  {
    id: 2, 
    name: "Chicken Curry",
    description: "Spicy and flavorful curry",
    image: "/images/curry.jpg",
    ingredients: ["chicken", "curry powder", "coconut milk"],
    instructions: ["Cook chicken", "Add spices", "Simmer with coconut milk"],
    cookTime: "45 min",
    difficulty: "Easy"
  }
];

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useLocalStorage(`recipe-notes-${id}`, '');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      try {
        const foundRecipe = mockRecipes.find(rec => rec.id === parseInt(id));
        if (foundRecipe) {
          setRecipe(foundRecipe);
        } else {
          setError('Recipe not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Error loading recipe');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const toggleFavorite = () => {
    if (favorites.some(fav => fav.id === recipe.id)) {
      setFavorites(favorites.filter(fav => fav.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const isFavorite = favorites.some(fav => fav.id === recipe?.id);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!recipe) return <ErrorMessage message="Recipe not found" />;

  return (
    <div className="recipe-details">
      <img src={recipe.image} alt={recipe.name} />
      <h1>{recipe.name}</h1>
      <p className="description">{recipe.description}</p>
      
      <div className="recipe-info">
        <p><strong>Cook Time:</strong> {recipe.cookTime}</p>
        <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
      </div>

      <div className="favorite-section">
        <button 
          onClick={toggleFavorite}
          className={`favorite-btn large ${isFavorite ? 'favorited' : ''}`}
        >
          {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </button>
      </div>

      <div className="ingredients-section">
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="instructions-section">
        <h3>Instructions</h3>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
      
      <div className="notes-section">
        <h3>Your Recipe Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your personal notes about this recipe... Modifications, tips, or reviews!"
          rows="6"
          className="notes-textarea"
        />
        <p className="notes-help">Your notes will be saved automatically</p>
      </div>
    </div>
  );
};

export default RecipeDetails;