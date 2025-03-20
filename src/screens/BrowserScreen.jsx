import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  IconButton,
  Divider,
  Card,
  CardContent,
  Link,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Mic as MicIcon,
} from '@mui/icons-material';
import { postBrowser } from '../api/browser';
import { BASE_URL } from '../config';

const BrowserScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearched(true);
      setIsLoading(true);
      
      try {
        const response = await fetch(`${BASE_URL}browser/browser-ginil/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }
  };



  // const { mutate, isPending } = useMutation({
  //   mutationFn: postBrowser,
  //   onSuccess: async (data) => {
  //     const aiResponse = { text: data?.data?.data, type: 'ai' };
  //     setConversation((prev) => [...prev, aiResponse]);
  //     toast.success('AI response received.');
  //   },
  //   onError: () => {
  //     toast.error('Something went wrong. Please try again.');
  //   },
  // });


  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearched(false);
    setSearchResults([]);
  };

  return (
    <Container maxWidth="lg" mt={10}>
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
              Search the web with ease
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
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Search'}
            </Button>
          </Paper>
        </Box>

        {/* Search Results */}
        {isSearched && (
          <Box sx={{ mt: 4 }}>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <Card key={index} sx={{ mb: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {result.favicon && (
                        <img 
                          src={result.favicon} 
                          alt="favicon" 
                          style={{ width: 16, height: 16, marginRight: 8 }}
                        />
                      )}
                      <Link 
                        href={result.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={{ 
                          textDecoration: 'none',
                          color: '#1a0dab',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        {result.title}
                      </Link>
                    </Box>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: '0.875rem',
                        lineHeight: 1.58
                      }}
                    >
                      {result.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography 
                variant="h6" 
                color="text.secondary" 
                textAlign="center"
                sx={{ mt: 4 }}
              >
                No results found. Try different keywords.
              </Typography>
            )}
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