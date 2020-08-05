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
	buildEdge(board);
	buildWalls(board, 0, 0, board.rows, board.cols);
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

function buildWalls(board, minrow, mincol, maxrow, maxcol) {
	if ((maxrow - minrow >= maxcol - mincol) && (maxrow - minrow > 4)) {
		var row = Math.floor(Math.random() * (maxrow - minrow) / 2) * 2 + minrow;
		buildHWall(board, row, mincol, maxcol);
		buildWalls(board, minrow, mincol, row, maxcol);
		buildWalls(board, row, mincol, maxrow, maxcol);
	} else if ((maxrow - minrow < maxcol - mincol) && (maxcol - mincol > 4)){
		var col = Math.floor(Math.random() * (maxcol - mincol) / 2) * 2 + mincol;
		buildVWall(board, col, minrow, maxrow);
		buildWalls(board, minrow, mincol, maxrow, col);
		buildWalls(board, minrow, col, maxrow, maxcol);
	}
	return;
};

function buildHWall(board, row, mincol, maxcol) {
	var space = Math.floor(Math.random() * (maxcol - mincol)) + mincol;
	console.log(row, space);
	for (let i=mincol; i<maxcol; i++) {
		if (i != space) {
			var index = {r: row, c: i};
			console.log(index);
			board.maze.push(index);
		}
	}
};

function buildVWall(board, col, minrow, maxrow) {
	var space = Math.floor(Math.random() * (maxrow - minrow)) + minrow;
	console.log(col, space);
	for (let i=minrow; i<maxrow; i++) {
		if (i != space) {
			var index = {r: i, c: col};
			console.log(index);
			board.maze.push(index);
		}
	}
};






