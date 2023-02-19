import React from "react";
import { useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";

import {
  Avatar,
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
} from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import idSample from '../../assets/img/sample-id.jpg';

const BookDetailPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useSelector(state => ({
    user: state.auth.user
  }));
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
          <Typography sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600 }}>Booking Details</Typography>
          <Typography sx={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, mt: 1, opacity: 0.7 }} >You have received an Outcall booking request with Emma Smith for 5 May 2022 at 9:23pm</Typography>
        </Grid>
        <Grid item container direction='row' justifyContent='flex-end' alignItems="center" xs={12} sm={6}>
          <Button color="success" variant="contained" sx={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'none' }} onClick={handleOpen}>Approve Booking</Button>
          <Button color="error" variant="contained" sx={{ marginInlineStart: 3, fontSize: '0.8rem', fontWeight: 600, textTransform: 'none' }}>Decline Booking</Button>
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
          sm={6}
          md={8}
          xs={24}
          // direction='column'
          justifyContent='center'
          alignItems='center'
          sx={{
            minHeight: '300px',
            backgroundColor: '#fff',
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ height: '3rem', width: '3rem', backgroundColor: 'tomato', height: '6rem', width: '6rem', fontSize: '3rem', fontWeight: 600, margin: 'auto', mt: 5 }}>{user.firstName[0]}</Avatar>
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, textAlign: 'center', mt: 3 }}>{user.fullName}</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, textAlign: 'center', mt: 1, color: '#ff9800' }}>Unconfirmed Booking</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 5, marginInlineStart: 6 }}>Email</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 0.5, marginInlineStart: 6, opacity: 0.8 }}>{user.email}</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 3, marginInlineStart: 6 }}>Contact Number</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 0.5, marginInlineStart: 6, opacity: 0.8 }}>{'(545) 645 6789'}</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 3, marginInlineStart: 6 }}>Ocupation</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 0.5, marginInlineStart: 6, opacity: 0.8 }}>Manager</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 3, marginInlineStart: 6 }}>Priferred Communication</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 0.5, marginInlineStart: 6, opacity: 0.8 }}>Email, Text</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 3, marginInlineStart: 6 }}>How did you find me?</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 0.5, marginInlineStart: 6, opacity: 0.8 }}>Search Engine</Typography>

        </Grid>
        <Grid
          item
          sm={17}
          md={15}
          xs={24}
          sx={{
            minHeight: '300px',
            backgroundColor: '#fff',
            borderRadius: 2
          }}
        >
          <Container
            direction='column'
            sx={{ width: '90%', paddingY: 5 }}
          >
            <Grid>
              <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>About The Booking</Typography>
              <Typography sx={{ fontSize: '0.8rem', mt: 0.5, opacity: 0.8 }}>Basic information about the booking.</Typography>
              <TableContainer sx={{ width: '100%', mt: 2 }}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600 }} >Appointment Type</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >Outcall</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600 }} >Preferred Date</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >5 May 2022</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600 }} >Preferred Time</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >9:23 PM</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600 }} >Duration</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >2 hours</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600 }} >Location</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >720 Collins St, Sydney</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid sx={{ mt: 5 }}>
              <Typography sx={{ fontWeight: 600, mt: 10, fontSize: '1.2rem' }}>Introduction</Typography>
              <Typography sx={{ fontSize: '0.8rem', mt: 0.5, opacity: 0.8 }}>A personal message to say hello.</Typography>
              <Typography sx={{ mt: 3, paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }}>
                I am writing to apply for the programmer position advertised in the Times Union. As requested, I enclose a completed job application, my certification, my resume, and three references. The role is very appealing to me, and I believe that my strong technical experience and education make me a highly competitive candidate for this position. My key strengths that would support my success in this position include:
              </Typography>
            </Grid>
            <Grid sx={{ mt: 5 }}>
              <Typography sx={{ fontWeight: 600, mt: 10, fontSize: '1.2rem' }}>Verification</Typography>
              <Typography sx={{ fontSize: '0.8rem', mt: 0.5, opacity: 0.8 }}>Showing all provided client references.</Typography>
              <TableContainer sx={{ width: '100%', mt: 2 }}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600 }} >References #1</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >Anna Joy Taylor, Therapist, (802) 423-5269</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600 }} >References #2</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >James Cato, Manager, (852) 756-4488</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, verticalAlign: 'top' }} >ID Upload</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0 }} >
                        <img src={idSample} style={{ width: '300px' }} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid sx={{ mt: 5 }}>
              <Typography sx={{ fontWeight: 600, mt: 10, fontSize: '1.2rem' }}>Session Track</Typography>
              <Typography sx={{ fontSize: '0.8rem', mt: 0.5, opacity: 0.8 }}>This booking has been recorded to originate from this IP address.</Typography>
              <TableContainer sx={{ width: '100%', mt: 2 }}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600 }} >LOCATION</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600 }} >DEVICE</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600 }} >IP ADDRESS</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600 }} >DATE</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600 }} >TIME</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600, opacity: 0.8 }} >Australia</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600, opacity: 0.8 }} >Chrome-Windows</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600, opacity: 0.8 }} >207.18.15.370</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600, opacity: 0.8 }} >27 Apr 2022</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600, opacity: 0.8 }} >8:14PM</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <ScrollToTop
        smooth
        color="#009EF7"
      // component={<Button startIcon={<NorthIcon sx={{ color: '#fff' }} />} sx={{ padding: 0 }} variant="contained" />} style={{ padding: 0 }}
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
            <HelpOutlineIcon color="primary" sx={{ fontSize: '7rem', margin: 'auto', display: 'flex' }} />
            <Typography sx={{ fontSize: '1.2rem', textAlign: 'center', fontWeight: 600, mt: 3 }}>
              You are about to approve this booking.
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
              An email will be sent to the client to notify them. Do you wish to proceed?
            </Typography>
            <Grid item container direction='row' justifyContent='center' alignItems='center' display="flex" sx={{ mt: 3 }}>
              <Button color="success" variant="contained" sx={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'none' }}>Confirm</Button>
              <Button color="error" variant="contained" sx={{ marginInlineStart: 3, fontSize: '0.8rem', fontWeight: 600, textTransform: 'none' }} onClick={handleClose}>Cancel</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Container>
  );
}

export default BookDetailPage;