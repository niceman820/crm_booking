import React, { useState, useContext, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../../assets/theme/color-context';
import makeStyles from "@material-ui/styles/makeStyles";
import * as dayjs from 'dayjs';
import moment from 'moment';
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
  FormControlLabel,
  Stack
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ErrorIcon from '@mui/icons-material/Error';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MonitorIcon from '@mui/icons-material/Monitor';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FlareIcon from '@mui/icons-material/Flare';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import patternImage from "../../assets/img/pattern-1.jpg";

import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout, readNotification } from '../../redux/actions/auth';

import {
  THEME_MENU,
  USER_PROFILE_MENU,
  USER_SUB_MENU,
  MY_BOOKING_MENU,
  BOOKING_FORM,
  NOTIFICATION_MENU
} from '../../utils/constants';
import { socketIo } from '../..';

const useStyles = makeStyles({
  popOverRoot: {
    pointerEvents: "none"
  },
});

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
  const [subpageTypeMenu, setSubpageTypeMenu] = useState();
  const [anchorNotification, setAnchorNotification] = useState(null);

  const { user, notification } = useSelector(state => ({
    user: state.auth.user,
    notification: state.auth.notification
  }));

  const pagesList = [
    {
      page: { title: 'Dashboard', href: '/bookings' },
      subpages: [],
      typeMenu: ''
    },
    {
      page: { title: 'My Bookings', href: '' },
      subpages: [
        { title: 'View All Bookings', href: '/bookings', icon: <MailIcon /> },
        { title: 'Edit Notifications', href: '/bookings/edit-notifications', icon: <MailIcon /> },
        { title: 'Preview Booking', href: `/new-booking/${user?.bookFormId}/${user?.firstName}-${user?.lastName}`, icon: <NoteAddIcon /> }
      ],
      typeMenu: MY_BOOKING_MENU
    },
    {
      page: { title: 'Booking Form', href: '' },
      subpages: [
        { title: 'Customize Form', href: '/bookings/customize-form', icon: <FlareIcon /> },
        { title: 'Get Embed Code', href: '/bookings/embed', icon: <DynamicFormIcon /> },
      ],
      typeMenu: BOOKING_FORM
    },
  ];

  const subscriptionPages = [
    { title: 'Referrals', href: '' },
    { title: 'Billing', href: '' },
    { title: 'Payments', href: '' },
    { title: 'Statements', href: '' }
  ];

  const styles = useStyles();
  let currentlyHovering = false;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpenSidebar = (open) => () => {
    setAnchorSidebar(open);
  };

  function handleClick(event, typeMenu, subPageContent) {
    if (subPageContent) {
      setSubpageItems(subPageContent);
      setSubpageTypeMenu(typeMenu);
    }
    if (anchorThemeMenu !== event.currentTarget) {
      switch (typeMenu) {
        case THEME_MENU:
          setAnchorThemeMenu(event.currentTarget);
          break;
        case USER_PROFILE_MENU:
          setAnchorUserMenu(event.currentTarget);
          break;
        case USER_SUB_MENU:
          setAnchorSubscriptionMenu(event.currentTarget);
          break;
        case MY_BOOKING_MENU:
          setAnchorDropdownMenu(event.currentTarget);
          break;
        case BOOKING_FORM:
          setAnchorDropdownMenu(event.currentTarget);
          break;
        case NOTIFICATION_MENU:
          setAnchorNotification(event.currentTarget);
          break;
        default:
          break;
      }
    }
  }

  function handleHover() {
    currentlyHovering = true;
  }

  const handleClose = (typeMenu) => () => {
    switch (typeMenu) {
      case THEME_MENU:
        setAnchorThemeMenu(null);
        break;
      case USER_PROFILE_MENU:
        setAnchorUserMenu(null);
        break;
      case USER_SUB_MENU:
        setAnchorSubscriptionMenu(null);
        break;
      case MY_BOOKING_MENU:
        setAnchorDropdownMenu(null);
        break;
      case BOOKING_FORM:
        setAnchorDropdownMenu(null);
        break;
      case NOTIFICATION_MENU:
        setAnchorNotification(null);
        dispatch(readNotification());
      default:
        break;
    }
  }

  const handleCloseHover = (typeMenu) => () => {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose(typeMenu)();
      }
    }, 1);
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  }

  useEffect(() => {
    socketIo.on('SET_SOCKET_REQUEST', () => {
      socketIo.emit('SET_SOCKET_ID', { user_id: user?.id || "" })
    })
    socketIo.on('MAIL_RECEIVED_NOTIFICATION', () => {
      console.log('notified -------- 11111111111111111111111111');
      // api request
      dispatch(loadUser());

    })
  }, [])

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
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
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
                  sx={{
                    my: 2,
                    padding: 1,
                    marginInlineStart: 2,
                    color: 'white',
                    display: 'block',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                  onClick={(e) => handleClick(e, page.typeMenu, page.subpages)}
                  onMouseOver={(e) => handleClick(e, page.typeMenu, page.subpages)}
                  onMouseLeave={handleCloseHover(page.typeMenu)}
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
                onClose={handleClose(subpageTypeMenu)}
                MenuListProps={{
                  onMouseEnter: handleHover,
                  onMouseLeave: handleCloseHover(subpageTypeMenu),
                  style: { pointerEvents: "auto" }
                }}
                PopoverClasses={{
                  root: styles.popOverRoot
                }}
              >
                {subpageItems.map((subpage) => (
                  <MenuItem key={subpage.title} onClick={() => setAnchorDropdownMenu(null)} sx={{ py: 1.5, color: theme.palette.mode === 'light' && 'black', opacity: 0.8, alignItems: 'center', fontSize: '0.8rem' }}>
                    {subpage.icon}
                    <Link to={subpage.href}>
                      <Typography textAlign="center" sx={{ color: theme.palette.mode === 'light' && 'black', fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, marginInlineStart: 1 }}>
                        {subpage.title}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>}
          </Box>

          {/* icon list on navbar */}
          <Box sx={{ display: 'flex' }}>
            <IconButton
              size="large"
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <SearchIcon sx={{ color: '#fff' }} />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={(e) => handleClick(e, NOTIFICATION_MENU)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <Badge
                badgeContent={notification?.length}
                sx={{
                  "& .MuiBadge-badge": {
                    color: "#fff",
                    backgroundColor: "#009EF7"
                  }
                }}>
                <MailIcon sx={{ color: '#fff' }} />
              </Badge>
            </IconButton>
            {/* notification dropdown */}
            <Menu
              sx={{ mt: '40px' }}
              anchorEl={anchorNotification}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorNotification)}
              onClose={handleClose(NOTIFICATION_MENU)}
              PaperProps={{
                sx: {
                  width: '375px',
                  ".MuiList-root": { padding: '0!important' }
                },
              }}
            >
              <MenuItem
                sx={{
                  py: 2.5,
                  backgroundImage: `url(${patternImage})`,
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <Typography textAlign="center" sx={{ color: theme.palette.mode === 'light' && 'white', fontSize: '1.2rem', fontWeight: 600, opacity: 0.8, marginInlineStart: 2 }}>Notification</Typography>
              </MenuItem>
              {notification.length > 0
                ? notification.map((note, index) =>
                  <MenuItem
                    key={index}
                    sx={{ py: 1.5 }}
                  >
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }} >
                      <CardHeader
                        avatar={
                          <CalendarMonthIcon sx={{ fontSize: '1rem', color: '#009EF7' }} />
                        }
                        title={`New Booking (${note?.bookingId?.fullName})`}
                        subheader={`${dayjs(note?.createdAt).format('ll')} at ${dayjs(note?.createdAt).format('LT')}`}
                        sx={{ padding: 0, color: '#212121', backgroundColor: theme.palette.mode === 'dark' && '#1e1e2d' }}
                      />
                      <Typography sx={{ color: theme.palette.mode === 'light' && 'black', fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, marginInlineStart: 2 }}>{moment(note?.createdAt).fromNow()}</Typography>
                    </Stack>
                  </MenuItem>
                )
                : <MenuItem
                  sx={{ py: 1.5 }}
                >
                  <Typography textAlign="center" sx={{ color: theme.palette.mode === 'light' && 'black', fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, marginInlineStart: 2 }}>Not Found</Typography>
                </MenuItem>
              }
            </Menu>

            <IconButton
              size="large"
              color="inherit"
              onClick={(e) => handleClick(e, THEME_MENU)}
              onMouseOver={(e) => handleClick(e, THEME_MENU)}
              onMouseLeave={handleCloseHover(THEME_MENU)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <WbSunnyIcon sx={{ color: '#fff' }} />
            </IconButton>
            {/* Light & Dark theme picker dropdown */}
            <Menu
              sx={{ mt: '40px' }}
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
              onClose={handleClose(THEME_MENU)}
              MenuListProps={{
                onMouseEnter: handleHover,
                onMouseLeave: handleCloseHover(THEME_MENU),
                style: { pointerEvents: "auto" }
              }}
              PopoverClasses={{
                root: styles.popOverRoot
              }}
              PaperProps={{ sx: { minWidth: '150px' } }}
            >
              <MenuItem
                sx={{ py: 1.5 }}
                onClick={() => {
                  colorMode.setLightMode();
                  setAnchorThemeMenu(null);
                }}
              >
                <ListItemIcon sx={{ minWidth: '0!important' }}>
                  <WbSunnyIcon fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center" sx={{ color: theme.palette.mode === 'light' && 'black', fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, marginInlineStart: 2 }}>Light</Typography>
              </MenuItem>
              <MenuItem
                sx={{ py: 1.5 }}
                onClick={() => {
                  colorMode.setDarkMode();
                  setAnchorThemeMenu(null);
                }}
              >
                <ListItemIcon sx={{ minWidth: '0!important' }}>
                  <DarkModeIcon fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center" sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, marginInlineStart: 2, color: theme.palette.mode === 'light' && 'black' }}>Dark</Typography>
              </MenuItem>
              <MenuItem
                sx={{ py: 1.5 }}
                onClick={() => {
                  colorMode.setLightMode();
                  setAnchorThemeMenu(null);
                }}
              >
                <ListItemIcon sx={{ minWidth: '0!important' }}>
                  <MonitorIcon fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center" sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, marginInlineStart: 2, color: theme.palette.mode === 'light' && 'black' }}>System</Typography>
              </MenuItem>
            </Menu>

            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar1"
              aria-haspopup="true"
              sx={{ paddingRight: 0 }}
              onClick={(e) => handleClick(e, USER_PROFILE_MENU)}
              onMouseOver={(e) => handleClick(e, USER_PROFILE_MENU)}
              onMouseLeave={handleCloseHover(USER_PROFILE_MENU)}
            >
              <Avatar alt="Your Name" variant="rounded" sx={{ width: '2rem', height: '2rem' }} />
            </IconButton>
            {/* User profile */}
            <Menu
              sx={{ mt: '40px' }}
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
              onClose={handleClose(USER_PROFILE_MENU)}
              PaperProps={{ sx: { minWidth: '250px' } }}
              MenuListProps={{
                onMouseEnter: handleHover,
                onMouseLeave: handleCloseHover(USER_PROFILE_MENU),
                style: { pointerEvents: "auto" }
              }}
              PopoverClasses={{
                root: styles.popOverRoot
              }}
            >
              <MenuItem>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'tomato' }} aria-label="recipe" variant='rounded'>
                      {user?.firstName[0]}
                    </Avatar>
                  }
                  title={user?.fullName}
                  subheader={user?.email}
                  sx={{ padding: 0, color: '#212121', backgroundColor: theme.palette.mode === 'dark' && '#1e1e2d' }}
                />
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => setAnchorUserMenu(null)} sx={{ py: 1.5, marginInlineStart: 1 }}>
                <Typography textAlign="center" sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, color: theme.palette.mode === 'light' && 'black' }}>My Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => setAnchorUserMenu(null)} sx={{ py: 1.5, marginInlineStart: 1 }}>
                <Typography textAlign="center" sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, color: theme.palette.mode === 'light' && 'black' }}>Edit Profile</Typography>
              </MenuItem>
              <MenuItem
                sx={{ py: 1.5, marginInlineStart: 1 }}
                onClick={(e) => handleClick(e, USER_SUB_MENU)}
                onMouseOver={(e) => handleClick(e, USER_SUB_MENU)}
                onMouseLeave={handleCloseHover(USER_SUB_MENU)}
              >
                <Typography textAlign="center" sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, color: theme.palette.mode === 'light' && 'black' }}>My Subscription</Typography>
                <ListItemIcon sx={{ minWidth: '0!important', marginInlineStart: 'auto' }}>
                  <NavigateNextIcon />
                </ListItemIcon>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => setAnchorUserMenu(null)} sx={{ py: 1.5, marginInlineStart: 1 }}>
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
              onClose={handleClose(USER_SUB_MENU)}
              MenuListProps={{
                onMouseEnter: handleHover,
                onMouseLeave: () => {
                  handleCloseHover(USER_SUB_MENU)();
                  handleCloseHover(USER_PROFILE_MENU)();
                },
                style: { pointerEvents: "auto" }
              }}
              PopoverClasses={{
                root: styles.popOverRoot
              }}
              style={{ // Add here you negative margin
                marginInlineStart: '-208px'
              }}
              PaperProps={{ sx: { width: '200px' } }}
            >
              {subscriptionPages.map((page) => (
                <MenuItem key={page.title} sx={{ py: 1.5, marginInlineStart: 1 }} onClick={() => { setAnchorSubscriptionMenu(null); setAnchorUserMenu(null) }}>
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
                    // color='primary'
                    sx={{
                      flexShrink: 0,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: theme.palette.mode === 'light' && '#5E6278'
                    }}
                  >
                    {page.page.title}
                  </Typography>
                </AccordionSummary>
                {page.subpages.length > 0 && <AccordionDetails>
                  {page.subpages.map((subpage, index) => (
                    <ListItem key={subpage.title} disablePadding >
                      <Link to={subpage.href} onClick={handleOpenSidebar(false)}>
                        <ListItemButton>
                          <ListItemIcon>
                            {subpage.icon}
                          </ListItemIcon>
                          <ListItemText primary={subpage.title} primaryTypographyProps={{ fontSize: '0.8rem', color: theme.palette.mode === 'light' && '#5E6278' }} />
                        </ListItemButton>
                      </Link>
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