function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " sq/m";
}

function formatPercentString(x) {
    return (Math.round(x * 100000) / 1000).toString() + "%";
}

function typeColor(type) {
    switch (type) {
        case "Forest":
          return "#a1d06a";
        case "Developed":
          return "#e31126";
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

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<div><strong>Region:</strong> <span>" + d.data.region + "</span></div>" +
            "<div><strong>Sector:</strong> <span>" + d.data.type + "</span></div>" +
            "<div><strong>Percent:</strong> <span>" + formatPercentString(d.data.percent) + "</span></div>" +
            "<div><strong>Area:</strong> <span>" + numberWithCommas(d.data.area) + "</span></div>";
    });

function makeYDomain(data) {
    var a = data.map(function (d) { return d.region;})
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    return Object.keys(temp);
}

function stackData(data, dataType) {
    var stackedData = [];

    data.forEach(function (d) {
        var x0 = 0;
        var x1 = 0;

        d.values.forEach(function (v) {
            x0 = x1;
            x1 += v[dataType];
            var processedData = [x0, x1];
            processedData["data"] = v;
            stackedData.push(processedData);
        });

    });

    return stackedData;
}

function orderDataByType(data, sector, dataType) {
    data.sort(function (a, b) {
        if (a.type === sector && b.type === sector) {
            return a[dataType] - b[dataType];
        } else if (a.type === sector) {
            return -1;
        } else if (b.type === sector) {
            return 1;
        } else {
            return 0;
        }
    })
}

function handleTransitions(data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, changeBarType) {
    var max_area = (dataType === "area") ? ( (barType === "stacked") ? 1809124505200 : 1193e9 ) : 1;

    if (sector) {
        orderDataByType(data, sector, dataType);
    }
    
    x.domain([0, max_area]);
    y.domain(makeYDomain(data));

    var groupedData = d3.nest().key(function (d) { return d.region; }).entries(data);
    var stackedData = stackData(groupedData, dataType);

    var t = svg.transition()
        .duration(300);
    var xt = svg.transition()
        .duration(500);

    var n = 9;
    if (changeBarType === true) {
        if (barType === "stacked") {
            rects.transition()
                    .duration(400)
                    .attr("x", function(d, i) { return x(d[0]); })
                .transition()
                    .attr("y", function(d) { return y(d.data.region); })
                    .attr("height", function(d) { return y.bandwidth(); })
        } else if (barType === "grouped") {
            rects.transition()
                .duration(300)
                    .attr("y", function(d, i) { return y(d.data.region) + ((y.bandwidth() / n ) * (i % 8)); })
                    .attr("height", y.bandwidth() / n)
                .transition()
                    .attr("x", function(d, i) { return x(0); })
        }
    } else {
        if (barType === "stacked") {
            rects.data(stackedData, function (d) { return d.data.id;})
                .transition(t)
                    .attr("y", function(d) { return y(d.data.region); })
                .transition(xt)
                    .delay(300)
                    .attr("x", function(d) { return x(d[0]); })
                    .attr("width", function(d) { return x(d[1]) - x(d[0]) })
                    .attr("height", y.bandwidth())
        } else if (barType === "grouped") {
            rects.transition(t)
                .attr("x", function (d, i) { return x(0); })
                .attr("y", function(d, i) { return y(d.data.region) + ((y.bandwidth() / n ) * (i % 8)); })

            rects.data(stackedData, function (d) { return d.data.id;})
                .transition(xt)
                    .delay(300)
                    .attr("x", function (d, i) { return x(0); })
                    .attr("width", function(d) { return x(d[1]) - x(d[0]) })
                    .attr("y", function(d, i) { return y(d.data.region) + ((y.bandwidth() / n ) * (i % 8)); })
                    .attr("height", function(d) { return y.bandwidth() / n; })
        }
    }

    xAxis.transition(t)
        .call(d3.axisBottom(x));
    yAxis.transition(t)
        .call(d3.axisLeft(y));
}

var initStackedBarChart = {
    draw: function(config) {
        var barType = "stacked";
        var sector = undefined;
        var dataType = "percent";

        var domEle = config.element;
        var data = config.data;
        var margin = {top: 20, right: 20, bottom: 30, left: 120};

        var width = 960 - margin.left - margin.right;
        var height = 500 - margin.top - margin.bottom;

        var x = d3.scaleLinear().rangeRound([0, width])
            .domain([0, 1]).nice();
        var y = d3.scaleBand().rangeRound([height, 0]).padding(0.1)
            .domain(makeYDomain(data));

        var color = d3.scaleOrdinal(d3.schemeCategory20);

        var svg = d3.select("#"+domEle).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.call(tip);

        var groupedData = d3.nest().key(function (d) { return d.region; }).entries(data);
        var stackedData = stackData(groupedData, dataType);
        
        var rects = svg.selectAll("rect")
            .data(stackedData)
            .enter().append("rect")
            .attr("y", function(d) { return y(d.data.region); })
            .attr("x", function(d) { return x(d[0]); })
            .attr("data-region", function (d) { return d.data.region; })
            .attr("data-type", function (d) { return d.data.type; })
            .attr("height", y.bandwidth())
            .attr("width", function(d) { return x(d[1]) - x(d[0]) })
            .style("fill", function(d, i) { return typeColor(d.data.type); })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
        
        var xAxis = svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height+5) + ")")
            .call(d3.axisBottom(x));
        
        var yAxis = svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(0,0)")
            .call(d3.axisLeft(y));

        function triggerTransitionToGrouped() {
            if (this.classList.contains("active")) {
                return;
            }

            barType = "grouped";
            document.querySelector("#transitions .active").classList.remove("active");
            this.classList.add("active");
            handleTransitions(data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, true);
        }

        function triggerTransitionToStacked() {
            if (this.classList.contains("active")) {
                return;
            }

            barType = "stacked";
            document.querySelector("#transitions .active").classList.remove("active");
            this.classList.add("active");
            handleTransitions(data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, true);
        }

        function triggerTypeReorder() {
            if (this.classList.contains("active")) {
                return;
            }
            if (document.querySelector("#sectors .active")) {
                document.querySelector("#sectors .active").classList.remove("active");
            }

            sector = this.getAttribute("data-for");
            this.classList.add("active");
            handleTransitions(data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, false);
        }

        function triggerDataSwap() {
            if (this.classList.contains("active")) {
                return;
            }
            if (document.querySelector("#data .active")) {
                document.querySelector("#data .active").classList.remove("active");
            }

            dataType = this.getAttribute("data-for");
            this.classList.add("active");
            handleTransitions(data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, false);
        }

        d3.select("#stacked").on("click", triggerTransitionToStacked);
        d3.select("#grouped").on("click", triggerTransitionToGrouped);
        d3.selectAll("#sectors button").on("click", triggerTypeReorder);
        d3.selectAll("#data button").on("click", triggerDataSwap);
    }
}

d3.json("./5_1--NLCD.json", function (error, json) {
    initStackedBarChart.draw({
        data: json,
        element: 'stacked-bar'
    });
});

