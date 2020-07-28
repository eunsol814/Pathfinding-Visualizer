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

	document.getElementById("visualize").onclick = function() {
		if (maze.algorithm == "BFS") {
			breadthFirstSearch(maze);
		} else if (maze.algorithm == "DFS") {
			depthFirstSearch(maze);
		} else if (maze.algorithm == "A*") {
			aStarSearch(maze);
		}
	};

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

