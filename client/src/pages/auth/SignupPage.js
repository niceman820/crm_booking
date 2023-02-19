import React from "react";
import {
  Box,
  Grid,
  Typography
} from "@mui/material";
import BackgroundImage from "../../assets/img/bg4.jpg"
import SignupForm from "./submitForm/SignupForm";

const SignupPage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: '100vh',
        width: '100%'
      }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid
          item
          container
          justifyContent='space-between'
          alignItems='center'
          sx={{ width: '80%' }}
        >
          <Grid item lg={6} sm={6} container direction='column' >
            <Typography sx={{ color: '#fff', fontSize: '4rem', fontWeight: 800 }}>clientl.</Typography>
            <Typography sx={{ color: '#fff', fontSize: '1.2rem' }}>An advanced client-provider platform.</Typography>
          </Grid>
          <Grid item lg={6} sm={6} container justifyContent='end' >
            <SignupForm />
          </Grid>
        </Grid>

      </Grid>
    </Box>
  );
}

export default SignupPage;