const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Function to clean text
const cleanText = (text) => {
  return text.replace(/\s+/g, ' ').trim();
};

// Function to extract meta description
const extractMetaDescription = ($) => {
  const metaDesc = $('meta[name="description"]').attr('content');
  return metaDesc || $('meta[property="og:description"]').attr('content') || '';
};

// Function to extract favicon
const extractFavicon = ($) => {
  const favicon = $('link[rel="icon"]').attr('href') || 
                 $('link[rel="shortcut icon"]').attr('href') ||
                 '/favicon.ico';
  return favicon.startsWith('http') ? favicon : `https://${new URL($('link[rel="canonical"]').attr('href')).hostname}${favicon}`;
};

// Function to scrape a single URL
const scrapeUrl = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const $ = cheerio.load(response.data);
    const title = cleanText($('title').text());
    const description = cleanText(extractMetaDescription($));
    const favicon = extractFavicon($);

    return {
      url,
      title,
      description,
      favicon,
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  }
};

// Search endpoint
app.get('/search', async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    // Search using DuckDuckGo API (no API key required)
    const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json`;
    const response = await axios.get(searchUrl);
    
    // Process results
    const results = await Promise.all(
      response.data.RelatedTopics
        .slice(0, 10)
        .map(async (topic) => {
          const url = topic.FirstURL;
          const scrapedData = await scrapeUrl(url);
          return scrapedData;
        })
    );

    // Filter out failed scrapes and send results
    const validResults = results.filter(result => result !== null);
    res.json(validResults);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Error performing search' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); 