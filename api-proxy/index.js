import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 8080;

// ZenQuotes proxy
app.get("/api/zenquote", async (req, res) => {
  const response = await fetch("https://zenquotes.io/api/random", {
    headers: { Accept: "application/json" },
  });
  const data = await response.json();
  res.json(data);
});

// FavQs proxy
app.get("/api/quote", async (req, res) => {
  const response = await fetch("https://favqs.com/api/qotd");
  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
