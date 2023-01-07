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

export const Astar = (source, destination) => {
    var initialState = source;
    var goalState = destination;

    var graph = {
        "Peshawar": new Node(
          "Peshawar",
          null,
          [
            ["Nowshera", 44.5],
            ["Mardan", 67.3],
            ["Kohat", 71],
          ],
          [ 71.56, 34.02 ], 0
        ),
        "Nowshera": new Node(
          "Nowshera",
          null,
          [
            ["Peshawar", 44.5],
            ["Attock", 56.1],
          ],
          [ 71.97, 34.01], 0
        ),
        "Mardan": new Node(
          "Mardan",
          null,
          [
            ["Peshawar", 44.5],
            ["Wah", 95],
          ],
          [ 72.02, 34.21 ], 0
        ),
        "Attock": new Node(
          "Attock",
          null,
          [
            ["Nowshera", 56.1],
            ["Fateh Jang", 40.5],
          ],
          [ 72.36, 33.77 ], 0
        ),
        "Wah": new Node(
          "Wah",
          null,
          [
            ["Mardan", 95],
            ["Islamabad", 53.3],
          ],
          [ 72.72, 33.78 ], 0
        ),
        "Fateh Jang": new Node(
          "Fateh Jang",
          null,
          [
            ["Attock", 40.5],
            ["Islamabad", 46.1],
          ],
          [ 72.65, 33.75 ], 0
        ),
        "Islamabad": new Node(
          "Islamabad",
          null,
          [
            ["Wah", 53.3],
            ["Fateh Jang", 46.1],
            ["Mianwali", 219.6],
            ["Rawalpindi", 23.3],
            ["Lahore", 374.1],
          ],
          [ 73.08, 33.73 ], 0
        ),
        "Kohat": new Node(
          "Kohat",
          null,
          [
            ["Peshawar", 71],
            ["Dera Ismail Khan", 232.5],
          ],
          [ 71.44, 33.59 ], 0
        ),
        "Rawalpindi": new Node(
          "Rawalpindi",
          null,
          [
            ["Islamabad", 23.2],
            ["Sargodha", 235.6],
          ],
          [ 73.07, 33.63 ], 0
        ),
        "Mianwali": new Node(
          "Mianwali",
          null,
          [
            ["Islamabad", 219.6],
            ["Dera Ismail Khan", 122.3],
          ],
          [ 71.54, 32.58 ], 0
        ),
        "Dera Ismail Khan": new Node(
          "Dera Ismail Khan",
          null,
          [
            ["Mianwali", 122.3],
            ["Quetta", 557.3],
            ["Kohat", 232.5],
          ],
          [ 70.3, 31.86 ], 0
        ),
        "Sargodha": new Node(
          "Sargodha",
          null,
          [
            ["Rawalpindi", 235.6],
            ["Faisalabad", 130.3],
            ["Lahore", 187.2],
          ],
          [ 72.67, 32.08 ], 0
        ),
        "Faisalabad": new Node(
          "Faisalabad",
          null,
          [
            ["Sargodha", 130.3],
            ["Lahore", 154.3],
            ["Multan", 242.6],
          ],
          [ 73.14, 31.45 ], 0
        ),
        "Lahore": new Node(
          "Lahore",
          null,
          [
            ["Faisalabad", 154.3],
            ["Multan", 338.1],
            ["Islamabad", 374.1],
            ["Sargodha", 187.2],
          ],
          [ 74.33, 31.58 ], 0
        ),
        "Multan": new Node(
          "Multan",
          null,
          [
            ["Lahore", 338.1],
            ["Faisalabad", 242.6],
            ["Sukkur", 433.5],
          ],
          [ 71.49, 30.18 ], 0
        ),
        "Sukkur": new Node(
          "Sukkur",
          null,
          [
            ["Multan", 433.5],
            ["Sibbi", 238.7],
            ["Hyderabad", 316.4],
          ],
          [ 68.84, 27.71 ], 0
        ),
        "Sibbi": new Node(
          "Sibbi",
          null,
          [
            ["Sukkur", 238.7],
            ["Quetta", 385.7],
          ],
          [ 67.88, 29.55 ], 0
        ),
        "Hyderabad": new Node(
          "Hyderabad",
          null,
          [
            ["Sukkur", 316.4],
            ["Karachi", 163.4],
          ],
          [ 68.37, 25.39 ], 0
        ),
        "Karachi": new Node(
          "Karachi",
          null,
          [
            ["Hyderabad", 163.4],
            ["Gwadar", 622.3],
            ["Quetta", 685.6],
          ],
          [ 67, 24.68 ], 0
        ),
        "Gwadar": new Node(
          "Gwadar",
          null,
          [
            ["Karachi", 622.3],
            ["Quetta", 911.9],
          ],
          [ 62.32, 25.13 ], 0
        ),
        "Quetta": new Node(
          "Quetta",
          null,
          [
            ["Sibbi", 385.7],
            ["Karachi", 685.6],
            ["Gwadar", 911.9],
            ["Dera Ismail Khan", 557.3],
          ],
          [ 66.97, 30.18 ], 0
        ),
      };

    var frontier = new Object();
    var heuristicCost = Math.sqrt(Math.pow(graph[goalState].heuristic[0] - graph[initialState].heuristic[0], 2) + Math.pow(graph[goalState].heuristic[1] - graph[initialState].heuristic[1], 2));
    frontier[initialState] = [null, heuristicCost];
    var explored = new Object();

    while (Object.keys(frontier).length != 0) {
        var currentNode = findMin(frontier);
        delete frontier[currentNode];

        if (graph[currentNode].state == goalState) {
            return actionSequence(graph, goalState);
        }

        heuristicCost = Math.sqrt(Math.pow(graph[goalState].heuristic[0] - graph[currentNode].heuristic[0], 2) + Math.pow(graph[goalState].heuristic[1] - graph[currentNode].heuristic[1], 2));
        var currentCost = graph[currentNode].totalCost;
        explored[currentNode] = [graph[currentNode].parent, heuristicCost + currentCost];

        for (let i in graph[currentNode].actions) {
            var child = graph[currentNode].actions[i];
            currentCost = child[1] + graph[currentNode].totalCost;
            heuristicCost = Math.sqrt(Math.pow(graph[goalState].heuristic[0] - graph[child[0]].heuristic[0], 2) + Math.pow(graph[goalState].heuristic[1] - graph[child[0]].heuristic[1], 2));
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