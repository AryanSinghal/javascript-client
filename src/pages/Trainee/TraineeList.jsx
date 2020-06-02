import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { SnackBarContext } from '../../contexts';
import { Table, AddDialog } from './components';
import { RemoveDialog } from './components';
import { EditDialog } from './components';
import callApi from '../../lib/utils/api';
import traineeData from './data/trainee';
import { COLUMNS, ROWS_PER_PAGE, ADD_TRAINEE_URL } from '../../configs/constants';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: 'asc',
      orderBy: '',
      page: 0,
      deleteDialogOpen: false,
      editDialogOpen: false,
      traineeRecord: {},
      severity: '',
      message: '',
      progressBar: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ progressBar: true });
    console.log('onsubmit');
    const name = event.target[0].value;
    const email = event.target[2].value;
    const password = event.target[4].value;
    console.log({ name, email, password });
    const { openSnackbar } = this.context;
    callApi('post', ADD_TRAINEE_URL, { name, email, password })
      .then((data) => {
        this.setState({progressBar: false, open: false });
        openSnackbar('success', data.message);
      })
      .catch((err) => {
        this.setState({ progressBar: false, open: false });
        openSnackbar('error', err.message);
      })
  };

  onSelect = (data) => {
    return data;
  }

  onSort = (order, orderBy) => {
    let newOrder = (order === 'asc') ? 'desc' : 'asc';
    this.setState({ order: newOrder, orderBy });
    return orderBy;
  }

  handlePageChange = (page, direction) => {
    if (direction === 'right')
      this.setState({ page: page + 1 });
    else
      this.setState({ page: page - 1 });
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
    console.log('Edited item');
    console.log({ name, email });
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
      open, orderBy, order, page, deleteDialogOpen, editDialogOpen, traineeRecord,
      severity, message, progressBar,
    } = this.state;
    return (
      <>
        <div align="right">
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            ADD TRAINEE
          </Button>
        </div>
        <AddDialog
          open={open}
          onClose={this.handleClose}
          onSubmit={this.handleSubmit}
          severity={severity}
          message={message}
          progressBar={progressBar}
        />
        <br />
        <Table
          id="trainee_id"
          data={traineeData}
          columns={COLUMNS}
          orderBy={orderBy}
          order={order}
          onSort={this.onSort}
          onSelect={this.onSelect}
          action={
            [
              {
                icon: <EditIcon />,
                handler: this.handleEditDialogOpen,
              },
              {
                icon: <DeleteIcon />,
                handler: this.handleDeleteDialogOpen,
              }
            ]
          }
          rowsPerPage={ROWS_PER_PAGE}
          count={100}
          page={page}
          onChangePage={this.handlePageChange}
        />
        <ul>
          {
            traineeData && traineeData.length && traineeData.map((value) => (
              <li key={value.name}><Link to={`/trainee/${value.id}`}>{value.name}</Link></li>
            ))
          }
        </ul>
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
      </>
    );
  }
}

TraineeList.contextType = SnackBarContext;

export default TraineeList;
