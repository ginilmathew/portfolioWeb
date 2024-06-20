import logo from './logo.svg';
import './App.css';
import { Box } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from 'react-hot-toast';
function App () {
  return (
    <Box>
      <RouterProvider router={ router } />
      <Toaster />
    </Box>
  );
}

export default App;
