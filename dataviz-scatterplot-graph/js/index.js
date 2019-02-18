var URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/";
var dataset;
var colors = ["red", "navy"],
    legendTxt = ["doping allegations", "no doping allegations"];
var svgW = document.getElementById('viewChart').offsetWidth;
var adjH = svgW * 400 / 1000;
var svgH = adjH < 400 ? 400 : adjH;
var margin = { top: 30, right: 50, bottom: 30, left: 50 },
    w = svgW - margin.left - margin.right,
    h = svgH - margin.top - margin.bottom;

var svg = d3.select(".chartHolder").append("svg").attr("width", svgW).attr("height", svgH);

function secondsFormat(d) {
  var minutes = Math.floor(d / 60);
  var seconds = +(d % 60).toFixed(0);
  return seconds == 60 ? minutes + 1 + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

var timeParse = d3.timeParse("%M:%S");
var timeFormat = d3.timeFormat("%M:%S");

d3.json(URL + "cyclist-data.json", function (json) {
  console.log(json);
  dataset = json;
  dataset.forEach(function (d) {
    d.Time = timeParse(d.Time);
  });

  var minYear = d3.min(dataset, function (d) {
    return d.Year;
  });
  var maxYear = d3.max(dataset, function (d) {
    return d.Year;
  });
  var minSecs = d3.min(dataset, function (d) {
    return d.Seconds;
  });
  var maxSecs = d3.max(dataset, function (d) {
    return d.Seconds;
  });

  var xScale = d3.scaleLinear().domain([minYear - 1, maxYear + 1]).range([0, w]);

  var yScale = d3.scaleTime().domain(d3.extent(dataset, function (d) {
    return d.Time;
  })).range([0, h]);

  var xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

  svg.append("g").attr("transform", "translate(" + margin["left"] + "," + (svgH - margin.bottom) + ")").attr("id", "x-axis").call(xAxis);

  var yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);

  svg.append("g").attr('transform', 'translate(' + margin['left'] + ',' + margin.top + ')').attr("id", "y-axis").call(yAxis);

  svg.selectAll("circle").data(dataset).enter().append("circle").attr("class", "dot").attr("cx", function (d) {
    return xScale(d.Year);
  }).attr("cy", function (d) {
    return yScale(d.Time);
  }).attr("data-xvalue", function (d) {
    return d.Year;
  }).attr("data-yvalue", function (d) {
    return d.Time;
  }).attr("r", 5).style("opacity", .9).style("stroke", "black").style("fill", function (d) {
    return d.Doping != "" ? colors[0] : colors[1];
  }).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').on("mouseover", function (d, i) {
    var xPos = parseFloat(d3.select(this).attr("cx"));
    var yPos = parseFloat(d3.select(this).attr("cy"));
    tooltip.style('opacity', .9);
    tooltip.html(d.Name + ' : ' + d.Nationality + '<br> Time: ' + secondsFormat(d.Seconds) + ' ,Year: ' + d.Year + '<br>' + d.Doping).attr('data-year', d.Year).style('left', xPos - 125 + 'px').style('top', yPos + 25 + 'px').style('transform', 'translateX(60px)');
  }).on("mouseout", function () {
    tooltip.style('opacity', 0);
  });

  var tooltip = d3.select(".chartHolder").append("div").attr("id", "tooltip").style("opacity", 0);

  svg.selectAll('rect').data(colors).enter().append('rect').attr('id', 'legend').attr('x', 0).attr('y', function (d, i) {
    return i * 30 + 50;
  }).attr('transform', 'translate(' + (w - margin.right) + ',' + margin.top + ')').attr('width', 20).attr('height', 20).style('fill', function (d) {
    return d;
  }).style('stroke', "black");

  svg.selectAll(".desc").data(legendTxt).enter().append("text").text(function (d) {
    return d;
  }).attr("class", "desc").attr('x', 25).attr('y', function (d, i) {
    return i * 30 + 65;
  }).attr('transform', 'translate(' + (w - margin.right) + ',' + margin.top + ')').attr("font-size", "10px").attr("fill", "black");
});