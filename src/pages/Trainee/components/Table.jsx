import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  head: { color: 'grey' },
});

const MyTable = (props) => {
  const {
    id, columns, data,
  } = props;
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="simple table" id={id}>
          <TableHead>
            <TableRow>
              {
                columns && columns.length && columns.map((column) => (
                  <Fragment key={column.field}>
                    <TableCell align={column.align || 'center'} className={classes.head}>
                      {column.label || column.field}
                    </TableCell>
                  </Fragment>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data && data.length && data.map((row) => (
                <TableRow key={row.name}>
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
    </>
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
};

export default MyTable;
