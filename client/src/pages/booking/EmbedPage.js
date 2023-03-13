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
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";
import config from "../../config/config";

const EmbedPage = () => {
  const theme = useTheme();
  const [valueLink, setValueLink] = useState("");
  const [valueBtnCode, setValueBtnCode] = useState("<div id = 'mf_placeholder'\n\tdata-formurl='forms/embed.php?id=19108'\n\tdata-formheight='1746'\n\tdata-formtitle='Sample Booking Form'\n</div>\n<script>\n(function(f,o,r,m){\n\tr = f.createElement('script');r.async=1;r.src=o+'js/mf.js';\n\tm=f.getElementById('mf_placeholder'); m.parentNode.insertBefore(r, m);\n})(document,'/forms/');\n</script>\n");
  const [openLinkCopyTooltip, setOpenLinkCopyTooltip] = useState(false);
  const [openBtnCodeTooltip, setOpenBtnCodeTooltip] = useState(false);

  const { user } = useSelector(state => ({
    user: state.auth.user,
  }));

  useEffect(() => {
    if (user.firstName) {
      setValueLink(`<a href='${config.CLIENT_BASE_URL}/new-booking/${user.bookFormId}/${user.firstName}-${user.lastName}'>Launch My Booking Form</a>`);
      setValueBtnCode(`<button onclick="javascript:poponload()" style="padding: 10px 20px;">Launch Booking Form</button>\n<script type="text/javascript">\nfunction poponload()\n{\n\ttestwindow = window.open("${config.CLIENT_BASE_URL}/new-booking/${user.bookFormId}/${user.firstName}-${user.lastName}", "mywindow", "location=1, status=1, scrollbars=1, width=800, height=600");\n\ttestwindow.moveTo(0, 0);\n}\n</script>`);
    }
  }, [user]);

  const handleTooltipClose = () => {
    setOpenLinkCopyTooltip(false);
    setOpenBtnCodeTooltip(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(valueLink);
    setOpenLinkCopyTooltip(true);
  }

  const handleCopyButtonCode = () => {
    navigator.clipboard.writeText(valueBtnCode);
    setOpenBtnCodeTooltip(true);
  }

  return (
    <Container maxWidth="lg">
      <Grid className="page-title" sx={{ my: { sm: 2, md: 5 }, marginInline: 'auto' }} >
        <Typography sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600 }}>Embed Booking Form</Typography>
        <Typography sx={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, mt: 1, opacity: 0.7 }} >Embed your personalized booking form in wherever you need it, on your website, advertising profile, or social media.</Typography>
      </Grid>
      <Grid container justifyContent='center' sx={{ mt: { sm: 3, md: 6 }, width: '100%', backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1e1e2d', borderRadius: 2 }} >
        <Container sx={{ width: '95%', py: 8 }}>
          <Grid>
            <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>1. Embed as a Simple Link</Typography>
            <Typography sx={{ fontSize: '0.8rem', mt: 1, opacity: 0.8, fontWeight: 600 }}>You can include a simple link to your booking form. Works on most websites.</Typography>
          </Grid>
          <Grid sx={{ mt: 5 }}>
            <Typography sx={{ fontWeight: 600, }}>Your Embed Code</Typography>
            <Stack direction='row' sx={{ mt: 1, alignItems: 'center' }} >
              <TextField
                variant="standard"
                fullWidth
                value={valueLink}
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
                    ml: 2,
                    backgroundColor: theme.palette.mode === 'light' ? '#f5f8fa' : '#2B2B40',
                    color: theme.palette.mode === 'dark' && '#6D6D80',
                    '&:hover': {
                      color: theme.palette.mode === 'dark' && '#009EF7',
                    }
                  }}
                >
                  Copy Code
                </Button>
              </Tooltip>
            </Stack>
          </Grid>
        </Container>
      </Grid>
      <Grid container justifyContent='center' sx={{ mt: 3, width: '100%', backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1e1e2d', borderRadius: 2 }} >
        <Container sx={{ width: '95%', py: 8 }}>
          <Grid>
            <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>2. Embed as a Button</Typography>
            <Typography sx={{ fontSize: '0.8rem', mt: 1, opacity: 0.8, fontWeight: 600 }}>You can include a button that launches your booking form in a self contained popup window. Suitable for sites where you have more control.</Typography>
          </Grid>
          <Grid sx={{ mt: 5 }}>
            <Typography sx={{ fontWeight: 600, }}>Your Embed Code</Typography>
            <TextField
              variant="standard"
              fullWidth
              value={valueBtnCode}
              sx={{ mt: 1 }}
              multiline
              rows={8}
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
                  mt: 2,
                  backgroundColor: theme.palette.mode === 'light' ? '#f5f8fa' : '#2B2B40',
                  color: theme.palette.mode === 'dark' && '#6D6D80',
                  '&:hover': {
                    color: theme.palette.mode === 'dark' && '#009EF7',
                  }
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