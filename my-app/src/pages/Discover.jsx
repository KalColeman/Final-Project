import React, {useState, useEffect} from 'react';
import RecipeList from "../components/RecipeList";
import {useFavorites} from "../context/FavoritesContext";
import usePantry from "../hooks/usePantry";

export default function Discover ({searchQuery}) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {favorites, toggleFavorite} = useFavorites();
    const {pantry} = usePantry();

    const fetchRandomMeals = async (count = 6) => {
        try {
            setLoading(true);
            setError(null);
            const results = [];

            for (let i = 0; i < count; i++) {
                const response = await fetch (
                    "https://www.themealdb.com/api/json/v1/1/random.php"
                );
                const json = await response.json();

                if (json.meals && json.meals[0]) {
                    const meal = json.meals[0];
                    results.push ({
                        id: meal.idMeal,
                        title: meal.strMeal,
                        description: meal.strCategory || "",
                        image: meal.strMealThumb,
                        ingredients: extractIngredients(meal),
                        isFavorite: favorites.includes(meal.idMeal),
                    });
                }
            }

        setRecipes(results);
        } catch (err) {
        setError("Couldn't fetch recipes. Please try again.");
        } finally {
        setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchRandomMeals(6);
    }, []);

    useEffect(() => {
        setRecipes((prev) => 
        prev.map((r) => ({
            ...r,
            isFavorite: favorites.includes(r.id),
        }))
    );
    }, [favorites]);

    const filteredRecipes = recipes.filter((recipe) => {
        if (!recipe) return false;

        if (pantry.length > 0) {   
            const hasAllIngredients = pantry.every((item) => recipe.ingredients.includes(item));
            if (!hasAllIngredients) return false;
        }
    
        if (searchQuery && searchQuery.trim() !== "") {
            const text = searchQuery.toLowerCase();
            if (
                !recipe.title.toLowerCase().includes(text)
            ) {
                return false;
            }
        }
        return true;
    });


    return (
        <div style = {styles.container}>
            <h2 style = {styles.title}>Discover Recipes</h2>

            <button 
                style = {styles.randomButton}
                onClick = {() => fetchRandomMeals(6)}
            >
                Random
            </button>

            <RecipeList
                recipes = {filteredRecipes}
                loading = {loading}
                error = {error}
                onToggleFavorite = {toggleFavorite}
            />
        </div>
    );
}

function extractIngredients(meal) {
    const list =[];

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