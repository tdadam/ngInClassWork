angular.module('app', [])
    .directive('d3Bars', function(){
        return {
            restrict: 'EA',
            scope: {},
            //link or compile, using link here
            link: function(scope, element, attrs){
                //d3 code here
                var d3Bars = initializeD3Bars();
                var data = [{letter: 'A', frequency: .08167}, {letter: 'B', frequency: .01492}];
                d3Bars.x.domain(data.map(function (d) {
                    return d.letter;
                }));
                d3Bars.y.domain([0, d3.max(data, function (d) {
                    return d.frequency;
                })]);
                d3Bars.svg.selectAll(".bar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d) {
                        return d3Bars.x(d.letter);
                    })
                    .attr("width", d3Bars.x.rangeBand())
                    .attr("y", function (d) {
                        return d3Bars.y(d.frequency);
                    })
                    .attr("height", function (d) {
                        return d3Bars.height - d3Bars.y(d.frequency);
                    })
                    .on('mouseover', d3Bars.tip.show)
                    .on('mouseout', d3Bars.tip.hide)
            }
        };
        function initializeD3Bars() {
            var margin = {top: 40, right: 20, bottom: 30, left: 40},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            var formatPercent = d3.format(".0%");
            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);
            var y = d3.scale.linear()
                .range([height, 0]);
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(formatPercent);
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function (d) {
                    return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
                });
            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            svg.call(tip);
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Frequency");

            return {
                margin: margin,
                width: width,
                height: height,
                formatPercent: formatPercent,
                x: x,
                y: y,
                xAxis: xAxis,
                yAxis: yAxis,
                tip: tip,
                svg: svg
            };
        }
    });