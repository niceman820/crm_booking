import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import dayjs from "dayjs";
import { useTheme } from '@mui/material/styles';
import moment from "moment";
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

import idSample from '../../assets/img/sample-id.jpg';
import {
  getBookingDetail,
  approveBooking,
  declineBooking
} from "../../redux/actions/book";
import config from "../../config/config";
import "./style.css";

const BookDetailPage = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);
  const theme = useTheme();

  const { bookingDetailData } = useSelector(state => ({
    bookingDetailData: state.book.bookingDetailData,
  }));

  useEffect(() => {
    dispatch(getBookingDetail(bookId));
  }, []);

  const handleClose = () => {
    setOpen(false);
    setOpenDecline(false);
  }

  const handleApprove = () => {
    dispatch(approveBooking(bookId));
    handleClose();
  }

  const handleDecline = () => {
    dispatch(declineBooking(bookId));
    handleClose();
  }

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
          <Typography sx={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, mt: 1, opacity: 0.7 }} >You have received an {bookingDetailData?.bookingType} booking request with {bookingDetailData?.fullName} for {dayjs(bookingDetailData?.date).format('DD MMM YYYY')} at {dayjs(bookingDetailData?.date).format('LT')}</Typography>
        </Grid>
        {bookingDetailData?.status == 0 && <Grid item container direction='row' justifyContent='flex-end' alignItems="center" xs={12} sm={6}>
          <Button color="success" variant="contained" sx={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'none', color: '#fff' }} onClick={() => setOpen(true)}>Approve Booking</Button>
          <Button color="error" variant="contained" sx={{ marginInlineStart: 3, fontSize: '0.8rem', fontWeight: 600, textTransform: 'none' }} onClick={() => setOpenDecline(true)} >Decline Booking</Button>
        </Grid>}
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
            backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1e1e2d',
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ height: '3rem', width: '3rem', backgroundColor: 'tomato', height: '6rem', width: '6rem', fontSize: '3rem', fontWeight: 600, margin: 'auto', mt: 5 }}>{bookingDetailData?.client?.firstName[0]}</Avatar>
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, textAlign: 'center', mt: 3 }}>{bookingDetailData?.fullName}</Typography>
          <Grid sx={{ textAlign: 'center', marginTop: 1 }}>
            {bookingDetailData?.status == 0
              ? <Box className="booking-detail-type" sx={{ color: '#FFC700', backgroundColor: theme.palette.mode ==="light" ? "#FFF8DD" : "#392F28" }}>Unconfirmed Booking</Box>
              : bookingDetailData?.status == 1
                ? <Box className="booking-detail-type" sx={{ color: '#F1416C', backgroundColor: theme.palette.mode ==="light" ? "#FFF5F8" : "#3A2434" }}>Declined Booking</Box>
                : <Box className="booking-detail-type" sx={{ color: '#50CD89', backgroundColor: theme.palette.mode === 'light' ? "#E8FFF3" : "#1C3238" }}>Approved Booking</Box>
            }
          </Grid>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 5, marginInlineStart: 6 }}>Email</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 0.5, marginInlineStart: 6, opacity: 0.8 }}>{bookingDetailData?.client?.email}</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 3, marginInlineStart: 6 }}>Contact Number</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 0.5, marginInlineStart: 6, opacity: 0.8 }}>{bookingDetailData?.client?.phone}</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 3, marginInlineStart: 6 }}>Ocupation</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 0.5, marginInlineStart: 6, opacity: 0.8 }}>{bookingDetailData?.client?.occupation}</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 3, marginInlineStart: 6 }}>Preferred Communication</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 0.5, marginInlineStart: 6, opacity: 0.8 }}>
            {bookingDetailData?.preferredCommuncation?.email && 'Email '}
            {bookingDetailData?.preferredCommuncation?.text && 'Text '}
            {bookingDetailData?.preferredCommuncation?.phone && 'Phone '}
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 3, marginInlineStart: 6 }}>How did you find me?</Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mt: 0.5, marginInlineStart: 6, opacity: 0.8 }}>{bookingDetailData?.client?.searchEngine}</Typography>

        </Grid>
        <Grid
          item
          sm={17}
          md={15}
          xs={24}
          sx={{
            minHeight: '300px',
            backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1e1e2d',
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
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >{bookingDetailData?.bookingType}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600 }} >Preferred Date</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >{dayjs(bookingDetailData?.date).format('ll')}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600 }} >Preferred Time</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >{dayjs(bookingDetailData?.date).format('LT')}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600 }} >Duration</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >{bookingDetailData?.duration} {bookingDetailData?.duration == 1 ? 'Hour' : 'Hours'}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid sx={{ mt: 5 }}>
              <Typography sx={{ fontWeight: 600, mt: 10, fontSize: '1.2rem' }}>Introduction</Typography>
              <Typography sx={{ fontSize: '0.8rem', mt: 0.5, opacity: 0.8 }}>A personal message to say hello.</Typography>
              <Typography sx={{ mt: 3, paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }}>
                {bookingDetailData.message}
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
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >{bookingDetailData?.ref1}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600 }} >References #2</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >{bookingDetailData?.ref2}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, verticalAlign: 'top' }} >ID Upload</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0 }} >
                        {
                          bookingDetailData?.idCard
                            ? <img src={`${config.SERVER_BASE_URL}/${bookingDetailData.idCard}`} style={{ width: '300px' }} />
                            : <img src={idSample} style={{ width: '300px' }} />
                        }
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
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600, opacity: 0.8 }} >{bookingDetailData?.client_device_info?.countryInfo}</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600, opacity: 0.8 }} >{bookingDetailData?.client_device_info?.browserInfo} - {bookingDetailData?.client_device_info?.systemInfo}</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600, opacity: 0.8 }} >{bookingDetailData?.client_device_info?.ipInfo}</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600, opacity: 0.8 }} >{moment(bookingDetailData?.client_device_info?.createdAt).format('ll')}</TableCell>
                      <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.7rem', fontWeight: 600, opacity: 0.8 }} >{moment(bookingDetailData?.client_device_info?.createdAt).format('LT')}</TableCell>
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
          <Grid sx={{ width: '80%', margin: 'auto' }} className="text-center">
            <Grid container justifyContent='center' alignItems='center' className="swal-question" sx={{ borderColor: "#009EF7", }} >
              <Grid className="swal-icon-content" sx={{ fontSize: '3.25em', color: '#009EF7', }}>?</Grid>
            </Grid>
            <Typography sx={{ fontSize: '1.2rem', textAlign: 'center', fontWeight: 600, mt: 3 }}>
              You are about to approve this booking.
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
              An email will be sent to the client to notify them. Do you wish to proceed?
            </Typography>
            <Grid item container direction='row' justifyContent='center' alignItems='center' display="flex" sx={{ mt: 3 }}>
              <Button color="success" variant="contained" sx={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'none', color: "#fff" }} onClick={handleApprove} >Confirm</Button>
              <Button color="error" variant="contained" sx={{ marginInlineStart: 3, fontSize: '0.8rem', fontWeight: 600, textTransform: 'none' }} onClick={handleClose}>Cancel</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={openDecline}
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
          <Grid sx={{ width: '80%', margin: 'auto' }} className="text-center">
            <Grid container justifyContent='center' alignItems='center' className="swal-question swal-close" sx={{ borderColor: "#F1416C", }}>
              <Grid className="swal-x-content" sx={{ fontSize: '2.75em', color: '#F1416C', }} >&#x2715;</Grid>
            </Grid>
            <Typography sx={{ fontSize: '1.2rem', textAlign: 'center', fontWeight: 600, mt: 3 }}>
              You are about to decline this booking.
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
              An email will be sent to the client to notify them. Do you wish to proceed?
            </Typography>
            <Grid item container direction='row' justifyContent='center' alignItems='center' display="flex" sx={{ mt: 3 }}>
              <Button color="success" variant="contained" sx={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'none', color: '#fff' }} onClick={handleDecline} >Confirm</Button>
              <Button color="error" variant="contained" sx={{ marginInlineStart: 3, fontSize: '0.8rem', fontWeight: 600, textTransform: 'none' }} onClick={handleClose}>Cancel</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Container>
  );
}

export default BookDetailPage;