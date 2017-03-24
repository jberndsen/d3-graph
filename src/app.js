// read data
d3.json('data/data-nodes.json', nodes => {
    d3.json('data/data-links.json', links => {
        // helper methods
        pointToTranslate = point => `translate(${point[0]}, ${point[1]})`;

        getNodeById = id => nodes.filter(x => x.id === id)[0];

        getDepth = (node) => {
            const parentsInLevel = getParents(node).filter(parent => parent.level === node.level);

            if (!parentsInLevel || parentsInLevel.length === 0) {
                return 1;
            } else {
                return Math.max(...parentsInLevel
                    .map(parent => 1 + getDepth(parent)));
            }
        }

        getParents = (node) => links.filter(link => link.to === node.id).map(link => getNodeById(link.from));

        getNodePosition = (node) => {
            const myDepth = getDepth(node);
            const sameDepth = nodes.filter(n => getDepth(n) === myDepth);
            
            const horizontalPos = sameDepth.indexOf(node) * NODE_WIDTH * 1.2;
            const verticalPos = (myDepth - 1) * NODE_HEIGHT * 1.2;
            
            return [ horizontalPos, verticalPos];
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
