import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PlayerProfile({ pdga }) {
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
        <h2 className="card-title mb-3">{profile.name}</h2>

        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item"><strong>Rating:</strong> {profile.rating}</li>
          <li className="list-group-item"><strong>Location:</strong> {profile.location}</li>
          <li className="list-group-item"><strong>Classification:</strong> {profile.classification}</li>
          <li className="list-group-item"><strong>Membership:</strong> {profile.membershipStatus}</li>
        </ul>

        {profile.image && (
          <img
            src={profile.image}
            alt={`${profile.name}'s photo`}
            className="img-fluid rounded"
            style={{ maxWidth: "250px" }}
          />
        )}
      </div>
    </div>
  );
}