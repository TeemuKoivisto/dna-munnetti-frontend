import React from "react";
// import mapboxgl from "mapbox-gl";
const mapboxgl = window.mapboxgl;
var json = require("json-loader!./klontti.json");
// var json = require("json-loader!./dna4gsuomi.json");


// import d3 from "d3";
// import * as d3 from "d3";
// import topojson from "topojson";

export default class MapThing3 extends React.Component {

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGVrayIsImEiOiJjaXZ6ZDRoaHAwMDE5MnRvNGgxZm5iY243In0.LFlOdvWPsB6r5mk3dgEDfw';
    var map = new mapboxgl.Map({
        container: 'mapgl',
        style: 'mapbox://styles/mapbox/streets-v9',
        // center: [-68.13734351262877, 45.137451890638886],
        center: [25, 61.5],
        zoom: 5
    });

    map.on('load', function () {
        map.addSource('dna4g', {
            'type': 'geojson',
            "data": json,
            // 'data': {
            //     'type': 'Feature',
            //     'geometry': {
            //         'type': 'Polygon',
            //         'coordinates': [[[-67.13734351262877, 45.137451890638886],
            //             [-66.96466, 44.8097],
            //             [-68.03252, 44.3252],
            //             [-69.06, 43.98],
            //             [-70.11617, 43.68405],
            //             [-70.64573401557249, 43.090083319667144],
            //             [-70.75102474636725, 43.08003225358635],
            //             [-70.79761105007827, 43.21973948828747],
            //             [-70.98176001655037, 43.36789581966826],
            //             [-70.94416541205806, 43.46633942318431],
            //             [-71.08482, 45.3052400000002],
            //             [-70.6600225491012, 45.46022288673396],
            //             [-70.30495378282376, 45.914794623389355],
            //             [-70.00014034695016, 46.69317088478567],
            //             [-69.23708614772835, 47.44777598732787],
            //             [-68.90478084987546, 47.184794623394396],
            //             [-68.23430497910454, 47.35462921812177],
            //             [-67.79035274928509, 47.066248887716995],
            //             [-67.79141211614706, 45.702585354182816],
            //             [-67.13734351262877, 45.137451890638886]]]
            //     }
            // }
        });
        //
        // map.addLayer({
        //     'id': 'maine',
        //     'type': 'fill',
        //     'source': 'maine',
        //     'layout': {},
        //     'paint': {
        //         'fill-color': '#088',
        //         'fill-opacity': 0.8
        //     }
        // });

        map.addLayer({
          "id": "4g-low",
          "source": "dna4g",
          "filter": ["all", ["==", "Strength", "Low"]],
          "type": "fill",
          "paint": {
            "fill-color": "#a0acff",
            "fill-opacity": 0.8
          },
          // "type": "circle",
          // "paint": {
          //     "circle-radius": 10,
          //     "circle-color": "#a0acff",
          //     "circle-opacity": {
          //         "stops": [[3, 0.2], [15,0.8]] // Gives us interpolated values between 0.2 and 0.8
          //     }
          // }
       });
      map.addLayer({
          "id": "4g-medium",
          "source": "dna4g",
          "filter": ["all", ["==", "Strength", "Medium"]],
          "type": "fill",
          "paint": {
            "fill-color": "#4b62ff",
            "fill-opacity": 0.8
          },
          // "type": "circle",
          // "paint": {
          //     "circle-radius": 15,
          //     "circle-color": "#4b62ff",
          //     "circle-opacity": {
          //         "stops": [[3, 0.2], [15,0.8]] // Gives us interpolated values between 0.2 and 0.8
          //     }
          // }
       });

       map.addLayer({
           "id": "4g-strong",
           "source": "dna4g",
           "filter": ["all", ["==", "Strength", "Strong"]],
           "type": "fill",
           "paint": {
             "fill-color": "#3c00b1",
             "fill-opacity": 0.8
           },
           // "type": "circle",
           // "paint": {
           //     "circle-radius": 15,
           //     "circle-color": "#4b62ff",
           //     "circle-opacity": {
           //         "stops": [[3, 0.2], [15,0.8]] // Gives us interpolated values between 0.2 and 0.8
           //     }
           // }
        });
    });
  }

  render() {
    return(
      <div id='mapgl'></div>
    )
  }
}
