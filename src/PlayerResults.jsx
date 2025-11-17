export default function PlayerResults({ results, onSelect }) {
  return (
    <div>
      {results.map(player => (
        <div
          key={player.pdgaNumber}
          style={{ padding: 10, borderBottom: "1px solid #ddd", cursor: "pointer" }}
          onClick={() => onSelect(player)}
        >
          <strong>{player.name}</strong> — PDGA #{player.pdgaNumber}
        </div>
      ))}
    </div>
  );
}
