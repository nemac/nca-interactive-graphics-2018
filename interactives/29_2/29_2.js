(function () {
    'use strict';

    var margin = 5;

    function getSize(d) {
        return d.size;
    }

    function sortByValue(a, b) {
        return b.value - a.value;
    }

    // Preprocesses the data to be passed to d3's circle packing functionality.
    function makeHierarchy(data) {
        return d3.hierarchy(data)
            .sum(getSize)
            .sort(sortByValue);
    }

    // Processes the data for d3's circle packing, creates the x, y, and radius of each
    // data point.
    function makePack(width, height) {
        return d3.pack()
            .size([width, height])
            .padding(2);
    }

    // Creates the transition that zooms between the selected circle. Tween lets the
    // transition be smooth and follow the interpolation
    function makeTransition(svg, currentView, newView, zoomToView) {
        return svg.transition()
            .duration(750)
            .tween("zoom", function() {
                var i = d3.interpolateZoom(currentView, newView);
                return function(t) { zoomToView(i(t)); };
            });
    }

    // Computes the angles for each pie chart to be drawn
    function pieGenerator(value) {
        var remainingPercent = 100 - value;
        return d3.pie().sort(null)([value, remainingPercent]);
    }

    // Handles the drawing of the arc for each pie chart segment
    function pieArcGenerator(radius) {
        var INNER_RADIUS = 0;
        return d3.arc()
            .innerRadius(INNER_RADIUS)
            .outerRadius(radius);
    }

    // Sets up the attributes on the pie wrapper
    function createPieWrapper(elem, width, height) {
        return d3.select(elem)
            .attr('width', width)
            .attr('height', height)
    }

    // Returns classes for each segment of the pie charts
    function getPieSliceColorClass(d) {
        var classes = ['pie-slice pie-slice--avoided', 'pie-slice pie-slice--damages'];
        return classes[d.index];
    }

    // Draws all segments of the pie charts
    function drawPieSlices(wrapper, pieData, arcHandler) {
        wrapper.selectAll('path')
            .data(pieData)
            .enter().append('path')
            .attr('d', arcHandler)
            .attr('class', getPieSliceColorClass);
    }

    // Adds a partially transparent rectangle behind all inner pie text
    function addBackgroundRect(wrapper, yAdjustment) {
        var bBox = wrapper.node().getBBox();
        var width = bBox.width;
        var height = bBox.height;
        var xPadding = 20;
        var yPadding = 10;
        var xOffset = xPadding / 2;
    
        wrapper.insert('rect', ':first-child')
            .attr('width', width + xPadding)
            .attr('height', height + yPadding)
            .attr('x', -(width / 2) - xOffset)
            .attr('y', -30 + yAdjustment)
            .attr('class', 'pie-text--scalable')
            .attr('fill', '#fff')
            .style('opacity', '.5');
    }

    // Draws the RCP4 & RCP8 descriptive text
    function drawRCPLabel(wrapper, type, valueText, tooltipText, xOffset, yOffset, range) {
        var rcpWrap = wrapper.append('g')
            .attr('class', 'pie-text--wrap pie-text--wrap--' + type)
            .attr('transform', 'translate(' + xOffset + ' ' + yOffset + ')');

        var rcpWrapText = rcpWrap.append('text')
            .attr('class', 'pie-text--scalable')

        rcpWrapText.append('tspan')
            .attr('class', 'pie-text--value')
            .text(valueText)
            .attr('x', 0)

        tooltipText.forEach(function (t, i) {
            rcpWrapText.append('tspan')
                .attr("class", 'pie-text--tooltip')
                .text(t)
                .attr('dy', (i === 0) ? 30 : 25)
                .attr('x', 0)
        })

        if (range) {
            var rangeText = rcpWrap.append('text')
                .attr('class', 'pie-text--scalable')
                .attr("y", 100);

            rangeText.append('tspan')
                .attr('class', 'pie-text--value')
                .text(range)

            rangeText.append("tspan")
                .text("projection range low and high")
                .attr("class", 'pie-text--tooltip')
                .attr("x", 0)
                .attr("dy", 30)
        }

        addBackgroundRect(rcpWrap, 0);
    }

    // Sets up parameters needed by drawRCPLabel to draw the RCP8 descriptive text
    function drawRCP8Label(wrapper, radius, valueText, range) {
        var TOOLTIP_TEXT = ["average damages in 2090", "under RCP8.5"];
        var xOffset = (-radius / 2).toString();
        var yOffset = (-(radius * .4)).toString();

        drawRCPLabel(wrapper, 'rcp8', valueText, TOOLTIP_TEXT, xOffset, yOffset, range);
    }

    // Sets up parameters needed by drawRCPLabel to draw the RCP4 descriptive text
    function drawRCP4Label(wrapper, radius, valueText, range) {
        var TOOLTIP_TEXT = ["average damages avoided", "under RCP4.5"];
        var xOffset = (radius / 2).toString();
        var yOffset = (-(radius * .4)).toString();

        drawRCPLabel(wrapper, 'rcp4', valueText, TOOLTIP_TEXT, xOffset, yOffset, range);
    }

    // Draws all of the text which is seen when a user click inside a circle
    function drawPieLabels(wrapper, radius, title, rcp8, rcp4, rcp8Range, rcp4Range) {
        var textGroup = wrapper.append("g")
            .attr("class", 'pie-text')
            .attr("width", radius * 2)
            .attr("height", radius * 2)
            .style('display', 'none')
            .attr('text-anchor', 'middle')

        var titleWrap = textGroup.append('g')
            .attr("class", 'pie-text--title')
            .attr('transform', 'translate(0 ' + (-(radius * .63)).toString() + ')')
        titleWrap.append("text")
            .attr("class", 'pie-text--scalable')
            .text(title)
        addBackgroundRect(titleWrap, -15);

        drawRCP8Label(textGroup, radius, rcp8, rcp8Range);
        drawRCP4Label(textGroup, radius, rcp4, rcp4Range);
    }

    // Handles the drawing and metadata of pie charts. This is made as a function to allow
    // for the storage and retreval of private variables for each pie chart
    function createPie() {
        var height = null;
        var width = null;
        var radius = 90;

        function exports (selection) {
            selection.each(function (datum) {
                var data = datum.data;
                var pies = pieGenerator(data.avoided);
                var arc = pieArcGenerator(radius);
                var wrapper = createPieWrapper(this, width, height);

                drawPieSlices(wrapper, pies, arc);
                drawPieLabels(wrapper, radius, data.name, data.rcp8, data.rcp4, data.rcp8Range, data.rcp4Range);
            });
        }

        exports.height = function (value) {
            height = value;
            return this;
        }

        exports.width = function (value) {
            width = value;
            return this;
        }

        exports.radius = function (value) {
            radius = value;
            return this;
        }

        return exports;
    }

    // Gets the label for a node
    function getPieLabel(d) {
        return d.data.name;
    }

    // Either hides or displays all text in the graphic based on where the user is currently focused.
    function handleTextZoom(transition, focus) {
        transition.selectAll("text.label")
            .filter(function (d) { return d.parent === focus || this.style.display === 'inline'; })
            .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
            .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });

        transition.selectAll("rect.label")
            .filter(function (d) { return d.parent === focus || this.style.display === 'inline'; })
            .style("fill-opacity", function(d) { return d.parent === focus ? .5 : 0; })
            .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });

        transition.selectAll(".pie-text")
            .on("start", function(d) { this.style.display = "none"; })
            .on("end", function(d) { if (d === focus) this.style.display = "inline"; })
    }

    // Builds array of data that determines where the user is looking. Gives an x coordinate, y
    // coordinate, and relative scale.
    function makeFocusArray(focus, isPie) {
        return [
            focus.x,
            focus.y,
            focus.r * 2 + (isPie ? margin / (focus.depth + 1) : margin)
        ];
    }

    // Creates the outer "blue" circles that contain each group of pie charts
    function makeCircleNode(g, node, clickHandler) {
        var circNode = g.append("circle")
            .attr("r", node.r)
            .datum(node)
            .attr("class", function (d) { return d.parent ? "node" : "node node--root"; })
            .on("click", clickHandler);
    }

    // Creates wrapper class for a pie chart
    function makePieNodeClass(node) {
        return "pie-chart--" + node.data["class"];
    }

    // Returns function which will build out the pie chart when called
    function chartBuilder(radius) {
        var diameter = radius * 2;
        return createPie()
            .width(diameter)
            .height(diameter)
            .radius(radius);
    }

    // Builds each individual pie chart
    function makePieNode(g, node, clickHandler) {
        var chart = chartBuilder(node.r);
        d3.select(g.node())
            .datum(node)
            .call(chart)
            .attr("class", "pie-chart " + makePieNodeClass(node))
            .on("click", clickHandler);
    }

    // Iterates over all of the data nodes and builds either circles or pie charts fpr each
    function makeCircleNodes(g, nodes, clickHandler) {
        nodes.each(function (datum) {
            var group = g.append("g");
            if (datum.hasOwnProperty("children")) {
                makeCircleNode(group, datum, clickHandler);
            } else {
                makePieNode(group, datum, clickHandler);
            }
        });
    }

    // Makes all of the labels that sit outside of un-zoomed-in circles
    function makeTextNodes(g, nodes, root, diameter, margin) {
        var outerTitles = g.selectAll("g.outer-text")
            .data(nodes.filter(getPieLabel))
            .enter().append("g")
            .attr("class", function (d) { return "outer-text " + d.data["class"]})
            .each(function (d, i) {
                var gt = d3.select(this);
                var outerLabel = d.data.outerLabel

                var t = gt.append("text")
                    .attr("class", "label pie-text--outer")
                    .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
                    .style("display", "inline")
                    .attr("y", function (d, i) { return ((-d.r * .53) * (diameter / (d.parent.r * 2 + margin))).toString(); })
                if (outerLabel) {
                    outerLabel.forEach(function(l, i) {
                        t.append("tspan")
                            .text(l)
                            .attr("dy", 36 * i)
                            .attr("x", 0)
                    })
                } else {
                    t.text(getPieLabel)
                }

                var bBox = gt.node().getBBox();
                var width = bBox.width;
                var height = bBox.height;

                gt.insert("rect", ":first-child")
                    .attr("class", "label pie-text--outer")
                    .style('fill', '#fff')
                    .style("fill-opacity", function(d) { return d.parent === root ? .5 : 0; })
                    .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
                    .attr("width", function (d, i) { return width + 20; })
                    .attr("height", function (d, i) { return height + 10; })
                    .attr("x", function (d, i) { return -(width + 20) / 2; })
                    .attr("y", function (d, i) { return -(
                        (d.r * .53) * (diameter / (d.parent.r * 2 + margin)) +
                            (height + 25) / (2 * (outerLabel ? outerLabel.length - .5 : 1))) })

                t.style("display", function(d) { return d.parent === root ? "inline" : "none"; });
            });
    }

    // Makes the translate function that is used in the transform for elements on zoom
    function makeTranslateFunction(elementData, focusX, focusY, scale) {
        return "translate(" + (elementData.x - focusX) * scale + "," + (elementData.y - focusY) * scale + ")";
    }

    // Makes the scale function that is used in the transform for elements on zoom
    function makeScaleFunction(scale) {
        return "scale(" + scale + ")";
    }

    // Moves the circles and inner text into the correct positions on zoom
    function translateCommonNodes(svg, focusX, focusY, scale) {
        svg.selectAll("circle, .pie-text")
            .attr("transform", function (d) {
                return makeTranslateFunction(d, focusX, focusY, scale);
            });
    }

    // Moves the pie charts and outer text into the correct positions on zoom
    function scalePieCharts(svg, focusX, focusY, scale) {
        svg.selectAll(".pie-chart")
            .attr("transform", function(d) {
                return makeTranslateFunction(d, focusX, focusY, scale) + " " + makeScaleFunction(scale);
            });

        svg.selectAll(".outer-text")
            .attr("transform", function(d) {
                return makeTranslateFunction(d, focusX, focusY, scale) + " " + makeScaleFunction(scale);
            })

        svg.selectAll(".pie-text--outer")
            .attr("transform", function(d) {
                return makeScaleFunction(1 / scale);
            })
    }

    // Scales the circles on zoom
    function resizeCircles(svg, scale) {
        svg.selectAll("circle")
            .attr("r", function(d) {
                return d.r * scale;
            });
    }

    // resizes and repositions the text inside of pie charts
    function scalePieChartText(svg, focusX, focusY, scale) {
        svg.selectAll(".pie-text--scalable")
            .attr("transform", function(d) {
                return makeTranslateFunction(d, focusX, focusY, scale) + " " + makeScaleFunction(1 / scale);
            });
    }

    // Handles all of the zooming and repositioning of the graphic
    //
    // @param v | Array. First two values are the pixel coordinates for the center of the new circle
    //            that is being focused on. Third value is its diameter plus the margin around it.
    function zoomTo(v, svg, diameter) {
        var k = diameter / v[2];
        translateCommonNodes(svg, v[0], v[1], k);
        scalePieCharts(svg, v[0], v[1], k);
        resizeCircles(svg, k);
        scalePieChartText(svg, v[0], v[1], k);
    }

    // Gets the parent wrapper of the graphic
    function getPieFigureWrapper(d) {
        return d3.select(d.node().closest(".circle-nodes-wrapper"));
    }

    // Handler for the extra text UI elements. Lets user zoom to specified pie chart.
    function triggerPieChartClick(elem, className) {
        getPieFigureWrapper(d3.select(elem))
            .select("." + className)
            .dispatch("click");
    }

    // Handler for the extra text UI elements.
    function triggerPieChartZoomOut (elem) {
        getPieFigureWrapper(d3.select(elem)).select("svg").dispatch("click");
    }

    // Dispatches click events for the text UI elements
    function handlePieChartLinkClick(d) {
        d3.event.stopPropagation();
        triggerPieChartClick(this, makePieNodeClass(d));
    }

    // Dispatches keypress events for the text UI elements
    function handlePieChartLinkKeypress(d) {
        if (d3.event.key !== "Enter") {
            return;
        }
        d3.event.stopPropagation();
        triggerPieChartClick(this, makePieNodeClass(d));
    }

    // Dispatches change events for the mobile select UI element
    function handlePieChartSelectChange() {
        d3.event.stopPropagation();
        var value = d3.select(this).property("value");
        if (value !== "zoom_out") {
            triggerPieChartClick(this, d3.select(this).property("value"));
        } else {
            triggerPieChartZoomOut(this);
        }
    }

    // Dispatches zoom out events for the text UI element
    function triggerZoomOut() {
        if (d3.event.key && d3.event.key !== "Enter") {
            return;
        }

        d3.event.stopPropagation();
        triggerPieChartZoomOut(this);
    }

    // Creates the links and options
    function createPieChartsAltUI(nodes, svg) {
        var table = getPieFigureWrapper(svg).select(".circle-nodes-table");

        table.selectAll("a.circle-nodes-table--link")
            .data(nodes)
            .enter().append("a")
            .attr("class", "circle-nodes-table--link")
            .attr("data-for", makePieNodeClass)
            .attr("tabindex", 0)
            .text(getPieLabel)
            .on("click", handlePieChartLinkClick)
            .on("keypress", handlePieChartLinkKeypress);

        table.insert("a", ":first-child")
            .text("Zoom Out")
            .attr("class", "circle-nodes-table--link circle-nodes-table--link--zoom-out")
            .attr("tabindex", 0)
            .on("click", triggerZoomOut)
            .on("keypress", triggerZoomOut);

        var select = getPieFigureWrapper(svg).select(".circle-nodes-select")
            .on("change", handlePieChartSelectChange);

        select.selectAll("option.circle-nodes-select--option")
            .data(nodes)
            .enter().insert("option", ":last-child")
            .attr("class", "circle-nodes-select--option")
            .attr("value", makePieNodeClass)
            .text(getPieLabel);
    }

    // Creates the graphic and stores state information about each instance
    function createPieChartsFigure() {
        var PROCESSED_CLASS = "pie-charts-processed";
        if (this.classList.contains(PROCESSED_CLASS)) {
            return;
        }

        var svg = d3.select(this);
        svg.classed(PROCESSED_CLASS, true);

        var diameter = +svg.attr("width");

        var view; // Tracks the x, y, and width of the currently displayed circle
        var focus; // Tracks the d3 data object of the currently displayed circle

        function setView(v) {
            view = v;
        }

        function setFocus(d) {
            focus = d;
        }

        // Zooms graphic to new location
        function zoomToView(v) {
            setView(v);
            zoomTo(v, svg, diameter);
        }

        // Dispaches zoom events
        function zoom(d) {
            setFocus(d);
            var isPie = getPieLabel(d) !== "" ? true : false;
            handleTextZoom(makeTransition(svg, view, makeFocusArray(d, isPie), zoomToView), d);
        }

        // Handler for the user clicking on one of the circles/pie charts
        function handleCircleZoom(dElem) {
            if (focus !== dElem) {
                d3.event.stopPropagation();
                zoom(dElem);
            }
        }

        // Processes data and creates graphic
        function processJsonFile(error, root) {
            if (error) {
                throw error;
            }

            var g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

            var rootNode = makeHierarchy(root);
            setFocus(rootNode);

            var packedNodes = makePack(diameter - margin, diameter - margin)(rootNode);

            makeCircleNodes(g, packedNodes, handleCircleZoom);
            makeTextNodes(g, packedNodes.descendants(), rootNode, diameter, margin);
            zoomToView([rootNode.x, rootNode.y, rootNode.r * 2 + margin]);

            createPieChartsAltUI(packedNodes.descendants().filter(getPieLabel), svg);

            svg.on("click", function() { zoom(rootNode); });
        }

        d3.json("../../interactives/29_2/29_2.json", processJsonFile);
    }

    d3.selectAll(".figure-29_2--svg").each(createPieChartsFigure);
})();

// Polyfill for Element.closest
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
