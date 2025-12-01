import React, { useState, useEffect, useMemo } from 'react';
import RecipeList from "../components/RecipeList";
import { useFavorites } from "../context/FavoritesContext";
import usePantry from "../hooks/usePantry";
import filterRecipes from "../utils/filterRecipes";

export default function Discover({ searchQuery = "" }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { favorites, toggleFavorite } = useFavorites();
  const { pantry } = usePantry();

  const mealToRecipe = (meal) => ({
    id: meal.idMeal,
    title: meal.strMeal,
    description: meal.strCategory || "",
    image: meal.strMealThumb,
    ingredients: extractIngredients(meal),
    isFavorite: favorites.includes(meal.idMeal),
  });

  const fetchMeals = async () => {
    try {
      setLoading(true);
      setError(null);
      let results = [];

      if (pantry.length > 0) {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${pantry[0]}`
        );
        const json = await response.json();

        if (json.meals) {
          for (const mealSummary of json.meals) {
            const detailsResponse = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealSummary.idMeal}`
            );
            const detailsJson = await detailsResponse.json();
            if (detailsJson.meals && detailsJson.meals[0]) {
              const fullMeal = mealToRecipe(detailsJson.meals[0]);
              const hasAllIngredients = pantry.every((item) =>
                fullMeal.ingredients.some((ing) =>
                  ing.toLowerCase().includes(item.toLowerCase())
                )
              );
              if (hasAllIngredients) results.push(fullMeal);
            }
            if (results.length >= 8) break; // stop after 8 recipes
          }
        }
      } else if (searchQuery.trim() !== "") {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
        );
        const json = await response.json();
        if (json.meals) results = json.meals.map(mealToRecipe).slice(0, 8);
      } else {
        for (let i = 0; i < 6; i++) {
          const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/random.php"
          );
          const json = await response.json();
          if (json.meals && json.meals[0]) results.push(mealToRecipe(json.meals[0]));
        }
      }

      const uniqueResults = results
        .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
        .slice(0, 8);

      setRecipes(uniqueResults);
    } catch (err) {
      setError("Couldn't fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [pantry, searchQuery, favorites]);

  const filteredRecipes = useMemo(() => {
    return filterRecipes(recipes, pantry, searchQuery).slice(0, 8);
  }, [recipes, pantry, searchQuery]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Discover Recipes</h2>

      <button style={styles.randomButton} onClick={fetchMeals}>
        Random
      </button>

      <RecipeList
        recipes={filteredRecipes}
        loading={loading}
        error={error}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

function extractIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient && ingredient.trim() !== "") list.push(ingredient.trim());
  }
  return list;
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "20px",
  },
  randomButton: {
    marginBottom: "20px",
    padding: "10px 16px",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
};
