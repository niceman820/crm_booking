import React from "react";
import {
  Container,
  Grid,
  Typography
} from "@mui/material";
import BookTable from "./BookTable";

const BookPage = () => {

  return (
    <Container maxWidth="lg">
      <Grid className="page-title" sx={{ my: { sm: 2, md: 5 }, marginInline: 'auto' }} >
        <Typography sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600 }}>My Bookings</Typography>
        <Typography sx={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, mt: 1, opacity: 0.7 }} >This is a list of your most recent entries from your booking form.</Typography>
      </Grid>
      <BookTable />
    </Container>
  );
}

export default BookPage;