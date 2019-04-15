import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import styles from '../styles/googleMapStyles.json';

const MapComponent = withScriptjs(withGoogleMap((props) => {
  let map;
  return (
    <GoogleMap
      ref={m => map = m}
      defaultZoom={16}
      zoom={props.zoom}
      defaultCenter={props.defaultCenter}
      defaultOptions={{ styles }}
      onDragEnd={() => props.onCenterChange(map.getCenter())}
    >
      {props.markers}
    </GoogleMap>
  )
}))

export default MapComponent;