import React from 'react';
import Slider from '../components/Slider';

const withSlider = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <div className="wrapper">
          <WrappedComponent {...this.props} />
          <Slider {...this.props.sliderProps} />
        </div>
      );
    }
  }
}

export default withSlider;