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
      isTouch: {
        name: false,
        sport: false,
        cricket: false,
        football: false,
      },
    };
  }

  handleNameChange = (event) => {
    const { value } = event.target;
    const { isTouch } = this.state;
    this.getError('name', value)
      .then((nameError) => this.setState({
        nameError,
        name: value,
        isTouch: { ...isTouch, name: this.isTouched('name') },
      }))
      .catch((err) => console.log(err));
  }

  handleSportChange = (event) => {
    const { value } = event.target;
    const { isTouch } = this.state;
    this.getError('sport', value)
      .then((sportError) => this.setState({
        sportError,
        sport: value,
        football: '',
        cricket: '',
        footballError: '',
        cricketError: '',
        isTouch: { ...isTouch, sport: this.isTouched('sport') },
      }))
      .catch((Error) => console.log(Error));
  }

  handleSportBlur = (event) => {
    const { value } = event.target;
    const { isTouch } = this.state;
    this.getError('sport', value)
      .then((sportError) => this.setState({
        sportError,
        sport: value,
        isTouch: { ...isTouch, sport: this.isTouched('sport') },
      }))
      .catch((Error) => console.log(Error));
  }

  handleSpecialtyChange = (event) => {
    const { value } = event.target;
    const { isTouch } = this.state;
    const { sport } = this.state;
    const key = `${sport}Error`;
    this.getError([sport], value)
      .then((sportError) => this.setState({
        [key]: sportError,
        [sport]: value,
        isTouch: { ...isTouch, [sport]: this.isTouched([sport]) },
      }))
      .catch((err) => console.log(err));
  }

  handleSpecialtyBlur = () => {
    const { sport } = this.state;
    const { isTouch } = this.state;
    const key = `${sport}Error`;
    this.getError([sport], this.state[sport])
      .then((sportError) => this.setState({
        [key]: sportError,
        isTouch: { ...isTouch, [sport]: this.isTouched([sport]) },
      }))
      .catch((err) => console.log(err));
  }

  getRadioOptions = () => {
    const { sport } = this.state;
    return ((sport === CRICKET) ? CRICKET_OPTIONS : FOOTBALL_OPTIONS);
  }

  hasErrors = () => {
    const {
      nameError, emailError, passwordError, confirmPasswordError,
    } = this.state;
    return (nameError || emailError || passwordError || confirmPasswordError);
  }

  isTouched = (param) => !!(this.state[param])

  getError = async (label, value) => {
    const schema = yup.object().shape({
      sport: yup.string().required('Sport is required field'),
      name: yup.string().required('Name is required field').min(3, 'Name is required field'),
      cricket: yup.string().required('What you Do is required field'),
      football: yup.string().required('What you Do is required field'),
    });
    try {
      await schema.validateAt(label, { [label]: value });
      return '';
    } catch (error) {
      return error.errors;
    }
  }

  isDisabled = () => {
    const { isTouch } = this.state;
    const {
      name, sport, cricket, football,
    } = isTouch;
    const isFilled = !!(name && sport && (cricket || football));
    return (this.hasErrors() || !isFilled) ? 'disabled' : '';
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
          onBlur={this.handleSportBlur}
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
                onBlur={this.handleSpecialtyBlur}
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
