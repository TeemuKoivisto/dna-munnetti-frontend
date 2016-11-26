import React from "react";
import { Link } from "react-router";
import L from "leaflet";
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
// var speedTest = require('speedtest-net');

export default class MapThing extends React.Component {

  constructor() {
    super();
    this.state = {
      showModal: 1,
      user: {
        speed: -1,
        position: {},
      },
      markers: [
        {
          position: {
            lat: 60.203536300000005,
            lng: 24.9522285
          }
        },
        {
          position: {
            lat: 60.213536300000005,
            lng: 24.9522285
          }
        }
      ]
    };
  }

  componentWillMount() {
    // var test = speedTest({maxTime: 5000});
    // test.on('data', function(data) {
    //   console.dir(data);
    // });
    //
    // test.on('error', function(err) {
    //   console.error(err);
    // });
  }

  handleClick(type, event) {
    if (type === "nextModal") {
      this.setState({
        showModal: this.state.showModal === 2 ? 0 : this.state.showModal + 1,
      })
    } else if (type === "query") {
      console.log(this.state)
    }
  }

  askGeolocation() {
    const self = this;
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;
      console.log('Your current position is:');
      console.log('Latitude : ' + crd.latitude);
      console.log('Longitude: ' + crd.longitude);
      console.log('More or less ' + crd.accuracy + ' meters.');
      self.setState({
        user: {
          position: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
        }
      })
    };

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  renderSpeedtestModal() {
    return (
      <div id="dnaModal" className={this.state.showModal ? "dna-modal show" : "dna-modal"}>
        <div className="dna-modal-content">
          <div className="dna-modal-top">
            <h2>Your connection speed</h2>
            <p>(pending)</p>
            <p>{ `speed: ${this.state.user.speed}` }</p>
          </div>
          <div className="dna-modal-top">
            <h3>(optional) Select your connection:</h3>
            <label>Connection</label>
            <select
              className="search dropdown"
            >
              <option value="1">3G 1 mbs</option>
              <option value="2">4G 50 mbs</option>
              <option value="3">4G 100 mbs</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={this.handleClick.bind(this, "nextModal")}>OK</button>
          <button className="btn btn-danger" onClick={this.handleClick.bind(this, "closeModal")}>Cancel</button>
        </div>
      </div>
    )
  }

  renderGeolocationModal() {
    this.askGeolocation();
    return (
      <div id="dnaModal" className={this.state.showModal ? "dna-modal show" : "dna-modal"}>
        <div className="dna-modal-content">
          <h2>Locate yourself</h2>
          <p>{ `lat: ${this.state.user.position.lat}, lng: ${this.state.user.position.lng}` }</p>
          <button className="btn btn-primary" onClick={this.handleClick.bind(this, "nextModal")}>OK</button>
          <button className="btn btn-danger" onClick={this.handleClick.bind(this, "closeModal")}>Cancel</button>
        </div>
      </div>
    )
  }

  renderModal() {
    const { showModal } = this.state;
    if (showModal === 0) {
      return <span></span>
    } else if (showModal === 1) {
      return this.renderSpeedtestModal();
    } else if (showModal === 2) {
      return this.renderGeolocationModal();
    }
  }

  render() {
    /*
      window{
      ping your connection data
      result:
        yourspeed
        your network capacity
        signal bad/good/excellent
      how to improve your connection>>
      }
    */
    // const position = {lat: 60.193536300000005, lng: 24.9522285};
    const position = [60.193536300000005, 24.9522285];
    // const position = [0, 0];
    const { markers } = this.state;
    return (
      <div>
        { this.renderModal() }
        <Map center={position} zoom={15}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            // url="https://kartat.dna.fi/Peka4Proxy/Taustakartta_Harmaasavy_v1/MapServer/tile/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
          <Circle center={position} radius={200}>
          </Circle>
          { markers.map((marker, index) =>
            <Marker key={index} position={marker.position}>
            </Marker>
          )}
        </Map>
        <button style={{ position: "absolute", top: "100px", right: "100px" }} onClick={this.handleClick.bind(this, "query")}>Query</button>
      </div>
    );
  }
}

/*
https://kartat.dna.fi/Peka4Proxy/Taustakartta_Harmaasavy_v1/MapServer/tile/1/7/12
https://kartat.dna.fi/Peka4Proxy/Peittokartta_GSM_EDGE_Julk_v2/MapServer/tile/0/5/10
https://kartat.dna.fi/Peka4Proxy/Peittokartta_3G900_3G2100_Julk_v2/MapServer/tile/0/6/1

https://kartat.dna.fi/Peka4Proxy/Peittokartta_LTE1800Julk_v2/MapServer/tile/0/5/11
https://kartat.dna.fi/Peka4Proxy/Peittokartta_LTE800Julk_v2/MapServer/tile/0/6/10

https://kartat.dna.fi/Peka4Proxy/Peittokartta_HDTVJulk_v2/MapServer/tile/0/6/10
*/
