import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Typography,
  Container,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Modal,
  Box
} from "@mui/material";
import { useForm, FormProvider } from 'react-hook-form';
import { object, string, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import idIcon from '../../../assets/img/id-icon.png';
import { useSelector } from "react-redux";
import { createBooking } from "../../../redux/actions/book";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const screenSchema = object({
  ref1: string().min(1, 'Your First Reference is required'),
  ref2: string().min(1, 'Your Second Reference is required'),
  idCard: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
})

const Screening = ({ activeStep, onhandleNext, onhandleBack, length }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [valueScreenMethod, setValueScreenMethod] = useState('first');
  const [uploadFile, setUploadFile] = useState();

  const { bookingData } = useSelector(state => ({
    bookingData: state.book
  }));

  // console.log('booking data ', bookingData)

  const defaultValues = {
    ref1: '',
    ref2: '',
    idCard: []
  }

  const methods = useForm({
    resolver: zodResolver(screenSchema),
    defaultValues
  });
  const { register, formState: { errors }, reset } = methods;
  const watchIdCard = methods.watch('idCard', []);
  useEffect(() => {
    handleSelectFile(watchIdCard);
  }, [watchIdCard]);

  const handleClose = () => setOpen(false);

  const handleIDCardUpload = () => {
    document.querySelector('#IDCard-Selection').value = null;
    document.querySelector('#IDCard-Selection').click();
  }

  const handleIDCardRemove = () => {
    setSelectedFile(null);
    reset({ idCard: [] });
    // const data = new FormData()
    // data.append('file', selectedFile.selectedFile, selectedFile.selectedFile.name)
    // axios
    //   .post(endpoint, data, {
    //     onUploadProgress: ProgressEvent => {
    //       this.setState({
    //         loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
    //       })
    //     },
    //   })
    //   .then(res => {
    //     console.log(res.statusText)
    //   })
  }

  const handleSelectFile = files => {
    if (files.length == 0) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type)) return;
    const file = files[0];
    console.log('file ', file.name)
    setUploadFile(file);
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setSelectedFile(reader.result);
    };

  }

  // ? Form Handler
  const onSubmitHandler = (data) => {
    console.log('------------', data);
    console.log('---', valueScreenMethod);
    console.log('----', uploadFile);
    setOpen(false);
    let formData = new FormData();
    formData.append('idCard', uploadFile);
    formData.append('screenMethod', valueScreenMethod);
    formData.append('ref1', data.ref1);
    formData.append('ref2', data.ref2);
    formData.append('initialData', JSON.stringify(bookingData));
    // onhandleNext();
    dispatch(createBooking(formData));

  };

  return (
    <Grid
      item
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{ flexGrow: 2, flexDirection: 'column', paddingY: '5rem', backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1e1e2d' }}
    >
      <Container sx={{ maxWidth: { md: '650px' } }}>
        <Grid>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, color: '#181C32' }}>Screening & Verification</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, mt: 1 }}>All clients must be screened. Your information is kept confidential.</Typography>
        </Grid>
        <FormProvider {...methods}>
          <Box
            display='flex'
            flexDirection='column'
            component='form'
            encType="multipart/form-data"
            noValidate
            autoComplete='off'
            sx={{ mt: 5 }}
            onSubmit={methods.handleSubmit(onSubmitHandler)}
          >
            <Grid sx={{ mt: 5 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>Select Screening Method <span style={{ color: 'red' }}>*</span></Typography>
              <RadioGroup sx={{ mt: 3 }} defaultValue={'companion references'} onChange={(e, value) => setValueScreenMethod(value)} >
                <FormControlLabel
                  value="companion references"
                  label={
                    <Grid container display='flex' alignItems='center' >
                      <AccountBalanceIcon sx={{ fontSize: '1.5rem', opacity: 0.8, marginInlineStart: 2 }} />
                      <Grid sx={{ marginInlineStart: 3 }}>
                        <Typography sx={{ fontWeight: 600 }} >Companion References</Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', opacity: 0.8 }} >Requires references from 2 providers you've seen recently</Typography>
                      </Grid>
                    </Grid>
                  }
                  control={
                    <Radio />
                  }
                  labelPlacement='start'
                  sx={{
                    margin: 0,
                    '.MuiTypography-root': {
                      flexGrow: 1
                    }
                  }}
                />
                <FormControlLabel
                  value="employment information"
                  label={
                    <Grid container display='flex' alignItems='center' >
                      <DonutLargeIcon sx={{ fontSize: '1.5rem', opacity: 0.8, marginInlineStart: 2 }} />
                      <Grid sx={{ marginInlineStart: 3 }}>
                        <Typography sx={{ fontWeight: 600 }} >Employment Information</Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', opacity: 0.8 }} >Requires LinkedIn profile and company phone</Typography>
                      </Grid>
                    </Grid>
                  }
                  control={
                    <Radio />
                  }
                  labelPlacement='start'
                  sx={{
                    margin: 0,
                    mt: 5,
                    '.MuiTypography-root': {
                      flexGrow: 1
                    }
                  }}
                />
              </RadioGroup>
            </Grid>
            <Grid sx={{ mt: 5 }}>
              <TableContainer sx={{ width: '100%', mt: 2 }}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, color: theme.palette.mode === 'light' && '#3F4254', verticalAlign: 'top' }} >References #1 <span style={{ color: 'red' }}>*</span></TableCell>
                      <TableCell align="left" sx={{ paddingX: 0 }} >
                        <TextField
                          variant="standard"
                          type='text'
                          fullWidth
                          multiline
                          rows={2}
                          name="ref1"
                          error={!!errors['ref1']}
                          helperText={
                            errors['ref1'] ? (errors['ref1'].message) : ''
                          }
                          {...register('ref1')}
                          InputProps={{
                            disableUnderline: true,
                            style: {
                              padding: '10px 20px',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, color: theme.palette.mode === 'light' && '#3F4254', verticalAlign: 'top' }} >References #2 <span style={{ color: 'red' }}>*</span></TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >
                        <TextField
                          variant="standard"
                          type='text'
                          fullWidth
                          multiline
                          rows={2}
                          name="ref2"
                          error={!!errors['ref2']}
                          helperText={
                            errors['ref2'] ? (errors['ref2'].message) : ''
                          }
                          {...register('ref2')}
                          InputProps={{
                            disableUnderline: true,
                            style: {
                              padding: '10px 20px',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, verticalAlign: 'top', color: theme.palette.mode === 'light' && '#3F4254' }} >ID Upload <span style={{ color: 'red' }}>*</span></TableCell>
                      <TableCell align="left" sx={{ paddingX: 0 }} >
                        <div className="IDCard-warpper">
                          <img src={selectedFile ?? idIcon} style={{ width: '200px' }} />
                          <span className="IDCard-upload" onClick={handleIDCardUpload}>
                            <i className="fa fa-pen"></i>
                          </span>
                          <span className="IDCard-remove " onClick={handleIDCardRemove}>
                            <i className="fa fa-remove"></i>
                          </span>
                        </div>
                        <input type="file" name="idCard" id="IDCard-Selection" style={{ visibility: 'hidden' }} {...register('idCard')} />
                        {errors['idCard'] && (
                          <p style={{ color: '#d32f2f', fontWeight: 400, fontSize: '0.75rem', marginInlineStart: '14px' }}>
                            {errors['idCard']?.message}
                          </p>
                        )}
                        <Typography sx={{ fontSize: '0.8rem' }}>Upload a clear photo of your government ID, e.g. driver's license or passport.</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
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

export default Screening;