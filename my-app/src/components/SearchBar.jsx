import React, {useState} from 'react'

export default function SearchBar ({onSearch}) {
    const [query, setQuery] = useState ("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    }

    return (
        <form onSubmit = {handleSubmit} style = {styles.form}>
            <input
                type = "text"
                placeholder = "Search for recipes"
                value = {query}
                onChange = {(e) => setQuery(e.target.value)}
                style = {styles.input}
            />
        </form>
    );
}

const styles = {
    form: {
        flex: 1,
        marginLeft: "15px",
        marginRight: "15px",
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #000",
    },
};