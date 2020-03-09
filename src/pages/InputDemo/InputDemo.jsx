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
      hasError: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value }, () => { this.getError('name'); });
  }

  handleSportChange = (event) => {
    this.setState({ sport: event.target.value, football: '', cricket: '' }, () => { this.getError('sport'); });
  }

  handleSpecialtyChange = (event) => {
    const { sport } = this.state;
    this.setState({ [sport]: event.target.value }, () => { this.getError(sport); });
  }

  getRadioOptions = () => {
    const { sport } = this.state;
    return ((sport === CRICKET) ? CRICKET_OPTIONS : FOOTBALL_OPTIONS);
  }

  hasErrors = async () => {
    try {
      const {
        sport, name, cricket, football,
      } = this.state;
      const schema = yup.object().shape({
        sport: yup.string().required(),
        name: yup.string().required().min(3, 'Name is required field'),
        radio: yup.string().required('What you Do is required'),
      });
      const valid = await schema.isValid({
        sport,
        name,
        radio: (cricket || football),
      });
      console.log('>>>>>>>>>>hasErr', !valid);
      return !valid;
    } catch (err) {
      console.log(err);
      return true;
    }
  }

  isTouched = () => {
    const {
      sport, name, cricket, football,
    } = this.state;
    return sport || name || cricket || football;
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
        console.log('inside then');
      })
      .catch((error) => {
        this.setState({ [key]: error.errors });
        console.log('inside catch');
        return key;
      });
  }

  isDisabled = () => {
    console.log('hasError isDus', this.hasErrors(), this.isTouched());
    return (this.hasErrors() && this.isTouched()) ? 'disabled' : '';
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
        />
        <p><b>Select the game you play </b></p>
        <SelectField
          options={SELECT_OPTIONS}
          onChange={this.handleSportChange}
          defaultText="Select"
          value={sport}
          error={sportError}
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
