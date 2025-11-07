// https://gist.github.com/mitrakmt/ceb1aefda6aa97facb104a49a2b9dbc3
// https://initjs.org/data-structure-stack-in-javascript-714f45dbf889
// https://www.geeksforgeeks.org/inorder-tree-traversal-without-recursion/
// https://haacked.com/archive/2007/03/04/Replacing_Recursion_With_a_Stack.aspx/
// This Stack is written using the pseudoclassical pattern



// Creates a stack
var Stack = function() {
    this.count = 0;
    this.storage = {};
}

// Adds a value onto the end of the stack
Stack.prototype.push = function(value) {
    this.storage[this.count] = value;
    this.count++;
}

// Removes and returns the value at the end of the stack
Stack.prototype.pop = function() {
    // Check to see if the stack is empty
    if (this.count === 0) {
        return undefined;
    }

    this.count--;
    var result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
}

// Returns the length of the stack
Stack.prototype.size = function() {
    return this.count;
}