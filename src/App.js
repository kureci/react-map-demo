import React, { Component } from 'react';
import './App.scss';
import { Marker } from "react-google-maps"
import MapWithSlider from './components/MapWithSlider';

import config from './config/config';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 16,
      markers: [],
      count: 10,
      center: props.mapCenter || { lat: 51.514388, lng: -0.093587 },
      driverLocations: []
    }

    this.changeDriversCount = this.changeDriversCount.bind(this);
    this.changeMapCenter = this.changeMapCenter.bind(this);
    this._getDrivers = this._getDrivers.bind(this);
    this._showDrivers = this._showDrivers.bind(this);
  }

  componentDidMount(){
    this._getDrivers();
    this.props.dataSource.addChangeListener(this._showDrivers);
  }

  changeDriversCount(count) {
    this.setState({
      count
    });
    this._getDrivers();
  }
  changeMapCenter(coords) {
    this.setState({
      center: {
        lat: coords.lat(),
        lng: coords.lng()
      }
    })
    this._getDrivers();
  }

  _getDrivers() {
    const { dataSource } = this.props;
    dataSource.getDrivers(this.state.center, this.state.count)
      .then(data => this._showDrivers(data.drivers))
      .catch(console.error);
  }

  _showDrivers(drivers) {
    const markers = [];
    drivers.map((driver, i) => (
      markers.push(
        <Marker
          key={i}
          position={{ lat: driver.location.latitude, lng: driver.location.longitude }}
          icon={{ url: '/vehicle-icon.png', scaledSize: {width: 40, height: 40}}}
        />
      )
    ));

    this.setState({
      driverLocations: markers
    })
  }

  render() {
    return (
      <MapWithSlider
        zoom={this.state.zoom}
        defaultCenter={this.props.mapCenter}
        markers={this.state.driverLocations}
        onCenterChange={this.changeMapCenter}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.googleMapsApi.key}&v=${config.googleMapsApi.version}`}
        loadingElement={<div style={{ height: '100px' }} />}
        containerElement={<div className="map-wrapper" />}
        mapElement={<div className="map-container" />}
        sliderProps={{
          min: 1,
          max: 50,
          value: this.state.count,
          changeHandler: this.changeDriversCount,
        }}
      />
    );
  }
}