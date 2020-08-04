function randomMaze(board) {
	board.clearWalls();
	var rows = board.rows;
	var cols = board.cols;
	for (var i=0; i<rows*cols/5; i++) {
		var row = Math.floor(Math.random() * rows);
		var col = Math.floor(Math.random() * cols);
		var index = JSON.stringify({r: row, c: col});
		if (document.getElementById(index).className == "blank") {
			document.getElementById(index).className = "wall";
		}
	}
};

function recursiveDivision(board) {
	var rows = Math.floor((board.rows - 1) / 2);
	var cols = Math.floor((board.cols - 1) / 2);
	buildEdge(board);
	buildWalls(board, rows, cols);
	callMazeAnimation(board);
};

function buildEdge(board) {
	var result = [];
	var player = board.getStartState();
	var goal = board.goalState;
	for (var i=0; i<board.cols; i++) {
		var index = {r: 0, c: i};
		if (!(_.isEqual(index, player) || board.goalTest(index))){
			result.push(index);
		}
	}
	for (i=1; i<board.rows-1; i++) {
		var index = {r: i, c: 0};
		if (!(_.isEqual(index, player) || board.goalTest(index))){
			result.push(index);
		}
		index = {r: i, c: board.cols-1};
		if (!(_.isEqual(index, player) || board.goalTest(index))){
			result.push(index);
		}
	}
	for (i=0; i<board.cols; i++) {
		var index = {r: board.rows-1, c: i};
		if (!(_.isEqual(index, player) || board.goalTest(index))){
			result.push(index);
		}
	}
	board.maze = result;
};

function buildWalls(board, rows, cols) {

};