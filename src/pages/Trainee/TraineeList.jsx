import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Table, AddDialog } from './components';
import traineeData from './data/trainee';
import { COLUMNS } from '../../configs/constants';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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

  render() {
    const { open } = this.state;
    return (
      <>
        <div align="right">
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            ADD TRAINEE
          </Button>
        </div>
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
        <br />
        <Table id="trainee_id" data={traineeData} columns={COLUMNS} />
        <ul>
          {
            traineeData && traineeData.length && traineeData.map((value) => (<li key={value.name}><a href={`trainee/${value.id}`}>{value.name}</a></li>))
          }
        </ul>
      </>
    );
  }
}

export default TraineeList;
