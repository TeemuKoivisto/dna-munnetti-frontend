import React from "react";
import L from "leaflet";
import Proj from "proj4leaflet";

export default class MapThing2 extends React.Component {

  constructor() {
    super();
    this.state = {
      crs3: new L.Proj.CRS('EPSG:3067','+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs',[20000, 6570000, 1068576, 8142864],{resolutions: [1000, 500, 300, 160, 120, 80, 40, 20, 10, 6, 4, 3, 2],origin: [0, 0]})
    }
  }

  componentDidMount() {
    var crs3 = new L.Proj.CRS.TMS('EPSG:3067','+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs',[20000, 6570000, 1068576, 8142864],{resolutions: [1000, 500, 300, 160, 120, 80, 40, 20, 10, 6, 4, 3, 2],origin: [0, 0]})

    var baseLayers = {
      'OpenStreetMap': L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'),
      'TaustaKartta': L.tileLayer.wms('http://localhost/proxyWms', {
        layers: 'asiakasdemo:taustakartta',
        format: 'image/png',
        maxZoom: 12,
        minZoom: 0,
        attribution: 'Map data &copy; <a href="http://www.karttakeskus.fi">Karttakeskus</a>',
        version: '1.1.0',
        continuousWorld: true
      }),
    };

    var overlayLayers = {
    	'DNA': {
    		'DNA, 2Gmobilecoverage': L.tileLayer.wms('http://localhost/proxyWmsDna', {
          layers: 'dna:2Gmobilecoverage',
          format: 'image/png',
          maxZoom: 12,
          minZoom: 0,
          version: '1.1.0',
          transparent: true,
          continuousWorld: true
        }),
    		'DNA, 3Gmobilecoverage': L.tileLayer.wms('http://localhost/proxyWmsDna', {
          layers: 'dna:3Gmobilecoverage',
          format: 'image/png',
          maxZoom: 12,
          minZoom: 0,
          version: '1.1.0',
          transparent: true,
          continuousWorld: true
        }),
    		'DNA, 4Gmobilecoverage': L.tileLayer.wms('http://localhost/proxyWmsDna', {
          layers: 'dna:4Gmobilecoverage',
          format: 'image/png',
          maxZoom: 12,
          minZoom: 0,
          version: '1.1.0',
          transparent: true,
          continuousWorld: true
        }),
    		'DNA:n kaupat ja j&auml;lleenmyyj&auml;t':  L.tileLayer.wms('http://localhost/proxyWmsDna', {
          layers: 'dna:kaupat_ja_jalleenmyyjat',
          format: 'image/png',
          maxZoom: 12,
          minZoom: 0,
          version: '1.1.0',
          transparent: true,
          continuousWorld: true
        }),
    	},
    };

    var map = new L.Map('map', {
      // Initial coordinate Reference System to use
      // crs: crs3,
      // Initial geographical center of the map
      center: [61, 25],
      // Initial map zoom level
      zoom: 2,
      // Layers that will be added to the map initially
      layers: [baseLayers.TaustaKartta]
    });

    var southWest = new L.LatLng(59.5, 13.0);
    var northEast = new L.LatLng(71.0, 32.0);
    var bounds = new L.LatLngBounds(southWest, northEast);
    map.setMaxBounds(bounds);

    // Fix for moving map bug
    L.Map.prototype._limitCenter = function (center, zoom, bounds) {
    	if (!bounds) { return center; }
    	var centerPoint = this.project(center, zoom),
    		viewHalf = this.getSize().divideBy(2),
    		viewBounds = new L.Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
    		offset = this._getBoundsOffset(viewBounds, bounds, zoom);
    	if (offset.round().equals([0, 0])) {
    		return center;
    	}
    	return this.unproject(centerPoint.add(offset), zoom);
    };

    // Marker with custom icon and popup
    var LeafIcon = L.Icon.extend({
    	options: {
    		iconSize:     [30, 30],
    		popupAnchor:  [0, -20]
    	}
    });
    var customIcon = new LeafIcon({iconUrl: 'img/karttakeskus-logo.jpg'});
    var karttakeskus = L.marker([60.178786, 24.836268], {icon: customIcon}).bindPopup('<b>' + 'Karttakeskus Oy' + '</b>');

    // map.addControl( new L.Control.CategorizedLayers(baseLayers, overlayLayers, {collapsed: false}) );
    L.control.layers(baseLayers, overlayLayers.DNA).addTo(map);
  }

  render() {
    return(
      <div id='map'></div>
    )
  }
}
