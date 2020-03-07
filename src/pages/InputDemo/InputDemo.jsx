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
      name: NAME,
      sport: GAME,
      cricket: SPECIALTY,
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

  hasErrors = () => {
    // try {
    //   const {
    //     sport, name, cricket, football,
    //   } = this.state;
    //   const schema = yup.object().shape({
    //     sport: yup.string().required(),
    //     name: yup.string().required().min(3, 'Name is required field'),
    //     radio: yup.string().required('What you Do is required'),
    //   });
    //   const valid = await schema.isValid({
    //     sport,
    //     name,
    //     radio: (cricket || football),
    //   });
    //   console.log('>>>>>>>>>>', valid);
    //   return valid;
    // } catch (err) {
    //   console.log(err);
    //   return false;
    // }
    const {
      sport, name, cricket, football,
    } = this.state;
    const schema = yup.object().shape({
      sport: yup.string().required(),
      name: yup.string().required().min(3, 'Name is required field'),
      radio: yup.string().required('What you Do is required'),
    });
    schema.isValid({
      sport,
      name,
      radio: (cricket || football),
    }).then((valid) => {
      console.log('hasError !valid', !valid);
      return (!valid);
    }).catch((err) => console.log(err));
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
      name: yup.string().required().min(3, 'Name is required field'),
      cricket: yup.string().required('What you Do is required field'),
      football: yup.string().required('What you Do is required field'),
    });
    console.log('getERROR func', { [label]: this.state[label] });
    schema.validateAt(label, { [label]: this.state[label] })
      .then((msg) => { console.log('>>>>>', msg); })
      .catch((error) => {
        console.log('errrrrrrrrrr', error.errors);
        return error.errors;
      });
  }

  render() {
    console.log(this.state);
    const { sport, name } = this.state;
    return (
      <>
        <p><b>Name</b></p>
        <TextField
          onChange={this.handleNameChange}
          value={name}
          error={this.getError('name')}
        />
        <p><b>Select the game you play </b></p>
        <SelectField
          options={SELECT_OPTIONS}
          onChange={this.handleSportChange}
          defaultText="Select"
          value={sport}
          error={this.getError('sport')}
        />
        {
          sport && (
            <>
              <p><b>What you Do</b></p>
              <RadioGroup
                options={this.getRadioOptions()}
                onChange={this.handleSpecialtyChange}
                value={SPECIALTY}
                error={this.getError(sport)}
              />
            </>
          )
        }

        { console.log('hasErrrrrr undef', this.hasErrors())}
        {console.log('touched', this.isTouched())}
        <div align="right">
          <Button value=" CANCEL " />
          &nbsp;&nbsp;&nbsp;
          <Button value=" SUBMIT " disabled={(this.isTouched && !this.hasErrors) ? '' : 'disabled'} />
        </div>
      </>
    );
  }
}
