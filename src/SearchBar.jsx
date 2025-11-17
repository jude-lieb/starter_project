import { useState } from "react";

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState("");

  async function performSearch() {
    if (!query.trim()) return;

    const res = await fetch(
      `http://localhost:5000/api/search?query=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    onResults(data);
  }

  function handleSubmit(event) {
    event.preventDefault();
    performSearch();
  }

  return (
    <form className="input-group mb-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search player..."
      />
      <button className="btn btn-primary" type="submit">
        Search
      </button>
    </form>
  );
}
