import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Container,
  IconButton,
  Stack,
  Avatar,
  Chip,
  Fade,
  Divider,
  ThemeProvider,
  createTheme,
  CssBaseline,
  InputAdornment
} from '@mui/material';
import { 
  Fullscreen, 
  FullscreenExit, 
  YouTube as YouTubeIcon, 
  Search as SearchIcon,
  VideoLibrary as VideoLibraryIcon
} from '@mui/icons-material';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF0000', // YouTube red
    },
    secondary: {
      main: '#282828', // Dark gray
    },
    background: {
      default: '#f9f9f9', // Light gray background
      paper: '#ffffff',   // White paper
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

const Youtube = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [error, setError] = useState('');
  const [videoStats, setVideoStats] = useState(null);
  const [recentUrls, setRecentUrls] = useState([]);

  // Function to extract YouTube video ID from URL
  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Handle URL submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = extractVideoId(url);
    if (id) {
      setVideoId(id);
      setError('');
      
      // Add to recent URLs if not already there
      if (!recentUrls.includes(url)) {
        setRecentUrls(prev => [url, ...prev.slice(0, 2)]);
      }
      
      // Simulate fetching video stats
      setVideoStats({
        views: Math.floor(Math.random() * 1000000) + 100000,
        likes: Math.floor(Math.random() * 50000) + 5000,
        publishDate: new Date().toLocaleDateString()
      });
    } else {
      setError('Invalid YouTube URL. Please try again.');
      setVideoId('');
      setVideoStats(null);
    }
  };

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 2 ,pt:10}}>
        <Paper 
          elevation={3} 
          sx={{ 
            padding: 4, 
            borderRadius: 2,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
              <YouTubeIcon />
            </Avatar>
            <Typography 
              variant="h4" 
              color="text.primary"
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(to right, #FF0000, #282828)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              YouTube Player
            </Typography>
          </Stack>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                placeholder="Paste YouTube URL here"
                variant="outlined"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                error={!!error}
                helperText={error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large"
                sx={{ 
                  px: 4,
                  borderRadius: 2,
                  boxShadow: '0 4px 10px rgba(255,0,0,0.3)'
                }}
              >
                Play
              </Button>
            </Stack>
          </Box>

          {recentUrls.length > 0 && (
            <Box mb={4}>
              <Typography variant="subtitle1" fontWeight={600} mb={1} display="flex" alignItems="center">
                <VideoLibraryIcon fontSize="small" sx={{ mr: 1 }} />
                Recent Videos
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {recentUrls.map((recentUrl, index) => (
                  <Chip 
                    key={index}
                    label={`Video ${recentUrls.length - index}`}
                    variant="outlined"
                    color="primary"
                    clickable
                    onClick={() => {
                      setUrl(recentUrl);
                      handleSubmit({ preventDefault: () => {} });
                    }}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {videoId && (
            <Fade in={!!videoId} timeout={800}>
              <Box>
                <Box 
                  sx={{
                    position: 'relative',
                    paddingTop: isFullScreen ? '100vh' : '56.25%', // 16:9 ratio for normal mode
                    width: isFullScreen ? '100vw' : '100%',
                    height: isFullScreen ? '100vh' : 'auto',
                    position: isFullScreen ? 'fixed' : 'relative',
                    left: isFullScreen ? 0 : 'auto',
                    top: isFullScreen ? 0 : 'auto',
                    zIndex: isFullScreen ? 9999 : 1,
                    bgcolor: 'black',
                    borderRadius: isFullScreen ? 0 : 2,
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                    title="YouTube video player"
                  />
                  <IconButton
                    onClick={toggleFullScreen}
                    sx={{
                      position: 'absolute',
                      bottom: '50%',
                      right: '50%',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.3)',
                      },
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
                  </IconButton>
                </Box>

                {videoStats && (
                  <Paper elevation={1} sx={{ mt: 3, p: 2, borderRadius: 2 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Now Playing
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`youtube.com/watch?v=${videoId}`}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />} mt={{ xs: 2, sm: 0 }}>
                        <Chip 
                          icon={<YouTubeIcon fontSize="small" />} 
                          label={`${formatNumber(videoStats.views)} views`} 
                          variant="outlined" 
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          Added on {videoStats.publishDate}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                )}
              </Box>
            </Fade>
          )}
          
          {!videoId && (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 8, 
                opacity: 0.7,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <YouTubeIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Paste a YouTube URL to start watching
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Youtube;