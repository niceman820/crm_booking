import React from "react";
import { useTheme } from '@mui/material/styles';
import { 
  Container, 
  Grid, 
  Stack,
  Typography
} from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  return (
    <footer className="footer">
      <Container maxWidth='lg' >
        <Grid
          container
          justifyContent='space-between'
          sx={{ minHeight: '50px' }}
        >
          <Stack className="footer_title" direction='row' sx={{ alignItems: 'center' }}>
            <Typography sx={{ color: theme.palette.mode === 'light' && 'black', fontSize: '0.8rem', fontWeight: 600, opacity: 0.6 }} >2022©</Typography>
            <Typography sx={{ color: theme.palette.mode === 'light' && 'black', fontSize: '0.8rem', fontWeight: 600, marginInlineStart: 1, opacity: 0.9 }}>Keenthemes</Typography>
          </Stack>
          <Stack className="footer_menu" direction='row' sx={{ alignItems: 'center' }} spacing={3}>
            <Typography sx={{ color: theme.palette.mode === 'light' && 'black', fontSize: '0.8rem', fontWeight: 600, opacity: 0.6 }} >About</Typography>
            <Typography sx={{ color: theme.palette.mode === 'light' && 'black', fontSize: '0.8rem', fontWeight: 600, opacity: 0.6 }} >Support</Typography>
            <Typography sx={{ color: theme.palette.mode === 'light' && 'black', fontSize: '0.8rem', fontWeight: 600, opacity: 0.6 }} >Purchase</Typography>
          </Stack>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;