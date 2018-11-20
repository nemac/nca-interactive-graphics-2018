(function () {
    var states = [
        { "id": 0, "type": "Transportation", "region": "Alabama", "percent": 2 },
        { "id": 1, "type": "Energy Efficiency", "region": "Alabama", "percent": 1 },
        { "id": 2, "type": "Non-CO2 GHG", "region": "Alabama", "percent": 1 },
        { "id": 3, "type": "Forestry and Land Use", "region": "Alabama", "percent": 1 },
        { "id": 4, "type": "Renewable/CCS/Nuclear", "region": "Alaska", "percent": 1 },
        { "id": 5, "type": "Energy Efficiency", "region": "Alaska", "percent": 1 },
        { "id": 6, "type": "Non-CO2 GHG", "region": "Alaska", "percent": 1 },
        { "id": 7, "type": "Forestry and Land Use", "region": "Alaska", "percent": 1 },
        { "id": 8, "type": "GHG Target/Cap/Pricing", "region": "Arizona", "percent": 1 },
        { "id": 9, "type": "Renewable/CCS/Nuclear", "region": "Arizona", "percent": 1 },
        { "id": 10, "type": "Transportation", "region": "Arizona", "percent": 2 },
        { "id": 11, "type": "Energy Efficiency", "region": "Arizona", "percent": 3 },
        { "id": 12, "type": "Non-CO2 GHG", "region": "Arizona", "percent": 1 },
        { "id": 13, "type": "Renewable/CCS/Nuclear", "region": "Arkansas", "percent": 1 },
        { "id": 14, "type": "Transportation", "region": "Arkansas", "percent": 1 },
        { "id": 15, "type": "Energy Efficiency", "region": "Arkansas", "percent": 1 },
        { "id": 16, "type": "Forestry and Land Use", "region": "Arkansas", "percent": 2 },
        { "id": 17, "type": "GHG Target/Cap/Pricing", "region": "California", "percent": 2 },
        { "id": 18, "type": "Renewable/CCS/Nuclear", "region": "California", "percent": 2 },
        { "id": 19, "type": "Transportation", "region": "California", "percent": 10 },
        { "id": 20, "type": "Energy Efficiency", "region": "California", "percent": 4 },
        { "id": 21, "type": "Non-CO2 GHG", "region": "California", "percent": 5 },
        { "id": 22, "type": "Forestry and Land Use", "region": "California", "percent": 2 },
        { "id": 23, "type": "GHG Target/Cap/Pricing", "region": "Colorado", "percent": 1 },
        { "id": 24, "type": "Renewable/CCS/Nuclear", "region": "Colorado", "percent": 3 },
        { "id": 25, "type": "Transportation", "region": "Colorado", "percent": 4 },
        { "id": 26, "type": "Energy Efficiency", "region": "Colorado", "percent": 3 },
        { "id": 27, "type": "Non-CO2 GHG", "region": "Colorado", "percent": 3 },
        { "id": 28, "type": "Forestry and Land Use", "region": "Colorado", "percent": 2 },
        { "id": 29, "type": "GHG Target/Cap/Pricing", "region": "Connecticut", "percent": 2 },
        { "id": 30, "type": "Renewable/CCS/Nuclear", "region": "Connecticut", "percent": 2 },
        { "id": 31, "type": "Transportation", "region": "Connecticut", "percent": 6 },
        { "id": 32, "type": "Energy Efficiency", "region": "Connecticut", "percent": 3 },
        { "id": 33, "type": "Non-CO2 GHG", "region": "Connecticut", "percent": 3 },
        { "id": 34, "type": "Forestry and Land Use", "region": "Connecticut", "percent": 2 },
        { "id": 35, "type": "GHG Target/Cap/Pricing", "region": "Delaware", "percent": 1 },
        { "id": 36, "type": "Renewable/CCS/Nuclear", "region": "Delaware", "percent": 1 },
        { "id": 37, "type": "Transportation", "region": "Delaware", "percent": 4 },
        { "id": 38, "type": "Energy Efficiency", "region": "Delaware", "percent": 1 },
        { "id": 39, "type": "Forestry and Land Use", "region": "Delaware", "percent": 3 },
        { "id": 40, "type": "GHG Target/Cap/Pricing", "region": "Florida", "percent": 1 },
        { "id": 41, "type": "Renewable/CCS/Nuclear", "region": "Florida", "percent": 2 },
        { "id": 42, "type": "Transportation", "region": "Florida", "percent": 5 },
        { "id": 43, "type": "Energy Efficiency", "region": "Florida", "percent": 2 },
        { "id": 44, "type": "Transportation", "region": "Georgia", "percent": 4 },
        { "id": 45, "type": "Energy Efficiency", "region": "Georgia", "percent": 2 },
        { "id": 46, "type": "Forestry and Land Use", "region": "Georgia", "percent": 2 },
        { "id": 47, "type": "GHG Target/Cap/Pricing", "region": "Hawaii", "percent": 1 },
        { "id": 48, "type": "Renewable/CCS/Nuclear", "region": "Hawaii", "percent": 1 },
        { "id": 49, "type": "Transportation", "region": "Hawaii", "percent": 2 },
        { "id": 50, "type": "Energy Efficiency", "region": "Hawaii", "percent": 2 },
        { "id": 51, "type": "Non-CO2 GHG", "region": "Hawaii", "percent": 1 },
        { "id": 52, "type": "Forestry and Land Use", "region": "Hawaii", "percent": 1 },
        { "id": 53, "type": "Transportation", "region": "Idaho", "percent": 3 },
        { "id": 54, "type": "Non-CO2 GHG", "region": "Idaho", "percent": 1 },
        { "id": 55, "type": "Forestry and Land Use", "region": "Idaho", "percent": 1 },
        { "id": 56, "type": "GHG Target/Cap/Pricing", "region": "Illinois", "percent": 1 },
        { "id": 57, "type": "Renewable/CCS/Nuclear", "region": "Illinois", "percent": 3 },
        { "id": 58, "type": "Transportation", "region": "Illinois", "percent": 2 },
        { "id": 59, "type": "Energy Efficiency", "region": "Illinois", "percent": 2 },
        { "id": 60, "type": "Non-CO2 GHG", "region": "Illinois", "percent": 1 },
        { "id": 61, "type": "Forestry and Land Use", "region": "Illinois", "percent": 1 },
        { "id": 62, "type": "Renewable/CCS/Nuclear", "region": "Indiana", "percent": 2 },
        { "id": 63, "type": "Transportation", "region": "Indiana", "percent": 3 },
        { "id": 64, "type": "Energy Efficiency", "region": "Indiana", "percent": 1 },
        { "id": 65, "type": "Non-CO2 GHG", "region": "Indiana", "percent": 1 },
        { "id": 66, "type": "Renewable/CCS/Nuclear", "region": "Iowa", "percent": 1 },
        { "id": 67, "type": "Transportation", "region": "Iowa", "percent": 2 },
        { "id": 68, "type": "Energy Efficiency", "region": "Iowa", "percent": 2 },
        { "id": 69, "type": "Non-CO2 GHG", "region": "Iowa", "percent": 2 },
        { "id": 70, "type": "Forestry and Land Use", "region": "Iowa", "percent": 1 },
        { "id": 71, "type": "Renewable/CCS/Nuclear", "region": "Kansas", "percent": 2 },
        { "id": 72, "type": "Transportation", "region": "Kansas", "percent": 3 },
        { "id": 73, "type": "Energy Efficiency", "region": "Kansas", "percent": 1 },
        { "id": 74, "type": "Renewable/CCS/Nuclear", "region": "Kentucky", "percent": 2 },
        { "id": 75, "type": "Transportation", "region": "Kentucky", "percent": 2 },
        { "id": 76, "type": "Energy Efficiency", "region": "Kentucky", "percent": 1 },
        { "id": 77, "type": "Non-CO2 GHG", "region": "Kentucky", "percent": 2 },
        { "id": 78, "type": "Renewable/CCS/Nuclear", "region": "Lousiana", "percent": 1 },
        { "id": 79, "type": "GHG Target/Cap/Pricing", "region": "Maine", "percent": 2 },
        { "id": 80, "type": "Renewable/CCS/Nuclear", "region": "Maine", "percent": 1 },
        { "id": 81, "type": "Transportation", "region": "Maine", "percent": 5 },
        { "id": 82, "type": "Energy Efficiency", "region": "Maine", "percent": 1 },
        { "id": 83, "type": "GHG Target/Cap/Pricing", "region": "Maryland", "percent": 2 },
        { "id": 84, "type": "Renewable/CCS/Nuclear", "region": "Maryland", "percent": 2 },
        { "id": 85, "type": "Transportation", "region": "Maryland", "percent": 7 },
        { "id": 86, "type": "Energy Efficiency", "region": "Maryland", "percent": 4 },
        { "id": 87, "type": "Forestry and Land Use", "region": "Maryland", "percent": 1 },
        { "id": 88, "type": "GHG Target/Cap/Pricing", "region": "Massachusetts", "percent": 2 },
        { "id": 89, "type": "Renewable/CCS/Nuclear", "region": "Massachusetts", "percent": 2 },
        { "id": 90, "type": "Transportation", "region": "Massachusetts", "percent": 6 },
        { "id": 91, "type": "Energy Efficiency", "region": "Massachusetts", "percent": 3 },
        { "id": 92, "type": "Non-CO2 GHG", "region": "Massachusetts", "percent": 1 },
        { "id": 93, "type": "Forestry and Land Use", "region": "Massachusetts", "percent": 2 },
        { "id": 94, "type": "GHG Target/Cap/Pricing", "region": "Michigan", "percent": 1 },
        { "id": 95, "type": "Renewable/CCS/Nuclear", "region": "Michigan", "percent": 3 },
        { "id": 96, "type": "Transportation", "region": "Michigan", "percent": 6 },
        { "id": 97, "type": "Energy Efficiency", "region": "Michigan", "percent": 2 },
        { "id": 98, "type": "GHG Target/Cap/Pricing", "region": "Minnesota", "percent": 1 },
        { "id": 99, "type": "Renewable/CCS/Nuclear", "region": "Minnesota", "percent": 2 },
        { "id": 100, "type": "Transportation", "region": "Minnesota", "percent": 4 },
        { "id": 101, "type": "Energy Efficiency", "region": "Minnesota", "percent": 2 },
        { "id": 102, "type": "Forestry and Land Use", "region": "Minnesota", "percent": 1 },
        { "id": 103, "type": "Renewable/CCS/Nuclear", "region": "Mississippi", "percent": 1 },
        { "id": 104, "type": "Transportation", "region": "Mississippi", "percent": 3 },
        { "id": 105, "type": "Non-CO2 GHG", "region": "Mississippi", "percent": 1 },
        { "id": 106, "type": "Forestry and Land Use", "region": "Mississippi", "percent": 1 },
        { "id": 107, "type": "Renewable/CCS/Nuclear", "region": "Missouri", "percent": 1 },
        { "id": 108, "type": "Transportation", "region": "Missouri", "percent": 2 },
        { "id": 109, "type": "Energy Efficiency", "region": "Missouri", "percent": 1 },
        { "id": 110, "type": "Non-CO2 GHG", "region": "Missouri", "percent": 1 },
        { "id": 111, "type": "Forestry and Land Use", "region": "Missouri", "percent": 2 },
        { "id": 112, "type": "Renewable/CCS/Nuclear", "region": "Montana", "percent": 2 },
        { "id": 113, "type": "Transportation", "region": "Montana", "percent": 2 },
        { "id": 114, "type": "Energy Efficiency", "region": "Montana", "percent": 1 },
        { "id": 115, "type": "Non-CO2 GHG", "region": "Montana", "percent": 1 },
        { "id": 116, "type": "Forestry and Land Use", "region": "Montana", "percent": 1 },
        { "id": 117, "type": "Renewable/CCS/Nuclear", "region": "Nebraska", "percent": 1 },
        { "id": 118, "type": "Energy Efficiency", "region": "Nebraska", "percent": 1 },
        { "id": 119, "type": "Non-CO2 GHG", "region": "Nebraska", "percent": 1 },
        { "id": 120, "type": "Forestry and Land Use", "region": "Nebraska", "percent": 1 },
        { "id": 121, "type": "Renewable/CCS/Nuclear", "region": "Nevada", "percent": 1 },
        { "id": 122, "type": "Energy Efficiency", "region": "Nevada", "percent": 3 },
        { "id": 123, "type": "Forestry and Land Use", "region": "Nevada", "percent": 1 },
        { "id": 124, "type": "GHG Target/Cap/Pricing", "region": "New Hampshire", "percent": 2 },
        { "id": 125, "type": "Renewable/CCS/Nuclear", "region": "New Hampshire", "percent": 2 },
        { "id": 126, "type": "Transportation", "region": "New Hampshire", "percent": 1 },
        { "id": 127, "type": "Energy Efficiency", "region": "New Hampshire", "percent": 3 },
        { "id": 128, "type": "Non-CO2 GHG", "region": "New Hampshire", "percent": 1 },
        { "id": 129, "type": "GHG Target/Cap/Pricing", "region": "New Jersey", "percent": 1 },
        { "id": 130, "type": "Renewable/CCS/Nuclear", "region": "New Jersey", "percent": 2 },
        { "id": 131, "type": "Transportation", "region": "New Jersey", "percent": 4 },
        { "id": 132, "type": "Energy Efficiency", "region": "New Jersey", "percent": 2 },
        { "id": 133, "type": "Non-CO2 GHG", "region": "New Jersey", "percent": 1 },
        { "id": 134, "type": "GHG Target/Cap/Pricing", "region": "New Mexico", "percent": 1 },
        { "id": 135, "type": "Renewable/CCS/Nuclear", "region": "New Mexico", "percent": 2 },
        { "id": 136, "type": "Transportation", "region": "New Mexico", "percent": 3 },
        { "id": 137, "type": "Energy Efficiency", "region": "New Mexico", "percent": 2 },
        { "id": 138, "type": "Forestry and Land Use", "region": "New Mexico", "percent": 1 },
        { "id": 139, "type": "GHG Target/Cap/Pricing", "region": "New York", "percent": 2 },
        { "id": 140, "type": "Renewable/CCS/Nuclear", "region": "New York", "percent": 3 },
        { "id": 141, "type": "Transportation", "region": "New York", "percent": 5 },
        { "id": 142, "type": "Energy Efficiency", "region": "New York", "percent": 3 },
        { "id": 143, "type": "Non-CO2 GHG", "region": "New York", "percent": 1 },
        { "id": 144, "type": "Forestry and Land Use", "region": "New York", "percent": 1 },
        { "id": 145, "type": "Renewable/CCS/Nuclear", "region": "North Carolina", "percent": 1 },
        { "id": 146, "type": "Transportation", "region": "North Carolina", "percent": 3 },
        { "id": 147, "type": "Energy Efficiency", "region": "North Carolina", "percent": 1 },
        { "id": 148, "type": "Non-CO2 GHG", "region": "North Carolina", "percent": 1 },
        { "id": 149, "type": "Forestry and Land Use", "region": "North Carolina", "percent": 1 },
        { "id": 150, "type": "Renewable/CCS/Nuclear", "region": "North Dakota", "percent": 1 },
        { "id": 151, "type": "Transportation", "region": "North Dakota", "percent": 1 },
        { "id": 152, "type": "Renewable/CCS/Nuclear", "region": "Ohio", "percent": 2 },
        { "id": 153, "type": "Transportation", "region": "Ohio", "percent": 3 },
        { "id": 154, "type": "Energy Efficiency", "region": "Ohio", "percent": 1 },
        { "id": 155, "type": "Forestry and Land Use", "region": "Ohio", "percent": 3 },
        { "id": 156, "type": "Renewable/CCS/Nuclear", "region": "Oklahoma", "percent": 2 },
        { "id": 157, "type": "Transportation", "region": "Oklahoma", "percent": 2 },
        { "id": 158, "type": "Energy Efficiency", "region": "Oklahoma", "percent": 2 },
        { "id": 159, "type": "Non-CO2 GHG", "region": "Oklahoma", "percent": 1 },
        { "id": 160, "type": "GHG Target/Cap/Pricing", "region": "Oregon", "percent": 1 },
        { "id": 161, "type": "Renewable/CCS/Nuclear", "region": "Oregon", "percent": 2 },
        { "id": 162, "type": "Transportation", "region": "Oregon", "percent": 4 },
        { "id": 163, "type": "Energy Efficiency", "region": "Oregon", "percent": 4 },
        { "id": 164, "type": "Non-CO2 GHG", "region": "Oregon", "percent": 2 },
        { "id": 165, "type": "Forestry and Land Use", "region": "Oregon", "percent": 1 },
        { "id": 166, "type": "Renewable/CCS/Nuclear", "region": "Pennsylvania", "percent": 1 },
        { "id": 167, "type": "Transportation", "region": "Pennsylvania", "percent": 5 },
        { "id": 168, "type": "Energy Efficiency", "region": "Pennsylvania", "percent": 2 },
        { "id": 169, "type": "Non-CO2 GHG", "region": "Pennsylvania", "percent": 1 },
        { "id": 170, "type": "GHG Target/Cap/Pricing", "region": "Rhode Island", "percent": 2 },
        { "id": 171, "type": "Renewable/CCS/Nuclear", "region": "Rhode Island", "percent": 2 },
        { "id": 172, "type": "Transportation", "region": "Rhode Island", "percent": 6 },
        { "id": 173, "type": "Energy Efficiency", "region": "Rhode Island", "percent": 3 },
        { "id": 174, "type": "Non-CO2 GHG", "region": "Rhode Island", "percent": 2 },
        { "id": 175, "type": "Forestry and Land Use", "region": "Rhode Island", "percent": 1 },
        { "id": 176, "type": "Transportation", "region": "South Carolina", "percent": 1 },
        { "id": 177, "type": "Energy Efficiency", "region": "South Carolina", "percent": 1 },
        { "id": 178, "type": "Renewable/CCS/Nuclear", "region": "South Dakota", "percent": 1 },
        { "id": 179, "type": "Transportation", "region": "South Dakota", "percent": 2 },
        { "id": 180, "type": "Energy Efficiency", "region": "South Dakota", "percent": 1 },
        { "id": 181, "type": "Non-CO2 GHG", "region": "South Dakota", "percent": 1 },
        { "id": 182, "type": "Forestry and Land Use", "region": "South Dakota", "percent": 1 },
        { "id": 183, "type": "Renewable/CCS/Nuclear", "region": "Tennessee", "percent": 1 },
        { "id": 184, "type": "Transportation", "region": "Tennessee", "percent": 4 },
        { "id": 185, "type": "Energy Efficiency", "region": "Tennessee", "percent": 1 },
        { "id": 186, "type": "Renewable/CCS/Nuclear", "region": "Texas", "percent": 3 },
        { "id": 187, "type": "Energy Efficiency", "region": "Texas", "percent": 4 },
        { "id": 188, "type": "Renewable/CCS/Nuclear", "region": "Utah", "percent": 3 },
        { "id": 189, "type": "Transportation", "region": "Utah", "percent": 4 },
        { "id": 190, "type": "Energy Efficiency", "region": "Utah", "percent": 1 },
        { "id": 191, "type": "GHG Target/Cap/Pricing", "region": "Vermont", "percent": 2 },
        { "id": 192, "type": "Renewable/CCS/Nuclear", "region": "Vermont", "percent": 1 },
        { "id": 193, "type": "Transportation", "region": "Vermont", "percent": 6 },
        { "id": 194, "type": "Energy Efficiency", "region": "Vermont", "percent": 3 },
        { "id": 195, "type": "Non-CO2 GHG", "region": "Vermont", "percent": 2 },
        { "id": 196, "type": "Forestry and Land Use", "region": "Vermont", "percent": 1 },
        { "id": 197, "type": "Renewable/CCS/Nuclear", "region": "Virginia", "percent": 2 },
        { "id": 198, "type": "Transportation", "region": "Virginia", "percent": 4 },
        { "id": 199, "type": "Energy Efficiency", "region": "Virginia", "percent": 2 },
        { "id": 200, "type": "Non-CO2 GHG", "region": "Virginia", "percent": 2 },
        { "id": 201, "type": "Forestry and Land Use", "region": "Virginia", "percent": 2 },
        { "id": 202, "type": "GHG Target/Cap/Pricing", "region": "Washington", "percent": 1 },
        { "id": 203, "type": "Renewable/CCS/Nuclear", "region": "Washington", "percent": 2 },
        { "id": 204, "type": "Transportation", "region": "Washington", "percent": 5 },
        { "id": 205, "type": "Energy Efficiency", "region": "Washington", "percent": 4 },
        { "id": 206, "type": "Forestry and Land Use", "region": "Washington", "percent": 3 },
        { "id": 207, "type": "Transportation", "region": "West Virginia", "percent": 4 },
        { "id": 208, "type": "Forestry and Land Use", "region": "West Virginia", "percent": 1 },
        { "id": 209, "type": "Renewable/CCS/Nuclear", "region": "Wisconsin", "percent": 2 },
        { "id": 210, "type": "Transportation", "region": "Wisconsin", "percent": 5 },
        { "id": 211, "type": "Energy Efficiency", "region": "Wisconsin", "percent": 2 },
        { "id": 212, "type": "Non-CO2 GHG", "region": "Wisconsin", "percent": 1 },
        { "id": 213, "type": "Forestry and Land Use", "region": "Wisconsin", "percent": 1 },
        { "id": 214, "type": "Renewable/CCS/Nuclear", "region": "Wyoming", "percent": 1 },
        { "id": 215, "type": "Transportation", "region": "Wyoming", "percent": 1 },
        { "id": 216, "type": "Forestry and Land Use", "region": "Wyoming", "percent": 1 }
    ];

    function getWrapper(svg) {
        return d3.select(svg.node().closest(".graphic--stacked-bar"))
    }

    function typeColor(type) {
        switch (type) {
        case "GHG Target/Cap/Pricing":
            return "#00794e";
        case "Renewable/CCS/Nuclear":
            return "#509cd4";
        case "Transportation":
            return "#7e2864";
        case "Energy Efficiency":
            return "#ffbe00";
        case "Non-CO2 GHG":
            return "#02507b";
        case "Forestry and Land Use":
            return "#6fab45";
        }
    }

    var tip = d3.tip()
        .attr('class', 'd3-tip graphic--stacked-bar--tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<div><strong>State:</strong> <span>" + d.data.region + "</span></div>" +
                "<div><strong>Activity:</strong> <span>" + d.data.type + "</span></div>" +
                "<div><strong>No. Cities:</strong> <span>" + d.data.percent + "</span></div>"
        });

    function makeYDomain(data) {
        var a = data.map(function (d) { return d.region;})
        var temp = {};
        for (var i = 0; i < a.length; i++)
            temp[a[i]] = true;
        return Object.keys(temp);
    }

    function makeYDomainBySector(data, sector) {
        var a = data.filter(function (d) { return d.type === sector; }).map(function (d) { return d.region;})
        var b = data.filter(function (d) { return a.indexOf(d.region) === -1; }).map(function (d) { return d.region;})
        var temp = {};
        var i, l;
        for (i = 0, l = b.length; i < l; i++) {
            temp[b[i]] = true;
        }
        for (i = 0, l = a.length; i < l; i++) {
            temp[a[i]] = true;
        }
        return Object.keys(temp);
    }

    function stackData(data) {
        var stackedData = [];

        data.forEach(function (d) {
            var x0 = 0;
            var x1 = 0;

            d.values.forEach(function (v) {
                x0 = x1;
                x1 += v.percent;
                var processedData = [x0, x1];
                processedData["data"] = v;
                stackedData.push(processedData);
            });
        });

        return stackedData;
    }

    function orderDataBySector(data, sector) {
        data.sort(function (a, b) {
            if (a.type === sector && b.type === sector) {
                return a.percent - b.percent;
            } else if (a.type === sector) {
                return -1;
            } else if (b.type === sector) {
                return 1;
            } else {
                return 1;
            }
        })
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
                .attr("height", y.bandwidth());
    }

    function handleTransitions(data, sector, rects, x, y, yAxis) {
        orderDataBySector(data, sector);
    
        var yDomain = makeYDomainBySector(data, sector);
        y.domain(yDomain);

        var groupedData = d3.nest().key(function (d) { return d.region; }).entries(data);
        var stackedData = stackData(groupedData);

        stackedToStacked(rects, stackedData, x, y);

        yAxis.transition().duration(300).call(d3.axisLeft(y))
    }

    function getActiveRegionY(index) {
        var sidebarHeight = 536; // height - margintop - marginbottom
        var tickRegionOffset = 7; // I dunno where this is from. But it's the top and bottom pixel offset
        var regions = 50; // Number of regions
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

    var initStackedBarChart = {
        draw: function(config) {
            var sector = undefined;

            var wrapper = d3.select(config.wrapper);
            var domEle = config.element;
            var data = config.data.reverse();
            var margin = {top: 5, right: 22, bottom: 45, left: 145};

            var width = 720 - margin.left - margin.right;
            var height = 1146 - margin.top - margin.bottom;

            var x = d3.scaleLinear().rangeRound([0, width])
                .domain([0, 30]).nice();
            var y = d3.scaleBand().rangeRound([height, 0]).padding(.3)
                .domain(makeYDomain(data));

            var svg = wrapper.select("."+domEle).append("svg")
                .attr("viewBox", "0 0 " +
                      (width + margin.left + margin.right) + " " +
                      (height + margin.top + margin.bottom)
                     )
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.call(tip);

            var groupedData = d3.nest().key(function (d) { return d.region; }).entries(data);
            var stackedData = stackData(groupedData);
        
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
                .call(d3.axisBottom(x));

            var xAxisLabel = xAxis.append("text")
                .attr("class", "axis--label axis--label--x")
                .attr("transform", "translate(" + (width/2) + ",40)")
                .text("Number of Activities");
        
            var yAxis = svg.append("g")
                .attr("class", "axis axis--y")
                .attr("transform", "translate(0,0)")
                .call(d3.axisLeft(y));

            function triggerTypeReorder() {
                var newSector = this.getAttribute("data-for");
                if (newSector === sector) {
                    return;
                }

                sector = newSector;

                wrapper.select(".legend-item--" + sector.toLowerCase().replace(/\//g, "-").replace(/\ /g, "-")).lower();
                handleTransitions(data, sector, rects, x, y, yAxis);
            }

            function triggerTypeReorderKeypress() {
                if (d3.event.key !== "Enter") {
                    return;
                }
                d3.event.stopPropagation();
                triggerTypeReorder.call(this);
            }

            wrapper.selectAll(".graphic--stacked-bar--legend a").on("click", triggerTypeReorder);
            wrapper.selectAll(".graphic--stacked-bar--legend a").on("keypress", triggerTypeReorderKeypress);
        }
    }

    d3.selectAll(".figure--29_1").each(function () {
        initStackedBarChart.draw({
            data: states,
            element: 'stacked-bar',
            wrapper: this
        });
    });

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
})();
