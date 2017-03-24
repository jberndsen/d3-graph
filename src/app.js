// read data
d3.json('data-nodes.json', nodes => {
    d3.json('data-links.json', links => {
        // create the SVG
        const svg = d3
            .select('.graph')
            .append('svg')
                .attr('width', 800)
                .attr('height', 600);

        // create the nodes
        const node = svg
            .selectAll('g.nodes')
            .data(nodes)
            .enter()
                .append('g')
                .attr('transform', (d, i) => `translate(0, ${i * 50})`);

        node.append('rect')
            .attr('class', 'nodes');

        node.append('text')
            .attr('y', 20)
            .text(d => d.goal);

        // create the graph links
        const link = svg
            .selectAll('g.links')
            .data(links)
            .enter()
                .append('g')
                .attr('transform', (d, i) => `translate(0, ${i * 60})`);


        link.append("circle")
            .attr("r", 10)
            .style("fill", "red");
    })
});