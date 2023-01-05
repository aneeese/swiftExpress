class Node {
    constructor(state, parent, actions, heuristic, totalCost) {
        this.state = state;
        this.parent = parent;
        this.actions = actions;
        this.heuristic = heuristic;
        this.totalCost = totalCost;
    }
}

function findMin(frontier) {
    var minV = Math.pow(10, 1000);
    var node = '';
    for (var i in frontier) {
        if (minV > frontier[i][1]) {
            minV = frontier[i][1];
            node = i;
        }
    }
    return node;
}

function actionSequence(graph, goalState) {
    let solution = [goalState];
    let currentParent = graph[goalState].parent;
    while (currentParent != null) {
        solution.push(currentParent);
        currentParent = graph[currentParent].parent;
    }
    solution.reverse();
    return solution;
}

function Astar() {
    var initialState = "A";
    var goalState = "J";

    var graph = {
        'A': new Node('A', null, [['B', 6], ['F', 3]], 10, 0),
        'B': new Node('B', null, [['A', 6], ['C', 3], ['D', 2]], 8, 0),
        'C': new Node('C', null, [['B', 3], ['D', 1], ['E', 5]], 5, 0),
        'D': new Node('D', null, [['B', 2], ['E', 8], ['C', 1]], 7, 0),
        'E': new Node('E', null, [['C', 5], ['D', 8], ['I', 5], ['J', 5]], 3, 0),
        'F': new Node('F', null, [['A', 3], ['G', 1], ['H', 7]], 6, 0),
        'G': new Node('G', null, [['F', 1], ['I', 3]], 5, 0),
        'H': new Node('H', null, [['F', 7], ['I', 2]], 3, 0),
        'I': new Node('I', null, [['G', 3], ['H', 2], ['E', 5], ['J', 3]], 1, 0),
        'J': new Node('J', null, [['E', 5], ['I', 3]], 0, 0)
    }

    var frontier = new Object();
    var heuristicCost = graph[initialState].heuristic;
    frontier[initialState] = [null, heuristicCost];
    var explored = new Object();

    while (Object.keys(frontier).length != 0) {
        var currentNode = findMin(frontier);
        delete frontier[currentNode];

        if (graph[currentNode].state == goalState) {
            return actionSequence(graph, goalState);
        }

        heuristicCost = graph[currentNode].heuristic;
        var currentCost = graph[currentNode].totalCost;
        explored[currentNode] = [graph[currentNode].parent, heuristicCost + currentCost];

        for (let i in graph[currentNode].actions) {
            var child = graph[currentNode].actions[i];
            currentCost = child[1] + graph[currentNode].totalCost;
            heuristicCost = graph[child[0]].heuristic;
            if (child[0] in explored) {
                if (graph[child[0]].parent == currentNode || child[0] == initialState || explored[child[0]][1] <= currentCost + heuristicCost) {
                    continue;
                }
            }

            if (!(child[0] in frontier)) {
                graph[child[0]].parent = currentNode;
                graph[child[0]].totalCost = currentCost;
                frontier[child[0]] = [graph[child[0]].parent, currentCost + heuristicCost]; 
            }
            else {
                if (frontier[child[0]][1] < currentCost + heuristicCost) {
                    graph[child[0]].parent = frontier[child[0]][0];
                    graph[child[0]].totalCost = frontier[child[0]][1] - heuristicCost;
                }
                else {
                    frontier[child[0]] = [currentNode, currentCost + heuristicCost];
                    graph[child[0]].parent = frontier[child[0]][0];
                    graph[child[0]].totalCost = currentCost;
                }
            }
        }
    }
}

console.log("Solution: " + Astar());