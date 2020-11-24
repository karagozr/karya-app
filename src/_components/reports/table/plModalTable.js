import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import NumberFormat from 'react-number-format';


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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'periodDate', numeric: false, disablePadding: true, label: 'Tarih', format: 'DD/MM/YYYY' },
  { id: 'projectName', numeric: false, disablePadding: false, label: 'Proje' },
  { id: 'subCodeDesc', numeric: false, disablePadding: false, label: 'Hesap Aç.' },
  { id: 'description1', numeric: false, disablePadding: false, label: 'Açıklama-1' },
  { id: 'description2', numeric: false, disablePadding: false, label: 'Açıklama-2' },
  { id: 'description3', numeric: false, disablePadding: false, label: 'Açıklama-3' },
  { id: 'branchName', numeric: false, disablePadding: false, label: 'Şube' },
  { id: 'quantity', numeric: true, label: 'Miktar', align: 'right', format: (value) => value.toLocaleString('tr-TR') },
  { id: 'currency', numeric: false, disablePadding: false, label: 'Para Bir.' },
  { id: 'amount', numeric: true, label: 'Aylık Gerçekleşen', align: 'right', format: (value) => value.toLocaleString('tr-TR') }
];


const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Nutrition
          </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    height: 'auto',
    maxHeight: 'calc(100vh - 35vh);',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tablecell: {
    fontSize: '9pt',
    fontWeight: 500
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [totalSum, setTotalSum] = React.useState(0);
  const [selectedSum, setSelectedSum] = React.useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    setRows(props.data);
    var totalS = 0;
    props.data.forEach(function (itm) {
      totalS += itm.amount;
    });

    setTotalSum(totalS);
  }, [props.data])

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      setSelectedSum(totalSum);
      return;
    }
    setSelectedSum(0);
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

    var selectedObj = props.data.filter(obj => newSelected.includes(obj.id));

    var totalS = 0;
    selectedObj.forEach(function (itm) {
      totalS += itm.amount;
    });

    setSelectedSum(totalS);

    setSelected(newSelected);

  };



  const isSelected = (id) => selected.indexOf(id) !== -1;


  return (
    <div className={classes.root}>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-labelledby="tableTitle"
          size={'small'}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell className={classes.tablecell} align="left">{row.periodDate} </TableCell>
                    <TableCell className={classes.tablecell} align="left">{row.projectName}</TableCell>
                    <TableCell className={classes.tablecell} align="left">{row.subCodeDesc}</TableCell>
                    <TableCell className={classes.tablecell} align="left">{row.description1}</TableCell>
                    <TableCell className={classes.tablecell} align="left">{row.description2}</TableCell>
                    <TableCell className={classes.tablecell} align="left">{row.description3}</TableCell>
                    <TableCell className={classes.tablecell} align="left">{row.branchName}</TableCell>
                    <TableCell className={classes.tablecell} align="right">{row.quantity}</TableCell>
                    <TableCell className={classes.tablecell} align="left">{row.currency}</TableCell>
                    <TableCell className={classes.tablecell} align="right">{row.amount}</TableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>

        </Table>
      </TableContainer>
      <div>
        <div style={{ paddingTop: '10px' }}>
          <div style={{ float: 'left' }}>
            {/* <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="btn btn-small"
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Excel Aktar"
            /> */}
          </div>
          <div style={{ position: 'absolute', right: '10px' }}>
            <NumberFormat value={selectedSum.toFixed(2)}
              displayType={'text'}
              thousandSeparator={true}
              renderText={value => <p  style={{ color: 'black', marginRight: '3cm' }}>{'Seçilen :' + value}</p>} />

            <NumberFormat value={totalSum.toFixed(2)}
              displayType={'text'}
              thousandSeparator={true}
              renderText={value => <p  style={{ marginRight: '20px' }}>{'Toplam :' + value}</p>} />
          </div>

        </div>
      </div>
    </div>
  );
}
