import React from "react";
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

const EditNotificationPage = () => {
  const [open, setOpen] = React.useState(false);
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
            backgroundColor: '#fff',
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
                      <Switch defaultChecked />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, width: 200 }} >Email Subject</TableCell>
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >Your booking request has been approved!</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, verticalAlign: 'top', width: 200 }} >Message</TableCell>
                    <TableCell align="left" sx={{ paddingX: 0 }} >
                      <TextField
                        fullWidth
                        rows={8}
                        multiline
                        value={'Dear {client_fname},\n\nThank you for your booking. Your appointment has been approved and confirmed!\n\nI look forward to seeing you on {booking_date} at {booking_time}.\n\nThank you and see you soon!\n\nAva'}
                        inputProps={{ sx: { fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 } }}
                        sx={{ border: 'none' }}
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
                      <Switch defaultChecked />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, width: 200 }} >Email Subject</TableCell>
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }} >Your booking request has been declined</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell align="left" sx={{ paddingX: 0, fontSize: '0.8rem', fontWeight: 600, verticalAlign: 'top', width: 200 }} >Message</TableCell>
                    <TableCell align="left" sx={{ paddingX: 0 }} >
                      <TextField
                        fullWidth
                        rows={8}
                        multiline
                        value={'Thank you for your booking request. Unfortunately, I will not be able to accomodate you.'}
                        inputProps={{ sx: { fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 } }}
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
            backgroundColor: '#fff',
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
            <CardHeader
              avatar={
                <Avatar color="primary" aria-label="recipe">
                  T
                </Avatar>
              }
              title="{client_fname}"
              titleTypographyProps={{ fontSize: '1rem', fontWeight: 600 }}
              subheader="Client's first name."
              subheaderTypographyProps={{ fontWeight: 600, color: '#A1A5B7' }}
              sx={{
                border: '1px',
                borderStyle: 'dashed',
                borderColor: '#E4E6EF',
                mt: 2
              }}
            />
            <CardHeader
              avatar={
                <Avatar color="primary" aria-label="recipe">
                  T
                </Avatar>
              }
              title="{client_lname}"
              titleTypographyProps={{ fontSize: '1rem', fontWeight: 600 }}
              subheader="Client's last name."
              subheaderTypographyProps={{ fontWeight: 600, color: '#A1A5B7' }}
              sx={{
                border: '1px',
                borderStyle: 'dashed',
                borderColor: '#E4E6EF',
                mt: 2
              }}
            />
            <CardHeader
              avatar={
                <DraftsIcon sx={{ fontSize: '2.5rem', color: '#FFC700' }} />
              }
              title="{client_email}"
              titleTypographyProps={{ fontSize: '1rem', fontWeight: 600 }}
              subheader="Client email provided."
              subheaderTypographyProps={{ fontWeight: 600, color: '#A1A5B7' }}
              sx={{
                border: '1px',
                borderStyle: 'dashed',
                borderColor: '#E4E6EF',
                mt: 2
              }}
            />
            <CardHeader
              avatar={
                <PermPhoneMsgIcon sx={{ fontSize: '2.5rem', color: '#FFC700' }} />
              }
              title="{client_phone}"
              titleTypographyProps={{ fontSize: '1rem', fontWeight: 600 }}
              subheader="Phone number provided."
              subheaderTypographyProps={{ fontWeight: 600, color: '#A1A5B7' }}
              sx={{
                border: '1px',
                borderStyle: 'dashed',
                borderColor: '#E4E6EF',
                mt: 2
              }}
            />
            <CardHeader
              avatar={
                <CalendarMonthIcon sx={{ fontSize: '2.5rem', color: '#F1416C' }} />
              }
              title="{booking_date}"
              titleTypographyProps={{ fontSize: '1rem', fontWeight: 600 }}
              subheader="Date of the booking."
              subheaderTypographyProps={{ fontWeight: 600, color: '#A1A5B7' }}
              sx={{
                border: '1px',
                borderStyle: 'dashed',
                borderColor: '#E4E6EF',
                mt: 2
              }}
            />
            <CardHeader
              avatar={
                <AccessAlarmIcon sx={{ fontSize: '2.5rem', color: '#F1416C' }} />
              }
              title="{booking_time}"
              titleTypographyProps={{ fontSize: '1rem', fontWeight: 600 }}
              subheader="Time of the booking."
              subheaderTypographyProps={{ fontWeight: 600, color: '#A1A5B7' }}
              sx={{
                border: '1px',
                borderStyle: 'dashed',
                borderColor: '#E4E6EF',
                mt: 2
              }}
            />
            <CardHeader
              avatar={
                <ShutterSpeedIcon sx={{ fontSize: '2.5rem', color: '#50CD89' }} />
              }
              title="{booking_duration}"
              titleTypographyProps={{ fontSize: '1rem', fontWeight: 600 }}
              subheader="Duration of the booking."
              subheaderTypographyProps={{ fontWeight: 600, color: '#A1A5B7' }}
              sx={{
                border: '1px',
                borderStyle: 'dashed',
                borderColor: '#E4E6EF',
                mt: 2
              }}
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

export default EditNotificationPage;