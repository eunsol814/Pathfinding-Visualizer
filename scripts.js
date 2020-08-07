$(document).ready(function() {
	var maze = new Board();
	maze.createGrid();
	//console.log([maze.getStartState()]);
	
	document.getElementById("BFS").onclick = function() {
		maze.algorithm = "BFS";
	};
	document.getElementById("DFS").onclick = function() {
		maze.algorithm = "DFS";
	};
	document.getElementById("A*").onclick = function() {
		maze.algorithm = "A*";
	};
	document.getElementById("Dijkstra").onclick = function() {
		maze.algorithm = "Dijkstra";
	};

	document.getElementById("null").onclick = function() {
		maze.heuristic = function(a, b) {return nullHeuristic(a, b)};
	};
	document.getElementById("manhattanD").onclick = function() {
		maze.heuristic = function(a, b) {return manhattanDistance(a, b)};
	};
	document.getElementById("euclideanD").onclick = function() {
		maze.heuristic = function(a, b) {return euclideanDistance(a, b)};
	};

	document.getElementById("visualize").onclick = function() {
		if (maze.algorithm == "BFS") {
			breadthFirstSearch(maze);
		} else if (maze.algorithm == "DFS") {
			depthFirstSearch(maze);
		} else if (maze.algorithm == "A*") {
			aStarSearch(maze, maze.heuristic);
		} else if (maze.algorithm == "Dijkstra") {
			dijkstra(maze);
		}
	};

	document.getElementById("random").onclick = function() {
		randomMaze(maze);
	};

	document.getElementById("division").onclick = function() {
		recursiveDivision(maze);
	};
	document.getElementById("backtrack").onclick = function() {
		recursiveBacktrack(maze);
	}

	//breadthFirstSearch(maze);

	document.getElementById("clearboard").onclick = function() {
		maze.clearAll();
	};

	document.getElementById("clearwall").onclick = function() {
		maze.clearWalls();
	};

	document.getElementById("clearpath").onclick = function() {
		maze.clearPaths();
	};

});

