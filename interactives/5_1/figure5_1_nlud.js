var NLUD = [
    { "id": 0, "type":"Built-up", "region": "Midwest", "area": 297463205500, "percent": 0.2234643219830069 },
    { "id": 1, "type":"Conservation", "region": "Midwest", "area": 32450525100, "percent": 0.02437792121978611 },
    { "id": 2, "type":"Production", "region": "Midwest", "area": 693120086e3, "percent": 0.5206950211218423 },
    { "id": 3, "type":"Recreation", "region": "Midwest", "area": 70835947200, "percent": 0.05321433582504736 },
    { "id": 4, "type":"Water", "region": "Midwest", "area": 237274299200, "percent": 0.17824839985031732 },
    { "id": 5, "type":"Built-up", "region": "Northeast", "area": 211121254800, "percent": 0.383722505194986 },
    { "id": 6, "type":"Conservation", "region": "Northeast", "area": 16033479300, "percent": 0.029141579562021205 },
    { "id": 7, "type":"Production", "region": "Northeast", "area": 223709283900, "percent": 0.4066018219473199 },
    { "id": 8, "type":"Recreation", "region": "Northeast", "area": 38099402100, "percent": 0.06924740019233304 },
    { "id": 9, "type":"Water", "region": "Northeast", "area": 61229106900, "percent": 0.1112866931033398 },
    { "id": 10, "type":"Built-up", "region": "Northern Great Plains", "area": 16412121900, "percent": 0.013488231795055922 },
    { "id": 11, "type":"Conservation", "region": "Northern Great Plains", "area": 175510058300, "percent": 0.14424218654591997 },
    { "id": 12, "type":"Production", "region": "Northern Great Plains", "area": 954200836100, "percent": 0.7842058531354782 },
    { "id": 13, "type":"Recreation", "region": "Northern Great Plains", "area": 27225225e3, "percent": 0.02237493407068536 },
    { "id": 14, "type":"Water", "region": "Northern Great Plains", "area": 43425176400, "percent": 0.035688794452860606 },
    { "id": 15, "type":"Built-up", "region": "Northwest", "area": 40032275400, "percent": 0.06214773617098607 },
    { "id": 16, "type":"Conservation", "region": "Northwest", "area": 173880560700, "percent": 0.2699392703430175 },
    { "id": 17, "type":"Production", "region": "Northwest", "area": 407487738400, "percent": 0.6326005755594645 },
    { "id": 18, "type":"Recreation", "region": "Northwest", "area": 5833678500, "percent": 0.009056440302275542 },
    { "id": 19, "type":"Water", "region": "Northwest", "area": 16912708200, "percent": 0.02625597762425647 },
    { "id": 20, "type":"Built-up", "region": "Southeast", "area": 481816545100, "percent": 0.36088247296546117 },
    { "id": 21, "type":"Conservation", "region": "Southeast", "area": 36637216200, "percent": 0.027441417940685525 },
    { "id": 22, "type":"Production", "region": "Southeast", "area": 580375644100, "percent": 0.43470362282445074 },
    { "id": 23, "type":"Recreation", "region": "Southeast", "area": 43379945100, "percent": 0.03249174820583375 },
    { "id": 24, "type":"Water", "region": "Southeast", "area": 192897176400, "percent": 0.14448073806356881 },
    { "id": 25, "type":"Built-up", "region": "Southern Great Plains", "area": 98353292400, "percent": 0.09103861793597655 },
    { "id": 26, "type":"Conservation", "region": "Southern Great Plains", "area": 15835720500, "percent": 0.014657995407791875 },
    { "id": 27, "type":"Production", "region": "Southern Great Plains", "area": 905184411300, "percent": 0.8378645571598837 },
    { "id": 28, "type":"Recreation", "region": "Southern Great Plains", "area": 14221906200, "percent": 0.013164202776226494 },
    { "id": 29, "type":"Water", "region": "Southern Great Plains", "area": 46751610600, "percent": 0.04327462672012138 },
    { "id": 30, "type":"Built-up", "region": "Southwest", "area": 136500503400, "percent": 0.07596315877317703 },
    { "id": 31, "type":"Conservation", "region": "Southwest", "area": 657909188600, "percent": 0.36612949335067335 },
    { "id": 32, "type":"Production", "region": "Southwest", "area": 919877131600, "percent": 0.5119158600813296 },
    { "id": 33, "type":"Recreation", "region": "Southwest", "area": 37173448800, "percent": 0.02068719545352949 },
    { "id": 34, "type":"Water", "region": "Southwest", "area": 45470050200, "percent": 0.025304292341290585 }
];

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " sq/m";
}

function formatPercentString(x) {
    return (Math.round(x * 10) / 10).toString() + "%";
}

function getWrapper(svg) {
    return d3.select(svg.node().closest(".graphic--stacked-bar"))
}

function typeColor(type) {
    switch (type) {
        case "Built-up":
          return "#f42c1f";
        case "Conservation":
          return "#b2d57f";
        case "Production":
          return "#a3aad6";
        case "Recreation":
          return "#ffc572";
        case "Water":
          return "#4a6aa7";
    }
}

var tip = d3.tip()
    .attr('class', 'd3-tip graphic--stacked-bar--tip')
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

function setAxisLabel(svg, dataType) {
    svg.select(".axis--label--x--unit")
        .text((dataType === "percent") ? "(Percent)" : "(Square Meters)");
}

function groupedToStacked(rects, stackedData, x, y) {
    rects.data(stackedData, function (d) { return d.data.id;})
        .transition()
            .duration(400)
            .attr("width", function (d, i) { return x(d[1]) - x(d[0]); })
            .attr("x", function(d, i) { return x(d[0]); })
        .transition()
            .attr("y", function(d) { return y(d.data.region); })
            .attr("height", function(d) { return y.bandwidth(); });
}

function stackedToGrouped(rects, stackedData, x, y, n) {
    var sectors = 5;

    rects.data(stackedData, function (d) { return d.data.id;})
        .transition()
            .duration(300)
            .attr("y", function(d, i) { return y(d.data.region) + ((y.bandwidth() / n ) * (i % sectors)); })
            .attr("height", y.bandwidth() / n)
            .attr("width", function(d) { return x(d[1]) - x(d[0]) })
        .transition()
            .attr("x", x(0))
}

// Reorder based on sector
function stackedToStacked(rects, stackedData, x, y) {
    rects.data(stackedData, function (d) { return d.data.id;})
        .transition()
            .duration(300)
            .attr("y", function(d) { return y(d.data.region); })
        .transition()
            .duration(300)
            .delay(300)
            .attr("x", function(d) { return x(d[0]); })
            .attr("width", function(d) { return x(d[1]) - x(d[0]) })
            .attr("height", y.bandwidth())
}

function groupedToGrouped(rects, stackedData, x, y, n) {
    var sectors = 5;

    rects.transition(300)
        .attr("x", x(0))
        .attr("y", function(d, i) { return y(d.data.region) + ((y.bandwidth() / n ) * (i % sectors)); })

    rects.data(stackedData, function (d) { return d.data.id;})
        .transition(500)
            .delay(300)
            .attr("x", x(0))
            .attr("width", function(d) { return x(d[1]) - x(d[0]) })
            .attr("y", function(d, i) { return y(d.data.region) + ((y.bandwidth() / n ) * (i % sectors)); })
            .attr("height", y.bandwidth() / n)
}

function handleTransitions(data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, changeBarType) {
    if (y.domain().length === 1) {
        filterToRegion("switchDataType", data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, changeBarType);
        return;
    }

    var max_area = (dataType === "area") ? ( (barType === "stacked") ? 1809124505200 : 1193e9 ) : 100;

    if (sector) {
        orderDataByType(data, sector, dataType);
    }
    
    var yDomain = makeYDomain(data);

    x.domain([0, max_area]);
    y.domain(yDomain);

    var groupedData = d3.nest().key(function (d) { return d.region; }).entries(data);
    var stackedData = stackData(groupedData, dataType);

    var n = 7;
    if (changeBarType === true) {
        if (barType === "stacked") {
            groupedToStacked(rects, stackedData, x, y);
        } else if (barType === "grouped") { 
            stackedToGrouped(rects, stackedData, x, y, n);
        }
    } else {
        if (barType === "stacked") {
            stackedToStacked(rects, stackedData, x, y);
        } else if (barType === "grouped") {
            groupedToGrouped(rects, stackedData, x, y, n);
        }
    }

    var f = d3.format(".3s");

    xAxis.transition()
        .duration(300)
        .call(d3.axisBottom(x).tickFormat(function (d) {
            return dataType === "area" ? f(d).replace("G", "B") : (d + "%");
        }))
    setAxisLabel(svg, dataType)

    var bandwidthOffset = y.bandwidth() / 2;
    var offset = .5 // No idea where this comes from but is needed
    yAxis.transition().duration(300).selectAll("g")
        .attr("transform", function (d, i) { return "translate(0," + (y(d) + bandwidthOffset + offset) + ")" });


}

function getActiveRegionY(index) {
    var sidebarHeight = 536; // height - margintop - marginbottom
    var tickRegionOffset = 7; // I dunno where this is from. But it's the top and bottom pixel offset
    var regions = 7; // Number of regions
    var tickRegionHeight = sidebarHeight - (tickRegionOffset * 2);
    var tickHeight = tickRegionHeight / regions;
    var offset = tickRegionOffset - 12;

    return (tickRegionHeight - (index * tickHeight)) + offset;
}

function drawActiveRegionBar(yAxis, index) {
    yAxis.append("rect")
        .classed("region-highlight", true)
        .attr("x", -82)
        .attr("y", getActiveRegionY(index))
        .attr("width", 0)
        .attr("height", 3)
        .attr("fill", "#0056b3");
}

function unfilterToRegion(data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, changeBarType) {
    y.domain(makeYDomain(data));

    handleTransitions(data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, changeBarType);
    yAxis.selectAll("g").classed("inactive", false);
    yAxis.select(".region-highlight").remove();

    var wrapper = getWrapper(svg);
    wrapper.select(".type-changer--bar").classed("inactive", false);
    wrapper.selectAll(".legend-item").classed("inactive", false);
    wrapper.selectAll(".type-changer--bar, .legend-item a").attr("tabindex", 0)
}

function filterToRegion(region, data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, changeBarType) {
    var wrapper = getWrapper(svg);
    if (y.domain().length === 1 && y.domain()[0] === region) {
        unfilterToRegion(data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, changeBarType);
        return;
    }

    if (region === "switchDataType") {
        region = y.domain()[0]
    }

    if (barType === "stacked") {
        wrapper.select(".type-changer--bar").on("click")();
    }

    wrapper.select(".type-changer--bar").classed("inactive", true);
    wrapper.selectAll(".legend-item").classed("inactive", true);

    wrapper.selectAll(".type-changer--bar, .legend-item a").attr("tabindex", null)

    var yDomain = makeYDomain(data);
    var groupedData = d3.nest().key(function (d) { return d.region; }).entries(data);
    var i, l;
    for (i = 0, l = groupedData.length; i < l; i++) {
        groupedData[i].values = groupedData[i].values.sort(function (a, b) { return b[dataType] - a[dataType]; })
    }
    var stackedData = stackData(groupedData, dataType);

    var max_area = 100;

    var index = yDomain.indexOf(region)
    if (dataType === "area") {
        var max_area = 0;
        var regionValues = groupedData[index].values
        for (i = 0, l = regionValues.length; i < l; i++) {
            if (regionValues[i].area > max_area) {
                max_area = regionValues[i].area;
            }
        }
    }
    y.domain([region]);
    x.domain([0, max_area]);

    var delay = (yAxis.select(".region-highlight").empty() === true) ? 850 : 0;

    rects.data(stackedData, function (d) { return d.data.id;})
        .transition()
        .duration(500)
        .delay(delay)
        .attr("y", function (d, i) {
            if (yDomain.indexOf(d.data.region) < index) {
                return 1000;
            }
            if (yDomain.indexOf(d.data.region) > index) {
                return -1000;
            }
            return y(region) + (y.bandwidth()/5) * (i % 5)
        })
        .attr("x", x(0))
        .attr("height", function (d, i) {
            return y.bandwidth()/5;
        })
        .attr("width", function(d) { return x(d[1]) - x(d[0]) })

    var f = d3.format(".3s");

    xAxis.transition()
        .duration(300)
        .call(d3.axisBottom(x).tickFormat(function (d) {
            return dataType === "area" ? f(d).replace("G", "B") : (d + "%");
        }))

    yAxis.selectAll("g")
        .classed("inactive", function (d) {  return d !== region; });

    if (yAxis.select(".region-highlight").empty() === true) {
        drawActiveRegionBar(yAxis, index);
    }

    yAxis.select(".region-highlight").transition()
        .duration(300)
        .attr("y", getActiveRegionY(index))
        .attr("width", 77)

    setAxisLabel(svg, dataType)
}

function splitLabels(d) {
    var el = d3.select(this);
    if (d !== "Northern Great Plains" && d !== "Southern Great Plains") {
        return;
    }

    var labels = [
        (d === "Northern Great Plains") ? "Northern" : "Southern",
        "Great Plains"
    ]

    el.text("");
    labels.forEach(function (l, i) {
        var tspan = el.append("tspan")
            .text(l)
            .attr("x", 0)
            .attr("dy", i * 15)

        if (i === 0) {
            tspan.attr("dx", -18)
                .attr("dy", -5);
        }
        if (i === 1) {
            tspan.attr("dx", -9);
        }
    });
}

function wrappedAxis(y) {
    return function (g) {
        g.call(d3.axisLeft(y))
            .selectAll("text").each(splitLabels);
    }
}

var initStackedBarChart = {
    draw: function(config) {
        var barType = "stacked";
        var sector = undefined;
        var dataType = "percent";

        var domEle = config.element;
        var data = config.data.map(function (d) {
            d.percent = d.percent * 100;
            return d;
        });
        var margin = {top: 5, right: 22, bottom: 59, left: 88};

        var width = 720 - margin.left - margin.right;
        var height = 417 - margin.top - margin.bottom;

        var x = d3.scaleLinear().rangeRound([0, width])
            .domain([0, 100]).nice();
        var y = d3.scaleBand().rangeRound([height, 0]).padding(0.1)
            .domain(makeYDomain(data));

        var color = d3.scaleOrdinal(d3.schemeCategory20);

        var svg = d3.select(config.wrapper).select("."+domEle).append("svg")
            .attr("viewBox", "0 0 " +
                  (width + margin.left + margin.right) + " " +
                  (height + margin.top + margin.bottom)
                 )
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.call(tip);

        var groupedData = d3.nest().key(function (d) { return d.region; }).entries(data);
        var stackedData = stackData(groupedData, dataType);
        
        var rects = svg.selectAll("rect.stacked-bar--bar")
            .data(stackedData)
            .enter().append("rect")
            .classed("stacked-bar--bar", true)
            .attr("y", function(d) { return y(d.data.region); })
            .attr("x", function(d) { return x(d[0]); })
            .attr("data-region", function (d) { return d.data.region; })
            .attr("data-type", function (d) { return d.data.type; })
            .attr("data-for", function (d) { return d.data.type; })
            .attr("height", y.bandwidth())
            .attr("width", function(d) { return x(d[1]) - x(d[0]) })
            .style("fill", function(d, i) { return typeColor(d.data.type); })
            .on('click', triggerTypeReorder)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
        
        var xAxis = svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickFormat(function (d) { return d + "%"; }));

        var xAxisLabel = xAxis.append("text")
            .attr("class", "axis--label")
            .attr("transform", "translate(" + (width/2) + ",40)");

        xAxisLabel.append("tspan")
            .attr("x", 0)
            .attr("class", "axis--label--x")
            .text("Land Area");
        
        xAxisLabel.append("tspan")
            .attr("x", 0)
            .attr("dy", 15)
            .attr("class", "axis--label--x--unit")
            .text("(Percent)");
        
        var yAxis = svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(0,0)")
            .call(d3.axisLeft(y));

        yAxis.selectAll("text")
            .each(splitLabels);

        yAxis.selectAll("g").each(function (d, i) {
            d3.select(this).append("rect")
                .classed("stacked--region--handler", true)
                .attr("data-for", d)
                .attr("transform", "translate(-83," + (-(y.bandwidth()/2)) + ")")
                .attr("width", "80px")
                .attr("height", y.bandwidth())
                .attr("fill", "#000")
                .attr("opacity", "0")
                .attr("tabindex", "0")
                .on("click", function () {
                    filterToRegion(d, data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, true)
                }).on("keypress", function () {
                    if (d3.event.key !== "Enter") {
                        return;
                    }
                    d3.event.stopPropagation();
                    filterToRegion(d, data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, true)
                })
        });

        function triggerBarTypeTransition() {
            if (d3.select(".type-changer--bar").classed("inactive")) {
                return;
            }
            barType = (barType === "grouped") ? "stacked" : "grouped";
            d3.select(".type-changer--bar .type-changer--helper").classed("grouped", (barType === "grouped") ? true : false)
            d3.select(".type-changer--bar .type-changer--helper").classed("stacked", (barType === "stacked") ? true : false)
            d3.select(".type-changer--bar .stacked-bar--UI--label").text((barType === "grouped") ? "Grouped" : "Stacked")
            handleTransitions(data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, true);
        }

        function triggerBarTypeTransitionKeypress() {
            if (d3.event.key !== "Enter") {
                return;
            }
            d3.event.stopPropagation();
            triggerBarTypeTransition();
        }

        function triggerTypeReorder() {
            if (d3.select(this.parentNode).classed("inactive")) {
                return;
            }

            var newSector = this.getAttribute("data-for");
            if (newSector === sector) {
                return;
            }

            sector = newSector;

            d3.select(".legend-item--" + sector.toLowerCase().replace("/", "")).lower();
            handleTransitions(data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, false);
        }

        function triggerTypeReorderKeypress() {
            if (d3.event.key !== "Enter") {
                return;
            }
            d3.event.stopPropagation();
            triggerTypeReorder.call(this);
        }

        function triggerDataSwap() {
            dataType = (dataType === "percent") ? "area" : "percent";
            d3.select(".type-changer--data .type-changer--helper").text((dataType === "percent") ? "%" : "A");
            d3.select(".type-changer--data .stacked-bar--UI--label").text((dataType === "percent") ? "Percent" : "Square Meters")
            handleTransitions(data, barType, sector, dataType, svg, rects, x, y, xAxis, yAxis, false);
        }

        function triggerDataSwapKeypress() {
            if (d3.event.key !== "Enter") {
                return;
            }
            d3.event.stopPropagation();
            triggerDataSwap();
        }

        d3.select(".type-changer--data").on("click", triggerDataSwap);
        d3.select(".type-changer--data").on("keypress", triggerDataSwapKeypress);
        d3.select(".type-changer--bar").on("click", triggerBarTypeTransition);
        d3.select(".type-changer--bar").on("keypress", triggerBarTypeTransitionKeypress);
        d3.selectAll(".graphic--stacked-bar--legend a").on("click", triggerTypeReorder);
        d3.selectAll(".graphic--stacked-bar--legend a").on("keypress", triggerTypeReorderKeypress);
    }
}

d3.selectAll(".figure--5_1__nlud").each(function () {
    initStackedBarChart.draw({
        data: NLUD,
        element: 'stacked-bar',
        wrapper: this
    });
})

// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) {
            return null;
        }
        do {
            if (el.matches(s)) {
                return el;
            }
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}
