var URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/";
var dataset, years;
var barPadding = 1;

const svgW = document.getElementById('viewChart').offsetWidth;
const adjH = svgW * 400 / 1000;
const svgH = adjH < 400 ? 400 : adjH ;

var margin = { top: 30, right: 50, bottom: 30, left: 50 },
    w = svgW - margin.left - margin.right,
    h = svgH - margin.top - margin.bottom;

var svg = d3.select(".chartHolder").append("svg").attr("width", svgW).attr("height", svgH);

d3.json(URL + "GDP-data.json", function (json) {

  dataset = json.data;
  years = json.data.map(function (d) {
    return parseInt(d[0].split("-")[0]);
  });
  console.log(dataset);

  var gdpMin = d3.min(dataset, function (d) {
    return d[1];
  });
  var gdpMax = d3.max(dataset, function (d) {
    return d[1];
  });

  var yScale = d3.scaleLinear().domain([0, gdpMax]).range([h, 0]);

  var xScale = d3.scaleLinear().domain([d3.min(years), d3.max(years)]).range([0, w]);

  var xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

  svg.append("g").attr("transform", "translate(" + margin["left"] + "," + (svgH - margin.bottom) + ")").attr("id", "x-axis").call(xAxis);

  var yAxis = d3.axisLeft(yScale);

  svg.append("g").attr('transform', 'translate(' + margin['left'] + ',' + margin.top + ')').attr("id", "y-axis").call(yAxis);

  var tooltip = d3.select(".chartHolder").append("div").attr("id", "tooltip").style("opacity", 0);

  svg.selectAll("rect").data(dataset).enter().append("rect").attr("class", "bar").attr("x", function (d, i) {
    return i * (w / dataset.length);
  }).attr("y", function (d, i) {
    return yScale(d[1]);
  }).attr('transform', 'translate(' + margin.left + ', ' + margin.bottom + ')').attr("width", w / dataset.length - barPadding).attr("height", function (d, i) {
    return d[1] * (h / gdpMax);
  }).attr("fill", "navy").attr("data-date", function (d, i) {
    return d[0];
  }).attr("data-gdp", function (d, i) {
    return d[1];
  }).on("mouseover", function (d, i) {
    var xPos = parseFloat(d3.select(this).attr("x"));
    var yPos = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

    tooltip.style('opacity', .9);
    tooltip.html(d[0] + '<br>' + '$' + d[1].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' Billion').attr('data-date', d[0]).style('left', i * w / dataset.length - barPadding + 'px').style('top', yPos + 'px').style('transform', 'translateX(60px)');
  }).on("mouseout", function () {
    tooltip.style('opacity', 0);
  });
});
