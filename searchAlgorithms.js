//import {Stack, Queue, PriorityQueue, Node} from 'util';

function depthFirstSearch(problem) {
	var answer = null;
	var explored = [];
	var future = [problem.getStartState()];
	var frontier = new Stack();
	var start = new Node(problem.getStartState(), null, null, 0);
	frontier.push(start);
	while (answer == null) {
		if (frontier.isEmpty()) {
			answer = [];
		}else {
			var node = frontier.pop();
			var state = node.state;
			if (problem.goalTest(state)) {
				var path = [];
				while (node.action != null) {
					path.unshift(node.action);
					node = node.parent;
				}
				answer = path;
			}else {
				var actions = problem.getActions(state);
				explored.push(state);
				future = future.filter(function(states) {
					return states != state
				})
				for (act of actions) {
					var child = problem.getResult(state, act);
					if (!(explored.some(cell => (cell.r == child.r) && (cell.c == child.c))) && 
						!(future.some(cell => (cell.r == child.r) && (cell.c == child.c)))) {
						var newNode = new Node(child, node, act, 0);
						future.push(newNode);
						frontier.push(newNode);
					}
				}
			}
		}
	}
	problem.explored = explored;
	problem.shortestPath = answer;
	callSearchAnimation(problem);
}

function breadthFirstSearch(problem) {
	var answer = null;
	var explored = [];
	var future = [problem.getStartState()];
	var frontier = new Queue()
	var start = new Node(problem.getStartState(), null, null, 0)
	frontier.push(start);
	while (answer == null) {
		if (frontier.isEmpty()) {
			answer = [];
		}else {
			var node = frontier.pop();
			var state = node.state;
			if (problem.goalTest(state)) {
				var path = [];
				while (node.action != null) {
					path.unshift(node.action);
					node = node.parent;
				}
				answer = path;
			}else {
				var actions = problem.getActions(state);
				explored.push(state);
				future = future.filter(function(states) {
					return states != state
				})
				for (act of actions) {
					var child = problem.getResult(state, act);
					if (!(explored.some(cell => (cell.r == child.r) && (cell.c == child.c))) && 
						!(future.some(cell => (cell.r == child.r) && (cell.c == child.c)))) {
						var newNode = new Node(child, node, act, 0);
						future.push(child);
						frontier.push(newNode);
					}
				}
			}
		}
	}
	problem.explored = explored;
	problem.shortestPath = answer;
	callSearchAnimation(problem);
};

function aStarSearch(problem, heuristic) {
	var answer = null;
	var explored = [];
	var frontier = new PriorityQueue();
	var start = new Node(problem.getStartState(), null, null, 0);
	frontier.push(start, heuristic(problem.getStartState(), problem));
	while (answer == null) {
		if (frontier.isEmpty()) {
			answer = [];
		}else {
			var node = frontier.pop();
			var state = node.state;
			if (problem.goalTest(state)) {
				var path = [];
				while (node.action != null) {
					path.unshift(node.action);
					node = node.parent;
				}
				answer = path;
			}else if (!(explored.some(cell => (cell.r == state.r) && (cell.c == state.c)))) {
				explored.push(state);
				var actions = problem.getActions(state);
				for (act of actions) {
					var child = problem.getResult(state, act);
					var cost = problem.getCost(state, act) + node.pathCost;
					var newNode = new Node(child, node, act, cost);
					var newPriority = cost + heuristic(child, problem);
					frontier.update(newNode, newPriority);
				}
			}
		}
	}
	problem.explored = explored;
	problem.shortestPath = answer;
	callSearchAnimation(problem);
};











