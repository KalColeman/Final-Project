import React from 'react';

export default function ErrorMessage({message}) {
    if (!message) return null;

    return (
        <div style = {styles.container}>
            <p style = {styles.text}> {message} </p>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: "white",
        border: "1px solid red",
        padding: "10px 15px",
        borderRadius: "5px",
        margin: "10px 0",
        width: "100%",
        maxWidth: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "red",
        fontSize: "1rem",
        margin: 0,
        textAlign: "center",
        fontWeight: "400",
    }
};