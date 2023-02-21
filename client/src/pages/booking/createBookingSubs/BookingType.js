import React from "react";
import {
  Grid,
  Typography,
  Container,
  FormControlLabel,
  Radio,
  Button
} from "@mui/material";

import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const BookingType = ({ activeStep, onhandleNext, onhandleBack, length }) => {
  const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
      border: checked ? `1px dashed ${theme.palette.primary.main}` : '1px dashed #E4E6EF',
      borderRadius: '5px',
      maxWidth: '44%',
      marginRight: 0,
      marginBottom: '2rem',
      padding: '1rem',
    }),
  );

  function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }
    return <StyledFormControlLabel checked={checked} {...props} />;
  }

  return (

    <Grid
      item
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{ flexGrow: 1, flexDirection: 'column', paddingY: '5rem' }}
    >
      <Container sx={{ maxWidth: { sm: '650px' } }}>
        <Grid>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, color: '#181C32' }}>Welcome</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, mt: 1 }}>I appreciate you connecting with me. To ensure your booking is accepted, please be sure to fill in this booking form in its entirety. - Ava</Typography>
        </Grid>
        <Grid sx={{ mt: 7.5 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, color: '#181C32' }}>Booking Type</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, mt: 1 }}>Choose the experience you prefer.</Typography>
        </Grid>
        <Grid sx={{ mt: 2.5 }}>
          <RadioGroup row name="use-radio-group" defaultValue="first" sx={{ justifyContent: 'space-between' }} >
            <MyFormControlLabel
              value="first"
              label={
                <Grid sx={{ marginInlineStart: 1 }} >
                  <Typography sx={{ fontWeight: 600, mb: 1 }} >Incall</Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', opacity: 0.8 }} >If you need more info, please check it out</Typography>
                </Grid>
              }
              control={
                <Radio
                  icon={<PermContactCalendarIcon sx={{ fontSize: '3rem' }} />}
                  checkedIcon={<PermContactCalendarIcon color="primary" sx={{ fontSize: '3rem' }} />}
                />
              }
            />
            <MyFormControlLabel
              value="second"
              label={
                <Grid sx={{ marginInlineStart: 1 }} >
                  <Typography sx={{ fontWeight: 600, mb: 1 }} >Outcall</Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', opacity: 0.8 }} >Create corporate account to mane users</Typography>
                </Grid>
              }
              control={
                <Radio
                  icon={<BusinessCenterIcon sx={{ fontSize: '3rem' }} />}
                  checkedIcon={<BusinessCenterIcon color="primary" sx={{ fontSize: '3rem' }} />}
                />
              }
            />
            <MyFormControlLabel
              value="third"
              label={
                <Grid sx={{ marginInlineStart: 1 }} >
                  <Typography sx={{ fontWeight: 600, mb: 1 }} >Fly me to you</Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', opacity: 0.8 }} >Create corporate account to mane users</Typography>
                </Grid>
              }
              control={
                <Radio
                  icon={<BusinessCenterIcon sx={{ fontSize: '3rem' }} />}
                  checkedIcon={<BusinessCenterIcon color="primary" sx={{ fontSize: '3rem' }} />}
                />
              }
            />
          </RadioGroup>
        </Grid>
      </Container>
      <Grid display='flex' justifyContent='space-between' sx={{ my: 2, width: { md: '600px' } }}>
        <Button
          disabled={activeStep === 0}
          onClick={onhandleBack}
          sx={{ mt: 1, mr: 1, visibility: activeStep !== 0 ? 'inherit' : 'hidden' }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={onhandleNext}
          endIcon={<ArrowForwardIcon />}
          sx={{ mt: 1, mr: 1, color: '#fff', textTransform: 'none', fontWeight: 600 }}
        >
          {activeStep === length - 1 ? 'Finish' : 'Continue'}
        </Button>
      </Grid>
    </Grid>
  )
}

export default BookingType;