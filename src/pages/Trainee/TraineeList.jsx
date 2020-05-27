import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Table, AddDialog } from './components';
import traineeData from './data/trainee';
import { COLUMNS } from '../../configs/constants';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: 'asc',
      orderBy: ''
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

  onSelect = () => {
    const { order, orderBy } = this.state;
    console.log(orderBy, order);
  }

  onSort = (order, orderBy) => {
    let newOrder = (order === 'asc') ? 'desc' : 'asc';
    this.setState({ order: newOrder, orderBy });
  }

  render() {
    const { open, orderBy, order } = this.state;
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
