import { Backdrop, Box, CircularProgress, Dialog, Typography } from '@mui/material'
import React, { useState } from 'react'

import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';


import CustomButton from './CustomButton';
import { useSnackbar } from '../../hooks/SnackBar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { COLORS } from '../../assets/colors';





const CustomDelete = ({ open, onClose, heading, paragraph, fun, _id, fetch }) => {

  const showSnackbar = useSnackbar();
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: fun,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [fetch] })
      showSnackbar('Delete successfully!', 'success');
      onClose()

    },
    onError: (error, variables, context) => {

      showSnackbar(error?.message, 'error');
    },
    // onSettled: async () => {
    //     console.log("I'm second!")
    // },
  })


  const submitForm = () => {
    mutate(_id)
  }


  return (
    <Dialog
      sx={ { zIndex: 30000 } }
      maxWidth={ 'md' }
      onClose={ onClose } open={ open }>
      <DialogTitle id="alert-dialog-title">
        <Box display={ 'flex' } justifyContent={ 'space-between' } marginBottom={ '1px solid "#000"' } width={ '100%' }>
          <Typography variant="body1" color={ COLORS.primary } fontFamily={ 'Raleway, sans-serif' } fontSize={ 24 } fontWeight={ 'bold' }>Delete { heading }</Typography>
          <CancelIcon sx={ {
            "&:hover": { color: "#000" },
            color: COLORS.primary,
            cursor: 'pointer'
          } } onClick={ onClose } />
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box display={ 'flex' } justifyContent={ 'center' } mb={ 1 }>

          <ReportProblemIcon sx={ { color: '#dbaf1f', fontSize: 40 } } />

        </Box>
        <DialogContentText id="alert-dialog-description">
          <Box display={ 'flex' } justifyContent={ 'center' }>
            <Typography width={ '70%' } textAlign={ 'center' } fontFamily={ 'Raleway, sans-serif' } fontSize={ 16 } fontWeight={ 'bold' }>Are you sure you want to delete this { paragraph }?</Typography>`
          </Box>
        </DialogContentText>
        <Box display={ 'flex' } justifyContent={ 'center' } py={ 1 } >
          <CustomButton
            disabled={ false }
            btncolor=''
            height={ '100%' }
            IconEnd={ "" }
            IconStart={ '' }
            startIcon={ false }
            endIcon={ false }
            onClick={ submitForm }
            label='confirm' />
        </Box>
      </DialogContent>
      <Backdrop
        sx={ { color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 } }
        open={ isLoading }
      //onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  )
}

export default CustomDelete
