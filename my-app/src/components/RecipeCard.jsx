import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from "./FavoriteButton";

export default function RecipeCard({recipe, onToggleFavorite}) {
    return (
        <div style = {styles.card}>
            <img
                src = {recipe.image}
                alt = {recipe.title}
                style = {styles.image}
            />

            <div style = {styles.content}>
                <h3 style = {styles.title}>{recipe.title}</h3>

                {recipe.description && (
                    <p style = {styles.description}>{recipe.description}</p>
                )}

            <div style = {styles.actions}>
                <Link
                    to={`/recipe/${recipe.id}`}
                    style = {styles.viewButton}
                >
                    View Recipe
                </Link>
                
                <FavoriteButton
                    isFavorite={recipe.isFavorite}
                    onToggle={() => onToggleFavorite(recipe.id)}
                    />
                </div>
            </div>
        </div>
    );
}

const styles = {
    card: {
        width: "100%",
        maxWidth: "350px",
        background: "lightgray",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 2px 8px black",
        display: "flex",
        flexDirection: "column",
        margin: "15px auto",
    },

    image: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
    },

    content: {
        padding: "15px",
    },

    title: {
        margin: "0 0 8px 0",
        fontSize: "1.2rem",
        fontWeight: "600",
    },
    
    description: {
        margin: "0 0 15px 0",
        fontSize: "0.9rem",
        color: "darkgrey",
        lineHeight: "1.2",
    },

    actions: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    viewButton: {
        backgroundColor: "#2b2a2aff",
        color: "white",
        padding: "8px 12px",
        borderRadius: "6px",
        textDecoration: "none",
        fontSize: "0.9rem",
    },
};