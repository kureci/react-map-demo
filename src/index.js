import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import DataSource from './lib/DataSource';
import config from './config/config';

ReactDOM.render(
  <App
    mapCenter={{ lat: 51.514388, lng: -0.093587 }}
    dataSource={new DataSource(config.driversApi)}
  />,
  document.getElementById('root')
);