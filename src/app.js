// read data
d3.json('data-nodes.json', nodes => {
    d3.json('data-links.json', links => {
        // helper methods
        pointToTranslate = point => `translate(${point[0]}, ${point[1]})`;

        getNodeById = id => nodes.filter(x => x.id === id)[0];

        getNodePosition = (node) => {
            nodesAtLevel = nodes.filter(x => x.level === node.level);
            positionInLevel = nodesAtLevel.indexOf(node);
            return [ positionInLevel * (NODE_WIDTH + 10),
                     (node.level - 1) * (NODE_HEIGHT + 50)];
        };

        getNodeCenterPoint = node => {
            const nodePosition = getNodePosition(node);
            const x = nodePosition[0] + NODE_WIDTH / 2;
            const y = nodePosition[1] + NODE_HEIGHT / 2;
            return [x, y];
        }

        // create the SVG
        const svg = d3
            .select('.graph')
            .append('svg')
                .attr('width', CANVAS_WIDTH)
                .attr('height', CANVAS_HEIGHT);

        // generate levelled background
        generateBackground(svg, nodes);

        // create the graph links
        const link = svg
            .selectAll('g.links')
            .data(links)
            .enter()
                .append('g');

        link.append("line")
            .attr('class', 'links')
            .attr('x1', d => getNodeCenterPoint(getNodeById(d.from))[0])
            .attr('y1', d => getNodeCenterPoint(getNodeById(d.from))[1])
            .attr('x2', d => getNodeCenterPoint(getNodeById(d.to))[0])
            .attr('y2', d => getNodeCenterPoint(getNodeById(d.to))[1]);

        // create the nodes
        const node = svg
            .selectAll('g.nodes')
            .data(nodes)
            .enter()
                .append('g')
                .attr('transform', (d, i) => pointToTranslate(getNodePosition(d, i)));

        node.append('rect')
            .attr('fill', colors.green)
            .attr('class', 'nodes')
            .attr('width', NODE_WIDTH)
            .attr('height', NODE_HEIGHT);

        node.append('text')
            .attr('x', 33)
            .attr('y', 25)
            .text(d => d.goal);
    })
});
