import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, withStyles, TableSortLabel, IconButton,
} from '@material-ui/core';
import { RemoveDialog } from './RemoveDialog';
import { EditDialog } from './EditDialog';
import { ROWS_PER_PAGE } from '../../../configs/constants';

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
  constructor(props) {
    super(props);
    this.state = {
      deleteDialogOpen: false,
      editDialogOpen: false,
      traineeRecord: {},
    };
  }

  handleEditDialogOpen = (traineeRecord) => {
    this.setState({ traineeRecord, editDialogOpen: true });
  }

  handleDeleteDialogOpen = (traineeRecord) => {
    this.setState({ traineeRecord, deleteDialogOpen: true });
  }

  handleEditDialogClose = () => {
    this.setState({ traineeRecord: {}, editDialogOpen: false });
  }

  handleDeleteDialogClose = () => {
    this.setState({ traineeRecord: {}, deleteDialogOpen: false });
  }

  handleEditSubmit = (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[2].value;
    console.log({ name, email});
    this.setState({ traineeRecord: {}, editDialogOpen: false });
  }

  handleDeleteSubmit = () => {
    const { traineeRecord } = this.state;
    console.log('Deleted item')
    console.log(traineeRecord);
    this.setState({ traineeRecord: {}, deleteDialogOpen: false });
  }

  render() {
    const {
      id, columns, data, order, orderBy, onSelect, onSort, action, page, count, onChangePage,
    } = this.props;
    const { classes } = this.props;
    const { deleteDialogOpen, editDialogOpen, traineeRecord } = this.state;
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
                        <IconButton
                          onClick={() => { this.handleEditDialogOpen(row) }}
                          aria-label="edit"
                        >
                          {action[0].icon}
                        </IconButton>
                      </Fragment>
                      <br />
                      <Fragment key={id + index + 'delete'}>
                        <IconButton
                          onClick={() => { this.handleDeleteDialogOpen(row) }}
                          aria-label="delete"
                        >
                          {action[1].icon}
                        </IconButton>
                      </Fragment>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
          <div align='right'>
            <span>
              {page * ROWS_PER_PAGE + 1} - {(page + 1) * ROWS_PER_PAGE} of {count}
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
              disabled={page >= Math.ceil(count / ROWS_PER_PAGE) - 1}
              aria-label="next page"
            >
              <KeyboardArrowRightIcon />
            </IconButton>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </TableContainer>
        <RemoveDialog
          open={deleteDialogOpen}
          onClose={this.handleDeleteDialogClose}
          onSubmit={this.handleDeleteSubmit}
          data={traineeRecord}
        />
        <EditDialog
          open={editDialogOpen}
          onClose={this.handleEditDialogClose}
          onSubmit={this.handleEditSubmit}
          data={traineeRecord}
        />
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
  data: PropTypes.arrayOf(Object).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
  onSort: PropTypes.func,
  onSelect: PropTypes.func,
};

export default withStyles(styles)(MyTable);
