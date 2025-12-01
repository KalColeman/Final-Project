import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound () {
    return (
        <div>
            <h1>404 - PAGE NOT FOUND</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to = "/">Go Back Home</Link>
        </div>
    );
}