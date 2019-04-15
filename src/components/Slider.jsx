import React from 'react';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    this._increment = this._increment.bind(this);
    this._decrement = this._decrement.bind(this);
    this._handleSlide = this._handleSlide.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleSlide(event) {
    this._handleChange(parseInt(event.target.value));
  }

  _increment() {
    const { max, value } = this.props;
    if (value < max) {
      this._handleChange(value+1);
    }
  }

  _decrement() {
    const { min, value } = this.props;
    if (value > min) {
      this._handleChange(value-1);
    }
  }

  _handleChange(value) {
    typeof this.props.changeHandler === 'function' && this.props.changeHandler(value);
  }

  render() {
    const { min, max, value } = this.props;
    return (
      <div className="slider-container">
        <button className="control" onClick={this._decrement} disabled={value <= min}>-</button>
        <input 
          className="slider"
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={()=>{}}
          onInput={this._handleSlide}
        />
        <button className="control" onClick={this._increment} disabled={value >= max}>+</button>
      </div>
    );
  }
}