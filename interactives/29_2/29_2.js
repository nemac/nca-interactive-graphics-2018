(function () {
'use strict';

var svg = d3.select(".figure-29_2--svg");
var margin = 5;
var diameter = +svg.attr("width");
var g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

var pack = d3.pack()
    .size([diameter - margin, diameter - margin])
    .padding(2);

var circle;
var text;
var node;
var view;
var focus;

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

function makeCircleNode(g, node, zoom) {
    var circNode = g.append("circle")
        .attr("r", node.r)
        .datum(node)
            .attr("class", (function(d) { return d.parent ? d.children ? "node" : "node node--leaf node--leaf--" + d.data["class"] : "node node--root"; })(node))
            .on("click", (function (d) { return function(d) {
                if (focus !== d) {
                    zoom(d);
                    d3.event.stopPropagation();
                }
            }})(node));

    if (node.parent) {
        circNode.attr("tabindex", 0)
            .on("keypress", (function (d) { return function(d) {
                if (d3.event.key !== "Enter") {
                    return;
                }
                if (focus !== d) {
                    zoom(d);
                    d3.event.stopPropagation();
                }
            }})(node));
    }
//    console.log(node);
}

function chartBuilder(radius) {
    var diameter = radius * 2;
    return createPie()
        .width(diameter)
        .height(diameter)
        .radius(radius);
}

function makeCircleNodes(g, nodes, zoom) {
    nodes.each(function (datum) {
        var group = g.append("g");
        if (datum.hasOwnProperty("children")) {
             makeCircleNode(group, datum, zoom);
        } else {
            var chart = chartBuilder(datum.r);
            d3.select(group.node())
                .datum(datum)
                .call(chart)
                .attr("class", "pie-chart pie-chart--" + datum.data.name.toLowerCase().replace(/\s/g, "_"))
                .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); })
                .on("keypress", function (d) {
                    if (d3.event.key !== "Enter") {
                        return;
                    }
                    if (focus !== d) {
                        zoom(d);
                        d3.event.stopPropagation();
                    }
                });
        }
    })
}

function getPieLabel(d) {
    return d.data.name;
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
    var dimensionGetter = getElemDimensions(dimensions);

    g.selectAll("text.dimensionPlaceholder")
        .data(nodes)
        .enter().append("text")
        .attr("class", "dimensionPlaceholder")
        .style("display", "inline")
        .text(getPieLabel)
        .each(getElemDimensions(dimensions));

    return dimensions;
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

function makePieTextNodes(g, nodes, root) {
    var pieText = g.selectAll("g.pie-text")
        .data(nodes)
        .enter().append("g")
            .attr("class", "pie-text")
            .style("fill-opacity", function(d) { return d === root ? 1 : 0; })
            .style("display", function(d) { return d === root ? "inline" : "none"; })

    pieText.append("text").text("hi")
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

function zoom(d) {
    focus = d;
    var isPie = getPieLabel(d) !== "" ? true : false;

    var transition = d3.transition()
        .duration(750)
        .tween("zoom", function(d) {
            var i = d3.interpolateZoom(view, makeFocusArray(focus, isPie));
            return function(t) { zoomTo(i(t)); };
        });

    handleTextZoom(transition, focus);
}

function makeTranslateFunction(elementData, focusX, focusY, scale) {
    return "translate(" + (elementData.x - focusX) * scale + "," + (elementData.y - focusY) * scale + ")";
}

function makeScaleFunction(scale) {
    return "scale(" + scale + ")";
}

function resetPieTabs() {
    svg.selectAll('.pie-chart')
        .attr('tabindex', null)
}

function enablePieTabs() {
    resetPieTabs();
    svg.selectAll('.pie-chart')
        .filter(function (d) { return d.parent === focus; })
        .attr('tabindex', '0')
}

function zoomTo(v) {
    var k = diameter / v[2];
    view = v;
    node.attr("transform", function(d) { return makeTranslateFunction(d, v[0], v[1], k); });
    d3.selectAll(".pie-chart").attr("transform", function(d) { return makeTranslateFunction(d, v[0], v[1], k) + " " + makeScaleFunction(k);});
    circle.attr("r", function(d) { return d.r * k; });
    d3.selectAll(".pie-text--scalable").attr("transform", function(d) { return makeTranslateFunction(d, v[0], v[1], k) + " " + makeScaleFunction(1 / k); });

    enablePieTabs();
}

function processJsonFile(error, root) {
    if (error) {
        throw error;
    }

    root = d3.hierarchy(root)
        .sum(function(d) { return d.size; })
        .sort(function(a, b) { return b.value - a.value; });

    focus = root;
    var packednodes = pack(root);
    var nodes = pack(root).descendants();

    makeCircleNodes(g, packednodes, zoom);

    circle = g.selectAll("circle");
    makeTextNodes(g, nodes, root);
    node = g.selectAll("circle,text.label,rect.label,.pie-text");

    svg.on("click", function() { zoom(root); });

    zoomTo([root.x, root.y, root.r * 2 + margin]);
}

d3.json("../../interactives/29_2/29_2.json", processJsonFile);
})();
