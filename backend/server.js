import express from "express";
import cors from "cors";
import { searchPlayers } from "./scrapers/search.js";
import { scrapeProfile } from "./scrapers/profile.js";

const app = express();
app.use(cors());

app.get("/api/search", async (req, res) => {
  const q = req.query.query;
  if (!q) return res.json([]);
  try {
    const results = await searchPlayers(q);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.get("/api/player/:pdga", async (req, res) => {
  try {
    const data = await scrapeProfile(req.params.pdga);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
