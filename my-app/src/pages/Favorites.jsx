import React, {useEffect, useState} from 'react';
import {useFavorites} from "../context/FavoritesContext";
import RecipeList from "../components/RecipeList";

export default function Favorites () {
    const {favorites, toggleFavorite} = useFavorites();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (favorites.length === 0 ){
            setRecipes([]);
            return;
        }

    async function loadFavoriteRecipes() {
        const results = [];

        for (const id of favorites) {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            const json = await response.json();

            if (json.meals && json.meals[0]) {
                const meal = json.meals[0];

                results.push({
                    id: meal.idMeal,
                    title: meal.strMeal,
                    description: meal.strCategory || "",
                    image: meal.strMealThumb,
                    ingredients: extractIngredients(meal),
                    isFavorite: true,
                });
            }
        }
        setRecipes(results);
        }
    loadFavoriteRecipes();
}, [favorites]);

    return (
        <div style = {styles.container}>
            <h2 style = {styles.title}>Your Favorites</h2>

            {favorites.length === 0 ? (
                <p style = {styles.empty}>You don't have any favorites.</p>
            ) : (
                <RecipeList
                    recipes = {recipes}
                    loading = {false}
                    error = {null}
                    onToggleFavorite = {toggleFavorite}
                />
            )}
        </div>
    );
}

function extractIngredients(meal) {
    const list = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient && ingredient.trim() !== "") {
            list.push(ingredient.trim());
        }
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
    empty: {
        fontSize: "1.2rem",
        opacity: 0.7,
        marginTop: "10px",
    },
};