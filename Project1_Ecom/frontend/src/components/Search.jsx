import React, { useState } from "react";
const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        setQuery(e.target.value);
        if (e.target.value) {
            const response = await fetch(`/search?q=${e.target.value}`);
            const data = await response.json();
            setResults(data);
        } else {
            setResults([]);
        }
    };

    return (
        <div class="search">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search items..."
            />
            <ul>
                {results.map((item) => (
                    <li key={item._id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;

