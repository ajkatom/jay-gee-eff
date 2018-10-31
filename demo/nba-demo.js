const { JGFContainer } = require('../index');

const program = async () => {
    console.log('Building the NBA JGF Graph...');
    let container = new JGFContainer(singleGraph = true);
    let graph = container.graph;
    graph.type = 'sports';
    graph.label = 'NBA Demo Graph';

    const node1Id = 'LeBron James';
    const node1Label = 'NBAPlayer';

    const node2Id = 'LA Lakers';
    const node2Label = 'NBATeam';

    const playerContractLabel = 'Plays for';

    console.log('Adding two nodes...');
    graph.addNode(node1Id, node1Label);
    graph.addNode(node2Id, node2Label);

    console.log('Adding an edge...');
    graph.addEdge(node1Id, node2Id, playerContractLabel);

    console.log('Saving to file...');
    await container.saveToFile('./demo/nba-graph.json');

    console.log('-- DONE --');
};

(async () => {
    await program();
})();