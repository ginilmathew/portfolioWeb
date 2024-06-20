import React, { useCallback, useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { Box, TextField, IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CustomThreeStar from '../components/Threejs/CustomThreeStar';
import { useMutation } from '@tanstack/react-query';
import { PostAi } from '../api/ai';
import toast from 'react-hot-toast';
const AiChatScreen = () => {

  const [code, setCode] = useState('')
  const [text, setText] = useState('')




  const { mutate, isPending } = useMutation({
    mutationFn: PostAi,
    onSuccess: async (data) => {
      setCode(data?.data?.data)
    },
    onError: (error, variables, context) => {
      toast.error('Sorry Something Went Wrong')
    },
  })

  const onchngeText = useCallback((e) => {
    const { value } = e.target;
    setText(value)
  }, [code])


  const send = () => {
    if (text === "") return false;
    setCode('')
    mutate({ prompt: text })
  }


  const handleKeyDown = (event) => {
    if (text === "") return false;
    if (event.keyCode === 13) {

      send()

    }
  };



  return (
    <Box sx={ { height: '100vh', } }>
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
        <MarkdownEditor.Markdown
          source={ code }
          style={ { width: '83%', height: '70vh', borderRadius: 15, padding: 10, overflow: 'scroll', overflowX: 'unset', scrollbarWidth: 'none' } }
        />

        <Box sx={ { width: '85%', mt: 4, } }>
          <TextField
            onError={ true }
            onKeyDown={ handleKeyDown }
            onChange={ (e) => onchngeText(e) }
            sx={ { background: "#f5f5f5", borderRadius: 20 } }
            variant="outlined"
            placeholder="Type your message..."
            fullWidth
            InputProps={ {
              endAdornment: (
                <>
                  { isPending && (
                    <CircularProgress size={ 24 } sx={ { position: 'absolute', right: 18, color: 'primary.main' } } />
                  ) }
                  { !isPending && <IconButton aria-label="send message" color="primary" onClick={ send }>
                    <SendIcon />
                  </IconButton> }

                </>
              ),
              sx: { borderRadius: 15, height: 60, pl: 1 }
            } }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AiChatScreen;
