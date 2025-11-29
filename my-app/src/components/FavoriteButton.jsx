import React from 'react';

export default function FavoriteButton({ isFavorite, onToggle }) {
    return (
        <button
            onClick = {onToggle}
            style = {{
                ...styles.button,
                backgroundColor: isFavorite ? "red" : "#443939ff",
            }}
            >
                {isFavorite ? "Remove Favorite" : "Make Favorite"}
            </button>
    );
}

const styles = {
    button: {
        padding: "8px 14px",
        border: "1px solid #b1b0b0ff",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "0.9rem",
    }
};