import React from "react";
// import mapboxgl from "mapbox-gl";
// import d3 from "d3";
// import * as d3 from "d3";
// import topojson from "topojson";

export default class MapThing3 extends React.Component {

  componentDidMount() {
    // mapboxgl.accessToken = '<your access token here>';
    // var map = new mapboxgl.Map({
    //     container: '<your HTML element id>',
    //     style: 'mapbox://styles/mapbox/streets-v9'
    // });

    var width = 600,
        height = 800;

    var centered;
    var g;
    var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

    // var proj = d3.geo.mercator()
    //   .precision(0.1)
    //   .center([61, 25])
    //   //  .parallels([50, 60])
    //   .rotate([0,0,0])
    //   .parallels([60, 65])
    //   .scale(6000)
    //   .translate([width / 2, height / 2]);
    var projection = d3.geo.albers()
      .center([61, 25])
      .rotate([4.4, 0])
      .parallels([60, 70])
      .scale(100)
      .translate([width / 2, height / 2]);

    var path;
    var paths;
    var info = svg.append('text')
      .attr('width',80)
      .attr('height',20)
      .attr('y',10)
      .attr('fill','black');

      d3.json("dna4gsuomi.json", function(error, dna4g) {
        if (error) return console.error(error);

        console.log(dna4g)

        svg.append("path")
            .datum(topojson.feature(dna4g, dna4g.objects.dna4gsuomi))
            .attr("d", d3.geo.path().projection(d3.geo.mercator()));
      });

    // d3.json("dna_4g_suomi.json", function(error, dat) {
    //   console.log(dat);
    //   // var subunits = topojson.feature(dat, dat.objects.dna_4g_suomi);
    //   path = d3.geo.path().projection(proj);
    //
    //   g = svg.append('g');
    //   // var cities = g.selectAll(".city")
    //   //   .data(subunits.features)
    //   //   .enter().append("path")
    //   //   .attr("class", function(d) { return "subunit " + d.id; })
    //   //   .attr("d", path);
    //   //
    //   //   cities.on('click',clicked);
    //
    //   });

    // function clicked(d) {
    //   var x, y, k;
    //
    //   if (d && centered !== d) {
    //     var centroid = path.centroid(d);
    //     x = centroid[0];
    //     y = centroid[1];
    //     k = 4;
    //     centered = d;
    //   } else {
    //     x = width / 2;
    //     y = height / 2;
    //     k = 1;
    //     centered = null;
    //   }
    //
    //   g.selectAll("path")
    //     .classed("active", centered && function(d) { return d === centered; });
    //
    //   g.transition()
    //     .duration(750)
    //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
    //     .style("stroke-width", (0.5 / k) + "px");
    //   }
  }

  render() {
    return(
      <div id='mapgl'></div>
    )
  }
}
