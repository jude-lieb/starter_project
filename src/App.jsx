import "./App.css";
import { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import PlayerResults from "./PlayerResults.jsx";
import PlayerProfile from "./PlayerProfile.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  function handleSearchResults(data) {
    setSelected(null); // <-- IMPORTANT
    setResults(data);
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">PDGA Player Lookup</h1>

      <div className="row">
        {/* Left Column: Search + Results */}
        <div className="col-md-5">
          <SearchBar onResults={handleSearchResults} />

          {!selected && (
            <PlayerResults
              results={results}
              onSelect={(player) => setSelected(player)}
            />
          )}
        </div>

        {/* Right Column: Profile */}
        <div className="col-md-7">
          {selected && <PlayerProfile pdga={selected.pdgaNumber} />}
        </div>
      </div>
    </div>
  );
}
