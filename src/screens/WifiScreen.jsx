/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import CustomThreeStar from '../components/Threejs/CustomThreeStar';
import { PostWifiConfigure, PostWifiStart, PostWifistop } from '../api/hotspot';
import { useSnackbar } from '../hooks/SnackBar';




const Wificreen = () => {

  const showSnackbar = useSnackbar();
  const [hotspotConfig, setHotspotConfig] = useState({
    ssid: "MyHotspot",
    password: "mypassword123",
    ipAddress: "192.168.137.1",
    subnetMask: "255.255.255.0",
    gateway: "192.168.137.1",
  });


  const { mutate: configure } = useMutation({
    mutationFn: PostWifiConfigure,
    onSuccess: async (data) => {

      showSnackbar('Updated Successfully', 'success');

    },
    onError: (error, variables, context) => {
      showSnackbar(error?.message, 'error');
    },
  });
  const { mutate: StartHotspot } = useMutation({
    mutationFn: PostWifiStart,
    onSuccess: async (data) => {

      showSnackbar('Updated Successfully', 'success');

    },
    onError: (error, variables, context) => {
      showSnackbar(error?.message, 'error');
    },
  });
  const { mutate: StopHotspot } = useMutation({
    mutationFn: PostWifistop,
    onSuccess: async (data) => {

      showSnackbar('Updated Successfully', 'success');

    },
    onError: (error, variables, context) => {
      showSnackbar(error?.message, 'error');
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotspotConfig({ ...hotspotConfig, [name]: value });
  };


  return (
    <Box sx={ { height: '100vh' } }>

      <Container sx={ { pt: '9vh' } }>
        <Typography variant="h4" align="center" gutterBottom>
         Development In Progress
        </Typography>
        {/* <Box>
          <Grid container spacing={ 2 }>
            <Grid item xs={ 12 }>
              <TextField
                fullWidth
                label="SSID"
                name="ssid"
                value={ hotspotConfig.ssid }
                onChange={ handleChange }
                required
              />
            </Grid>
            <Grid item xs={ 12 }>
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={ hotspotConfig.password }
                onChange={ handleChange }
                required
              />
            </Grid>
            <Grid item xs={ 12 }>
              <TextField
                fullWidth
                label="Static IP Address"
                name="ipAddress"
                value={ hotspotConfig.ipAddress }
                onChange={ handleChange }
                required
              />
            </Grid>
            <Grid item xs={ 12 }>
              <TextField
                fullWidth
                label="Subnet Mask"
                name="subnetMask"
                value={ hotspotConfig.subnetMask }
                onChange={ handleChange }
                required
              />
            </Grid>
            <Grid item xs={ 12 }>
              <TextField
                fullWidth
                label="Gateway"
                name="gateway"
                value={ hotspotConfig.gateway }
                onChange={ handleChange }
                required
              />
            </Grid>
            <Grid item xs={ 12 }>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={ () => configure(hotspotConfig) }
              >
                Configure Hotspot
              </Button>
            </Grid>
          </Grid>
        </Box> */}
        <Box mt={ 3 } display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="success"
            onClick={ StartHotspot }
          >
            Start Hotspot
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={ StopHotspot }
          >
            Stop Hotspot
          </Button>
        </Box>
      </Container>

    </Box>
  );
};

export default Wificreen;
