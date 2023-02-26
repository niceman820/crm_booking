import React from "react";
import { Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BookPage from "../pages/booking/BookPage";
import BookDetailPage from "../pages/booking/BookDetailPage";
import EditNotificationPage from "../pages/booking/EditNotificationPage";
import CustomizeFormPage from "../pages/booking/CustomizeFormPage";

import HeaderBgImage from "../assets/img/header-bg.jpg";
import DarkBgImage from "../assets/img/header-bg-dark.png";
import EmbedPage from "../pages/booking/EmbedPage";

const MainLayoutRouter = () => {
  const theme = useTheme();
  return (
    <Grid
      className="page-content"
      sx={{
        backgroundImage: theme.palette.mode === 'light' ? `url(${HeaderBgImage})` : `url(${DarkBgImage})`,
        backgroundColor: theme.palette.mode === 'light' ? '#f5f8fa' : '#151521'
      }}
    >
      <Navbar />
      <main className="main-content" style={{ minHeight: 'calc(100vh - 166px)' }}>
        <Routes>
          <Route path="/bookings" element={<BookPage />} />
          <Route path="/bookings/details/:bookId" element={<BookDetailPage />} />
          <Route path="/bookings/edit-notifications" element={<EditNotificationPage />} />
          <Route path="/bookings/customize-form" element={<CustomizeFormPage />} />
          <Route path="/bookings/embed" element={<EmbedPage />} />
        </Routes>
      </main>
      <Footer />
    </Grid>
  );
}

export default MainLayoutRouter;