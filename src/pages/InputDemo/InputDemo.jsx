import React from 'react';
import { SelectField, TextField, RadioGroup } from '../../components';
import {
  NAME, SPECIALTY, GAME, SELECT_OPTIONS, CRICKET_OPTIONS, FOOTBALL_OPTIONS, CRICKET,
} from '../../configs/constants';


export class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: NAME,
      sport: GAME,
      cricket: '',
      football: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleSportChange = (event) => {
    this.setState({ sport: event.target.value, football: '', cricket: '' });
  }

  handleSpecialtyChange = (event) => {
    const { sport } = this.state;
    if (sport === CRICKET) {
      this.setState({ cricket: event.target.value });
    } else {
      this.setState({ football: event.target.value });
    }
  }

  getRadioOptions = () => {
    const { sport } = this.state;
    return ((sport === CRICKET) ? CRICKET_OPTIONS : FOOTBALL_OPTIONS);
  }

  render() {
    console.log(this.state);
    const { sport, name } = this.state;
    return (
      <>
        <p><b>Name</b></p>
        <TextField onChange={this.handleNameChange} value={name} />
        <p><b>Select the game you play </b></p>
        <SelectField options={SELECT_OPTIONS} onChange={this.handleSportChange} defaultText="Select" value={sport} />
        {
          sport && (
            <>
              <p><b>What you Do</b></p>
              <RadioGroup
                options={this.getRadioOptions()}
                onChange={this.handleSpecialtyChange}
                value={SPECIALTY}
              />
            </>
          )
        }
      </>
    );
  }
}
