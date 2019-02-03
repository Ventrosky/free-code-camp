var URL = "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/";
var VIDEOGAME_DATA = "video-game-sales-data.json";

var svgW = 950;
var svgH = 650;

var treeData;

var margin = { top: 30, right: 50, bottom: 30, left: 50 },
    w = svgW,
    h = svgH;

var fader = function fader(color) {
  return d3.interpolateRgb(color, "#fff")(0.2);
},
    color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
    format = d3.format(",d");

var svg = d3.select(".chartHolder").append("svg").attr("width", svgW).attr("height", svgH).attr("id", "mySvg");

var svgLeg = d3.select(".legend").append("svg").attr("width", svgW).attr("height", 100).attr("id", "legSvg");

var treemapLayout = d3.treemap().tile(d3.treemapResquarify).size([w, h]).paddingInner(1);

var tooltip = d3.select(".chartHolder").append("div").attr("id", "tooltip").style("opacity", 0);

d3.json(URL + VIDEOGAME_DATA, function (data) {
  treeData = data.children;
  var root = d3.hierarchy(data).eachBefore(function (d) {
    d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
  }).sum(function (d) {
    return d.value;
  }).sort(function (a, b) {
    return b.height - a.height || b.value - a.value;
  });

  treemapLayout(root);

  var categs = root.leaves().map(function (n) {
    return n.data.category;
  });
  categs = categs.filter(function (cat, i, self) {
    return self.indexOf(cat) === i;
  });

  var cell = svg.selectAll("g").data(root.leaves()).enter().append("g").attr("transform", function (d) {
    return "translate(" + d.x0 + "," + d.y0 + ")";
  });

  cell.append("rect").attr('class', 'tile').attr("id", function (d) {
    return d.data.id;
  }).attr("width", function (d) {
    return d.x1 - d.x0;
  }).attr("height", function (d) {
    return d.y1 - d.y0;
  }).attr('data-name', function (d) {
    return d.data.name;
  }).attr('data-category', function (d) {
    return d.data.category;
  }).attr('data-value', function (d) {
    return d.data.value;
  }).attr("fill", function (d) {
    return color(d.parent.data.name);
  }).on("mouseover", function (d) {
    d3.select(this).attr("stroke", "gray");
    tooltip.style('opacity', .9);
    tooltip.html('Name: ' + d.data.name + '<br>Category: ' + d.data.category + '<br>Value: ' + d.data.value).attr('data-value', d.data.value).style("left", d3.event.pageX - 60 + "px").style("top", d3.event.pageY - 30 + "px");
  }).on("mouseout", function () {
    tooltip.style('opacity', 0);
    d3.select(this).attr("stroke", "none");
  });

  cell.append("text").attr('class', 'tile-text').selectAll("tspan").data(function (d) {
    return d.data.name.split(/(?=[A-Z][^A-Z])/g);
  }).enter().append("tspan").attr("x", 4).attr("y", function (d, i) {
    return 13 + i * 10;
  }).text(function (d) {
    return d;
  }).style("font-size", "12px");

  var nElemRow = 9;

  var legItem = svgLeg.append("g").attr("id", "legend").selectAll("g").data(categs).enter().append("g").attr("transform", function (d, i) {
    return 'translate(' + (i % nElemRow * 100 + margin.left) + ',' + (Math.floor(i / nElemRow) * 20 + 10 * Math.floor(i / nElemRow)) + ')';
  });

  legItem.append("rect").attr('width', 20).attr('height', 20).attr('class', 'legend-item').attr('fill', function (d) {
    return color(d);
  });

  legItem.append("text").attr('x', 30).attr('y', 15).text(function (d) {
    return d;
  });
});