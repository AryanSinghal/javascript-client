import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, CircularProgress,
  TableRow, Paper, withStyles, TableSortLabel, IconButton,
} from '@material-ui/core';
import { withLoaderAndMessage } from '../../../components'

const styles = () => ({
  head: { color: 'grey' },
  table: { width: '95%' },
  row: {
    '&:nth-child(odd)': { backgroundColor: '#F2F2F2' },
    '&:nth-child(even)': { backgroundColor: '#FFFFFF' },
    '&:hover': { backgroundColor: '#DDDDDD', cursor: 'pointer' },
  },
});

class MyTable extends Component {

  render() {
    const {
      id, columns, data, order, orderBy, onSelect, onSort,
      action, page, count, onChangePage, rowsPerPage, progressBar,
    } = this.props;
    const { classes } = this.props;
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
                data && data.map((row, index) => (
                  <TableRow key={id + index} className={classes.row}>
                    {
                      columns && columns.length && columns.map((column, index) => (
                        <Fragment key={row[column.field] + index}>
                          <TableCell align={column.align || 'center'} onClick={() => { onSelect(row) }}>
                            {(column.format) ? column.format(row[column.field]) : row[column.field]}
                          </TableCell>
                        </Fragment>
                      ))
                    }
                    <TableCell>
                      {
                        action && action.length && action.map((obj, index) => (
                          <Fragment key={id + index + index}>
                            <IconButton
                              onClick={() => { obj.handler(row) }}
                              aria-label="action"
                            >
                              {obj.icon}
                            </IconButton>
                            <br />
                          </Fragment>
                        ))
                      }
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
          {
            (count === 0)
              ? ''
              : <div align='right'>
                <span>
                  {page * rowsPerPage + 1} - {
                    (((page + 1) * rowsPerPage) > count)
                      ? count
                      : (page + 1) * rowsPerPage
                  } of {count}
                </span>
                <IconButton
                  onClick={() => { onChangePage(page, 'left') }}
                  disabled={page === 0}
                  aria-label="prev page"
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton
                  onClick={() => { onChangePage(page, 'right') }}
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  aria-label="next page"
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
          }
        </TableContainer>
        {
          (progressBar)
            ? <CircularProgress />
            : ''
        }
      </div>
    );
  }
};

MyTable.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.exact({
    field: PropTypes.string,
    label: PropTypes.string,
    align: PropTypes.oneOf(['left', 'right', 'center']),
    format: PropTypes.func
  })).isRequired,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  data: PropTypes.arrayOf(Object).isRequired,
  count: PropTypes.number.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

MyTable.defaultProps = {
  rowsPerPage: 100,
  page: 0,
};

const styledTable = withStyles(styles)(MyTable);

export default withLoaderAndMessage(styledTable);
