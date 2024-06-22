import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { FormGroup, Typography, Stack, Button } from "@mui/material";
import { TextareaAutosize } from '@mui/base';
const CustomTextArea = ({
  fieldName,
  control,
  fieldLabel,
  placeholder,
  error,
  type,
  maxrow,
  rows,
  height,
  multiline,
  background,
  boxshadow,
  readOnly,
  buttonEnable,
  onClick,
  buttonText,
  changeValue,
  defaultValue,
  view
}) => {

  const [show, setShow] = useState(false)

  return (
    <>
      <FormGroup>
        <Stack direction={ 'row' } justifyContent={ 'space-between' } alignItems={ 'center' }>
          <Typography fontFamily={ 'Raleway, sans-serif' } fontWeight={ '700' } px={ '3px' } mb={ '2px' }
            sx={ {
              fontSize: {
                lg: 16,
                md: 14,
                sm: 12,
                xs: 11,
              },

            } }>{ fieldLabel }</Typography>
          {/* {buttonEnable && <CustomButton onClick={onClick} label={buttonText ? buttonText : "Open"} />} */ }

        </Stack>

        <Controller
          name={ fieldName }
          control={ control }
          render={ ({ field: { value, onChange, onBlur } }) => (
            <TextareaAutosize
              style={ { borderRadius: "5px", color: '#000', border: '1px solid grey', padding: 3 } }
              minRows={ 4 }
              readOnly={ false }
              defaultValue={ defaultValue }
              value={ value }
              onChange={ changeValue ? changeValue : onChange }
              onBlur={ onBlur }
              aria-invalid={ error ? "true" : "false" }
              className="form-control"
              placeholder={ placeholder }
              id="exampleInputEmail1"
              type={ type ? show ? 'text' : type : "text" }
              maxLength={ maxrow }
              maxRows={ maxrow }
              multiline={ multiline }
            // InputProps={{
            //   readOnly: ,
            //   style: { borderRadius: "10px", minHeight: height, background: background, boxShadow: boxshadow, color: "black" },
            // }}
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
  );
};

export default CustomTextArea;