import "./App.css";
import { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import PlayerResults from "./PlayerResults.jsx";
import PlayerProfile from "./PlayerProfile.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [pinned, setPinned] = useState([]);

  function getPdgaNumber(player) {
    if (!player) return null;
    const id =
      player.pdgaNumber ??
      player.pdga ??
      player.pdgaId ??
      player.id ??
      player.number ??
      null;
    return id ? String(id) : null;
  }

  function handleSearchResults(data) {
    setResults(data);
  }

  function pinPlayer(player) {
    const pdgaNumber = getPdgaNumber(player);
    if (!pdgaNumber) return;

    const normalizedPlayer = { ...player, pdgaNumber };

    setPinned((prev) => {
      if (prev.some((p) => String(p.pdgaNumber) === pdgaNumber)) {
        return prev;
      }
      return [...prev, normalizedPlayer];
    });
  }

  function unpinPlayer(pdgaNumber) {
    const target = pdgaNumber ? String(pdgaNumber) : null;
    if (!target) return;

    setPinned((prev) => prev.filter((p) => String(p.pdgaNumber) !== target));
  }

  return (
    <div className="container py-4">
      

      <div className="row">
        
        {/* Left Column: Search + Results */}
        <div className="col-md-4">
          <h2 className="mb-4">PDGA Player Lookup</h2>
          <SearchBar onResults={handleSearchResults} />
          <PlayerResults
            results={results}
            onSelect={(player) => setSelected(player)}
          />
        </div>

        {/* Middle Column: Profile */}
        <div className="col-md-4">
          <h2 className="mb-4">Player Profile</h2>
          {selected && (
            <div>
              <PlayerProfile
                pdga={selected.pdgaNumber ?? selected.pdga}
                onPin={pinPlayer}
                onUnpin={unpinPlayer}
                isPinned={pinned.some(
                  (p) =>
                    String(p.pdgaNumber) ===
                    String(selected.pdgaNumber ?? selected.pdga)
                )}
              />
            </div>
          )}
        </div>

        {/* Right Column: Pinned Players */}
        <div className="col-md-4">
          <h2>Pinned Players</h2>
          <div className="card shadow-sm">
            <div className="card-body">
              
              {pinned.length === 0 ? (
                <div><p>No pinned players yet.</p></div>
              ) : (
                <div className="list-group list-group-flush">
                  {pinned.map((p) => (
                    <div
                      key={String(p.pdgaNumber)}
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelected(p)}
                    >
                      <span><strong>{p.name}</strong></span>
                      <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          unpinPlayer(p.pdgaNumber);
                        }}
                      >
                        Unpin
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
