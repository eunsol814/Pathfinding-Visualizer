/*
* This file contains heuristics that are used for A* Search
*/


function nullHeuristic(state, problem=null) {
	return 0;
}

function manhattanDistance(state, problem) {
	var goal = problem.goalState;
	var result = Math.abs(goal.r - state.r) + Math.abs(goal.c - state.c);
	return result;
}

function euclideanDistance(state, problem) {
	var goal = problem.goalState;
	var result = Math.sqrt(Math.pow(goal.r - state.r, 2) + Math.pow(goal.c - state.c, 2));
	return result;
}
