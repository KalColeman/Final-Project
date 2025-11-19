import React, {useState} from "react";
import { Link } from "react-router-dom";

export default function Header () {
   const [open, setOpen] = useState(false);

   return (
    <nav style = {styles.nav}>

        {!open && (
        <button style = {styles.hamburger} onClick={() => setOpen(true)}>
            <div style = {styles.bar}></div>
            <div style = {styles.bar}></div>
            <div style = {styles.bar}></div>
        </button>
        )}

        {open && (
            <div style = {styles.menu}>
            
                <Link className="nav-link" to = "/" onClick ={() => setOpen(false)}>
                    Home
                </Link>

                <Link className="nav-link" to = "/discover" onClick = {() => setOpen(false)}>
                    Discover
                </Link>

                <Link className="nav-link" to = "/pantry" onClick = {() => setOpen(false)}>
                    Pantry
                </Link>

                <Link className="nav-link" to ="/favorites" onClick = {() => setOpen(false)}>
                    Favorites
                </Link>
            </div>
        )}
        </nav>
   );
}

const styles = {
    nav: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 15px",
        background: "#333",
        color: "white",
        position: "relative",
    },
    hamburger: {
        fontSize: "2rem",
        background: "none",
        border: "none",
        color: "white",
        cursor: "pointer",
    },
    menu: {
        display: "flex",
        flexDirection: "row",
        background: "#444",
        padding: "10px",
        borderRadius: "10px",
        marginTop: "10px",
        gap: "20px",
        width: "100%",
    },
    link: {
        color: "white",
        textDecoration: "none",
        padding: "10px 0",
        margin: "5px 0",
    },
    bar: {
        width: "25px",
        height: "3px",
        backgroundColor: "white",
        margin: "4px 0",
        borderRadius: "2px",
    },
};