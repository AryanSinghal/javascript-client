import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { AddDialog } from './components';
import trainee from './data/trainee';

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
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          ADD TRAINEE
        </Button>
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
        <br />
        <ul>
          {
            trainee.map((value) => (<li key={value.name}><a href={`trainee/${value.id}`}>{value.name}</a></li>))
          }
        </ul>
      </>
    );
  }
}

export default TraineeList;
