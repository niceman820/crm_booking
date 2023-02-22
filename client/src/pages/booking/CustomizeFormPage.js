import React, { useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import { FileUploader } from "react-drag-drop-files";
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Modal,
  Box,
  Stack,
  Divider,
  Switch,
  TextField,
  CardHeader,
} from "@mui/material";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const CustomizeFormPage = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUploadError, setFileUploadError] = useState('');

  const fileTypes = ["JPEG", "PNG", "GIF"];

  const handleChange = (file) => {
    setFileUploadError('');
    console.log('file ', file)
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  return (
    <Container maxWidth="lg">
      <Grid
        item
        className="page-title"
        container
        justifyContent='space-between'
        sx={{ my: { sm: 2, md: 5 }, marginInline: 'auto' }}
      >
        <Grid item xs={12} sm={6}>
          <Typography sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600 }}>Booking Form Settings</Typography>
          <Typography sx={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, mt: 1, opacity: 0.7 }} >Personalize your booking form notifications and other settings.</Typography>
        </Grid>
        <Grid item container direction='row' justifyContent='flex-end' alignItems="center" xs={12} sm={6}>
          <Button color="primary" variant="contained" sx={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'none', color: '#fff' }} onClick={handleOpen}>Save Settings</Button>
        </Grid>
      </Grid>
      <Grid
        item
        container
        display='flex'
        direction='row'
        justifyContent='space-between'
        columns={24}
      >
        <Grid
          item
          md={24}
          lg={15}
          xs={24}
          sx={{
            minHeight: '300px',
            backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1e1e2d',
            borderRadius: 2
          }}
        >
          <Container
            direction='column'
            sx={{ width: '95%', paddingY: 5 }}
          >
            <Grid>
              <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Welcome Message</Typography>
              <Typography sx={{ fontSize: '0.8rem', mt: 0.5, opacity: 0.8, fontWeight: 600 }}>This is the welcome message that greets your clients when they first launch your form.</Typography>
            </Grid>
            <Divider sx={{ mt: 2 }} />
            <TableContainer sx={{ width: '100%', mt: 2 }}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, width: 200 }} >Title</TableCell>
                    <TableCell align="left" sx={{ paddingX: 0 }} >
                      <TextField
                        variant="standard"
                        fullWidth
                        sx={{ mt: 1 }}
                        value={'Welcome'}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            padding: '8px 20px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, verticalAlign: 'top', width: 200 }} >Message</TableCell>
                    <TableCell align="left" sx={{ paddingX: 0 }} >
                      <TextField
                        variant="standard"
                        fullWidth
                        sx={{ mt: 1 }}
                        multiline
                        rows={8}
                        value={'I appreciate you connecting with me. To ensure your booking is accepted, please be sure to fill in this booking form in its entirety. - Ava'}
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
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
          <Container
            direction='column'
            sx={{ width: '95%', paddingY: 5 }}
          >
            <Grid>
              <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Thank you Message</Typography>
              <Typography sx={{ fontSize: '0.8rem', mt: 0.5, opacity: 0.8, fontWeight: 600 }}>This is a message that is shown when your clients have completed and submitted the form.</Typography>
            </Grid>
            <Divider sx={{ mt: 2 }} />
            <TableContainer sx={{ width: '100%', mt: 2 }}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, width: 200 }} >Title</TableCell>
                    <TableCell align="left" sx={{ paddingX: 0 }} >
                      <TextField
                        variant="standard"
                        fullWidth
                        sx={{ mt: 1 }}
                        value={'Thank you!'}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            padding: '8px 20px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, verticalAlign: 'top', width: 200 }} >Message</TableCell>
                    <TableCell align="left" sx={{ paddingX: 0 }} >
                      <TextField
                        variant="standard"
                        fullWidth
                        sx={{ mt: 1 }}
                        multiline
                        rows={8}
                        value={'Thank you for your booking. I have received your request and will get back to you shortly!'}
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
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
        <Grid
          item
          md={24}
          lg={8}
          xs={24}
          // direction='column'
          justifyContent='center'
          alignItems='center'
          sx={{
            minHeight: '300px',
            backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1e1e2d',
            borderRadius: 2,
          }}
        >
          <Container
            direction='column'
            sx={{ width: '95%', paddingY: 5 }}
          >
            <Grid sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>Personalize Branding</Typography>
              <Divider sx={{ mt: 4, mb: 4 }} />
              <Typography sx={{ fontSize: '0.8rem', mt: 0.5, opacity: 0.8, fontWeight: 600 }}>You may upload your personal logo below (recommended size 1080x240)</Typography>
            </Grid>
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              children={
                <CardHeader
                  avatar={
                    <UploadFileIcon sx={{ fontSize: '2.5rem', color: '#009EF7' }} />
                  }
                  title="Drop logo here or click to upload."
                  titleTypographyProps={{ fontSize: '1rem', fontWeight: 600, color: fileUploadError ? 'tomato' : '#3F4254' }}
                  subheader={fileUploadError ? fileUploadError : "(jpg, png files accepted)"}
                  subheaderTypographyProps={{ fontWeight: 600, color: fileUploadError ? 'tomato' : '#A1A5B7', fontSize: '0.8rem' }}
                  sx={{
                    border: '1px',
                    borderStyle: 'dashed',
                    borderColor: fileUploadError ? 'red' : '#009EF7',
                    borderRadius: 1,
                    mt: 2,
                    backgroundColor: theme.palette.mode === 'light' ? '#F1FAFF' : '#212E48',
                    '&:hover ': {
                      cursor: 'pointer'
                    }
                  }}
                />
              }
              onTypeError={(err) => setFileUploadError(err)}
              onSizeError={(err) => console.log(err)}
            />

          </Container>
        </Grid>
      </Grid>
      <ScrollToTop
        smooth
        color="#009EF7"
      />
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
            <CheckCircleOutlineIcon color="primary" sx={{ fontSize: '7rem', margin: 'auto', display: 'flex' }} />
            <Typography sx={{ fontSize: '1.2rem', textAlign: 'center', fontWeight: 600, mt: 3 }}>
              Your settings have been saved.
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
              An email will be sent to the client to notify them. Do you wish to proceed?
            </Typography> */}
            <Grid item container direction='row' justifyContent='center' alignItems='center' display="flex" sx={{ mt: 3 }}>
              <Button color="success" variant="contained" sx={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'none' }} onClick={handleClose} >Back to bookings</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Container>
  );
}

export default CustomizeFormPage;