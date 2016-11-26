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
      crs: crs3,
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

  render2() {
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
    console.log(this.state)
    return(
      <Map crs={this.state.crs3} center={center} zoom={13}>
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
