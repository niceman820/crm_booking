import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Grid,
  Typography,
  Container,
  Box,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm, FormProvider } from 'react-hook-form';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from "../../../components/form/FormInput";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { BASIC_INFO } from "../../../redux/types";

const basicInfoSchema = object({
  firstName: string().min(1, 'First Name is required').max(70),
  lastName: string().min(1, 'Last Name is required').max(70),
  email: string().min(1, 'Email is required').email('Email is invalid'),
  phone: string().min(1, 'Contact phone number is required').max(15),
  occupation: string().min(1, 'Occupation is required').max(70),
});

const BasicInfo = ({ activeStep, onhandleNext, onhandleBack, length }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);
  const [isTextChecked, setIsTextChecked] = useState(false);
  const [valueSearchEngine, setValueSearchEngine] = useState('');
  const theme = useTheme();

  const handleClose = () => setOpen(false);

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    occupation: '',
  };

  // ? Object containing all the methods returned by useForm
  const methods = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues,
  });

  // ? Form Handler
  const onSubmitHandler = (data) => {
    console.log('------------', data);
    setOpen(false);
    let clientData = {
      ...data,
      preferredCommuncation: {
        email: isEmailChecked,
        phone: isPhoneChecked,
        text: isTextChecked
      },
      searchEngine: valueSearchEngine
    }
    console.log('data ', clientData);
    dispatch({
      type: BASIC_INFO,
      payload: clientData
    })
    onhandleNext();
  };

  const handleChangeSearchEngine = (e) => {
    console.log('value ', e.target)
    setValueSearchEngine(e.target.value);
  }

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
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, color: '#181C32' }}>Basic Detail</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, mt: 1 }}>I will require some details and contact information to get in touch regarding our date.</Typography>
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
            <FormControl>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 1 }}>Full Name <span style={{ color: 'red' }}>*</span></Typography>
              <Grid
                container
                justifyContent='space-between'
                columns={24}
              >
                <Grid
                  item
                  xs={24}
                  sm={11}
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
                  xs={24}
                  sm={11}
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
            </FormControl>
            <FormControl sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 1 }}>Email <span style={{ color: 'red' }}>*</span></Typography>
              <FormInput
                placeholder='Enter your email'
                type='email'
                name='email'
                required
              />
            </FormControl>
            <FormControl sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 1 }}>Contact Phone <span style={{ color: 'red' }}>*</span></Typography>
              <FormInput
                placeholder='Phone number'
                type='text'
                name='phone'
                required
              />
            </FormControl>
            <FormControl sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 1 }}>Occupation <span style={{ color: 'red' }}>*</span></Typography>
              <FormInput
                placeholder='Occupation'
                type='text'
                name='occupation'
                required
              />
            </FormControl>
            <Stack direction='row' sx={{ mt: 2, alignItems: 'center' }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mr: 3 }}>Preferred Communication:</Typography>
              <FormControlLabel
                value={isEmailChecked}
                label={<Typography sx={{ fontWeight: 600, fontSize: '0.8rem', opacity: 0.8 }} >Email</Typography>}
                control={<Checkbox />}
                onChange={e => setIsEmailChecked(prev => !prev)}
              />
              <FormControlLabel
                value={isPhoneChecked}
                label={<Typography sx={{ fontWeight: 600, fontSize: '0.8rem', opacity: 0.8 }} >Phone</Typography>}
                control={<Checkbox />}
                onChange={e => setIsPhoneChecked(prev => !prev)}
              />
              <FormControlLabel
                value={isTextChecked}
                label={<Typography sx={{ fontWeight: 600, fontSize: '0.8rem', opacity: 0.8 }} >Text</Typography>}
                control={<Checkbox />}
                onChange={e => setIsTextChecked(prev => !prev)}
              />
            </Stack>
            <FormControl sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 1 }}>How did you fine me? <span style={{ color: 'red' }}>*</span></Typography>
              <Select
                inputProps={{
                  sx: { color: '#3F4254', fontSize: '0.8rem', fontWeight: 600 }
                }}
                displayEmpty={true}
                value={valueSearchEngine}
                renderValue={value => value ? value : 'Select ...'}
                sx={{ padding: 0, '.MuiSelect-select': { paddingY: '8px' } }}
                onChange={handleChangeSearchEngine}
              >
                <MenuItem value={'Clientl'} sx={{ color: '#3F4254', fontSize: '0.8rem', fontWeight: 600 }}>Clientl</MenuItem>
                <MenuItem value={'Website'} sx={{ color: '#3F4254', fontSize: '0.8rem', fontWeight: 600 }}>Website</MenuItem>
                <MenuItem value={'Social Media'} sx={{ color: '#3F4254', fontSize: '0.8rem', fontWeight: 600 }}>Social Media</MenuItem>
                <MenuItem value={'Search Engine'} sx={{ color: '#3F4254', fontSize: '0.8rem', fontWeight: 600 }}>Search Engine</MenuItem>
                <MenuItem value={'Word of Mouth'} sx={{ color: '#3F4254', fontSize: '0.8rem', fontWeight: 600 }}>Word of Mouth</MenuItem>
                <MenuItem value={'Advertising Board'} sx={{ color: '#3F4254', fontSize: '0.8rem', fontWeight: 600 }}>Advertising Board</MenuItem>
              </Select>
            </FormControl>
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

export default BasicInfo;