import React, { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

// Mock recipe data - you might be getting this from an API
const mockRecipes = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish",
    image: "/images/carbonara.jpg",
    ingredients: ["pasta", "eggs", "cheese", "bacon"],
    cookTime: "30 min"
  },
  {
    id: 2, 
    name: "Chicken Curry",
    description: "Spicy and flavorful curry",
    image: "/images/curry.jpg",
    ingredients: ["chicken", "curry powder", "coconut milk"],
    cookTime: "45 min"
  },
  {
    id: 3,
    name: "Chocolate Cake",
    description: "Rich and moist chocolate dessert",
    image: "/images/cake.jpg",
    ingredients: ["flour", "cocoa", "sugar", "eggs"],
    cookTime: "60 min"
  }
];

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [loading, setLoading] = useState(false);

  // Use useMemo for optimized filtering and sorting - THIS IS YOUR ADVANCED HOOK
  const filteredRecipes = useMemo(() => {
    let filtered = mockRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    // Sort the filtered results
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'cookTime') {
        return a.cookTime.localeCompare(b.cookTime);
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, sortBy]);

  const toggleFavorite = (recipe) => {
    if (favorites.some(fav => fav.id === recipe.id)) {
      setFavorites(favorites.filter(fav => fav.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.id === recipeId);
  };

  if (loading) return <Spinner />;

  return (
    <div className="discover-page">
      <h1>Discover Recipes</h1>
      
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search recipes by name, description, or ingredients..."
      />
      
      <div className="filters">
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="cookTime">Sort by Cook Time</option>
        </select>
      </div>

      {filteredRecipes.length === 0 ? (
        <ErrorMessage message="No recipes found matching your search." />
      ) : (
        <div className="recipes-grid">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.name} />
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              <p><strong>Cook Time:</strong> {recipe.cookTime}</p>
              <div className="recipe-actions">
                <button 
                  onClick={() => toggleFavorite(recipe)}
                  className={`favorite-btn ${isFavorite(recipe.id) ? 'favorited' : ''}`}
                >
                  {isFavorite(recipe.id) ? '❤️ Remove Favorite' : '🤍 Add Favorite'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Discover;