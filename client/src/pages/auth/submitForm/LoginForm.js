import React from "react";
import { useTheme } from '@mui/material/styles';
import { useForm, FormProvider } from 'react-hook-form';
import { Grid, Typography, Box, Button } from "@mui/material";
import FormInput from "../../../components/form/FormInput";
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions/auth";

const loginSchema = object({
  email: string().min(1, 'Email is required').email('Email is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

function LoginForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  // ? Submit Handler
  const onSubmitHandler = (data) => {
    console.log("---------", data);
    dispatch(login(data))
    // .then(() => {
    navigate('/bookings');
    // })
  };

  return (
    <Grid
      justifyContent='center'
      sx={{
        width: { sm: '550px' },
        minHeight: '300px',
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1e1e2d',
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
          <Typography sx={{ fontWeight: 600, textAlign: 'center', fontSize: '1.4rem' }}>Sign In</Typography>
          <Typography sx={{ mb: 2, fontSize: '0.8rem', fontWeight: 600, textAlign: 'center', opacity: 0.6 }}>Please sign in with your provider or client account.</Typography>
          <FormInput
            placeholder='Email'
            type='email'
            name='email'
            required
            sx={{ mb: 2 }}
          />
          <FormInput
            type='password'
            placeholder='Password'
            name='password'
            required
          />
          <Grid container justifyContent='end' sx={{ mt: 1 }}>
            <Link style={{ fontSize: '0.8rem' }}>Forgot Password ?</Link>
          </Grid>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{ mt: 3, color: '#fff', fontWeight: 600, height: '2.5rem', textTransform: 'none' }}
          >
            Sign In
          </Button>
          <Grid container justifyContent='center' >
            <Typography sx={{ mt: 2, fontSize: '0.8rem', fontWeight: 600, textAlign: 'center' }}><span style={{ opacity: 0.6 }}>Not a Member yet?</span> <Link to='/signup'>Sign up</Link></Typography>
          </Grid>
        </Box>

      </FormProvider>
    </Grid>
  );
}

export default LoginForm;
