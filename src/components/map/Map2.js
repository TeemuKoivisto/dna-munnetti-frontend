import React from "react";
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  Map,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  WMSTileLayer,
} from 'react-leaflet';
const { BaseLayer, Overlay } = LayersControl

export default class MapThing2 extends React.Component {

  constructor() {
    super();
  }

  render() {
    const center = [60.193536300000005, 24.9522285];
    const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
    ]

    // L.tileLayer.wms('http://localhost/proxyWmsDna', {
    //   layers: 'dna:3Gmobilecoverage',
    //   format: 'image/png',
    //   maxZoom: 12,
    //   minZoom: 0,
    //   version: '1.1.0',
    //   transparent: true,
    //   continuousWorld: true
    // })

    return(
      <Map center={center} zoom={13}>
        <LayersControl position='topright'>
          <BaseLayer checked name='OpenStreetMap.Mapnik'>
            <TileLayer
              attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
          </BaseLayer>
          <BaseLayer name='OpenStreetMap.BlackAndWhite'>
            <TileLayer
              attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
            />
          </BaseLayer>
          <Overlay name='Marker with popup'>
            <WMSTileLayer
                url='http://localhost/proxyWmsDna'
                  layers= 'dna:3Gmobilecoverage'
                  format= 'image/png'
                  version= '1.1.0'
                  transparent= 'true'

            />
          </Overlay>
          <Overlay checked name='Layer group with circles'>
            <LayerGroup>
              <Circle center={center} fillColor='blue' radius={200} />
              <Circle center={center} fillColor='red' radius={100} stroke={false} />
              <LayerGroup>
                <Circle center={[51.51, -0.08]} color='green' fillColor='green' radius={100} />
              </LayerGroup>
            </LayerGroup>
          </Overlay>
          <Overlay name='Feature group'>
            <FeatureGroup color='purple'>
              <Popup>
                <span>Popup in FeatureGroup</span>
              </Popup>
              <Circle center={[51.51, -0.06]} radius={200} />
              <Rectangle bounds={rectangle} />
            </FeatureGroup>
          </Overlay>
        </LayersControl>
      </Map>
    )
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
