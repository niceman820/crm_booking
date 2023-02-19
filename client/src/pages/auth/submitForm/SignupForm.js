import React, { useState } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import { Grid, Typography, Box, Button, InputAdornment, IconButton } from "@mui/material";
import FormInput from "../../../components/form/FormInput";
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useDispatch } from "react-redux";
import { register } from "../../../redux/actions/auth";

const signupSchema = object({
  firstName: string().min(1, 'First Name is required').max(30, 'First Name must be less than 30 letters'),
  lastName: string().min(1, 'Last Name is required').max(30, 'Last Name must be less than 30 letters'),
  email: string().min(1, 'Email is required').email('Email is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});


function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const methods = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  // ? Submit Handler
  const onSubmitHandler = (data) => {
    console.log("---------", data);
    dispatch(register(data));
    // .then(() => {
      navigate('/bookings');
    // })
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword)
  }
  const watchPassword = methods.watch("password", "");
  
  return (
    <Grid
      justifyContent='center'
      sx={{
        width: { sm: '550px' },
        minHeight: '300px',
        backgroundColor: '#fff',
        borderRadius: '0.625rem',
        padding: '4rem'
      }}
    >
      <FormProvider {...methods}>
        <Box
          display='flex'
          flexDirection='column'
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={methods.handleSubmit(onSubmitHandler)}
        >
          <Typography sx={{ fontWeight: 600, textAlign: 'center', fontSize: '1.4rem' }}>Create New Account</Typography>
          <Typography sx={{ mb: 2, fontSize: '0.8rem', fontWeight: 600, textAlign: 'center', opacity: 0.6 }}>We just need some details to create your account.</Typography>
          <Grid
            container
            justifyContent='space-between'
            columns={48}
          >
            <Grid
              item
              sm={48}
              xl={23}
            >
              <FormInput
                placeholder='First Name'
                type='text'
                name='firstName'
                fullWidth
                required
              />
            </Grid>
            <Grid
              item
              sm={48}
              xl={23}
            >
              <FormInput
                placeholder='Last Name'
                type='text'
                name='lastName'
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <FormInput
            placeholder='Email'
            type='email'
            name='email'
            required
          />
          <FormInput
            type={showPassword ? "text" : "password"}
            placeholder='Password'
            name='password'
            required
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <PasswordStrengthBar
            password={watchPassword}
            shortScoreWord='Use 8+ characters with a mix of letters, numbers & symbols.'
            style={{ marginTop: '5px' }}
          />
          <FormInput
            type='password'
            placeholder='Repeat Password'
            name='passwordConfirm'
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3, color: '#fff', fontWeight: 600, height: '2.5rem', textTransform: 'none' }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='center' >
            <Typography sx={{ mt: 2, fontSize: '0.8rem', fontWeight: 600, textAlign: 'center' }}><span style={{ opacity: 0.6 }}>Already have an Account?</span> <Link to='/login'>Sign In</Link></Typography>
          </Grid>
        </Box>

      </FormProvider>
    </Grid>
  );
}

export default SignupForm;
