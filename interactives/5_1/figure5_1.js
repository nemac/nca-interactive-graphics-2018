function typeColor(type) {
    switch (type) {
        case "Forest":
          return "#a1d06a";
        case "Developed":
          return "#e31126";
        case "Forest":
          return "#a1d06a";
        case "Grass/Shrub":
          return "#d7db56";
        case "Snow/Ice":
          return "#fff";
        case "Water":
          return "#4a6aa7";
        case "Wetland":
          return "#aacee7";
        case "Agriculture":
          return "#ae742a";
        case "Barren":
          return "#d3d3d3";
    }
}

function transitionToGrouped(rects, x, y, n) {
    rects.transition()
        .duration(500)
        .delay(function(d, i) { return i * 20; })
        .attr("y", function(d, i) { return y(d.data.region) + ((y.bandwidth() / n ) * i); })
        .attr("height", y.bandwidth() / n)
    .transition()
        .attr("x", function(d, i) { return x(0); })
}

function transitionToStacked(rects, x, y, n) {
    rects.transition()
        .duration(500)
        .delay(function(d, i) { return i * 20; })
        .attr("x", function(d, i) { return x(d[0]); })
    .transition()
        .attr("y", function(d) { return y(d.data.region); })
        .attr("height", function(d) { return y.bandwidth(); })
}

var initStackedBarChart = {
    draw: function(config) {
        var me = this;
        var domEle = config.element;
        var data = config.data;
        var margin = {top: 20, right: 20, bottom: 30, left: 120};

        var width = 960 - margin.left - margin.right;
        var height = 500 - margin.top - margin.bottom;

        var xScale = d3.scaleLinear().rangeRound([0, width]);
        var yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1);

        var color = d3.scaleOrdinal(d3.schemeCategory20);

        var xAxis = d3.axisBottom(xScale);
        var yAxis =  d3.axisLeft(yScale);

        var svg = d3.select("#"+domEle).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var stack = d3.stack()
            .keys(["percent"])
            .offset(d3.stackOffsetNone);

        var groupedData = d3.nest().key(function (d) { return d.region; }).entries(data);

        var layers = stack(data);

        yScale.domain(data.map(function(d) { return d.region; }));
        xScale.domain([0, 1]).nice();

        function stackData(data) {
            var stackedData = [];

            data.forEach(function (d) {
                var innerStack = [];
                var x0 = 0;
                var x1 = 0;

                d.values.forEach(function (v) {
                    x0 = x1;
                    x1 += v.percent;
                    var processedData = [x0, x1];
                    processedData["data"] = v;
                    innerStack.push(processedData);
                });

                stackedData.push(innerStack);
            });

            return stackedData;
        }

        var stackedData = stackData(groupedData);

        var layer = svg.selectAll(".layer")
            .data(stackedData)
            .enter().append("g")
            .attr("class", "layer")
        
        var rects = layer.selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("y", function(d) {  return yScale(d.data.region); })
            .attr("x", function(d) { return xScale(d[0]); })
            .attr("height", yScale.bandwidth())
            .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]) })
            .style("fill", function(d, i) { console.log(d); return typeColor(d.data.type); });
        
        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height+5) + ")")
            .call(xAxis);
        
        svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(0,0)")
            .call(yAxis);

        function triggerTransitionToGrouped() {
            if (this.classList.contains("active")) {
                return;
            } else {
                document.getElementsByClassName("active")[0].classList.remove("active");
                this.classList.add("active");
            }
            transitionToGrouped(rects, xScale, yScale, 9);
        }

        function triggerTransitionToStacked() {
            if (this.classList.contains("active")) {
                return;
            } else {
                document.getElementsByClassName("active")[0].classList.remove("active");
                this.classList.add("active");
            }
            transitionToStacked(rects, xScale, yScale, 9);
        }

        d3.select("#stacked").on("click", triggerTransitionToStacked);
        d3.select("#grouped").on("click", triggerTransitionToGrouped);
    }
}

d3.json("./5_1--NLCD.json", function (error, json) {
    initStackedBarChart.draw({
        data: json,
        element: 'stacked-bar'
    });
});
