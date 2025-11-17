import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PlayerProfile({ pdga, onPin, onUnpin, isPinned }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/player/${pdga}`)
      .then((res) => res.json())
      .then(setProfile);
  }, [pdga]);

  if (!profile) return <p>Loading profile…</p>;

  return (
    <div className="card mt-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h2 className="card-title mb-0">{profile.name} #{profile.pdga}</h2>
          {!isPinned ? (
            <button
              className="btn btn-outline-primary"
              onClick={() => onPin(profile)}
            >
              Pin
            </button>
          ) : (
            <button
              className="btn btn-outline-danger"
              onClick={() => onUnpin(profile.pdgaNumber ?? profile.pdga)}
            >
              Unpin
            </button>
          )}
        </div>

        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item"><strong>Rating:</strong> {profile.rating || "Rating inactive"}</li>
          <li className="list-group-item"><strong>Location:</strong> {profile.location}</li>
          <li className="list-group-item"><strong>Classification:</strong> {profile.classification}</li>
          <li className="list-group-item"><strong>Membership:</strong> {profile.membershipStatus}</li>
        </ul>

        {profile.image && (
          <img
            src={profile.image}
            alt={`${profile.name}'s photo`}
            className="img-fluid rounded d-block mx-auto"
            style={{
              maxWidth: "250px",
              maxHeight: "250px",
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        )}
      </div>
    </div>
  );
}
