import React, { useEffect, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import { useTheme } from "@mui/material/styles";
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
  Divider,
  Switch,
  TextField,
  CardHeader,
} from "@mui/material";

import DraftsIcon from '@mui/icons-material/Drafts';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useDispatch, useSelector } from "react-redux";
import { customEmailNotification, getBookingFormData } from "../../redux/actions/book";

const vairableList = [
  { name: '{client_fname}', description: 'Client\'s first name.', icon: <Avatar color="primary" aria-label="recipe"> T </Avatar> },
  { name: '{client_lname}', description: 'Client\'s last name.', icon: <Avatar color="primary" aria-label="recipe"> T </Avatar> },
  { name: '{client_email}', description: 'Client email provided.', icon: <DraftsIcon sx={{ fontSize: '2.5rem', color: '#FFC700' }} /> },
  { name: '{client_phone}', description: 'Phone number provided.', icon: <PermPhoneMsgIcon sx={{ fontSize: '2.5rem', color: '#FFC700' }} /> },
  { name: '{booking_date}', description: 'Date of booking.', icon: <CalendarMonthIcon sx={{ fontSize: '2.5rem', color: '#F1416C' }} /> },
  { name: '{booking_time}', description: 'Time of booking.', icon: <AccessAlarmIcon sx={{ fontSize: '2.5rem', color: '#F1416C' }} /> },
  { name: '{booking_duration}', description: 'Duration of booking.', icon: <ShutterSpeedIcon sx={{ fontSize: '2.5rem', color: '#50CD89' }} /> },
];

const EditNotificationPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { emailNotification, user } = useSelector(state => ({
    emailNotification: state.book.emailNotification,
    user: state.auth.user
  }));


  useEffect(() => {
    dispatch(getBookingFormData(user?.bookFormId));
  }, []);


  const [approvedTitle, setApprovedTitle] = useState("");
  const [approvedMessage, setApprovedMessage] = useState("");
  const [declinedTitle, setDeclinedTitle] = useState('');
  const [declinedMessage, setDeclinedMessage] = useState('');
  const [approvedStatus, setApprovedStatus] = useState(false);
  const [declinedStatus, setDeclinedStatus] = useState(false);


  useEffect(() => {
    if (emailNotification.approveTitle) {
      setApprovedTitle(emailNotification.approveTitle);
      setApprovedMessage(emailNotification.approveMessage);
      setApprovedStatus(emailNotification.approveMailStatus);
      setDeclinedTitle(emailNotification.declineTitle);
      setDeclinedMessage(emailNotification.declineMessage);
      setDeclinedStatus(emailNotification.declineMailStatus);
    }
  }, [emailNotification]);

  const handleOpen = () => {
    let data = {
      bookFormId: emailNotification.bookFormId,
      approveTitle: approvedTitle,
      approveMessage: approvedMessage,
      approveMailStatus: approvedStatus,
      declineTitle: declinedTitle,
      declineMessage: declinedMessage,
      declineMailStatus: declinedStatus
    }
    dispatch(customEmailNotification(data));
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const handleChangeTitle = (e) => {
    setApprovedTitle(e.target.value)
  }

  const handleChangeMessage = (e) => {
    setApprovedMessage(e.target.value)
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
          <Typography sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600 }}>Edit Email Notifications</Typography>
          <Typography sx={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, mt: 1, opacity: 0.7 }} >Personalize emails sent to a client when you approve or decline a booking.</Typography>
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
              <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Approved Booking</Typography>
              <Typography sx={{ fontSize: '0.8rem', mt: 0.5, opacity: 0.8, fontWeight: 600 }}>When a booking is approved, this email will be sent as a confirmation to your clients..</Typography>
            </Grid>
            <Divider sx={{ mt: 2 }} />
            <TableContainer sx={{ width: '100%', mt: 2 }}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, width: 200 }} >Enable?</TableCell>
                    <TableCell align="left" sx={{ paddingX: 0 }} >
                      <Switch checked={approvedStatus} onChange={e => setApprovedStatus(e.target.checked)} />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, width: 200 }} >Email Subject</TableCell>
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >
                      <TextField
                        variant="standard"
                        fullWidth
                        sx={{ mt: 1 }}
                        value={approvedTitle}
                        onChange={handleChangeTitle}
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
                        value={approvedMessage}
                        onChange={handleChangeMessage}
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
              <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Declined Booking</Typography>
              <Typography sx={{ fontSize: '0.8rem', mt: 0.5, opacity: 0.8, fontWeight: 600 }}>For declined bookings, this email will be sent to notify clients that their request has been rejected.</Typography>
            </Grid>
            <Divider sx={{ mt: 2 }} />
            <TableContainer sx={{ width: '100%', mt: 2 }}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, width: 200 }} >Enable?</TableCell>
                    <TableCell align="left" sx={{ paddingX: 0 }} >
                      <Switch checked={declinedStatus} onChange={e => setDeclinedStatus(e.target.checked)} />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, width: 200 }} >Email Subject</TableCell>
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >
                      <TextField
                        variant="standard"
                        fullWidth
                        sx={{ mt: 1 }}
                        value={declinedTitle}
                        onChange={(e) => setDeclinedTitle(e.target.value)}
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
                        value={declinedMessage}
                        onChange={(e) => setDeclinedMessage(e.target.value)}
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
            <Grid>
              <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>Customize Your Email Even Further!</Typography>
              <Divider sx={{ mt: 1, mb: 3 }} />
              <Typography sx={{ fontSize: '0.8rem', mt: 0.5, opacity: 0.8, fontWeight: 600 }}>You can personalize your email further by adding these variables to your message. Simply include the tag in your message, and it will display that particular value.</Typography>
            </Grid>
            <Divider sx={{ mt: 3 }} />
            {vairableList.map((variable, index) =>
              <CardHeader
                key={index}
                avatar={variable.icon}
                title={variable.name}
                subheader={variable.description}
                titleTypographyProps={{ fontSize: '1rem', fontWeight: 600 }}
                subheaderTypographyProps={{ fontWeight: 600, color: '#A1A5B7' }}
                sx={{
                  border: '1px',
                  borderStyle: 'dashed',
                  borderColor: '#E4E6EF',
                  mt: 2
                }}
              />
            )}
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
          <Grid sx={{ width: '80%', margin: 'auto' }} className="text-center">
            <Grid container justifyContent='center' alignItems='center' className="swal-question swal-close" sx={{ borderColor: "#50CD89", }}>
              <Grid className="swal-x-content" sx={{ fontSize: '2.75em', color: '#50CD89', }} >&#10004;</Grid>
            </Grid>
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

export default EditNotificationPage;