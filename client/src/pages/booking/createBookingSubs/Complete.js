import React from "react";
import {
  Grid,
  Typography,
  Container,
  Box,
  Button,
  Stack
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Complete = ({ activeStep, onhandleBack }) => {

  return (
    <Grid
      item
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{ flexGrow: 1, flexDirection: 'column', paddingY: '5rem' }}
    >
      <Container sx={{ maxWidth: { md: '650px' } }}>
        <Grid>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, color: '#181C32' }}>Thank you for your booking!</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, mt: 1 }}>I appreciate you taking the time to fill out my booking form. I will be in touch very shortly!</Typography>
        </Grid>
        <Stack direction='row' sx={{ backgroundColor: '#E8FFF3', paddingY: '1rem', borderRadius: '0.5rem', border: '1px dashed #50cd89', mt: 3 }} >
          <Grid item>
            <ErrorOutlineIcon sx={{ fontSize: '2.5rem', opacity: 0.8, marginInlineStart: 2, color: '#50cd89' }} />
          </Grid>
          <Grid item sx={{ marginInlineStart: 3 }}>
            <Typography sx={{ fontWeight: 600 }} >What To Expect Next?</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', opacity: 0.8, mt: 1 }} >When your booking request has been approved, you will be sent a Welcome pack with instructions on what's next for our date, which also includes some exclusive content. I will also be in touch personally.</Typography>
          </Grid>
        </Stack>
      </Container>
      <Grid display='flex' justifyContent='space-between' sx={{ my: 2, width: { md: '600px' } }}>
        <Button
          variant="contained"
          disabled={activeStep === 0}
          onClick={onhandleBack}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 1, mr: 1, visibility: activeStep !== 0 ? 'inherit' : 'hidden', color: '#fff', fontWeight: 600, textTransform: 'none' }}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  )
}

export default Complete;