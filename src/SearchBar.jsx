import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState("");

  async function handleSearch() {
    const res = await fetch(`http://localhost:5000/api/search?query=${query}`);
    const data = await res.json();

    console.log("Search results:", data);
    onResults(data);
  }

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search player..."
      />
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}