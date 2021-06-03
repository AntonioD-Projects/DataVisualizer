//python -m http.server
//localhost:8000

//Sort streams and convert them to numbers

streams = [];
counter = 1;

d3.csv("charts.csv", (data2) => {
  counter += 1;
  streams.push(parseInt(data2.Streams));
//  for(var i=0; i < data2.length; i++){
//    console.log(data2);
//  }
  if (counter == 200){
    streams.sort();
    console.log(streams.sort());

    let svg = d3.select("body").append("svg");

    svg.attr("width", 1800);
    svg.attr("height", 1800);
    /*
    svg.append("rect")
      .attr("x", 49)
      .attr("y", 99)
      .attr("width", 215)
      .attr("height", 103)
      .attr("style", "fill:blue")
    */

    let xScale = d3.scaleLinear()
      .domain([0,streams.length+1])
      .range([0,800])
    let xAxis = d3.axisBottom(xScale)

    let yScaleRange = 700;

    let yScale = d3.scaleLinear()
      .domain([140000,1000]) //in thousands
      .range([0,yScaleRange])
    let yAxis = d3.axisLeft(yScale)

    svg.append("g")
      .attr("transform", "translate(50,800)")
      .call(xAxis)

    svg.append("g")
      .attr("transform", "translate(50," + (800 - yScaleRange) + ")")
      .call(yAxis)

    svg.selectAll("rect")
      .data(streams).enter().append("rect")
        .attr("x", (d,i) => {return i*4+50})
        .attr("y", (d) => {return 800-d/200})
        .attr("width", 10)
        .attr("height", (d) => {return d/200;})
        .attr("style",(d,i) => {return "fill: " + d3.interpolateCool(i/200)})
  }
});