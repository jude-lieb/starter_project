import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeProfile(pdga) {
  const url = `https://www.pdga.com/player/${pdga}`;
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  // --- Name ---
  const nameTitle = $("#page-title").text().trim(); // e.g. "Jude Lieb #213807"
  const name = nameTitle.replace(`#${pdga}`, "").trim();

  // --- Player info list ---
  const location = $("li.location").text().replace("Location:", "").trim();
  const classification = $("li.classification").text().replace("Classification:", "").trim();
  const memberSince = $("li.join-date").text().replace("Member Since:", "").trim();
  const membershipStatus = $("li.membership-status").text().replace("Membership Status:", "").trim();
  const officialStatus = $("li.official").text().replace("Official Status:", "").trim();

  // --- Rating ---
  let ratingText = $("li.current-rating").text().trim();
  const ratingMatch = ratingText.match(/Current Rating:\s*([0-9]+)/);
  const rating = ratingMatch ? ratingMatch[1] : null;

  // --- Career events ---
  const careerEvents = $("li.career-events").text().replace("Career Events:", "").trim();

  return {
    name,
    pdga,
    location,
    classification,
    memberSince,
    membershipStatus,
    officialStatus,
    rating,
    careerEvents
  };
}
