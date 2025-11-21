import React from 'react';
import {useState, useEffect } from 'react';
import SpinnerImg from "../img/Spinner.svg";


export default function Spinner() {
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
                setSpinner(false)
        }, 3000);

        return() => clearTimeout(timeout);
    }, []);

    if (!spinner) return null;

    return (
        <div style = {styles.container}>
            <img src = {SpinnerImg} alt = "Loading..." style = {styles.img} />
        </div>
    );
}  

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        width: "100%",
    },
    img: {
        width: "70px",
        height: "70px",
    }
};