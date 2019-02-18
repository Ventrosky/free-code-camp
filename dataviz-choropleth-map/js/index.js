var URL = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/";
var EDUCAT_DATA = "for_user_education.json";
var COUNTY_DATA = "counties.json";

var svgW = 950;
var svgH = 650;

var dataEdu = [];

var margin = { top: 30, right: 50, bottom: 30, left: 50 },
    w = svgW - margin.left - margin.right,
    h = svgH - margin.top - margin.bottom;

var svg = d3.select(".chartHolder").append("svg").attr("width", svgW).attr("height", svgH).attr("id", "mySvg");

var path = d3.geoPath();
var palette = ["rgb(237,248,233)", "rgb(186,228,179)", "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"];
var color = d3.scaleQuantize().range(palette);

var matchFipsToId = function matchFipsToId(d) {
  return dataEdu.filter(function (o) {
    return d.id == o.fips;
  });
};
var fetchEdu = function fetchEdu(d) {
  var found = matchFipsToId(d);
  return found[0] ? found[0].bachelorsOrHigher : 0;
};
var infoEdu = function infoEdu(d) {
  var found = matchFipsToId(d);
  return found[0] ? found[0].area_name + ' ' + found[0].state + '</br>' + found[0].bachelorsOrHigher + '% ' : '';
};

var tooltip = d3.select(".chartHolder").append("div").attr("id", "tooltip").style("opacity", 0);

d3.json(URL + EDUCAT_DATA, function (data) {
  dataEdu = data;
  var minEdu = d3.min(dataEdu, function (d) {
    return d.bachelorsOrHigher;
  });
  var maxEdu = d3.max(dataEdu, function (d) {
    return d.bachelorsOrHigher;
  });
  color.domain([minEdu, maxEdu]);

  d3.json(URL + COUNTY_DATA, function (cJson) {

    var geojson = topojson.feature(cJson, cJson.objects.counties);
    console.log("geojson", geojson);

    svg.append("g").attr("class", "counties").selectAll("path").data(geojson.features).enter().append("path").attr("d", path).attr("class", "county").attr("data-fips", function (d) {
      return d.id;
    }).attr("data-education", function (d) {
      return fetchEdu(d);
    }).attr("fill", function (d) {
      return color(fetchEdu(d));
    }).on("mouseover", function (d) {
      d3.select(this).attr("stroke", "gray");
      tooltip.style('opacity', .9);
      tooltip.html(infoEdu(d)).attr('data-education', fetchEdu(d)).style("left", d3.event.pageX - document.getElementById("mySvg").getBoundingClientRect().x + 10 + "px").style("top", d3.event.pageY - document.getElementById("mySvg").getBoundingClientRect().y + 90 + "px");
    }).on("mouseout", function () {
      tooltip.style('opacity', 0);
      d3.select(this).attr("stroke", "none");
    });

    var colorpercent = function colorpercent(p) {
      return (maxEdu - minEdu) * p + minEdu;
    };

    svg.append("g").attr("id", "legend").selectAll("stop").data([0.25, 0.5, 0.75, 1]).enter().append("rect").attr("width", 60).attr("height", 20).attr("y", 0).attr("x", function (d, i) {
      return i * 60;
    }).style("fill", function (d) {
      return color(colorpercent(d));
    }).attr('transform', 'translate(' + (svgW / 2 - 120) + ', ' + (svgH - 40) + ')');

    svg.selectAll(".desc").data([0.25, 0.5, 0.75, 1]).enter().append("text").attr("class", "desc").attr("x", function (d, i) {
      return i * 60 + 60;
    }).attr("y", 35).attr("fill", "black").attr("text-anchor", "middle").text(function (d) {
      return Math.round(colorpercent(d)) + "%";
    }).attr('transform', 'translate(' + (svgW / 2 - 120) + ', ' + (svgH - 40) + ')');

    svg.selectAll(".myline").data([60, 60, 60, 60]).enter().append("line").style("stroke", "black").attr("x1", function (d, i) {
      return i * d + d;
    }).attr("y1", -2).attr("x2", function (d, i) {
      return i * d + d;
    }).attr("y2", 22).attr('transform', 'translate(' + (svgW / 2 - 120) + ', ' + (svgH - 40) + ')');

    svg.append("g").attr("class", "counties").selectAll(".states").data(topojson.feature(cJson, cJson.objects.states).features).enter().append("path").attr("d", path).attr("stroke", "gray").attr("stroke-width", 0.5).style("fill", "none");
  });
});