import React, { useCallback, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, TextField, IconButton, CircularProgress, Paper, Typography, Tooltip } from '@mui/material';
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

  const { mutate, isPending } = useMutation({
    mutationFn: PostAi,
    onSuccess: async (data) => {
      const aiResponse = { text: data?.data?.data, type: 'ai' };
      setConversation((prev) => [...prev, aiResponse]);
      toast.success('AI response received.');
    },
    onError: (error) => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const onchngeText = useCallback((e) => {
    const { value } = e.target;
    setText(value);
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

  const renderMessage = (msg) => {
    return (
      <Box
        key={ msg.text }
        sx={ {
          mb: 2,
          display: 'flex',
          justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
        } }
      >
        <Paper
          elevation={ 3 }
          sx={ {
            p: 2,
            backgroundColor: msg.type === 'user' ? '#cfe9ba' : '#e6e6e6',
            maxWidth: '75%',
            borderRadius: '15px',
            position: 'relative',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          } }
        >
          <ReactMarkdown
            children={ msg.text }
            components={ {
              code ({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <Box sx={ { position: 'relative' } }>
                    <SyntaxHighlighter
                      style={ materialDark }
                      language={ match[1] }
                      children={ String(children).replace(/\n$/, '') }
                      { ...props }
                    />
                    <Tooltip title="Copy code" placement="top" arrow>
                      <IconButton
                        onClick={ () => copyToClipboard(String(children)) }
                        size="small"
                        sx={ {
                          position: 'absolute',
                          top: 5,
                          right: 5,
                          color: 'white',
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          },
                        } }
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  <code className={ className } { ...props }>
                    { children }
                  </code>
                );
              },
            } }
          />
        </Paper>
      </Box>
    );
  };

  return (
    <Box
      sx={ {
        height: '100vh',
        background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: { xs: 2, md: 6 },
      } }
    >
      <Box
        sx={ {
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 8,
          pb: 6,
        } }
      >
        <Paper
          elevation={ 5 }
          sx={ {
            width: '85%',
            maxHeight: '65vh',
            overflowY: 'auto',
            borderRadius: 4,
            backgroundColor: '#ffffff',
            padding: 3,
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
          } }
        >
          { conversation.length ? (
            conversation.map((msg) => renderMessage(msg))
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={ { mt: 5 } }
            >
              Start a conversation with our AI assistant.
            </Typography>
          ) }
        </Paper>

        <Box sx={ { width: '85%', mt: 3, position: 'relative' } }>
          <TextField
            multiline
            onKeyDown={ handleKeyDown }
            onChange={ onchngeText }
            value={ text }
            placeholder="Ask something to the AI..."
            fullWidth
            sx={ {
              background: '#ffffff',
              borderRadius: 3,
              padding: '10px 16px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
              },
            } }
            InputProps={ {
              disableUnderline: true,
              endAdornment: (
                <>
                  { isPending ? (
                    <CircularProgress
                      size={ 24 }
                      sx={ {
                        position: 'absolute',
                        right: 40,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'primary.main',
                      } }
                    />
                  ) : (
                    <IconButton
                      aria-label="send message"
                      color="primary"
                      onClick={ send }
                      sx={ {
                        position: 'absolute',
                        right: 5,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                        transition: 'background-color 0.3s ease',
                      } }
                    >
                      <SendIcon />
                    </IconButton>
                  ) }
                </>
              ),
            } }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AiChatScreen;
