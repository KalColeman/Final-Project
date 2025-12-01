import React from 'react';
import {Link} from 'react-router-dom';


export default function Home() {
    return (
        <div style = {styles.container}> 
            <h1 style = {styles.title}> Welcome to Cookify! </h1>
            <p style = {styles.subtitle}> The recipe finder!</p>
        
            <div style = {styles.cardContainer}>
                <div style = {styles.card}>
                    <h2 style = {styles.cardTitle}> Manage your pantry</h2>
                    <p style = {styles.cardText}> Want to add or remove something? </p>
                    <Link to = "/Pantry" style = {styles.button}> Go To Pantry</Link>
                </div>

                <div style = {styles.card}>
                    <h2 style = {styles.cardTitle}> Your Favorites </h2>
                    <Link to = "/Favorites" style = {styles.button}> Go to Favorites </Link>
                </div>

                <div style = {styles.card}>
                    <h2 style = {styles.cardTitle}> Discover something new </h2>
                    <Link to = "/Discover" style = {styles.button}> Discover </Link>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
        textAlign: "center",
    },
    title: {
        fontSize: "2.6rem",
        marginBottom: "10px",
        fontWeight: "700",
    },
    subtitle: {
        fontSize: "1.2rem",
        opacity: 0.8,
        marginBottom: "40px",
    },
    cardContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "25px",
    },
    card: {
        padding: "20px",
        borderRadius: "12px",
        background: "#f8f8f8",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    cardTitle: {
        fontSize: "1.4rem",
        marginBottom: "10px",
        fontWeight: "600",
    },
    cardText: {
        fontSize: "1rem",
        opacity: 0.8,
        marginBottom: "20px",
    },
    button: {
        display: "inline-block",
        padding: "10px 16px",
        background: "#4a90e2",
        color: "white",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "600",
    }
};
