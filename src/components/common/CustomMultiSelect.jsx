import React, { useState } from "react";
import { Box, FormGroup, Typography, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";
import Select from '@mui/material/Select';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import { COLORS } from "../../assets/colors";


const CustomMultiSelect = ({
  fieldName,
  control,
  fieldLabel,
  error,
  children,
  max,
  isMultiple,
  selectvalue,
  onChangeValue,
  options,
  background,
  height,
  size,
  value,
  label,
  defaultValue,
  view
}) => {

  return (
    <FormGroup>
      <Typography sx={ {
        paddingLeft: '5px',
        fontSize: {
          lg: size,
          md: 14,
          sm: 13,
          xs: 12,
        },
        fontFamily: 'Outfit-Medium',
      } }>{ `${fieldLabel}` }</Typography>
      <Controller
        name={ fieldName }
        control={ control }
        render={ ({ field: { onBlur, onChange } }) => (
          <Select
            labelId="multiple-select-label"
            id="multiple-select"
            multiple
            sx={ {
              background: COLORS.white,
              width: '100%', // Set width to 100% of the container
              whiteSpace: 'normal', // Allow content to wrap
              overflowWrap: 'break-word', // Break words if they exceed maxWidth
            } }
            readOnly={ view }

            onChange={ (e) => {
              onChange(e);
              if (onChangeValue) {
                onChangeValue(e);
              }
            } }

            value={ value }
            label="Select"

          >
            { children }
          </Select>
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
  );
};

export default CustomMultiSelect;
