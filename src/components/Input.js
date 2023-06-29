import React from 'react';

function Input({ onSearch }) {
    const [value, setValue] = React.useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleChange} placeholder="Enter a city..." />
            <button type="submit">Search</button>
        </form>
    );
}

export default Input;
