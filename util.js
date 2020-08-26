/*
* This file contains implementation of Objects and Data Structures
*/


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
		var item = new pqElement(element, priority);
		var pushed = false;
		for (var i=0; i<this.items.length; i++) {
			if (this.items[i].priority > priority) {
				pushed = true;
				this.items.splice(i, 0, item);
				break;
			}
		}
		if (!pushed) {
			this.items.push(item);
		}
		this.count += 1;
	}
	pop() {
		var e = this.items.shift();
		this.count -= 1;
		return e.element;
	}
	isEmpty() {
		return this.count == 0;
	}
	update(element, priority) {
		// When item is already in priority queue
		var found = false;
		for (var i=0; i<this.items.length; i++) {
			if (_.isEqual(this.items[i].element.state, element.state)) {
				if (this.items[i].priority > priority) {
					//TAKE IT OUT & CHANGE
					this.items.splice(i, 1);
					this.count -= 1;
					this.push(element, priority);
				}
				found = true;
			}
		}
		if (!found) {
			this.push(element, priority);
		}
	}
}





