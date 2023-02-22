import React, { useState } from "react";
import {
  Grid,
  Paper,
  IconButton,
  InputBase,
  Button,
  Pagination,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
  CardHeader,
  Avatar,
  Typography,
  Stack,
  Chip,
  Modal
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';

import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link, useNavigate } from "react-router-dom";

function createData(name, ocupation, date, duration, source, status) {
  return {
    name,
    ocupation,
    date,
    duration,
    source,
    status
  };
}

const rows = [
  createData('Cupcake', 'Engineer', '19 Aug 2022, 6:43 am', 67, 4.3, 0),
  createData('Donut', 'Dentist', '1 Jan 2020, 3:55 am', 51, 4.9, 1),
  createData('Eclair', 'Driver', '19 Aug 2022, 6:43 am', 24, 6.0, 0),
  createData('Frozen yoghurt', 'Delivery', '20 Aug 1993, 07: 00 am', 24, 4.0, 2),
  createData('Gingerbread', 'Doctor', '19 Aug 2022, 6:43 am', 49, 3.9, 1),
  createData('Honeycomb', 'Chef', '10 Jan 1997, 8:10 pm', 87, 6.5, 0),
  createData('Ice cream sandwich', 'Developer', '17 Feb 2023, 11:35 am', 37, 4.3, 0),
  createData('Jelly Bean', 'Therapist', '27 Dec 1987, 12:10 am', 94, 0.0, 2),
  createData('KitKat', 'Business Person', '28 Oct 1995, 3:05 pm', 65, 7.0, 2),
  createData('Lollipop', 'Project Manager', '27 Sep 1996, 4:10 am', 98, 0.0, 1),
  createData('Marshmallow', 'Scrum Master', '9 Feb 2002, 11:10 am', 81, 2.0, 1),
  createData('Nougat', 'Investor', '16 Feb 1998, 5:40 am', 9, 37.0, 1),
  createData('Oreo', 'Architector', '8 Mar 2005, 10:10 pm', 63, 4.0, 2),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'client',
    numeric: false,
    disablePadding: true,
    label: 'Client',
  },
  {
    id: 'ocupation',
    numeric: false,
    disablePadding: false,
    label: 'Ocupation',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date/time',
  },
  {
    id: 'duration',
    numeric: false,
    disablePadding: false,
    label: 'Duration',
  },
  {
    id: 'source',
    numeric: false,
    disablePadding: false,
    label: 'Source',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'status',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all users',
            }}
            sx={{ color: '#ccc' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          align={'right'}
          padding={'normal'}
          sx={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }}
        >
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const BookTable = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, page) => {
    // console.log('event page here ', event.currentTarget, page)
    setPage(page - 1);
  }

  const handleGoDetailPage = () => {
    navigate('/bookings/details');
  }

  return (
    <Grid
      container
      justifyContent='center'
      sx={{
        mt: { sm: 3, md: 6 },
        width: '100%',
        borderRadius: 2,
        paddingY: 3,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1e1e2d'
      }}
    >
      <Grid
        item
        container
        direction='row'
        justifyContent='space-between'
        sx={{ width: '95%', pt: 1 }}
      >
        <Paper
          sx={{
            p: '0px 4px',
            display: 'flex',
            backgroundColor: theme.palette.mode === 'light' ? '#eef3f7' : '#1b1b29',
            boxShadow: 'none'
          }}
        >
          <IconButton sx={{ p: '0px 10px' }} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search user"
            inputProps={{ sx: { fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 } }}
            sx={{
              ml: 1,
              flex: 1,
              '& input::placeholder': {
                fontSize: '0.8rem',
                fontWeight: 600
              }
            }}
          />
        </Paper>
        {selected.length > 0 ?
          <Stack direction='row' sx={{ alignItems: 'center' }} >
            <Typography>{selected.length} selected</Typography>
            <Button
              variant="contained"
              color="error"
              sx={{ color: '#fff', fontWeight: 600, height: '2.5rem', textTransform: 'none', marginInlineStart: 3 }}
              onClick={handleOpen}
            >
              Delete Selected
            </Button>
          </Stack>
          : <Button
            variant="contained"
            color="primary"
            sx={{ color: '#fff', fontWeight: 600, height: '2.5rem', textTransform: 'none' }}
            startIcon={<FilterAltIcon />}
          >
            Filter
          </Button>
        }

      </Grid>

      <Paper sx={{ width: '95%', mb: 2, mt: 5, boxShadow: 'none' }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          sx={{ color: '#ccc' }}
                          onClick={(event) => handleClick(event, row.name)}
                        />
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{ fontSize: '0.8rem', opacity: 0.8, height: '70px' }}
                      >
                        <CardHeader
                          avatar={
                            <Avatar sx={{ height: '3rem', width: '3rem' }} aria-label="recipe">
                              {row.name[0]}
                            </Avatar>
                          }
                          title={row.name}
                          subheader={'test@email.com'}
                          sx={{ padding: 0, color: '#212121' }}
                        />
                      </TableCell>
                      <TableCell align="left" sx={{ fontSize: '0.8rem', opacity: 0.8 }}>{row.ocupation}</TableCell>
                      <TableCell align="left" sx={{ fontSize: '0.8rem', opacity: 0.8 }}>{row.date}</TableCell>
                      <TableCell align="left" sx={{ fontSize: '0.8rem', opacity: 0.8 }}>{row.duration}</TableCell>
                      <TableCell align="left" sx={{ fontSize: '0.8rem', opacity: 0.8 }}>{row.source}</TableCell>
                      <TableCell align="left" sx={{ fontSize: '0.8rem', opacity: 0.8 }}>
                        {
                          row.status === 0
                            ? <Chip label="Approved" color="primary" variant="outlined" />
                            : (row.status === 1
                              ? <Chip label="Unconfirmed" color="warning" variant="outlined" />
                              : <Chip label="Declined" color="error" variant="outlined" />)
                        }
                      </TableCell>
                      <TableCell align="left" sx={{ fontSize: '0.8rem', opacity: 0.8 }}>
                        <Stack direction='row'>
                          <Button onClick={handleGoDetailPage} sx={{ fontSize: '0.8rem', textTransform: 'none', fontWeight: 600 }}>View</Button>
                          <Button sx={{ fontSize: '0.8rem', textTransform: 'none', fontWeight: 600 }}>Delete</Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>

      <Grid sx={{ mt: 1, width: '95%' }} container justifyContent='flex-end'>
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)}
          shape="rounded"
          color="primary"
          onChange={handleChangePage}
          sx={{
            "& .MuiPaginationItem-root": {
              '&.Mui-selected': {
                color: '#fff'
              }
            }
          }}
        />
      </Grid>

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
            <ErrorOutlineIcon sx={{ fontSize: '7rem', margin: 'auto', display: 'flex', color: '#FFC700' }} />
            <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
              Are you sure you want to delete selected customers?
            </Typography>
            <Grid item container direction='row' justifyContent='center' alignItems='center' display="flex" sx={{ mt: 3 }}>
              <Button color="error" variant="contained" sx={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'none' }} onClick={() => { setConfirm(true); setOpen(false); }}>Yes, delete!</Button>
              <Button color="success" variant="contained" sx={{ marginInlineStart: 3, fontSize: '0.8rem', fontWeight: 600, textTransform: 'none' }} onClick={handleClose}>No, cancel</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
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
            <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
              You have deleted all selected customers!
            </Typography>
            <Grid item container direction='row' justifyContent='center' alignItems='center' display="flex" sx={{ mt: 3 }}>
              <Button color="primary" variant="contained" sx={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'none', color: '#fff' }} onClick={() => setConfirm(false)} >Ok, got it!</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

    </Grid>
  );
}

export default BookTable;