import React, { useState } from 'react'
import { Controller } from "react-hook-form";
import {FormGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { COLORS } from '../../assets/colors';

const CustomLoginInput = ({ control, fieldName, placeholder, error, icon, type }) => {

  const [show, setShow] = useState(true);
  const [textType, setTextType] = useState(null);


  const passwordType = () => {
    setShow(!show)
    if (show) {
      setTextType('text')
    } else {
      setTextType('password')
    }
  }


  return (
    <>
      <FormGroup>
        <Controller
          name={ fieldName }
          control={ control }
          render={ ({ field }) => (
            
              <TextField
                autoComplete={ false }
                { ...field }
                aria-invalid={ error ? "true" : "false" }
                className="form-control"
                placeholder={ placeholder }
                id="exampleInputEmail1"
                variant="standard"
                type={ textType ? textType : type }
                InputProps={ {
                    disableUnderline:true,
                  sx: {
                    display:'flex',
                    alignItems:'center',
                    fontFamily: 'Outfit-Light',
                    paddingLeft: 1,
                    borderRadius: "10px",
                    opacity: 1,
                    paddingX:1,
                    background: "#FFFFFF",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "padding-box",
                    boxShadow: "0px 3px 6px #0000000D",
                    height: "48px",
                    letterSpacing: "1px",
                    fontWeight: '600px',
                    width: '100%', 
                    border: 'none',// Ensuring 100% width
                  },
           
                  endAdornment: type === "password" ? show ? <VisibilityOffIcon sx={ { cursor: 'pointer', color: COLORS?.secondary,"&:hover": { color: "#000" } } } onClick={ passwordType } /> : <VisibilityIcon sx={ { cursor: 'pointer', color: COLORS?.secondary ,"&:hover": { color: "#000" } } } onClick={ passwordType } /> : null
                } }
              />
       
          ) }
        />
        { error && (
          <p
            role="alert"
            style={ {
              letterSpacing: 1,
              color: "red",
              display: "flex",
              flexDirection: "start",
              paddingLeft: "10px",
              fontSize: "12px",
              fontFamily: 'Raleway, sans-serif'
            } }
          >
            { error?.message }
          </p>
        ) }
      </FormGroup>
    </>
  )
}

export default CustomLoginInput