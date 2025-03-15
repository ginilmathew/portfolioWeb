import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Paper,
  Container,
  IconButton,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Mic as MicIcon,
} from '@mui/icons-material';

const BrowserScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('google');
  const [isSearched, setIsSearched] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearched(true);
      setIframeSrc(`http://localhost:3001/search?q=${encodeURIComponent(searchQuery)}&engine=${searchType}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearched(false);
    setIframeSrc('');
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Search Header */}
        <Box sx={{ textAlign: 'center', mb: isSearched ? 2 : 6 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#1976d2',
              mb: 1,
              display: isSearched ? { xs: 'none', md: 'block' } : 'block'
            }}
          >
            SearchMaster
          </Typography>
          {!isSearched && (
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
              Find exactly what you're looking for
            </Typography>
          )}
          
          {/* Search Form */}
          <Paper 
            component="form" 
            onSubmit={handleSearch}
            elevation={3}
            sx={{ 
              p: '2px 4px', 
              display: 'flex', 
              alignItems: 'center',
              width: '100%',
              borderRadius: 3,
              border: '1px solid #e0e0e0'
            }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Search the web..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                disableUnderline: true,
              }}
            />
            {searchQuery && (
              <IconButton 
                sx={{ p: '10px' }} 
                aria-label="clear" 
                onClick={handleClearSearch}
              >
                <ClearIcon />
              </IconButton>
            )}
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="voice search">
              <MicIcon />
            </IconButton>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ ml: 1, borderRadius: 2, px: 3 }}
            >
              Search
            </Button>
          </Paper>
          
          {/* Search Categories */}
          {isSearched && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <Select
                  value={searchType}
                  onChange={handleSearchTypeChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Search type' }}
                >
                  <MenuItem value="google">Google</MenuItem>
                  <MenuItem value="bing">Bing</MenuItem>
                  <MenuItem value="duckduckgo">DuckDuckGo</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </Box>

        {isSearched && (
          <Box sx={{ mt: 4 }}>
            {/* Search Results */}
            <iframe 
              src={iframeSrc} 
              title="Search Results" 
              width="100%" 
              height="600px" 
              style={{ border: 'none', borderRadius: '8px' }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default BrowserScreen;





// // server.js
// const express = require('express');
// const axios = require('axios');
// const app = express();
// const port = 3001;

// app.use(express.json());

// // Proxy endpoint
// app.get('/search', async (req, res) => {
//   const { q, engine } = req.query;

//   let url;
//   switch (engine) {
//     case 'google':
//       url = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
//       break;
//     case 'bing':
//       url = `https://www.bing.com/search?q=${encodeURIComponent(q)}`;
//       break;
//     case 'duckduckgo':
//       url = `https://duckduckgo.com/?q=${encodeURIComponent(q)}`;
//       break;
//     default:
//       return res.status(400).send('Invalid search engine');
//   }

//   try {
//     const response = await axios.get(url, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
//       },
//     });

//     // Modify links to open in the same window
//     let modifiedHtml = response.data.replace(/<a /g, '<a target="_self" ');

//     res.send(modifiedHtml);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching search results');
//   }
// });

// app.listen(port, () => {
//   console.log(`Proxy server running on http://localhost:${port}`);
// });