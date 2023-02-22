import React, { useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../../assets/theme/color-context';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
  Badge,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardHeader,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ErrorIcon from '@mui/icons-material/Error';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MonitorIcon from '@mui/icons-material/Monitor';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/auth';

const pagesList = [
  {
    page: { title: 'Dashboard', href: '/bookings' },
    subpages: []
  },
  {
    page: { title: 'My Bookings', href: '' },
    subpages: [
      { title: 'View All Bookings', href: '/bookings' },
      { title: 'Edit Notifications', href: '/bookings/edit-notifications' },
      { title: 'Create Booking', href: '/bookings/new-booking' }
    ]
  },
  {
    page: { title: 'Booking Form', href: '' },
    subpages: [
      { title: 'Customize Form', href: '/bookings/customize-form' },
      { title: 'Get Embed Code', href: '/bookings/embed' },
    ]
  },
];

const subscriptionPages = [
  { title: 'Referrals', href: '' },
  { title: 'Billing', href: '' },
  { title: 'Payments', href: '' },
  { title: 'Statements', href: '' }
];

function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [anchorSidebar, setAnchorSidebar] = useState(false);
  const [anchorDropdownMenu, setAnchorDropdownMenu] = useState(null);
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  const [anchorSubscriptionMenu, setAnchorSubscriptionMenu] = useState(null);
  const [anchorThemeMenu, setAnchorThemeMenu] = useState(null);
  const [subpageItems, setSubpageItems] = useState([]);

  const { user } = useSelector(state => ({
    user: state.auth.user
  }));

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpenSidebar = (open) => () => {
    setAnchorSidebar(open);
  };

  const handleOpenDropdownMenu = (subpages) => (event) => {
    setAnchorDropdownMenu(event.currentTarget);
    setSubpageItems(subpages);
  }

  const handleCloseDropdownMenu = () => {
    setAnchorDropdownMenu(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorUserMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const handleOpenSubscriptionMenu = (event) => {
    setAnchorSubscriptionMenu(event.currentTarget);
  }

  const handleCloseSubscriptionMenu = () => {
    setAnchorSubscriptionMenu(null);
  }

  const handleOpenThemeMenu = (event) => {
    setAnchorThemeMenu(event.currentTarget);
  }

  const handleCloseThemeMenu = () => {
    setAnchorThemeMenu(null);
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  }

  return (
    <AppBar position="static" sx={{ borderBottom: { md: '1px solid rgba(255, 255, 255, 0.1)', sm: 'none' } }} style={{ background: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="lg" >
        <Toolbar disableGutters>

          {/* logo title when more than xs */}
          <Link to='/bookings'>
            <Typography
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: '#fff',
                textDecoration: 'none',
                fontSize: '2rem'
              }}
            >
              clientl.
            </Typography>
          </Link>

          {/* collapse icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenSidebar(true)}
              color="inherit"
            >
              <MenuIcon sx={{ color: '#fff' }} />
            </IconButton>
          </Box>

          {/* logo title when less than md */}
          <Typography
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: '#fff',
              textDecoration: 'none',
              fontSize: '2rem'
            }}
          >
            clientl.
          </Typography>

          {/* item title navbar */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              marginInlineStart: 5
            }}
          >
            {pagesList.map((page, index) => (
              <div key={index}>
                <Button
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleCloseDropdownMenu}
                  sx={{
                    my: 2,
                    marginInlineStart: 2,
                    color: 'white',
                    display: 'block',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.8rem'
                    // '&:hover': {
                    //   backgroundColor: 'rgba(255, 255, 255, 0.3)'
                    // }
                  }}
                  onMouseOver={handleOpenDropdownMenu(page.subpages)}
                >
                  {page.page.title}
                </Button>
              </div>
            ))}
            {/* item title dropdown list */}
            {subpageItems.length > 0 &&
              <Menu
                id="menu-appbar"
                anchorEl={anchorDropdownMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorDropdownMenu)}
                onClose={handleCloseDropdownMenu}
                MenuListProps={{ onMouseLeave: handleCloseDropdownMenu }}
              >
                {subpageItems.map((subpage) => (
                  <MenuItem key={subpage.title} onClick={handleCloseDropdownMenu} sx={{ py: 1.5 }}>
                    <Link to={subpage.href}>
                      <Typography textAlign="center" sx={{ color: theme.palette.mode === 'light' && 'black', fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }}>
                        {subpage.title}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>}
          </Box>

          {/* icon list on navbar */}
          <Box sx={{ display: 'flex' }}>
            <IconButton size="large" color="inherit">
              <SearchIcon sx={{ color: '#fff' }} />
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="primary">
                <MailIcon sx={{ color: '#fff' }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onMouseOver={handleOpenThemeMenu}
            >
              <WbSunnyIcon sx={{ color: '#fff' }} />
            </IconButton>
            {/* Light & Dark theme picker dropdown */}
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorThemeMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorThemeMenu)}
              onClose={handleCloseThemeMenu}
              PaperProps={{ sx: { minWidth: '150px' } }}
              MenuListProps={{ onMouseLeave: handleCloseThemeMenu }}
            >
              <MenuItem sx={{ py: 1.5, '&:hover': { color: 'primary' } }} onClick={colorMode.setLightMode} >
                <ListItemIcon sx={{ minWidth: '0!important' }}>
                  <WbSunnyIcon fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center" sx={{ color: theme.palette.mode === 'light' && 'black', fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, marginInlineStart: 2 }}>Light</Typography>
              </MenuItem>
              <MenuItem sx={{ py: 1.5 }} onClick={colorMode.setDarkMode}>
                <ListItemIcon sx={{ minWidth: '0!important' }}>
                  <DarkModeIcon fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center" sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, marginInlineStart: 2, color: theme.palette.mode === 'light' && 'black' }}>Dark</Typography>
              </MenuItem>
              <MenuItem sx={{ py: 1.5 }} onClick={colorMode.setLightMode}>
                <ListItemIcon sx={{ minWidth: '0!important' }}>
                  <MonitorIcon fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center" sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, marginInlineStart: 2, color: theme.palette.mode === 'light' && 'black' }}>System</Typography>
              </MenuItem>
            </Menu>

            <IconButton
              onClick={handleOpenUserMenu}
              aria-label="account of current user"
              aria-controls="menu-appbar1"
              aria-haspopup="true"
              sx={{ paddingRight: 0 }}
            >
              <Avatar alt="Remy Sharp" variant="rounded" sx={{ width: '2rem', height: '2rem' }} />
            </IconButton>
            {/* User profile */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar1"
              anchorEl={anchorUserMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorUserMenu)}
              onClose={handleCloseUserMenu}
              PaperProps={{ sx: { minWidth: '250px' } }}
            // MenuListProps={{ onMouseLeave: handleCloseUserMenu }}
            >
              <MenuItem>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'tomato' }} aria-label="recipe" variant='rounded'>
                      R
                    </Avatar>
                  }
                  title={user?.fullName}
                  subheader={user?.email}
                  sx={{ padding: 0, color: '#212121', backgroundColor: theme.palette.mode === 'dark' && '#1e1e2d' }}
                />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleCloseUserMenu} sx={{ py: 1.5, marginInlineStart: 1 }}>
                <Typography textAlign="center" sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, color: theme.palette.mode === 'light' && 'black' }}>My Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu} sx={{ py: 1.5, marginInlineStart: 1 }}>
                <Typography textAlign="center" sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, color: theme.palette.mode === 'light' && 'black' }}>Edit Profile</Typography>
              </MenuItem>
              <MenuItem sx={{ py: 1.5, marginInlineStart: 1 }} onMouseOver={handleOpenSubscriptionMenu} >
                <Typography textAlign="center" sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, color: theme.palette.mode === 'light' && 'black' }}>My Subscription</Typography>
                <ListItemIcon sx={{ minWidth: '0!important', marginInlineStart: 'auto' }}>
                  <NavigateNextIcon />
                </ListItemIcon>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleCloseUserMenu} sx={{ py: 1.5, marginInlineStart: 1 }}>
                <Typography textAlign="center" sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, color: theme.palette.mode === 'light' && 'black' }}>Account Setting</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ marginInlineStart: 1 }}>
                <Typography textAlign="center" sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, color: theme.palette.mode === 'light' && 'black' }}>Sign Out</Typography>
              </MenuItem>
            </Menu>
            {/* User subscription sub Dropdown menu */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorSubscriptionMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorSubscriptionMenu)}
              onClose={handleCloseSubscriptionMenu}
              MenuListProps={{ onMouseLeave: handleCloseSubscriptionMenu }}
              style={{ // Add here you negative margin
                marginInlineStart: '-208px'
              }}
              PaperProps={{ sx: { width: '200px' } }}
            >
              {subscriptionPages.map((page) => (
                <MenuItem key={page.title} sx={{ py: 1.5, marginInlineStart: 1 }}>
                  <Typography textAlign="center" sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, color: theme.palette.mode === 'light' && 'black' }}>{page.title}</Typography>
                  {page.title === 'Statements' && <ListItemIcon sx={{ minWidth: '0!important', marginInlineStart: 'auto' }}>
                    <ErrorIcon fontSize="small" />
                  </ListItemIcon>}
                </MenuItem>
              ))}
              <Divider />
              <MenuItem>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label={'Notification'}
                  sx={{
                    '.MuiFormControlLabel-label': {
                      marginInlineStart: 1,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      opacity: 0.6,
                      color: theme.palette.mode === 'light' && 'black'
                    }
                  }}
                />

              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>

        {/* side bar */}
        <Drawer
          anchor={'left'}
          open={anchorSidebar}
          onClose={handleOpenSidebar(false)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            // onClick={handleOpenSidebar(false)}
            onKeyDown={handleOpenSidebar(false)}
          >
            <div style={{ height: '10px' }}></div>
            {pagesList.map((page, index) => (
              <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} sx={{ boxShadow: 'none', '&:before': { display: 'none' } }} disableGutters >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
                  <Typography
                    color='primary'
                    sx={{
                      flexShrink: 0,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#212121'
                    }}
                  >
                    {page.page.title}
                  </Typography>
                </AccordionSummary>
                {page.subpages.length > 0 && <AccordionDetails>
                  {page.subpages.map((subpage, index) => (
                    <ListItem key={subpage.title} disablePadding >
                      <ListItemButton>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={subpage.title} primaryTypographyProps={{ fontSize: '0.8rem', color: '#212121' }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </AccordionDetails>}
              </Accordion>
            ))}
          </Box>
        </Drawer>
      </Container>
    </AppBar>
  );
}
export default Navbar;