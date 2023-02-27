import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Breadcrumbs,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Link as MuiLink
} from "@mui/material";

import { grey } from "@mui/material/colors";

import SideBgImage from '../../assets/img/booking-side-bg-01.jpg';
import UserLogo from '../../assets/img/user-logo.png';

import BookingType from "./createBookingSubs/BookingType";
import BasicInfo from "./createBookingSubs/BasicInfo";
import AppointmentDetail from "./createBookingSubs/AppointmentDetail";
import Screening from "./createBookingSubs/Screening";
import Complete from "./createBookingSubs/Complete";
import { useDispatch } from "react-redux";
import { getBookingFormData } from "../../redux/actions/book";

const steps = [
  {
    label: 'Booking Type',
    description: 'Choose your experience.',
    component: BookingType
  },
  {
    label: 'Basic Information',
    description: 'Your basic details.',
    component: BasicInfo
  },
  {
    label: 'Appointment Details',
    description: 'Details of our date.',
    component: AppointmentDetail
  },
  {
    label: 'Screening',
    description: 'Submit screening or verification.',
    component: Screening
  },
  {
    label: 'Complete',
    description: 'Your booking request is sent!',
    component: Complete
  },
];

const ActiveComponent = ({ activeStep, onhandleNext, onhandleBack, length }) => {
  const Component = steps[activeStep].component;
  return <Component activeStep={activeStep} onhandleNext={onhandleNext} onhandleBack={onhandleBack} length={length} />
}

const CreateBookingPage = () => {
  const dispatch = useDispatch();
  const { bookFormId } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    dispatch(getBookingFormData(bookFormId));
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <Grid
        container
        justifyContent='space-between'
        direction='row'
        display='flex'
      >
        <Grid
          item
          container
          direction='column'
          display='flex'
          alignItems='center'
          sm={12}
          sx={{
            backgroundImage: `url(${SideBgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: 'center',
            minHeight: '100vh',
            maxWidth: { lg: '500px', md: '350px' },
            overflowX: { md: 'scroll', lg: 'hidden' },
            overflowY: 'hidden'
          }}
        >
          <Grid className="user-logo-title" display='flex' justifyContent='center' sx={{ mt: { md: 12, sm: 6 } }} >
            <Link to='/bookings'>
              <img alt="Logo" src={UserLogo} height="90" />
            </Link>
          </Grid>
          <Breadcrumbs aria-label="breadcrumb" separator="●" sx={{ mt: 5, color: grey[500], '&:hover': { cursor: 'pointer' } }} >
            <MuiLink to='#' color='text.primary' underline="none" sx={{ fontSize: '0.8rem' }} >WebSite</MuiLink>
            <MuiLink to='#' color='text.primary' underline="none" sx={{ fontSize: '0.8rem' }} >Twitter</MuiLink>
            <MuiLink to='#' color='text.primary' underline="none" sx={{ fontSize: '0.8rem' }} >P411</MuiLink>
            <MuiLink to='#' color='text.primary' underline="none" sx={{ fontSize: '0.8rem' }} >Email</MuiLink>
          </Breadcrumbs>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            nonLinear
            sx={{
              mt: 10,
              ".MuiSvgIcon-root": {
                borderRadius: "15%",
                border: "1px solid #1976d2",
                color: 'transparent',
                fontSize: '3rem',
              },
              // ".MuiSvgIcon-root.Mui-completed": {
              //   border: 'none',
              // },
              ".MuiSvgIcon-root:not(.Mui-completed)": {
                border: '1px dashed #ccc',
                marginX: "-0.8rem"
              },
              ".MuiStepIcon-text": {
                fill: "#fff",
                fontWeight: 500
              },
              ".MuiSvgIcon-root.Mui-active": {
                backgroundColor: '#50CD89',
                borderRadius: "15%",
                border: 'none',
                marginX: "-0.8rem",
                color: 'transparent',
              },
              ".Mui-active .MuiStepIcon-text": {
                fill: "#fff"
              },
              ".MuiStepLabel-root": {
                padding: 0
              },
              ".MuiStepConnector-root span": {
                borderLeftStyle: 'dashed',
                minHeight: '2.5rem'
              },
            }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff', marginInlineStart: 3 }}>
                    {step.label}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: grey[500], marginInlineStart: 3 }}>{step.description}</Typography>
                </StepLabel>
                <StepContent>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <ActiveComponent activeStep={activeStep} onhandleNext={handleNext} onhandleBack={handleBack} length={steps.length} />
      </Grid>
    </Box>
  )
}

export default CreateBookingPage;