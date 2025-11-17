import { useState } from "react";

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState("");

  async function handleSearch() {
    console.log("Searching for:", query);
    
    const res = await fetch(`http://localhost:5000/api/search?query=${query}`);
    const data = await res.json();

    console.log("Results:", data);
    onResults(data);
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        placeholder="Search PDGA player…"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
