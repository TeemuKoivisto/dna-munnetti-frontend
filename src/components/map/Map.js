import React from "react";
import { Link } from "react-router";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default class MapThing extends React.Component {

  render() {
    const position = [60.192059, 24.945831];
    return (
      <Map center={position} zoom={15}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}
