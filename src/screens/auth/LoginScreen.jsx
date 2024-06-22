
import React, { useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Grid, Box, Typography, IconButton } from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import CustomLoginInput from '../../components/common/CustomLoginInputs';
import LoginBackground from '../../components/login/CustomLoginbackground';
import { COLORS } from '../../assets/colors';
import CustomButton from '../../components/common/CustomButton';
import { useMutation } from '@tanstack/react-query';
import { PostLogin } from '../../api/login';
import { useSnackbar } from '../../hooks/SnackBar';
import { userStore } from '../../store/userStore';
import CustomBackDrop from '../../components/common/CustomBackDrop';
import CottageIcon from '@mui/icons-material/Cottage';

const LoginScreen = () => {

    const navigate = useNavigate();
    const showSnackbar = useSnackbar();
    const updateUser = userStore((state) => state.updateuser);

    const schema = object().shape({
        email: yup.string().email().required('Email is required'),
        password: yup.string()
            .required('No password provided.')
            .min(6, 'Password is too short')
            .max(10, 'Password should be at least 10 characters')
    });

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),

    });

    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));


    const { mutate, isPending } = useMutation({
        mutationFn: PostLogin,
        onSuccess: async (data) => {


            updateUser(data?.data?.data?.user);
            const jsonData = JSON.stringify(data?.data?.data?.user);
            // Store data in localStorage
            localStorage.setItem('token', data?.data?.token);
            localStorage.setItem('user', jsonData);
            showSnackbar('Login succesfully', 'success');
            navigate('/admin')
        },
        onError: (error, variables, context) => {
            showSnackbar(error?.message, 'error');
        },
    })




    const NavigationTohome = useCallback((data) => {
        mutate(data)
    }, [mutate]);

    const PortfolioNavigate = useCallback(() => {
        navigate('/')
    }, [navigate])


    return (
        <Grid container>
            <LoginBackground />
            <Grid item xs={ 12 } sm={ isMdScreen ? 4 : 12 } style={ { width: isMdScreen ? '50%' : '100%', height: '100vh' } }>
                <Grid
                    container
                    display={ 'flex' }
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    px={ 2 }
                    style={ { height: '100%', textAlign: 'center', margin: 0, background: COLORS.primary } }
                >
                    <Box sx={ { width: isMdScreen ? '70%' : '100%', gap: 3, display: 'flex', flexDirection: 'column' } }>
                        <Grid item xl={ 12 } xs={ 12 } sx={ { display: 'flex', justifyContent: 'center' } }>
                            {/* <LoginLogo /> */ }
                        </Grid>
                        <Grid item xl={ 12 } xs={ 12 } sx={ { display: 'flex', justifyContent: 'flex-start' } } >
                            <Typography sx={ { fontSize: 30, fontFamily: 'Outfit-Bold', color: COLORS.white } }>Login</Typography>
                        </Grid>
                        <Grid item xl={ 12 } xs={ 12 } >
                            <CustomLoginInput
                                type={ 'text' }
                                control={ control }
                                error={ errors.email }
                                fieldName="email"
                                placeholder={ "Email Address" }
                                keyValue={ 'email' }
                            />
                        </Grid>
                        <Grid item xs={ 12 } >
                            <CustomLoginInput
                                type={ 'password' }
                                control={ control }
                                error={ errors.password }
                                fieldName="password"
                                placeholder={ "Password" }
                                keyValue={ 'password' }
                            />
                        </Grid>

                        <Grid item xs={ 12 }>
                            <CustomButton
                                onClick={ handleSubmit(NavigationTohome) }
                                width={ '100%' }
                                label={ 'Login' }
                                isIcon={ false } />
                        </Grid>

                        <Grid item xs={ 12 }>
                            <IconButton onClick={ PortfolioNavigate }>
                                <CottageIcon sx={ { color: COLORS.white, fontSize: 30 } } />
                            </IconButton>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            { isPending && <CustomBackDrop loading={ isPending } /> }
        </Grid>
    );
};

export default LoginScreen;
