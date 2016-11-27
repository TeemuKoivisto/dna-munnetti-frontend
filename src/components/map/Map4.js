import React from "react";
// import mapboxgl from "mapbox-gl";
const mapboxgl = window.mapboxgl;
const dna3g900 = require("json-loader!./dna_3g_umts900.json");
const dna3g2100 = require("json-loader!./dna_3g_umts2100.json");
// example bbox in a query
// http://wfs.karttakeskus.fi/dna/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GSMpolygon&outputFormat=application%2Fjson&BBOX=347679.99981055723,6647823.999998323,409119.99999469763,6709263.999998235&srsName=EPSG:4326

export default class MapThing3 extends React.Component {

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGVrayIsImEiOiJjaXZ6ZDRoaHAwMDE5MnRvNGgxZm5iY243In0.LFlOdvWPsB6r5mk3dgEDfw';
    var map = new mapboxgl.Map({
        container: 'mapgl',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [25, 61.5],
        zoom: 5
    });

    map.on('load', function () {
      map.addSource('dna3g900', {
        'type': 'geojson',
        "data": dna3g900,
      });

      map.addSource('3g2100', {
        'type': 'geojson',
        "data": dna3g2100,
      });

      map.addLayer({
        "id": "3g900-low",
        "source": "dna3g900",
        "filter": ["all", ["==", "Strength", "Low"]],
        "type": "fill",
        "paint": {
          "fill-color": "#a0acff",
          "fill-opacity": 0.8
        },
     });
    map.addLayer({
        "id": "3g900-medium",
        "source": "dna3g900",
        "filter": ["all", ["==", "Strength", "Medium"]],
        "type": "fill",
        "paint": {
          "fill-color": "#4b62ff",
          "fill-opacity": 0.8
        },
     });

     map.addLayer({
         "id": "3g900-strong",
         "source": "dna3g900",
         "filter": ["all", ["==", "Strength", "Strong"]],
         "type": "fill",
         "paint": {
           "fill-color": "#3c00b1",
           "fill-opacity": 0.8
         },
      });

      //   map.addLayer({
      //     "id": "3g900-low",
      //     "source": "3g900",
      //     "filter": ["all", ["==", "Strength", "Low"]],
      //     "type": "fill",
      //     "paint": {
      //       "fill-color": "#a0acff",
      //       "fill-opacity": 0.8
      //     },
      //  });
      // map.addLayer({
      //     "id": "3g900-medium",
      //     "source": "3g900",
      //     "filter": ["all", ["==", "Strength", "Medium"]],
      //     "type": "fill",
      //     "paint": {
      //       "fill-color": "#4b62ff",
      //       "fill-opacity": 0.8
      //     },
      //  });
      //
      //  map.addLayer({
      //      "id": "3g900-strong",
      //      "source": "3g900",
      //      "filter": ["all", ["==", "Strength", "Strong"]],
      //      "type": "fill",
      //      "paint": {
      //        "fill-color": "#3c00b1",
      //        "fill-opacity": 0.8
      //      },
      //   });

      //   map.addLayer({
      //     "id": "4g-low",
      //     "source": "dna4g",
      //     "filter": ["all", ["==", "Strength", "Low"]],
      //     "type": "fill",
      //     "paint": {
      //       "fill-color": "#a0acff",
      //       "fill-opacity": 0.8
      //     },
      //  });
      // map.addLayer({
      //     "id": "4g-medium",
      //     "source": "dna4g",
      //     "filter": ["all", ["==", "Strength", "Medium"]],
      //     "type": "fill",
      //     "paint": {
      //       "fill-color": "#4b62ff",
      //       "fill-opacity": 0.8
      //     },
      //  });
      //
      //  map.addLayer({
      //      "id": "4g-strong",
      //      "source": "dna4g",
      //      "filter": ["all", ["==", "Strength", "Strong"]],
      //      "type": "fill",
      //      "paint": {
      //        "fill-color": "#3c00b1",
      //        "fill-opacity": 0.8
      //      },
      //   });
    });

//     var baseLayers = {
// 	"Mapbox": mapbox,
// 	"OpenStreetMap": osm
// };
//
// var overlays = {
// 	"Marker": marker,
// 	"Roads": roadsLayer
// };
//
// L.control.layers(baseLayers, overlays).addTo(map);
  }

  render() {
    return(
      <div id='mapgl'></div>
    )
  }
}
