import React, { useState } from "react";
import {
  Grid,
  Typography,
  Container,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  Modal
} from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useForm, FormProvider } from 'react-hook-form';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const durationList = ['1 hr', '1.5 hrs', '2 hrs', '4 hrs', '6 hrs', '8 hrs', '12 hrs', '24 hrs', '48 hrs', 'Custom']

const appointmentSchema = object({
  // preferredDate: date({
  //   required_error: "Please select a date and time",
  //   invalid_type_error: "That's not a date!",
  // }),
  // duration: union([string(), z.null()]).refine((val) => val !== null, {
  //   message: "Please, make a choice!"
  // }),
  // duration: literal(true, {
  //   errorMap: () => ({ message: "You must accept Terms and Conditions" }),
  // }),
  // accept: z.literal(true, {
  //   invalid_type_error: "You must accept Terms and Conditions.",
  // }),
  message: string().min(1, 'Busines description is required'),
});

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
      fontWeight: 600,
      fontSize: '1.5rem',
      margin: 'auto',
    },
    '.MuiFormControlLabel-label': {
      margin: 'auto',
    },
    border: checked ? `1px dashed ${theme.palette.primary.main}` : '1px dashed #E4E6EF',
    borderRadius: '6px',
    width: '15%',
    marginRight: 0,
    marginBottom: '10px',
    padding: '0.5rem',
    marginLeft: 1,
  }),
);

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();
  let checked = false;
  if (radioGroup) {
    checked = radioGroup.value == props.value;
  }
  return <StyledFormControlLabel checked={checked} {...props} />;
}

const AppointmentDetail = ({ activeStep, onhandleNext, onhandleBack, length }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dayjs(new Date()));
  const [valueDuration, setValueDuration] = useState(0);

  // Form Handler
  const defaultValues = {
    // preferredDate: '',
    message: ''
  };
  const methods = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues
  });
  const { register, formState: { errors } } = methods;

  const handleClose = () => setOpen(false);

  // ? Form Handler
  const onSubmitHandler = (data) => {
    console.log('------------', data);
    console.log('----', valueDuration);
    console.log('--', dayjs(value).format('L LT'))
    setOpen(false);
    onhandleNext();
  };

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
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, color: '#181C32' }}>Appointment Details</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, mt: 1 }}>Please provide details about your preferred date.</Typography>
        </Grid>
        <FormProvider {...methods}>
          <Box
            display='flex'
            flexDirection='column'
            component='form'
            noValidate
            autoComplete='off'
            sx={{ mt: 5 }}
            onSubmit={methods.handleSubmit(onSubmitHandler)}
          >
            <Grid
              item
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>Preferred Date & Time <span style={{ color: 'red' }}>*</span></Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => {
                    const styleProps = {
                      disableUnderline: true,
                      style: {
                        padding: '15px 20px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }
                    };
                    props.InputProps = {
                      ...props.InputProps,
                      disableUnderline: true,
                      style: {
                        padding: '15px 20px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }
                    };
                    return (
                      <TextField
                        variant="standard"
                        {...props}
                        sx={{ width: '75%' }}
                      />
                    );
                  }}
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid sx={{ mt: 5 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 2 }}>Select Booking Duration <span style={{ color: 'red' }}>*</span></Typography>
              <RadioGroup
                row
                defaultValue={0}
                sx={{ justifyContent: 'space-between' }}
                onChange={(e, value) => setValueDuration(value)}
              >
                {durationList.map((duration, index) => (
                  <MyFormControlLabel
                    key={duration}
                    value={index}
                    label={
                      <Grid>
                        <Typography sx={{ fontWeight: 600, fontSize: '1.2rem', margin: 'auto' }}>{duration}</Typography>
                      </Grid>
                    }
                    control={
                      <Radio sx={{ display: 'none' }} />
                    }
                  />))}
              </RadioGroup>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }}>If your desired duration is not listed, or you're after a custom arrangement, select Custom.</Typography>
            </Grid>
            <Grid sx={{ mt: 5 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 2 }}>Message <span style={{ color: 'red' }}>*</span></Typography>
              <TextField
                variant="standard"
                type="text"
                fullWidth
                multiline
                rows={5}
                name="message"
                error={!!errors['message']}
                helperText={
                  errors['message'] ? (errors['message'].message) : ''
                }
                {...register('message')}
                InputProps={{
                  disableUnderline: true,
                  style: {
                    padding: '15px 20px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  },
                }}
              />
            </Grid>
          </Box>
        </FormProvider>
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
        <Button
          variant="contained"
          onClick={() => { methods.handleSubmit(onSubmitHandler)(); setOpen(true) }}
          endIcon={<ArrowForwardIcon />}
          sx={{ mt: 1, mr: 1, color: '#fff', textTransform: 'none', fontWeight: 600 }}
        >
          {activeStep === length - 1 ? 'Finish' : 'Continue'}
        </Button>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid sx={{ width: '80%', margin: 'auto' }}>
            <HighlightOffIcon color="error" sx={{ fontSize: '7rem', margin: 'auto', display: 'flex' }} />
            <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
              Sorry, looks like there are some errors detected, please try again.
            </Typography>
            <Grid item container direction='row' justifyContent='center' alignItems='center' display="flex" sx={{ mt: 3 }}>
              <Button variant="contained" sx={{ marginInlineStart: 3, fontSize: '0.8rem', fontWeight: 600, textTransform: 'none', backgroundColor: theme.palette.mode === 'light' && '#f5f8fa', boxShadow: 'none' }} onClick={handleClose}>Ok, got it!</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  )
}

export default AppointmentDetail;