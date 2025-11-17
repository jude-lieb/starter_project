export default function PlayerResults({ results, onSelect }) {
  return (
    <div className="list-group mt-3">
      {results.map((player) => (
        <button
          key={player.pdgaNumber}
          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          onClick={() => onSelect(player)}
        >
          <span><strong>{player.name}</strong></span>
          <span className="text-muted">PDGA #{player.pdgaNumber}</span>
        </button>
      ))}
    </div>
  );
}