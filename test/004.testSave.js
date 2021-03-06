const chai = require('chai');
const assert = chai.assert;
const { JGFContainer } = require('../jgfContainer');
const fsExtra = require('fs-extra');
const path = require('path');

/* eslint no-invalid-this: 0 */

describe('ContainerSaveToFile', () => {
    describe('#saveToFile-onenode', () => {
        beforeEach(async() => {
            this.currentTest = {};
            this.currentTest.filename = './test/temp/test-onenode.json';
            await fsExtra.ensureDir(path.dirname(this.currentTest.filename));
            if (await fsExtra.exists(this.currentTest.filename)) {
                await fsExtra.remove(this.currentTest.filename);
            }
        })

        it('should save a graph that only has one node to a file', async () => {
            let container = new JGFContainer(singleGraph = true);
            let graph = container.graph;

            const nodeId = 'LeBron James';
            const nodeLabel = 'NBAPlayer';

            graph.addNode(nodeId, nodeLabel);

            await container.saveToFile(this.currentTest.filename);

            assert.equal(true, await fsExtra.exists(this.currentTest.filename));
            const stats = await fsExtra.stat(this.currentTest.filename);
            const fileSizeInBytes = stats.size;
            assert.notEqual(0, fileSizeInBytes);

            const fileContent = await fsExtra.readJson(this.currentTest.filename);
            assert.equal(1, fileContent.graph.nodes.length);
        })
    })

    describe('#saveToFile-full', () => {
        beforeEach(async () => {
            this.currentTest = {};
            this.currentTest.filename = './test/temp/test-multinodes.json';
            await fsExtra.ensureDir(path.dirname(this.currentTest.filename));
            if (await fsExtra.exists(this.currentTest.filename)) {
                await fsExtra.remove(this.currentTest.filename);
            }
        })

        it('should save a graph that has multiple nodes and edges to a file', async () => {
            let container = new JGFContainer(singleGraph = true);
            let graph = container.graph;

            const node1Id = 'Kyrie Irving';
            const node1Label = 'NBAPlayer';
            graph.addNode(node1Id, node1Label);

            const node2Id = 'Boston Celtics';
            const node2Label = 'NBATeam';
            graph.addNode(node2Id, node2Label);

            const edgeLabel = 'Plays for';
            graph.addEdge(node1Id, node2Id, edgeLabel);

            await container.saveToFile(this.currentTest.filename);

            assert.equal(true, await fsExtra.exists(this.currentTest.filename));

            const fileContent = await fsExtra.readJson(this.currentTest.filename);
            assert.equal(2, fileContent.graph.nodes.length);
            assert.equal(1, fileContent.graph.edges.length);
        })
    })

});