import { Box, Typography } from '@mui/material'
import React from 'react'
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import DialogContent from '@mui/material/DialogContent';
import { COLORS } from '../../assets/colors';
const CustomModal = ({ children, open, close, label, width, block, FS }) => {

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;

    close();

  }
  // });
  return (
    <Dialog
      disableEnforceFocus
      // TransitionComponent={Transition}
      fullWidth
      maxWidth={ width ? width : 'md' }
      fullScreen={ FS ? FS : false }
      open={ open }
      onClose={ block ? handleClose : close }
      aria-describedby="alert-dialog-description"
    >

      <Box display={ 'flex' } justifyContent={ 'space-between' } height={ 40 } px={ 3.5 } borderBottom={ `1px solid #f5f5f5` } py={ 2 } alignItems={ 'center' }>
        <Typography fontFamily={ 'Raleway, sans-serif' } sx={ {
          fontSize: {
            lg: 26,
            md: 24,
            sm: 20,
            xs: 16,
          },

        } } letterSpacing={ 1 } color={ COLORS.secondary } fontWeight={ 'bold' }>{ label }</Typography>
        <CancelIcon sx={ {
          fontSize: 35,
          "&:hover": { color: COLORS.black }, color: COLORS.secondary,
          cursor: 'pointer'
        } } onClick={ close } />
      </Box>
      <DialogContent dividers sx={ { scrollbarWidth: 'thin' } }>
        { children }
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal