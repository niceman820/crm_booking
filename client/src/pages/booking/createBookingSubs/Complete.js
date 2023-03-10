import React from "react";
import { useTheme } from '@mui/material/styles';
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
import { useSelector } from "react-redux";

const Complete = ({ activeStep, onhandleBack }) => {
  const theme = useTheme();
  const { thankyouTitle, thankyouMessage } = useSelector(state => ({
    thankyouTitle: state.book.emailNotification.thankyouTitle,
    thankyouMessage: state.book.emailNotification.thankyouMessage
  }));

  return (
    <Grid
      item
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{ flexGrow: 1, flexDirection: 'column', paddingY: '5rem', backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1e1e2d' }}
    >
      <Container sx={{ maxWidth: { md: '650px' } }}>
        <Grid>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>{thankyouTitle}</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, mt: 1 }}>{thankyouMessage}</Typography>
        </Grid>
        <Stack direction='row' sx={{ backgroundColor: theme.palette.mode === 'light' && '#E8FFF3', paddingY: '1rem', borderRadius: '0.5rem', border: '1px dashed #50cd89', mt: 3 }} >
          <Grid item>
            <ErrorOutlineIcon sx={{ fontSize: '2.5rem', opacity: 0.8, marginInlineStart: 2, color: '#50cd89' }} />
          </Grid>
          <Grid item sx={{ marginInlineStart: 3 }}>
            <Typography sx={{ fontWeight: 600 }} >What To Expect Next?</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', opacity: 0.8, mt: 1 }} >When your booking request has been approved, you will be sent a Welcome pack with instructions on what's next for our date, which also includes some exclusive content. I will also be in touch personally.</Typography>
          </Grid>
        </Stack>
      </Container>
      {/* <Grid display='flex' justifyContent='space-between' sx={{ my: 2, width: { md: '600px' } }}>
        <Button
          variant="contained"
          disabled={activeStep === 0}
          onClick={onhandleBack}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 1, mr: 1, visibility: activeStep !== 0 ? 'inherit' : 'hidden', color: '#fff', fontWeight: 600, textTransform: 'none' }}
        >
          Back
        </Button>
      </Grid> */}
    </Grid>
  )
}

export default Complete;