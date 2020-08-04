function callSearchAnimation(maze) {
	maze.clearPaths();
	let state = maze.getStartState();
	for (let i=1; i<maze.explored.length; i++) {
		setTimeout(() => {
			document.getElementById(JSON.stringify(maze.explored[i])).className = 'explored';
		}, i * 10);
	}
	setTimeout(() => {
		for (let j=0; j<maze.shortestPath.length - 1; j++) {
			let action = maze.shortestPath[j];
			let nextState  = maze.getResult(state, action);
			setTimeout(() => {
				document.getElementById(JSON.stringify(nextState)).className = 'path';
			}, j * 10);
			state = nextState;
		}
	}, maze.explored.length * 10)
};

function callMazeAnimation(maze) {
	maze.clearWalls();
	for (let i=0; i<maze.maze.length; i++) {
		setTimeout(() => {
			document.getElementById(JSON.stringify(maze.maze[i])).className = "wall";
		}, i * 10);
	}
}

function visualize(maze) {
	let algorithm =  maze.algorithm;
	let heuristic = maze.heuristic;
};

function drag(ev) {
	ev.dataTransfer.setData("onMove", ev.target.id);
};

function allowDrop(ev) {
	ev.preventDefault();
};

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("onMove");
	if (document.getElementById(data).className == "player") {
		document.getElementById(data).className = "blank";
		ev.target.className = "player";
	} else {
		document.getElementById(data).className = "blank";
		ev.target.className = "goal";
	}
};










