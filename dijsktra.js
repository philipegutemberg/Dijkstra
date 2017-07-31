//Here we receive a graph that's a simple bidimensional array where array[0][1] shows the path`s cost from 0 to 1.
//Costs = -1 means there is no path between these two nodes 
module.exports.Dijkstra = function (graph, source, target) {
    var shortDistances = new Array(graph.length);
    shortDistances = shortDistances.map(function () { return undefined; });
    shortDistances[source] = new ShortDistance(0, source);

    var visitedNodes = [];

    shortDistances = fullFillNextNodesDistances(source, graph, shortDistances, visitedNodes, target);

    return buildFullBestPath(shortDistances, target, source);
};

var fullFillNextNodesDistances = function (currentNode, graph, shortDistances, visitedNodes, target) {
    var costToCurrentNode = shortDistances[currentNode].Cost;
    
    graph[currentNode].forEach(function (elem, index) {
        //I can't revisit nodes that already been visited. That could cause dangerous loop :s
        //Cost also need to be valued above -1 so we can have a valid path
        if (elem > -1 && visitedNodes.indexOf(index) < 0) {
            var costToVisitNode = costToCurrentNode + elem;

            if (shortDistances[index] == undefined || costToVisitNode < shortDistances[index].Cost) {
                shortDistances[index] = new ShortDistance(costToVisitNode, currentNode);
            }
        }
    });

    visitedNodes.push(currentNode);

    //If we already visited the target node, it doesn't make any sense to go on our journey. Nope! We stop right here in this case.
    if (visitedNodes.indexOf(target) < 0) {
        var indexOfBestCostSoFar = getIndexBestCostSoFar(shortDistances, visitedNodes);
        return fullFillNextNodesDistances(indexOfBestCostSoFar, graph, shortDistances, visitedNodes, target);
    } else {
        return shortDistances;
    }
};

var getIndexBestCostSoFar = function (shortDistances, visitedNodes) {
    //First we filter only the valued ones, and then only the ones who weren't visited
    var bestCost = shortDistances.filter(function (val, index) {
        return !!val && visitedNodes.indexOf(index) < 0;
    }).reduce(function (a, b) { 
        return a.Cost < b.Cost ? a : b;
    });

    //Once we have the best cost, all we have to do is get the index of it on the main array, so we can tell the caller what to do next
    return shortDistances.indexOf(bestCost);
};

function ShortDistance (cost, commingFrom) { this.Cost = cost; this.CommingFrom = commingFrom; };

var buildFullBestPath = function (shortDistances, target, source) {
    var path = [];

    return concatPath(shortDistances, shortDistances[target], source, path);
};

var concatPath = function (shortDistances, current, source, path) {
    if (shortDistances.indexOf(current) != source)
        path = concatPath(shortDistances, shortDistances[current.CommingFrom], source, path);

    path.push(shortDistances.indexOf(current));

    return path;
};