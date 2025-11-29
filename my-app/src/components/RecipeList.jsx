import React from 'react';
import RecipeCard from "./RecipeCard";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

export default function RecipeList({
    recipes,
    loading,
    error,
    onToggleFavorite
}) {
    if (loading) {
        return <Spinner />
    }

    if (error) {
        return <ErrorMessage message = {error} />
    }

    if (!recipes || recipes.length === 0) {
        return <p style = {styles.empty}>No Recipes Found.</p>;
    }

    return (
        <div style = {styles.grid}>
            {recipes.map((recipe) => (
                <RecipeCard
                key = {recipe.id}
                recipe = {recipe}
                onToggleFavorite = {onToggleFavorite}
                />
            ))}
        </div>
    );
}

const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
    },

    empty: {
        textAlign: "center",
        color: "grey",
        marginTop: "30px",
        fontSize: "1.1rem",
    }
};