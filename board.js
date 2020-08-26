class Board {
	constructor() {
		this.maze = [];
		//this.width = 500;
		//this.height = 300;
		this.rows = 25;
		this.cols = 45;
		this.data = null;
		this.directions = ["Up", "Down", "Right", "Left"];
		this.startState = {r: 12, c: 10};
		this.goalState = {r: 12, c: 35};
		this.algorithm = "BFS";
		this.heuristic = null;
		this.search = null;
		this.explored = null;
		this.shortestPath = null;
		this.playerImg = "<img src='smile.svg'>";
	}

	createGrid() {
		// Creates initial maze board without anything on it
		// Top-Left coner = (0, 0)
		let board = document.getElementById("maze");
		let table = ""
		for (var row=0; row<this.rows; row++) {
			let sub = [];
			let boardRow = "<tr id='row ${row}'>";
			for (var col=0; col<this.cols; col++) {
				sub.push(false);
				var index = {r: row, c: col};
				if (_.isEqual(this.startState, index)) {
					boardRow += "<td id=" + JSON.stringify(index) + " class='player' dragabble='true' ondrop='drop(event)' ondragover='allowDrop(event)' ondragstart='drag(event)' onclick=moveCell()></td>";
				} else if (_.isEqual(this.goalState, index)) {
					boardRow += "<td id=" + JSON.stringify(index) + " class='goal' dragabble='true' ondrop='drop(event)' ondragover='allowDrop(event)' ondragstart='drag(event)' onclick=moveCell()></td>";
				} else {
					boardRow += "<td id=" + JSON.stringify(index) + " class='blank' ondrop='drop(event)' ondragover='allowDrop(event)' ondragstart='drag(event)' onclick=selectCell(this)></td>";
				}
			}
			boardRow += "</tr>";
			table += boardRow;
		}
		board.innerHTML = table;
		this.data = board;
	};

	clearAll() {
		// Remove everything on board
		for (var row=0; row<this.rows; row++) {
			for (var col=0; col<this.cols; col++) {
				let index = {r: row, c: col};
				let cell = document.getElementById(JSON.stringify(index));
				if ((cell.className != "player") && (cell.className != "goal") && (cell.className != "blank")) {
					cell.className = "blank";
				}
			}
		}
		this.maze = [];
	};

	clearWalls() {
		// Remove all the walls on board
		Array.from(document.getElementsByClassName("wall")).forEach(
			function(element) {
				element.className = "blank";
			})
	};

	clearPaths() {
		// Remove paths on board
		Array.from(document.getElementsByClassName("explored")).forEach(
			function(element) {
				element.className = "blank";
			})
		Array.from(document.getElementsByClassName("path")).forEach(
			function(element) {
				element.className = "blank";
			})
	};

	checkExplored(state) {
		// Check if 'state' is already explored
		if (state != this.startState) {
			let explored = document.getElementById(JSON.stringify(state));
			explored.className = 'explored';
		}
	};

	isWall(state) {
		// Check if 'state' is wall
		if (this.data == null) {
			return false;
		}else {
			return document.getElementById(JSON.stringify(state)).className == 'wall';
		}
	};

	getStartState() {
		// Return starting position
		Array.from(document.getElementsByClassName("player")).forEach((element) => {
			this.startState = JSON.parse(element.id);
		})
		return this.startState;
	};

	goalTest(state) {
		// Check if state is the goal state
		Array.from(document.getElementsByClassName("goal")).forEach((element) => {
			this.goalState = JSON.parse(element.id);
		})
		return (_.isEqual(this.goalState, state));
	};

	getActions(state) {
		// Get list of actions that could be taken in current state
		let actions = [];
		const currRow = state.r;
		const currCol = state.c;
		if ((currRow > 0) && (!this.isWall({r: currRow-1, c: currCol}))) {
			actions.push("Up");
		}
		if ((currCol + 1 < this.cols) && (!this.isWall({r: currRow, c: currCol+1}))) {
			actions.push("Right");
		}
		if ((currRow + 1 < this.rows) && (!this.isWall({r: currRow+1, c: currCol}))) {
			actions.push("Down");
		}
		if ((currCol > 0) && (!this.isWall({r: currRow, c: currCol-1}))) {
			actions.push("Left");
		}
		return actions;
	};

	getResult(state, action) {
		// Get the result of taking 'action' at 'state'
		const currRow = state.r;
		const currCol = state.c;
		if (action == "Up") {
			return {r: currRow-1, c: currCol};
		} else if (action == "Down") {
			return {r: currRow+1, c: currCol};
		} else if (action == "Left") {
			return {r: currRow, c: currCol-1};
		} else if (action == "Right") {
			return {r: currRow, c: currCol+1};
		}
	};

	getCost(state, action) {
		// Get the cost of taking 'action' at 'state'
		return 0;
	};

};

function selectCell(cell) {
	// Turn selected cell to wall if id='blank'
	// Else remove wall from cell (id='wall')
	if (cell.className == 'blank') {
		cell.className = 'wall';
	} else if (cell.className == 'wall'){
		cell.className = 'blank';
	}
};




