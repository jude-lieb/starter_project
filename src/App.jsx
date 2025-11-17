import './App.css';
import { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import PlayerResults from "./PlayerResults.jsx";
import PlayerProfile from "./PlayerProfile.jsx";

export default function App() {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>PDGA Player Lookup</h1>

      <SearchBar onResults={setResults} />

      {!selected && (
        <PlayerResults
          results={results}
          onSelect={player => setSelected(player)}
        />
      )}

      {selected && <PlayerProfile pdga={selected.pdgaNumber} />}
    </div>
  );
}
