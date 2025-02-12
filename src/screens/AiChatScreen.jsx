import React, { useCallback, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, TextField, IconButton, CircularProgress, Paper, Typography, Tooltip, useTheme, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useMutation } from '@tanstack/react-query';
import { PostAi } from '../api/ai';
import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AiChatScreen = () => {
  const [conversation, setConversation] = useState([]);
  const [text, setText] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { mutate, isPending } = useMutation({
    mutationFn: PostAi,
    onSuccess: async (data) => {
      const aiResponse = { text: data?.data?.data, type: 'ai' };
      setConversation((prev) => [...prev, aiResponse]);
      toast.success('AI response received.');
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const onchngeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const send = async () => {
    if (!text.trim()) return;
    const newMessage = { text, type: 'user' };
    setConversation((prev) => [...prev, newMessage]);
    setText('');

    try {
      await mutate({ prompt: text });
    } catch (error) {
      toast.error('Unable to send the message.');
    }
  };

  const handleKeyDown = (event) => {
    if (text.trim() === '' || isPending) return;
    if (event.key === 'Enter' && !event.shiftKey) {
      send();
      event.preventDefault();
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const renderMessage = (msg, index) => (
    <Box
      key={index}
      sx={{
        display: 'flex',
        justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
        mb: 2,
        px: isMobile ? 1 : 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor: msg.type === 'user' ? theme.palette.primary.main : theme.palette.grey[100],
          color: msg.type === 'user' ? '#fff' : theme.palette.text.primary,
          maxWidth: '80%',
          borderRadius: msg.type === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <ReactMarkdown
          children={msg.text}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <Box sx={{ position: 'relative' }}>
                  <SyntaxHighlighter
                    style={materialDark}
                    language={match[1]}
                    children={String(children).replace(/\n$/, '')}
                    {...props}
                  />
                  <Tooltip title="Copy code" placement="top" arrow>
                    <IconButton
                      onClick={() => copyToClipboard(String(children))}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        },
                      }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </Paper>
    </Box>
  );

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.default,
      }}
    >
      {/* Chat Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          pt: isMobile ? '7vh' : '9vh',
          px: isMobile ? 1 : 3,
        }}
      >
        {conversation.length ? (
          conversation.map((msg, index) => renderMessage(msg, index))
        ) : (
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 5 }}
          >
            Start a conversation with our AI assistant.
          </Typography>
        )}
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: isMobile ? 1 : 3,
          py: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.paper,
        }}
      >
        <TextField
          multiline
          minRows={1}
          maxRows={5}
          onKeyDown={handleKeyDown}
          onChange={onchngeText}
          value={text}
          placeholder="Type a message..."
          fullWidth
          variant="outlined"
          sx={{
            flex: 1,
            mr: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 10,
              backgroundColor: theme.palette.grey[100],
            },
          }}
        />
        <IconButton
          color="primary"
          onClick={send}
          disabled={!text.trim() || isPending}
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          {isPending ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default AiChatScreen;
