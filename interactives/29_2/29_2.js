(function () {
    'use strict';

    var margin = 5;

    function getSize(d) {
        return d.size;
    }

    function sortByValue(a, b) {
        return b.value - a.value;
    }

    function makeHierarchy(data) {
        return d3.hierarchy(data)
            .sum(getSize)
            .sort(sortByValue);
    }

    function makePack(width, height) {
        return d3.pack()
            .size([width, height])
            .padding(2);
    }

    function makeTransition(svg, currentView, newView, zoomToView) {
        return svg.transition()
            .duration(750)
            .tween("zoom", function() {
                var i = d3.interpolateZoom(currentView, newView);
                return function(t) { zoomToView(i(t)); };
            });
    }

    function pieGenerator(value) {
        var remainingPercent = 100 - value;
        return d3.pie().sort(null)([value, remainingPercent]);
    }

    function pieArcGenerator(radius) {
        var INNER_RADIUS = 0;
        return d3.arc()
            .innerRadius(INNER_RADIUS)
            .outerRadius(radius);
    }

    function createPieWrapper(elem, width, height) {
        return d3.select(elem)
            .attr('width', width)
            .attr('height', height)
    }

    function getPieSliceColorClass(d) {
        var classes = ['pie-slice pie-slice--avoided', 'pie-slice pie-slice--damages'];
        return classes[d.index];
    }

    function drawPieSlices(wrapper, pieData, arcHandler) {
        wrapper.selectAll('path')
            .data(pieData)
            .enter().append('path')
            .attr('d', arcHandler)
            .attr('class', getPieSliceColorClass);
    }

    function addBackgroundRect(wrapper, yAdjustment) {
        var bBox = wrapper.node().getBBox();
        var width = bBox.width;
        var height = bBox.height;
        var xPadding = 20;
        var yPadding = 10;
        var xOffset = xPadding / 2;
        var yOffset = (yPadding / 2) + yAdjustment; // SVG positioning is weird
    
        wrapper.insert('rect', ':first-child')
            .attr('width', width + xPadding)
            .attr('height', height + yPadding)
            .attr('x', -(width / 2) - xOffset)
            .attr('y', -(height / 2) - yOffset)
            .attr('class', 'pie-text--scalable')
            .attr('fill', '#fff')
            .style('opacity', '.5');
    }

    function drawRCPLabel(wrapper, type, valueText, tooltipText, xOffset, yOffset) {
        var rcpWrap = wrapper.append('g')
            .attr('class', 'pie-text--wrap pie-text--wrap--' + type)
            .attr('transform', 'translate(' + xOffset + ' ' + yOffset + ')');

        var rcpWrapText = rcpWrap.append('text')
            .attr('class', 'pie-text--scalable')

        var rcpValue = rcpWrapText.append('tspan')
            .attr('class', 'pie-text--value')
            .text(valueText)
            .attr('x', 0)

        var rcpTooltip = rcpWrapText.append('tspan')
            .attr("class", 'pie-text--tooltip')
            .text(tooltipText)
            .attr('dy', '20')
            .attr('x', 0)

        addBackgroundRect(rcpWrap, -5);
    }

    function drawRCP8Label(wrapper, radius, valueText) {
        var TOOLTIP_TEXT = '(damages in 2090 under RCP8.5)';
        var xOffset = '0';
        var yOffset = (-(radius * .76)).toString();

        drawRCPLabel(wrapper, 'rcp8', valueText, TOOLTIP_TEXT, xOffset, yOffset);
    }

    function drawRCP4Label(wrapper, radius, valueText) {
        var TOOLTIP_TEXT = '(damages avoided under RCP4.5)';
        var xOffset = (radius / 2).toString();
        var yOffset = (-(radius * .4)).toString();

        drawRCPLabel(wrapper, 'rcp4', valueText, TOOLTIP_TEXT, xOffset, yOffset);
    }

    function drawPieLabels(wrapper, radius, title, rcp8, rcp4) {
        var textGroup = wrapper.append("g")
            .attr("class", 'pie-text')
            .attr("width", radius * 2)
            .attr("height", radius * 2)
            .style('display', 'none')
            .attr('text-anchor', 'middle')

        var titleWrap = textGroup.append('g')
            .attr("class", 'pie-text--title')
            .attr('transform', 'translate(0 ' + (-(radius * .88)).toString() + ')')
        titleWrap.append("text")
            .attr("class", 'pie-text--scalable')
            .text(title)
        addBackgroundRect(titleWrap, 10);

        drawRCP8Label(textGroup, radius, rcp8);
        drawRCP4Label(textGroup, radius, rcp4);
    }

    function createPie() {
        var height = null;
        var width = null;
        var radius = 90;

        function exports (selection) {
            selection.each(function (datum) {
                var pies = pieGenerator(datum.data.avoided);
                var arc = pieArcGenerator(radius);
                var wrapper = createPieWrapper(this, width, height);

                drawPieSlices(wrapper, pies, arc);
                drawPieLabels(wrapper, radius, datum.data.name, datum.data.rcp8, datum.data.rcp4);
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

        return exports
    }

    function getPieLabel(d) {
        return d.data.name;
    }

    function chartBuilder(radius) {
        var diameter = radius * 2;
        return createPie()
            .width(diameter)
            .height(diameter)
            .radius(radius);
    }

    function getElemDimensions(dimensions) {
        return function (d, i) {
            var bBox = this.getBBox();
            dimensions.push({ 'width': bBox.width, 'height': bBox.height });
            this.remove();
        }
    }

    function getTextDimensions(g, nodes) {
        var dimensions = [];

        g.selectAll("text.dimensionPlaceholder")
            .data(nodes)
            .enter().append("text")
            .attr("class", "dimensionPlaceholder")
            .style("display", "inline")
            .text(getPieLabel)
            .each(getElemDimensions(dimensions));

        return dimensions;
    }

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

    function makeFocusArray(focus, isPie) {
        return [
            focus.x,
            focus.y,
            focus.r * 2 + (isPie ? margin / (focus.depth + 1) : margin)
        ];
    }

    function makeCircleNode(g, node, clickHandler) {
        var circNode = g.append("circle")
            .attr("r", node.r)
            .datum(node)
            .attr("class", function (d) { return d.parent ? "node" : "node node--root"; })
            .on("click", clickHandler);
    }

    function makePieNodeClass(node) {
        return "pie-chart--" + node.data["class"];
    }

    function makePieNode(g, node, clickHandler) {
        var chart = chartBuilder(node.r);
        d3.select(g.node())
            .datum(node)
            .call(chart)
            .attr("class", "pie-chart " + makePieNodeClass(node))
            .on("click", clickHandler);
    }

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

    function makeTextNodes(g, nodes, root) {
        var dimensions = getTextDimensions(g, nodes);

        g.selectAll("rect.label")
            .data(nodes)
            .enter().append("rect")
            .attr("class", "label")
            .style('fill', '#fff')
            .style("fill-opacity", function(d) { return d.parent === root ? .5 : 0; })
            .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
            .each(function(d, i) {
                if (!getPieLabel(d)) {
                    this.remove();
                }
                var rect = d3.select(this);
                rect.attr("width", dimensions[i].width + 20);
                rect.attr("height", dimensions[i].height + 10);
                rect.attr("x", -(dimensions[i].width + 20) / 2);
                rect.attr("y", -(dimensions[i].height + 20) / 2);
            })

        g.selectAll("text.label")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
            .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
            .text(getPieLabel);
    }

    function makeTranslateFunction(elementData, focusX, focusY, scale) {
        return "translate(" + (elementData.x - focusX) * scale + "," + (elementData.y - focusY) * scale + ")";
    }

    function makeScaleFunction(scale) {
        return "scale(" + scale + ")";
    }

    function translateCommonNodes(svg, focusX, focusY, scale) {
        svg.selectAll("circle, text.label, rect.label, .pie-text")
            .attr("transform", function (d) {
                return makeTranslateFunction(d, focusX, focusY, scale);
            });
    }

    function scalePieCharts(svg, focusX, focusY, scale) {
        svg.selectAll(".pie-chart")
            .attr("transform", function(d) {
                return makeTranslateFunction(d, focusX, focusY, scale) + " " + makeScaleFunction(scale);
            });
    }

    function resizeCircles(svg, scale) {
        svg.selectAll("circle")
            .attr("r", function(d) {
                return d.r * scale;
            });
    }

    function scalePieChartText(svg, focusX, focusY, scale) {
        svg.selectAll(".pie-text--scalable")
            .attr("transform", function(d) {
                return makeTranslateFunction(d, focusX, focusY, scale) + " " + makeScaleFunction(1 / scale);
            });
    }


    function zoomTo(v, svg, diameter) {
        var k = diameter / v[2];
        translateCommonNodes(svg, v[0], v[1], k);
        scalePieCharts(svg, v[0], v[1], k);
        resizeCircles(svg, k);
        scalePieChartText(svg, v[0], v[1], k);
    }

    function getPieFigureWrapper(d) {
        return d3.select(d.node().closest(".circle-nodes-wrapper"));
    }

    function triggerPieChartClick(elem, className) {
        getPieFigureWrapper(d3.select(elem))
            .select("." + className)
            .dispatch("click");
    }

    function triggerPieChartZoomOut (elem) {
        getPieFigureWrapper(d3.select(elem)).select("svg").dispatch("click");
    }

    function triggerPieChartLinkReset(elem) {
        d3.select(elem.parentNode)
            .select(".circle-nodes-table--link:first-child")
            .node().focus();
    }

    function handlePieChartLinkClick(d) {
        d3.event.stopPropagation();
        triggerPieChartClick(this, makePieNodeClass(d));
    }

    function handlePieChartLinkKeypress(d) {
        if (d3.event.key !== "Enter") {
            return;
        }
        d3.event.stopPropagation();
        triggerPieChartClick(this, makePieNodeClass(d));
    }

    function handlePieChartResetLinkClick() {
        d3.event.stopPropagation();
        triggerPieChartLinkReset(this);
    }

    function handlePieChartResetLinkKeypress() {
        if (d3.event.key !== "Enter") {
            return;
        }
        d3.event.stopPropagation();
        triggerPieChartLinkReset(this);
    }

    function handlePieChartSelectChange() {
        d3.event.stopPropagation();
        var value = d3.select(this).property("value");
        if (value !== "zoom_out") {
            triggerPieChartClick(this, d3.select(this).property("value"));
        } else {
            triggerPieChartZoomOut(this);
        }
    }

    function createPieChartsAltUI(nodes, svg) {
        var table = getPieFigureWrapper(svg).select(".circle-nodes-table");

        table.selectAll("a.circle-nodes-table--link")
            .data(nodes)
            .enter().insert("a", ":last-child")
            .attr("class", "circle-nodes-table--link")
            .attr("data-for", makePieNodeClass)
            .attr("tabindex", 0)
            .text(getPieLabel)
            .on("click", handlePieChartLinkClick)
            .on("keypress", handlePieChartLinkKeypress);

        getPieFigureWrapper(svg).select(".figure_29_2_reset")
            .on("click", handlePieChartResetLinkClick)
            .on("keypress", handlePieChartResetLinkKeypress);

        var select = getPieFigureWrapper(svg).select(".circle-nodes-select")
            .on("change", handlePieChartSelectChange);

        select.selectAll("option.circle-nodes-select--option")
            .data(nodes)
            .enter().insert("option", ":last-child")
            .attr("class", "circle-nodes-select--option")
            .attr("value", makePieNodeClass)
            .text(getPieLabel);

    }

    function createPieChartsFigure() {
        var PROCESSED_CLASS = "pie-charts-processed";
        if (this.classList.contains(PROCESSED_CLASS)) {
            return;
        }

        var svg = d3.select(this);
        svg.classed(PROCESSED_CLASS, true);

        var diameter = +svg.attr("width");

        var view;
        var focus;

        function handleCircleZoom(dElem) {
            if (focus !== dElem) {
                zoom(dElem);
                d3.event.stopPropagation();
            }
        }

        function setView(v) {
            view = v;
        }

        function setFocus(d) {
            focus = d;
        }

        function zoomToView(v) {
            setView(v);
            zoomTo(v, svg, diameter);
        }

        function zoom(d) {
            setFocus(d);
            var isPie = getPieLabel(d) !== "" ? true : false;
            handleTextZoom(makeTransition(svg, view, makeFocusArray(d, isPie), zoomToView), d);
        }

        function processJsonFile(error, root) {
            if (error) {
                throw error;
            }

            var g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

            var rootNode = makeHierarchy(root);
            setFocus(rootNode);

            var packedNodes = makePack(diameter - margin, diameter - margin)(rootNode);

            makeCircleNodes(g, packedNodes, handleCircleZoom);
            makeTextNodes(g, packedNodes.descendants(), rootNode);
            zoomToView([rootNode.x, rootNode.y, rootNode.r * 2 + margin]);

            createPieChartsAltUI(packedNodes.descendants().filter(getPieLabel), svg);

            svg.on("click", function() { zoom(rootNode); });
        }

        d3.json("../../interactives/29_2/29_2.json", processJsonFile);
    }

    d3.selectAll(".figure-29_2--svg").each(createPieChartsFigure);
})();
