import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useFavorites} from "../context/FavoritesContext";

export default function RecipeDetails () {
    const {id} = useParams();
    const {favorites, toggleFavorite, isFavorite} = useFavorites();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRecipe() {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
                );
                const json = await response.json();

                if (!json.meals || !json.meals[0]) {
                    setError("This recipe wasn't found");
                    setLoading(false);
                    return;
                }

                const meal = json.meals[0];

                setRecipe({
                     id: meal.idMeal,
                    title: meal.strMeal,
                    category: meal.strCategory,
                    area: meal.strArea,
                    instructions: meal.strInstructions,
                    image: meal.strMealThumb,
                    ingredients: extractIngredients(meal),
                });

                setLoading(false);
            } catch (err) {
                setError("Can't load");
                setLoading(false);
            }
        }

        fetchRecipe();
    }, [id]);

    if (loading) return <p style = {styles.loading}>Loading!...</p>;
    if (error) return <p style = {styles.error}>{error}</p>;
    if (!recipe) return null;

    return (
        <div style = {styles.container}>
            <h2 style = {styles.title}>{recipe.title}</h2>

            <img src = {recipe.image} alt = {recipe.title} style = {styles.image} />

            <button
                onClick = {() => toggleFavorite(recipe.id)}
                style = {{
                    ...styles.favoriteButton,
                    background: isFavorite(recipe.id) ? "red" : "gray",
                }}
            >
                {isFavorite(recipe.id) ? "X Remove Favorite" : "✔ Add to Favorites"}
            </button>

            <p style = {styles.meta}>
                <strong>Category:</strong> {recipe.category} <br />
                <strong>Region:</strong> {recipe.area}
            </p>

            <h3 style = {styles.sectionTitle}>Ingredients</h3>
            <ul style = {styles.ingredientsList}>
                {recipe.ingredients.map((item, i) => (
                    <li key = {i} style = {styles.ingredientItem}>
                        * {item}
                    </li>
                ))}
            </ul>

            <h3 style = {styles.sectionTitle}>Instructions</h3>
            <p style = {styles.instructions}>{recipe.instructions}</p>
        </div>
    );
}

function extractIngredients(meal) {
    const list = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            list.push(`${ingredient} - ${measure}`);
        }
    }
    return list;
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
    },
    title: {
        fontSize: "2rem",
        fontWeight: "600",
        marginBottom: "10px",
    },
    image: {
        width: "100%",
        borderRadius: "12px",
        marginBottom: "20px",
    },
    favoriteButton: {
        padding: "10px 16px",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        cursor: "pointer",
        marginBottom: "20px",
    },
    meta: {
        fontSize: "1rem",
        marginBottom: "20px",
    },
    sectionTitle: {
        fontSize: "1.4rem",
        fontWeight: "600",
        marginTop: "20px",
        marginBottom: "10px",
    },
    ingredientsList: {
        paddingLeft: "20px",
        marginBottom: "20px",
    },
    ingredientItem: {
        marginBottom: "5px",
    },
    instructions: {
        whiteSpace: "pre-line",
        lineHeight: "1.6",
        opacity: 0.9,
    },
    loading: {
        textAlign: "center",
        marginTop: "40px",
        fontSize: "1.2rem",
    },
    error: {
        textAlign: "center",
        marginTop: "40px",
        color: "red",
        fontSize: "1.2rem",
    },
};
