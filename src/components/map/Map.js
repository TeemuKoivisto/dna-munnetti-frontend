import React from "react";
import { Link } from "react-router";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default class MapThing extends React.Component {

  constructor() {
    super();
    this.state = {
      showModal: true
    };
  }

  handleClick(type, event) {
    if (type === "closeModal") {
      this.setState({
        showModal: false,
      })
    }
  }

  renderModal() {
    return (
      <div id="grappaModal" className={this.state.showModal ? "grappa-modal show" : "grappa-modal"}>
        <div className="grappa-modal-content">
          <h2>Ping your connection</h2>
          <h3>Select your speed:</h3>
          <button className="btn primary" onClick={this.handleClick.bind(this, "closeModal")}>OK</button>
        </div>
      </div>
    )
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
    const position = [60.192059, 24.945831];
    // const position = [0, 0];
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
        </Map>
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
