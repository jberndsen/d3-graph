
const generateBackground = (svg, nodes) => {

  const levels = d3.nest()
        .key((d) =>  d.level)
        .rollup((v) => v.length)
        .entries(nodes);

  const getLevelHeight = (totalNodes, nodeNum) => ((CANVAS_HEIGHT / 100) * ((100 / totalNodes) * nodeNum))

  let offset = 0;

  return svg
    .selectAll('g.nodes')
    .data(levels)

    .enter()
      .append("rect")
      .attr("width", "100%")
      .attr("height", (d, i) => getLevelHeight(nodes.length, d.value))
      .attr('transform', (d, i) => {
        var val = `translate(0, ${offset})`
        offset = offset + getLevelHeight(nodes.length, d.value);
        return val;
      })
      .attr("fill", (d, i) => {
        return i % 2 === 0 ? colors.yellow : colors.red;
      })

};
