var NLCD = [
    { "id": 0, "type":"Agriculture", "region": "Alaska", "area": 333637200, "percent": 2.0113345836599527e-4 },
    { "id": 1, "type":"Agriculture", "region": "Hawaii", "area": 295296490, "percent": 0.16118072989672022 },
    { "id": 2, "type":"Agriculture", "region": "Midwest", "area": 607e9, "percent": 0.4561765722595117 },
    { "id": 3, "type":"Agriculture", "region": "Northeast", "area": 82136384100, "percent": 0.14387758435687986 },
    { "id": 4, "type":"Agriculture", "region": "Northern Great Plains", "area": 317296444400, "percent": 0.2606513890131232 },
    { "id": 5, "type":"Agriculture", "region": "Northwest", "area": 73313114400, "percent": 0.11171557342345821 },
    { "id": 6, "type":"Agriculture", "region": "Southeast", "area": 305e9, "percent": 0.21720556075709976 },
    { "id": 7, "type":"Agriculture", "region": "Southern Great Plains", "area": 304228311100, "percent": 0.2791792317044587 },
    { "id": 8, "type":"Agriculture", "region": "Southwest", "area": 100579318200, "percent": 0.05559557560074114 },
    { "id": 9, "type":"Barren", "region": "Alaska", "area": 132e9, "percent": 0.0795763077507885 },
    { "id": 10, "type":"Barren", "region": "Hawaii", "area": 446849286, "percent": 0.24390230331321675 },
    { "id": 11, "type":"Barren", "region": "Midwest", "area": 2138876100, "percent": 0.001607422022711355 },
    { "id": 12, "type":"Barren", "region": "Northeast", "area": 2724659100, "percent": 0.004772761472269271 },
    { "id": 13, "type":"Barren", "region": "Northern Great Plains", "area": 6961473e3, "percent": 0.005718682446815827 },
    { "id": 14, "type":"Barren", "region": "Northwest", "area": 9409620600, "percent": 0.01433851459768547 },
    { "id": 15, "type":"Barren", "region": "Southeast", "area": 5243829300, "percent": 0.003734389782363967 },
    { "id": 16, "type":"Barren", "region": "Southern Great Plains", "area": 5529300300, "percent": 0.005074037337405555 },
    { "id": 17, "type":"Barren", "region": "Southwest", "area": 67447899e3, "percent": 0.03728206588663923 },
    { "id": 18, "type":"Developed", "region": "Alaska", "area": 1496057400, "percent": 9.018994248124584e-4 },
    { "id": 19, "type":"Developed", "region": "Hawaii", "area": 39031496, "percent": 0.02130443546498272 },
    { "id": 20, "type":"Developed", "region": "Midwest", "area": 106002583200, "percent": 0.07966374803102091 },
    { "id": 21, "type":"Developed", "region": "Northeast", "area": 58169282400, "percent": 0.10189462230642762 },
    { "id": 22, "type":"Developed", "region": "Northern Great Plains", "area": 28130643e3, "percent": 0.023108645877351317 },
    { "id": 23, "type":"Developed", "region": "Northwest", "area": 20983851e3, "percent": 0.031975492601599355 },
    { "id": 24, "type":"Developed", "region": "Southeast", "area": 121513380300, "percent": 0.08653567838541712 },
    { "id": 25, "type":"Developed", "region": "Southern Great Plains", "area": 66734265600, "percent": 0.06123960301789706 },
    { "id": 26, "type":"Developed", "region": "Southwest", "area": 52757325900, "percent": 0.029161799394325068 },
    { "id": 27, "type":"Forest", "region": "Alaska", "area": 344715383700, "percent": 0.2078119504525935 },
    { "id": 28, "type":"Forest", "region": "Hawaii", "area": 531562954, "percent": 0.2901412912553641 },
    { "id": 29, "type":"Forest", "region": "Midwest", "area": 299823342800, "percent": 0.22532518089273895 },
    { "id": 30, "type":"Forest", "region": "Northeast", "area": 313054304600, "percent": 0.5483744824161412 },
    { "id": 31, "type":"Forest", "region": "Northern Great Plains", "area": 126218044700, "percent": 0.10368508456433076 },
    { "id": 32, "type":"Forest", "region": "Northwest", "area": 227961912400, "percent": 0.34737162608487065 },
    { "id": 33, "type":"Forest", "region": "Southeast", "area": 536208437700, "percent": 0.3818605062075964 },
    { "id": 34, "type":"Forest", "region": "Southern Great Plains", "area": 116777781e3, "percent": 0.10716271296991575 },
    { "id": 35, "type":"Forest", "region": "Southwest", "area": 352212602900, "percent": 0.1946867680403581 },
    { "id": 36, "type":"Grass/Shrub", "region": "Alaska", "area": 801746363700, "percent": 0.4833334498171728 },
    { "id": 37, "type":"Grass/Shrub", "region": "Hawaii", "area": 473673387, "percent": 0.25854361577176765 },
    { "id": 38, "type":"Grass/Shrub", "region": "Midwest", "area": 38908432800, "percent": 0.029240717473959725 },
    { "id": 39, "type":"Grass/Shrub", "region": "Northeast", "area": 19611234900, "percent": 0.0343528283425778 },
    { "id": 40, "type":"Grass/Shrub", "region": "Northern Great Plains", "area": 691e9, "percent": 0.5676398616714791 },
    { "id": 41, "type":"Grass/Shrub", "region": "Northwest", "area": 295793197900, "percent": 0.450733910141416 },
    { "id": 42, "type":"Grass/Shrub", "region": "Southeast", "area": 137636192700, "percent": 0.09801752923237948 },
    { "id": 43, "type":"Grass/Shrub", "region": "Southern Great Plains", "area": 546e9, "percent": 0.501044297815301 },
    { "id": 44, "type":"Grass/Shrub", "region": "Southwest", "area": 1193e9, "percent": 0.6594349900025885 },
    { "id": 45, "type":"Snow/Ice", "region": "Alaska", "area": 69719302800, "percent": 0.042030338604418266 },
    { "id": 46, "type":"Snow/Ice", "region": "Hawaii", "area": 0, "percent": 0 },
    { "id": 47, "type":"Snow/Ice", "region": "Midwest", "area": 0, "percent": 0 },
    { "id": 48, "type":"Snow/Ice", "region": "Northeast", "area": 0, "percent": 0 },
    { "id": 49, "type":"Snow/Ice", "region": "Northern Great Plains", "area": 140352300, "percent": 1.1529603495987544e-4 },
    { "id": 50, "type":"Snow/Ice", "region": "Northwest", "area": 642328200, "percent": 9.787889080464128e-4 },
    { "id": 51, "type":"Snow/Ice", "region": "Southeast", "area": 0, "percent": 0 },
    { "id": 52, "type":"Snow/Ice", "region": "Southern Great Plains", "area": 0, "percent": 0 },
    { "id": 53, "type":"Snow/Ice", "region": "Southwest", "area": 656598600, "percent": 3.6293720974577844e-4 },
    { "id": 54, "type":"Water", "region": "Alaska", "area": 199e9, "percent": 0.11996731244247662 },
    { "id": 55, "type":"Water", "region": "Hawaii", "area": 21018006, "percent": 0.011472190367225986 },
    { "id": 56, "type":"Water", "region": "Midwest", "area": 175e9, "percent": 0.13151713368272577 },
    { "id": 57, "type":"Water", "region": "Northeast", "area": 58257982800, "percent": 0.10204999801992326 },
    { "id": 58, "type":"Water", "region": "Northern Great Plains", "area": 20207351700, "percent": 0.01659985285634577 },
    { "id": 59, "type":"Water", "region": "Northwest", "area": 19482382800, "percent": 0.029687533860344627 },
    { "id": 60, "type":"Water", "region": "Southeast", "area": 97594582500, "percent": 0.06950192137300831 },
    { "id": 61, "type":"Water", "region": "Southern Great Plains", "area": 21855704400, "percent": 0.020056183268052717 },
    { "id": 62, "type":"Water", "region": "Southwest", "area": 28972056600, "percent": 0.016014407254296252 },
    { "id": 63, "type":"Wetland", "region": "Alaska", "area": 109774435500, "percent": 0.06617760804937184 },
    { "id": 64, "type":"Wetland", "region": "Hawaii", "area": 24651473, "percent": 0.013455433930722615 },
    { "id": 65, "type":"Wetland", "region": "Midwest", "area": 101751871500, "percent": 0.07646922563733162 },
    { "id": 66, "type":"Wetland", "region": "Northeast", "area": 36923015700, "percent": 0.06467772308578106 },
    { "id": 67, "type":"Wetland", "region": "Northern Great Plains", "area": 27366824700, "percent": 0.022481187535594232 },
    { "id": 68, "type":"Wetland", "region": "Northwest", "area": 8661528e3, "percent": 0.013198560382579234 },
    { "id": 69, "type":"Wetland", "region": "Southeast", "area": 201003354600, "percent": 0.14314441426213498 },
    { "id": 70, "type":"Wetland", "region": "Southern Great Plains", "area": 28598644800, "percent": 0.02624393388696925 },
    { "id": 71, "type":"Wetland", "region": "Southwest", "area": 13498704e3, "percent": 0.00746145661130587 }
];


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

initStackedBarChart.draw({
    data: NLCD,
    element: 'stacked-bar'
});

