import logo from './logo.svg';
import './App.css';
import { Box } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from 'react-hot-toast';
import { SnackbarProvider } from './hooks/SnackBar';
function App () {
  return (
    <Box>
      <SnackbarProvider>
        <RouterProvider router={ router } />
        <Toaster />
      </SnackbarProvider>
    </Box>
  );
}

export default App;
