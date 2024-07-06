import React, { useCallback, useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { Box, TextField, IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CustomThreeStar from '../components/Threejs/CustomThreeStar';
import { useMutation } from '@tanstack/react-query';
import { PostAi } from '../api/ai';
import toast from 'react-hot-toast';

const AiChatScreen = () => {
  const [conversation, setConversation] = useState([]);
  const [text, setText] = useState('');
  const { mutate, isPending } = useMutation({
    mutationFn: PostAi,
    onSuccess: async (data) => {
      const aiResponse = { text: data?.data?.data, type: 'ai' };
      setConversation([...conversation, aiResponse]);
      toast.success('Check your request,Thank you!!!');
    },
    onError: (error, variables, context) => {
      toast.error('Sorry, something went wrong');
    },
  });

  const onchngeText = useCallback((e) => {
    const { value } = e.target;
    setText(value);
  }, []);

  const send = async () => {
    if (text === '') return;
    const newMessage = { text, type: 'user' };
    setConversation([...conversation, newMessage]);
    setText('');

    try {
      await mutate({ prompt: text });
    } catch (error) {
      toast.error('Sorry, something went wrong');
    }
  };

  const handleKeyDown = (event) => {
    if (text === '' || isPending) return;
    if (event.key === 'Enter' && !event.shiftKey) {
      send();
      event.preventDefault();
    }
  };

  return (
    <Box sx={ { height: '100vh' } }>
      <CustomThreeStar />
      <Box
        sx={ {
          px: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pt: '9vh',
          pb: 8,
        } }
      >
        <Box
          sx={ {
            width: '83%',
            height: '70vh',
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
            mb: 4,
          } }
        >
          <MarkdownEditor
            value={ conversation.map((msg) => msg.text).join('\n\n') }
            style={ { height: '70vh', borderRadius: 3, padding: 10 } }
            config={ {
              view: {
                menu: false, // Hide the menu bar (if applicable)
              },
            } }

          />
        </Box>

        <Box sx={ { width: '85%' } }>
          <TextField
            multiline
            onKeyDown={ handleKeyDown }
            onChange={ (e) => onchngeText(e) }
            sx={ { background: '#f5f5f5', borderRadius: 8 } }
            variant="standard"
            placeholder="Type your message..."
            fullWidth
            InputProps={ {
              disableUnderline: true,
              endAdornment: (
                <>
                  { isPending && (
                    <Box
                      pl={ 1 }
                      pr={ 1 }

                      sx={ { position: 'absolute', bottom: 30, right: 0, zIndex: 10 } }
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <CircularProgress size={ 24 } sx={ { position: 'absolute', right: 18, color: 'primary.main' } } />
                    </Box>
                  ) }
                  { !isPending && (
                    <Box
                      pl={ 1 }
                      pr={ 1 }
                      pb={ 1 }
                      sx={ { position: 'absolute', bottom: 5, right: 0, zIndex: 10 } }
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <IconButton aria-label="send message" color="primary" onClick={ send }>
                        <SendIcon />
                      </IconButton>
                    </Box>
                  ) }
                </>
              ),
              sx: { minHeight: 65, pl: 4, pr: 3, borderRadius: 2 },
            } }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AiChatScreen;
