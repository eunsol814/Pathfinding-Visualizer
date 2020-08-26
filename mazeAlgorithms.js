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
	// Builds outermost edge of maze
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
	// Recursively build walls of recursive division maze
	if ((maxrow - minrow >= maxcol - mincol) && (maxrow - minrow > 3)) {
		var row = Math.floor(Math.random() * (maxrow - minrow) / 2) * 2 + minrow;
		buildHWall(board, row, mincol, maxcol);
		buildWalls(board, minrow, mincol, row, maxcol);
		buildWalls(board, row, mincol, maxrow, maxcol);
	} else if ((maxrow - minrow < maxcol - mincol) && (maxcol - mincol > 3)){
		var col = Math.floor(Math.random() * (maxcol - mincol) / 2) * 2 + mincol;
		buildVWall(board, col, minrow, maxrow);
		buildWalls(board, minrow, mincol, maxrow, col);
		buildWalls(board, minrow, col, maxrow, maxcol);
	}
	return;
};

function buildHWall(board, row, mincol, maxcol) {
	// Build horizontal wall of recursive division maze
	var space = Math.floor(Math.random() * (maxcol - mincol - 2) / 2) * 2 + mincol + 1;
	console.log(row, space);
	for (let i=mincol+1; i<maxcol; i++) {
		if (i != space) {
			var index = {r: row, c: i};
			console.log(index);
			if (!(board.goalTest(index) || _.isEqual(board.getStartState(), index))) {
				board.maze.push(index);
			}
		}
	}
};

function buildVWall(board, col, minrow, maxrow) {
	// Build vertical wall of recursive division maze
	var space = Math.floor(Math.random() * (maxrow - minrow - 2) / 2) * 2 + minrow + 1;
	console.log(col, space);
	for (let i=minrow+1; i<maxrow; i++) {
		if (i != space) {
			var index = {r: i, c: col};
			console.log(index);
			if (!(board.goalTest(index) || _.isEqual(board.getStartState(), index))) {
				board.maze.push(index);
			}
		}
	}
};

function recursiveBacktrack(board) {
	var player = board.getStartState();
	var rows = (board.rows - 1) / 2;
	var cols = (board.cols - 1) / 2;
	var visited = [];
	var clearedWalls = [];
	var index = {r: 1, c: 1}
	for (let i=0; i<board.rows; i++) {
		if (i % 2 == 0) {
			for (let j=0; j<board.cols; j++) {
				var index = {r: i, c: j};
				if (!_.isEqual(index, player) && !board.goalTest(index)) {
					board.maze.push(index);
				}
			}
		} else {
			for (let j=0; j<board.cols; j+=2) {
				var index = {r: i, c: j};
				if (!_.isEqual(index, player) && !board.goalTest(index)) {
					board.maze.push(index);
				}
			}
		}
	}
	backtrackMaze(rows, cols, visited, index, clearedWalls);
	clearedWalls = clearedWalls.filter(function(cell) {
		return (!_.isEqual(cell, player) && !board.goalTest(cell));
	})
	callUndoMazeAnimation(board, clearedWalls);
};

function backtrackMaze(rows, cols, visited, currCell, result) {
	var neighbors = getRecursiveBacktrackNeighbors(rows, cols, currCell);
	visited.push(currCell);
	neighbors.forEach(function(neighbor) {
		if (!visited.some(cell => _.isEqual(cell, neighbor))) {
			backtrackMaze(rows, cols, visited, neighbor, result);
			var clearWall = getRecursiveBacktrackWall(currCell, neighbor);
			result.unshift(clearWall);
			return ;
		}
	})
	if (neighbors.every(neighbor => visited.some(cell => _.isEqual(cell, neighbor)))) {
		return ;
	}
};

function getRecursiveBacktrackNeighbors(rows, cols, currCell) {
	var result = [];
	var row = currCell.r;
	var col = currCell.c;
	var rows = rows * 2 + 1;
	var cols = cols * 2 + 1;
	if (col - 2 >= 0) {
		var index = {r: row, c: col-2};
		result.push(index);
	}
	if (col + 2 < cols) {
		var index = {r: row, c: col+2};
		result.push(index);
	}
	if (row - 2 >= 0) {
		var index = {r: row-2, c: col};
		result.push(index);
	}
	if (row + 2 < rows) {
		var index = {r: row+2, c: col};
		result.push(index);
	}
	shuffle(result);
	return result;
};

function shuffle(array) {
	array.sort(() => Math.random() - 0.5);
};

function getRecursiveBacktrackWall(currCell, neighbor) {
	var row = (currCell.r + neighbor.r) / 2;
	var col = (currCell.c + neighbor.c) / 2;
	var index = {r: row, c: col};
	return index;
}








