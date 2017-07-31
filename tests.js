var assert = require("assert");
var Graph = require("./index.js").Graph;
describe("Graph", () => {
    it("shortestPath('a', 'b') should be => ['a', 'c', 'b']", () => {
        var map = {
                a: {
                    b: 3,
                    c: 1
                },
                b: {
                    a: 2,
                    c: 1
                },
                c: {
                    a: 4,
                    b: 1
                }
            },
            graph = new Graph(map);
        assert.deepEqual(graph.shortestPath('a', 'b'), ['a', 'c', 'b']);
    });

    it("shortestPath('a', 'b') should be => ['a', 'c']", () => {
        var map = {
                a: {
                    b: 3,
                    c: 1
                },
                b: {
                    a: 2,
                    c: 1
                },
                c: {
                    a: 4,
                    b: 1
                }
            },
            graph = new Graph(map);
        assert.deepEqual(graph.shortestPath('a', 'c'), ['a', 'c']);
    });

    it("shortestPath('a', 'b') should be => ['a', 'c']", () => {
        var map = {
                a: {
                    b: 3,
                    c: 1
                },
                b: {
                    a: 2,
                    c: 1
                },
                c: {
                    a: 4,
                    b: 1
                }
            },
            graph = new Graph(map);
        assert.deepEqual(graph.shortestPath('a', 'c'), ['a', 'c']);
    });
    it("shortestPath('c', 'a') should be  => [ 'c', 'b', 'a']", () => {
        var map = {
                a: {
                    b: 3,
                    c: 1
                },
                b: {
                    a: 2,
                    c: 1
                },
                c: {
                    a: 4,
                    b: 1
                }
            },
            graph = new Graph(map);
        assert.deepEqual(graph.shortestPath('c', 'a'), ['c', 'b', 'a']);
    });

    it("hasNegativeCicle('c', 'a') should be  => ", () => {
        var map = {
                a: {
                    b: 3,
                    c: 1
                },
                b: {
                    a: 2,
                    c: 1
                },
                c: {
                    a: 4,
                    b: 1
                }
            },
            graph = new Graph(map);
        assert.equal(graph.hasNegativeCicle('c'), false);
    });

    it("hasNegativeCicle('c') should be  => undefined for a negative cicle ", () => {
        var map = {
            a: {
                b: 3,
                c: 1
            },
            b: {
                a: 2,
                c: 1
            },
            c: {
                a: -4,
                b: 1
            }
        };
        graph = new Graph(map);
        assert.deepEqual(graph.hasNegativeCicle('c'), true);
    });
    it("shortestPathm 'A', 'C'", () => {
        var map = {
            "A": {
                "B": 3,
                "C": 10
            },
            "B": {
                "C": 2,
                "A": 2,
            },
            "C": {
                "B": 4
            }
        };
        graph = new Graph(map);
        console.log(graph.shortestPath('A', 'C'));
    });

    it("shortestPath 'A', 'C'", () => {
        var map = {
            "A": {
                "B": 3,
                "C": 10
            },
            "B": {
                "C": 2,
                "A": 2,
            },
            "C": {
                "B": 4
            }
        };
        graph = new Graph(map);
        console.log(graph.shortestPath('A', 'C'));
    });


    it("Timing test shortestPath", () => {

        var data = [];
        var map = {};
        for (var i = 0; i < 1000; i++) {
            map[i] = {};
            map[i][i + 1] = i;

            map[i][1] = 1;
            graph = new Graph(map);
            console.time(i);
            graph.shortestPath(1, 100)
            console.timeEnd(i);
            //map[i][parseInt(Math.random() * 100, 10)] = parseInt(Math.random() * 100, 10);
        }

        graph = new Graph(map);
        //console.log(graph.shortestPath(1, 100));
    });

    it("Timing test hasNegativeCicle", () => {

        var data = [];
        var map = {};
        for (var i = 0; i < 1000; i++) {
            map[i] = {};
            map[i][i + 1] = i;

            map[i][1] = 1;
            graph = new Graph(map);
            console.time(i);
            graph.hasNegativeCicle(1)
            console.timeEnd(i);
            //map[i][parseInt(Math.random() * 100, 10)] = parseInt(Math.random() * 100, 10);
        }

        graph = new Graph(map);
        //console.log(graph.shortestPath(1, 100));
    });

});