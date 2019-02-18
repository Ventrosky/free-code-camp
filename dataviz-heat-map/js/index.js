var URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/";
var dataName = "global-temperature.json";
var dataset, baseTemperature;
var barPadding = 1;
var svgW = document.getElementById('viewChart').offsetWidth;
var adjH = svgW * 400 / 1000;
var svgH = adjH < 400 ? 400 : adjH;

var margin = { top: 30, right: 50, bottom: 30, left: 50 },
    w = svgW - margin.left - margin.right,
    h = svgH - margin.top - margin.bottom;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var svg = d3.select(".chartHolder").append("svg").attr("width", svgW).attr("height", svgH);

var monthParse = d3.timeParse("%B");
var monthFormat = d3.timeFormat("%B");
var yearParse = d3.timeParse("%Y");
var yearFormat = d3.timeFormat("%Y");

d3.json(URL + dataName, function (json) {
  baseTemp = json.baseTemperature;
  dataset = json.monthlyVariance;

  var minYear = d3.min(dataset, function (d) {
    return d.year;
  });
  var maxYear = d3.max(dataset, function (d) {
    return d.year;
  });
  var years = Array.from({ length: maxYear - minYear + 1 }, function (x, i) {
    return i + minYear;
  });

  var minTemp = d3.min(dataset, function (d) {
    return baseTemp + d.variance;
  });
  var maxTemp = d3.max(dataset, function (d) {
    return baseTemp + d.variance;
  });

  var mult = Math.max(1, Math.floor(w / years.length));
  margin.left = (svgW - years.length * mult) / 2;
  margin.right = margin.left;
  w = svgW - margin.left - margin.right;

  var yScale = d3.scaleBand().domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).rangeRound([0, h]);

  var yAxis = d3.axisLeft(yScale).tickValues(yScale.domain()).tickFormat(function (month) {
    var date = new Date(0);
    date.setUTCMonth(month);
    return monthFormat(date);
  });

  svg.append("g").attr("id", "y-axis").attr("transform", "translate(" + (margin.left - mult / 2) + "," + margin.top + ")").call(yAxis);

  var xScale = d3.scaleBand().domain(years).rangeRound([0, years.length * mult]);

  var xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter(function (year) {
    return year % 10 === 0;
  })).tickFormat(function (year) {
    var date = new Date(0);
    date.setUTCFullYear(year);
    return yearFormat(date);
  });

  svg.append("g").attr("id", "x-axis").attr("transform", "translate(" + margin.left + "," + (h + margin.top) + ")").call(xAxis);

  var data = d3.range(4);
  var colors = d3.scaleLinear().domain([minTemp, maxTemp]).range(["#2d7fb9", "#f03b20"]);

  var legendHolder = svg.append('g').attr('class', 'legendHolder').attr("id", "legend");

  legendHolder.selectAll(".legend").data(data).enter().append("rect").attr("y", h - margin.bottom).attr("height", 20).attr("x", function (d, i) {
    return w + margin.right + 60 + i * 12;
  }).attr("width", 10).attr("fill", function (d) {
    return colors((d + 1) * ((maxTemp - minTemp) / 4));
  }).attr("stroke", "gray");

  svg.selectAll(".desc").data([minTemp, maxTemp]).enter().append("text").text(function (d) {
    return d.toFixed(3) + "°C";
  }).attr("class", "desc").attr('x', function (d, i) {
    return w + margin.right + 20 + i * 90;
  }).attr('y', h - margin.bottom + 15).attr("font-size", "10px").attr("fill", "black");

  svg.selectAll(".cell").data(dataset).enter().append("rect").attr("class", "cell").attr("x", function (d, i) {
    return xScale(d.year);
  }).attr("y", function (d, i) {
    return yScale(d.month - 1);
  }).attr('transform', 'translate(' + margin.left + ', ' + margin.bottom + ')').attr("width", function (d) {
    return mult;
  }).attr("height", function (d) {
    return h / 12;
  }).attr("fill", function (d) {
    return colors(baseTemp + d.variance);
  }).attr("data-year", function (d) {
    return d.year;
  }).attr("data-month", function (d) {
    return d.month - 1;
  }).attr("data-temp", function (d) {
    return baseTemp + d.variance;
  }).on("mouseover", function (d, i) {
    var xPos = parseFloat(d3.select(this).attr("x")) + margin.top / 2;
    var yPos = parseFloat(d3.select(this).attr("y")) + margin.left / 2;
    d3.select(this).attr("stroke", "black");
    tooltip.style('opacity', .9);
    tooltip.html(d.year + ' ' + months[d.month - 1] + '</br>' + (baseTemp + d.variance).toFixed(3) + ' °C </br>' + d.variance + ' °C </br>').attr('data-year', d.year).style('left', xPos + 'px').style('top', yPos + 'px');
  }).on("mouseout", function () {
    tooltip.style('opacity', 0);
    d3.select(this).attr("stroke", "none");
  });

  var tooltip = d3.select(".chartHolder").append("div").attr("id", "tooltip").style("opacity", 0);
});