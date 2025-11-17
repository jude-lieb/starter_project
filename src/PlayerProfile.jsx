import { useEffect, useState } from "react";

export default function PlayerProfile({ pdga }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/player/${pdga}`)
      .then(res => res.json())
      .then(setProfile);
  }, [pdga]);

  if (!profile) return <p>Loading profile…</p>;

  return (
    <div style={{ marginTop: 20 }}>
      <h2>{profile.name}</h2>
      <p><strong>Rating:</strong> {profile.rating}</p>
      <p><strong>Location:</strong> {profile.location}</p>
      <p><strong>Classification:</strong> {profile.classification}</p>
      <p><strong>Membership:</strong> {profile.membershipStatus}</p>
    </div>
  );
}
