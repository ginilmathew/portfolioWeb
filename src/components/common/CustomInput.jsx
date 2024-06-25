import React from 'react'
import { Controller } from "react-hook-form";
import { FormGroup, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
const CustomInput = ({
  fieldName,
  control,
  fieldLabel,
  placeholder,
  error,
  view,
  changeValue,
  disabled,
  defaultValue,
  type,
  readonly,
  w,
  Not,
  paddingRight,
  cust_value
}) => {

  return (
    <>
      <FormGroup>
        { !Not && <Typography fontFamily={ 'Outfit-Medium' } fontWeight={ '700' } px={ '3px' } mb={ '2px' }
          sx={ {
            fontSize: {
              lg: 16,
              md: 14,
              sm: 12,
              xs: 11,
            },

          } }
        >{ fieldLabel }

        </Typography> }
        <Controller
          name={ fieldName }
          control={ control }
          render={ ({ field: { value, onChange, onBlur } }) => (
            <TextField
              type={ type }
              defaultValue={ defaultValue }
              value={ cust_value ? cust_value : value }
              onChange={ (e) => {
                onChange(e)
                if (changeValue) {
                  changeValue(e.target.value)
                }
              } }
              onBlur={ onBlur }
              aria-invalid={ error ? "true" : "false" }
              className="form-control"
              placeholder={ placeholder }
              id="exampleInputEmail1"
              InputProps={ {
                disableUnderline: true,
                readOnly: readonly,
                sx: {
                  width: w ? w : '100%',
                  borderRadius: "5px",
                  opacity: "1",
                  background: view ? '#f5f5f5' : "#ffff",
                  height: "40px",
                  fontFamily: "Raleway, sans-serif",
                  letterSpacing: "1px",
                  fontWeight: '700px',
                  border: 'none',
                  paddingRight: paddingRight
                },
              } }
            />
          ) }
        />
        { error && (
          <p
            role="alert"
            style={ {
              color: "red",
              display: "flex",
              flexDirection: "start",
              paddingLeft: "10px",
              fontSize: "12px",
            } }
          >
            { error?.message }
          </p>
        ) }
      </FormGroup>
    </>
  )
}

export default CustomInput