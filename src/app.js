// NODES
d3.json('data-nodes.json', data => {
    console.log(data);
    // var node = d3.select('graph')
    //     .append('svg')
    //         .attr('width', 800)
    //         .attr('height', 600)
    //     .selectAll('g')
    //     .data()
    //     .enter()
    //         .append('g')
    //         .attr('transform', (d, i) => `translate(0, ${i * 50})`);

    // node.append('rect')
    //     .attr('class', 'node');

    // node.append('text')
    //     .attr('y', 20)
    //     .text(d => d.name);
});