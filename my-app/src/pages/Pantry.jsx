import React, {useState} from 'react';
import usePantry from "../hooks/usePantry";

export default function Pantry () {
    const {pantry, addToPantry, removeFromPantry, clearPantry} = usePantry();
    const [input, setInput] = useState("");

    function handleAdd(e) {
        e.preventDefault();

        const trimmed = input.trim();
        if (trimmed === "") return;

        addToPantry(trimmed);
        setInput("");
    }

    return (
        <div style = {styles.container}>
            <h2 style = {styles.title}> Welcome to your Pantry! </h2>

            <form onSubmit = {handleAdd} style = {styles.form}>
                <input
                    type = "text"
                    placeholder = "Add an Item"
                    value = {input}
                    onChange = {(e) => setInput(e.target.value)}
                    style = {styles.input}
                />
                <button type = "submit" style = {styles.addButton}>
                    Add
                </button>
            </form>

            {pantry.length === 0 ? (
                <p style = {styles.empty}> Pantry is currently empty.</p>
            ) : (
                <ul style = {styles.list}>
                    {pantry.map((item, index) => (
                        <li key = {index} style = {styles.listItem}>
                            <span>{item}</span>
                            <button
                                style = {styles.removeButton}
                                onClick = {() => removeFromPantry(item)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {pantry.length > 0 && (
                <button style = {styles.clearButton} onClick = {clearPantry}>
                    Clear
                </button>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
    },
    title: {
        fontSize: "1.8rem",
        fontWeight: "600",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
    },
    input: {
        flex: 1,
        padding: "10px",
        fontSize: "1rem",
        border: "1px solid gray",
        borderRadius: "6px",
    },
    addButton: {
        padding: "10px 14px",
        background: "blue",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    empty: {
        fontSize: "1rem",
        opacity: 0.7,
    },
    list: {
        listStyle : "none",
        padding: 0,
        margin: 0,
    },
    listItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: "1px solid white",
    },
    removeButton: {
        padding: "6px 10px",
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    clearButton: {
        marginTop: "20px",
        padding: "10px 14px",
        background: "#444",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
};
