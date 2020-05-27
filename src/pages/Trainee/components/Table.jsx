import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles, TableSortLabel,
} from '@material-ui/core';

const useStyles = makeStyles({
  head: { color: 'grey' },
  table: { width: '98%' },
  row: {
    '&:nth-child(odd)': { backgroundColor: '#F2F2F2' },
    '&:nth-child(even)': { backgroundColor: '#FFFFFF' },
    '&:hover': { backgroundColor: '#DDDDDD' },
  },
});

const MyTable = (props) => {
  const {
    id, columns, data, order, orderBy, onSelect, onSort,
  } = props;
  const classes = useStyles();
  return (
    <div align="center">
      <TableContainer className={classes.table} component={Paper} elevation={3}>
        <Table aria-label="simple table" id={id}>
          <TableHead>
            <TableRow>
              {
                columns && columns.length && columns.map((column) => (
                  <Fragment key={column.field}>
                    <TableCell
                      align={column.align || 'center'}
                      className={classes.head}
                      sortDirection={orderBy === column.field ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === column.field}
                        direction={orderBy === column.field ? order : 'asc'}
                        onClick={() => { onSort(order, column.field) }}
                        onBlur={() => { onSelect() }}
                      >
                        {column.label || column.field}
                      </TableSortLabel>
                    </TableCell>
                  </Fragment>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data && data.length && data.map((row, index) => (
                <TableRow key={id + index} className={classes.row}>
                  {
                    columns && columns.length && columns.map((column) => (
                      <Fragment key={row[column.field]}>
                        <TableCell align={column.align || 'center'}>{row[column.field]}</TableCell>
                      </Fragment>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

MyTable.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.exact({
    field: PropTypes.string,
    label: PropTypes.string,
    align: PropTypes.oneOf(['left', 'right', 'center']),
  })).isRequired,
  data: PropTypes.arrayOf(Object).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
  onSort: PropTypes.func,
  onSelect: PropTypes.func,
};

export default MyTable;
