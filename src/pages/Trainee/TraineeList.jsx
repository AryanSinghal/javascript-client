import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table, AddDialog } from './components';
import traineeData from './data/trainee';
import { COLUMNS } from '../../configs/constants';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: 'asc',
      orderBy: '',
      page: 0
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
    const name = event.target[0].value;
    const email = event.target[2].value;
    const password = event.target[4].value;
    console.log({ name, email, password });
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

  render() {
    const { open, orderBy, order, page } = this.state;
    return (
      <>
        <div align="right">
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            ADD TRAINEE
          </Button>
        </div>
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
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
                handler: this.handleEditDialogOpen,
              }
            ]
          }
          count={100}
          page={page}
          onChangePage={this.handlePageChange}
        />
        <ul>
          {
            traineeData && traineeData.length && traineeData.map((value) => (<li key={value.name}><Link to={`/trainee/${value.id}`}>{value.name}</Link></li>))
          }
        </ul>
      </>
    );
  }
}

export default TraineeList;
