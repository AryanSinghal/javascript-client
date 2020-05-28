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
    '&:hover': { backgroundColor: '#DDDDDD', cursor: 'pointer' },
  },
});

const MyTable = (props) => {
  const {
    id, columns, data, order, orderBy, onSelect, onSort, action,
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
                        <TableCell align={column.align || 'center'} onClick={() => { onSelect(row) }}>
                          {(column.format) ? column.format(row[column.field]) : row[column.field]}
                        </TableCell>
                      </Fragment>
                    ))
                  }
                  <TableCell>
                    <Fragment key={id + index + 'edit'}>
                      {action[0].icon}
                    </Fragment>
                    <br />
                    <Fragment key={id + index + 'delete'}>
                      {action[1].icon}
                    </Fragment>
                  </TableCell>
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
    format: PropTypes.func
  })).isRequired,
  data: PropTypes.arrayOf(Object).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
  onSort: PropTypes.func,
  onSelect: PropTypes.func,
};

export default MyTable;
