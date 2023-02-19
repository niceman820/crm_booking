import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Stack,
  Tooltip,
  Button
} from "@mui/material";

const EmbedPage = () => {
  const [valueLink, setValueLink] = useState('');
  const [valueBtnCode, setValueBtnCode] = useState('');
  const [openLinkCopyTooltip, setOpenLinkCopyTooltip] = useState(false);
  const [openBtnCodeTooltip, setOpenBtnCodeTooltip] = useState(false);
  const [errorLink, setErrorLink] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorButton, setErrorButton] = useState(false);
  const [errorBtnMessage, setErrorBtnMessage] = useState('');

  const handleTooltipClose = () => {
    setOpenLinkCopyTooltip(false);
    setOpenBtnCodeTooltip(false);
  };

  const handleCopyLink = () => {
    if (valueLink === '') {
      setErrorLink(true);
      setErrorMessage('Link is required.');
    } else {
      navigator.clipboard.writeText(valueLink);
      setOpenLinkCopyTooltip(true);
    }
  }

  const handleCopyButtonCode = () => {
    if (valueBtnCode === '') {
      setErrorButton(true);
      setErrorBtnMessage('Button code is required.');
    } else {
      navigator.clipboard.writeText(valueBtnCode);
      setOpenBtnCodeTooltip(true);
    }
  }

  return (
    <Container maxWidth="lg">
      <Grid className="page-title" sx={{ my: { sm: 2, md: 5 }, marginInline: 'auto' }} >
        <Typography sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600 }}>Embed Booking Form</Typography>
        <Typography sx={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, mt: 1, opacity: 0.7 }} >Embed your personalized booking form in wherever you need it, on your website, advertising profile, or social media.</Typography>
      </Grid>
      <Grid container justifyContent='center' sx={{ mt: { sm: 3, md: 6 }, width: '100%', backgroundColor: '#fff', borderRadius: 2 }} >
        <Container sx={{ width: '95%', py: 8 }}>
          <Grid>
            <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>1. Embed as a Simple Link</Typography>
            <Typography sx={{ fontSize: '0.8rem', mt: 1, opacity: 0.8, fontWeight: 600 }}>You can include a simple link to your booking form. Works on most websites.</Typography>
          </Grid>
          <Grid sx={{ mt: 5 }}>
            <Typography sx={{ fontWeight: 600, }}>Your Embed Code</Typography>
            <Stack direction='row' sx={{ mt: 1 }} >
              <TextField
                fullWidth
                onChange={(e) => { setErrorLink(false); setErrorMessage(''); setValueLink(e.target.value); }}
                error={errorLink}
                helperText={errorMessage}
              />
              <Tooltip
                open={openLinkCopyTooltip}
                onClose={handleTooltipClose}
                title={'Copied the link!'}
                leaveDelay={500}
                placement='top'
                arrow
              >
                <Button
                  onClick={handleCopyLink}
                  sx={{
                    height: '2rem',
                    textTransform: 'none',
                    fontWeight: 600,
                    minWidth: '7rem',
                    letterSpacing: 0.5,
                    mt: 1.5,
                    ml: 2,
                    backgroundColor: '#f5f8fa'
                  }}
                >
                  Copy Code
                </Button>
              </Tooltip>
            </Stack>
          </Grid>
        </Container>
      </Grid>
      <Grid container justifyContent='center' sx={{ mt: 3, width: '100%', backgroundColor: '#fff', borderRadius: 2 }} >
        <Container sx={{ width: '95%', py: 8 }}>
          <Grid>
            <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>2. Embed as a Button</Typography>
            <Typography sx={{ fontSize: '0.8rem', mt: 1, opacity: 0.8, fontWeight: 600 }}>You can include a button that launches your booking form in a self contained popup window. Suitable for sites where you have more control.</Typography>
          </Grid>
          <Grid sx={{ mt: 5 }}>
            <Typography sx={{ fontWeight: 600, }}>Your Embed Code</Typography>
            <TextField
              fullWidth
              onChange={(e) => { setErrorButton(false); setErrorBtnMessage(''); setValueBtnCode(e.target.value); }}
              error={errorButton}
              helperText={errorBtnMessage}
              sx={{ mt: 1 }}
              multiline
              rows={5}
            />
            <Tooltip
              open={openBtnCodeTooltip}
              onClose={handleTooltipClose}
              title={'Copied the link!'}
              leaveDelay={500}
              placement='top'
              arrow
            >
              <Button
                onClick={handleCopyButtonCode}
                sx={{
                  height: '2rem',
                  textTransform: 'none',
                  fontWeight: 600,
                  minWidth: '7rem',
                  letterSpacing: 0.5,
                  mt: 1,
                  backgroundColor: '#f5f8fa'
                }}
              >
                Copy Code
              </Button>
            </Tooltip>
          </Grid>
        </Container>
      </Grid>
    </Container>
  );
}

export default EmbedPage;