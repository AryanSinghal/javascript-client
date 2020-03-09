import React from 'react';
import * as yup from 'yup';
import {
  SelectField, TextField, RadioGroup, Button,
} from '../../components';
import {
  NAME, SPECIALTY, GAME, SELECT_OPTIONS, CRICKET_OPTIONS, FOOTBALL_OPTIONS, CRICKET,
} from '../../configs/constants';

export class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      nameError: '',
      sportError: '',
      cricketError: '',
      footballError: '',
      isTouch: false,
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value }, () => { this.getError('name'); });
    this.isTouched();
  }

  handleSportChange = (event) => {
    this.setState({ sport: event.target.value, football: '', cricket: '' }, () => { this.getError('sport'); });
    this.isTouched();
  }

  handleSpecialtyChange = (event) => {
    const { sport } = this.state;
    this.setState({ [sport]: event.target.value }, () => { this.getError(sport); });
    this.isTouched();
  }

  getRadioOptions = () => {
    const { sport } = this.state;
    return ((sport === CRICKET) ? CRICKET_OPTIONS : FOOTBALL_OPTIONS);
  }

  hasErrors = () => {
    const {
      nameError, sportError, cricketError, footballError,
    } = this.state;
    return !!((nameError || sportError || cricketError || footballError));
  }

  isTouched = () => {
    const {
      sport, name, cricket, football,
    } = this.state;
    this.setState({ isTouch: true });
    return !!(sport || name || cricket || football);
  }

  getError = (label) => {
    const schema = yup.object().shape({
      sport: yup.string().required('Sport is required field'),
      name: yup.string().required('Name is required field').min(3, 'Name is required field'),
      cricket: yup.string().required('What you Do is required field'),
      football: yup.string().required('What you Do is required field'),
    });
    const key = `${[label]}Error`;
    schema.validateAt(label, { [label]: this.state[label] })
      .then(() => {
        this.setState({ [key]: '' });
      })
      .catch((error) => {
        this.setState({ [key]: error.errors });
        return key;
      });
  }

  isDisabled = () => {
    const { isTouch } = this.state;
    return (this.hasErrors() && isTouch) ? 'disabled' : '';
  }

  render() {
    console.log(this.state);
    const {
      sport, name, nameError, sportError, cricketError, footballError,
    } = this.state;
    return (
      <>
        <p><b>Name</b></p>
        <TextField
          onChange={this.handleNameChange}
          value={name}
          error={nameError}
          onBlur={this.handleNameChange}
        />
        <p><b>Select the game you play </b></p>
        <SelectField
          options={SELECT_OPTIONS}
          onChange={this.handleSportChange}
          defaultText="Select"
          value={sport}
          error={sportError}
          onBlur={this.handleSportChange}
        />
        {
          sport && (
            <>
              <p><b>What you Do</b></p>
              <RadioGroup
                options={this.getRadioOptions()}
                onChange={this.handleSpecialtyChange}
                value={this.state[sport]}
                error={cricketError || footballError}
                onBlur={this.handleSpecialtyChange}
              />
            </>
          )
        }
        <div align="right">
          <Button value=" CANCEL " />
          &nbsp;&nbsp;&nbsp;
          <Button value=" SUBMIT " disabled={this.isDisabled()} success={(this.isDisabled()) ? 'disabled' : 'success'} />
        </div>
      </>
    );
  }
}
