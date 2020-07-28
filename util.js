class Node {
	/* 
		Search node object
		Stores current state, parent node, action, path_cost
	*/
	constructor(state, parent, action, pathCost) {
		this.state = state;
		this.parent = parent;
		this.action = action;
		this.pathCost = pathCost;
	}
}

class Stack {
	// Last-In-First-Out data structure
	constructor() {
		this.items = [];
	}
	push(item) {
		this.items.push(item);
	}
	pop() {
		if (this.items == []) {
			return "Empty Stack";
		}
		return this.items.pop();
	}
	isEmpty() {
		return this.items.length == 0;
	}
}

class Queue {
	// First-In-First-Out data structure
	constructor() {
		this.items = [];
	}
	push(item) {
		this.items.push(item);
	}
	pop() {
		if (this.items == []) {
			return "Empty Queue";
		}
		return this.items.shift();
	}
	isEmpty() {
		return this.items.length == 0;
	}
}

class pqElement {
	constructor(element, priority) {
		this.element = element;
		this.priority = priority;
	}
}

class PriorityQueue {
	constructor () {
		this.items = [];
		this.count = 0;
	}
	push(element, priority) {
		// When item is not in priority queue
		for (var i=0; i<this.items.length; i++) {
			if (this.items[i].priority > priority) {
				//INSERT
			}
		}
		return null;
	}
	pop() {
		return this.items.pop.element;
	}
	isEmpty() {
		return this.count == 0;
	}
	update(element, priority) {
		// When item is already in priority queue
		for (var i=0; i<this.items.length; i++) {
			if (this.items[i].element == element) {
				//DO SOMETHING
			}
		}
	}
}





