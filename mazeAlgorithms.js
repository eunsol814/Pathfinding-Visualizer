function randomMaze(board) {
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