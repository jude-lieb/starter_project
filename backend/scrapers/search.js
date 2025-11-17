import axios from "axios";
import * as cheerio from "cheerio";

export async function searchPlayers(query) {
  const url = `https://www.pdga.com/search?keywords=${encodeURIComponent(query)}`;
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  const results = [];

  $(".views-row.type-Players").each((i, row) => {
    const anchor = $(row).find("h4.field-content a");
    const name = anchor.find(".player-name").text().trim();
    const pdgaText = anchor.find(".pdga-number").text().trim(); // "PDGA #213807"
    const pdgaNumber = pdgaText.replace("PDGA #", "").trim();
    const profileUrl = anchor.attr("href");

    const location = $(row)
      .find(".views-field-search-player-index-Country .field-content")
      .text()
      .trim();

    results.push({
      name,
      pdgaNumber,
      profileUrl: `https://www.pdga.com${profileUrl}`,
      location
    });
  });

  return results;
}
