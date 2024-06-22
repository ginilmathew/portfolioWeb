import React, { useState } from "react";
import { Box, FormGroup, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import Select from '@mui/material/Select';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import { COLORS } from "../../assets/colors";


const CustomSelect = ({ fieldName,
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
    defaultValue, view }) => {

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    return (
        <>
            <FormGroup>
                <Typography sx={ {
                    paddingLeft: '5px',
                    fontSize: {
                        lg: size,
                        md: 14,
                        sm: 13,
                        xs: 12,
                    },
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: "bold"
                } }>{ `${fieldLabel}` }

                </Typography>
                <Controller
                    name={ fieldName }
                    control={ control }
                    render={ ({ field: { onBlur, onChange } }) => (
                        <>
                            <Select
                                sx={ { background: COLORS.white } }
                                readOnly={ view }
                                open={ open }
                                onClose={ handleClose }
                                onOpen={ handleOpen }
                                displayEmpty
                                onChange={ (e) => {
                                    onChange(e)
                                    if (onChangeValue) {
                                        onChangeValue(e)
                                    }
                                } }
                                onBlur={ onBlur }
                                value={ value }
                                label={ label }
                                IconComponent={ () => (

                                    <Box
                                        sx={ {
                                            cursor: 'pointer'
                                        } }
                                        marginRight={ 1 }
                                        onClick={ handleOpen }
                                        width={ 25 }
                                        height={ 25 }
                                        display="flex"
                                        justifyContent={ "center" }
                                        alignItems="center"
                                        bgcolor={ COLORS.secondary }
                                        color={ COLORS.white }
                                        borderRadius={ "15px" }>
                                        <KeyboardArrowDownSharpIcon style={ { fontSize: 30, fontWeight: 'bold' } } />
                                    </Box>
                                ) }
                                style={ {
                                    borderRadius: "5px",
                                    height: 40,
                                } }
                            >
                                { children }
                            </Select>
                        </>
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

export default CustomSelect