import React from 'react'
import { Link } from "react-router-dom"

export default function Header () {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/discover">Discover</Link>
            <Link to="/favorites">Favorites</Link> 
            <Link to="/pantry">Pantry</Link>
        </nav>
    );
}