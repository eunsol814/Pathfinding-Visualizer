function callSearchAnimation(maze) {
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

function visualize(maze) {
	let algorithm =  maze.algorithm;
	let heuristic = maze.heuristic;
};