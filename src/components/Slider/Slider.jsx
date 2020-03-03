import PropTypes from 'prop-types';
import React from 'react';
import { DEFAULT_BANNER_IMAGE, PUBLIC_IMAGE_FOLDER, BANNERS } from '../../configs/constants';
import { getNextRoundRobin, getRandomNumber } from '../../lib/utils/math';
import ImageStyle from './style';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  componentDidMount() {
    const { duration, random } = this.props;
    console.log(this.props);
    console.log('inside component');
    const total = 5;
    let { current } = this.state;
    this.id = setInterval(() => {
      if (random) {
        current = getRandomNumber(total);
        console.log('inside comp......... ', current);
      }
      else {
        current = getNextRoundRobin(total, current);
        console.log('inside comp......... ', current);
      }
      this.setState({ current });
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  render() {
    const { current } = this.state;
    const { altText } = this.props;
    console.log('inside render', BANNERS[current]);
    return (
      <>
        <div align="center">
          <ImageStyle src={`${PUBLIC_IMAGE_FOLDER}${BANNERS[current]}`} alt={altText} title={BANNERS[current]} />
        </div>
      </>
    );
  }
}
Slider.protoTypes = {
  altText: PropTypes.string,
  banners: PropTypes.array,
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

Slider.defaultProps = {
  altText: 'Default Banner',
  defaultBanner: 'default.png',
  duration: 2000,
  height: 200,
  random: false,
};
export default Slider;
