import { useState } from "react";

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState("");

  async function handleSearch() {
    const res = await fetch(`http://localhost:5000/api/search?query=${query}`);
    const data = await res.json();

    console.log("Search results:", data);

    onResults(data); // This triggers App to update results
  }

  return (
    <div>
      <input 
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search player..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
