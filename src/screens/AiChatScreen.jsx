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

    // Add the user's message to the conversation
    const newMessage = { text, type: 'user' };
    setConversation((prev) => [...prev, newMessage]);
    setText('');

    try {
      // Format the conversation history for the API
      const conversationHistory = conversation
        .map((msg) => `${msg.type === 'user' ? 'You' : 'AI'}: ${msg.text}`)
        .join('\n');

      // Send the conversation history along with the new message
      await mutate({ prompt: `${conversationHistory}\nYou: ${text}` });
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
        mb: 1.5, // Reduced margin bottom
        px: isMobile ? 1 : 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 1.5, // Reduced padding
          backgroundColor: msg.type === 'user' ? '#0078D4' : '#f1f1f1',
          color: msg.type === 'user' ? '#fff' : '#000',
          maxWidth: '80%',
          borderRadius: msg.type === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0', // Smaller radius
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Lighter shadow
          position: 'relative',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9rem', // Smaller font size
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
        background: 'linear-gradient(135deg, #f3f8fe, #e9eef3)',
      }}
    >
      {/* Chat Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          pt: isMobile ? '6vh' : '8vh', // Reduced padding top
          px: isMobile ? 1 : 2, // Reduced padding
        }}
      >
        {conversation.length ? (
          conversation.map((msg, index) => renderMessage(msg, index))
        ) : (
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 4, fontSize: '0.9rem' }} // Smaller font size
          >
            Start chatting with GinAI 2.0 – faster, smarter, and designed for seamless, continuous conversations. Enjoy the future of AI interaction!
          </Typography>
        )}
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: isMobile ? 1 : 2, // Reduced padding
          py: 1.5, // Reduced padding
          borderTop: '1px solid #ddd',
          background: '#ffffff',
        }}
      >
        <TextField
          multiline
          minRows={1}
          maxRows={4} // Reduced max rows
          onKeyDown={handleKeyDown}
          onChange={onchngeText}
          value={text}
          placeholder="Type a message..."
          fullWidth
          variant="outlined"
          sx={{
            flex: 1,
            mr: 1.5, // Reduced margin
            '& .MuiOutlinedInput-root': {
              borderRadius: 8, // Smaller radius
              backgroundColor: '#f9f9f9',
              fontSize: '0.9rem', // Smaller font size
            },
          }}
        />
        <IconButton
          color="primary"
          onClick={send}
          disabled={!text.trim() || isPending}
          sx={{
            width: 40, // Smaller button
            height: 40, // Smaller button
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          {isPending ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default AiChatScreen;
