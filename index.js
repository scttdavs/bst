"use strict";

// NON PUBLIC METHODS BELOW
const defaultComparator = (x, y) => x - y;

const D = function(callback) {
  callback.call(this);
};
const L = function(callback, orderName) {
  if (this.left) this.left.depthFirst(callback, orderName);
};
const R = function(callback, orderName) {
  if (this.right) this.right.depthFirst(callback, orderName);
};

const processBreadthFirstNode = function(callback, queue) {
  callback.call(this);
  if (this.left) queue.push(this.left);
  if (this.right) queue.push(this.right);
};

const depthFirstOrders = {
  inorder: [L, D, R],
  preorder: [D, L, R],
  postorder: [L, R, D]
}

const insertValue = function(value) {
  if (this.compare(value, this.value) < 0) {
    // left node
    if (!this.left) return this.left = new Node(value, this.compare);

    return this.left.insert(value);
  } else if (this.compare(value, this.value) > 0) {
    // right node
    if (!this.right) return this.right = new Node(value, this.compare);

    return this.right.insert(value);
  }

  // the value is equal, so do nothing
  return null;
};

const deleteValue = function(value) {
  if (this.compare(value, this.value) === 0) {
    // current node
    // only gets hit if it is the root node as we always
    // delete from the parent node in other cases
    if (this.left || this.right) {
      // has at least one child
      if (this.left && this.right) {
        // has two children (damn)
        deleteBySwapping.call(this);
      } else {
        // has only one child, so bypass it
        if (this.right) {
          // swap with smallest from right
          deleteBySwapping.call(this, undefined, "right");
        } else {
          // swap with largest from the left
          deleteBySwapping.call(this);
        }
      }
    } else {
      this.value = null;
      // throw Error("This is the only node, it can't delete itself!");
    }
    return;
  } else if (this.compare(value, this.value) < 0) {
    // left node
    return deleteFromBranch.call(this, "left", value);
  } else {
    // right node
    return deleteFromBranch.call(this, "right", value);
  }
};

const deleteFromBranch = function(branch, value) {
  if (this.compare(this[branch].value, value) === 0) {
    if (this[branch].left || this[branch].right) {
      // has at least one child
      if (this[branch].left && this[branch].right) {
        // has two children (damn)
        deleteBySwapping.call(this, this[branch]);
      } else {
        // has only one child, so bypass it
        this[branch] = this[branch].left || this[branch].right;
      }
    } else {
      // no children so just delete it
      this[branch] = null;
    }
    return;
  }

  return this[branch].delete(value);
};

// swap out node with largest from left subtree (or smallest from right)
const deleteBySwapping = function(root = this,
                                  side = "left",
                                  otherSide = side === "left" ? "right" : "left",
                                  getNodeParent = side === "left" ? getLargestNodeParent : getSmallestNodeParent) {
  const nodeParent = getNodeParent(root[side]);
  if (nodeParent[otherSide] === null) {
    // did not contain a larger or smaller child, so swap with the parent instead
    root.value = nodeParent.value;
    // then delete it
    root[side] = null;
  } else {
    root.value = nodeParent[otherSide].value;

    // delete the largest node
    nodeParent[otherSide] = nodeParent[otherSide][side];
  }
};

const getLargestNodeParent = function(node, currentLargest = node) {
  return node.right ? getLargestNodeParent(node.right, currentLargest) : currentLargest;
};

const getSmallestNodeParent = function(node, currentSmallest = node) {
  return node.left ? getSmallestNodeParent(node.left, currentLargest) : currentSmallest;
};

// NODE CLASS, ALL PUBLIC METHODS
class Node {
  constructor(value = null,
              comparator = defaultComparator) {
    this.compare = comparator;
    this.right = null;
    this.left = null;
    this.value = value;
  }

  insert(...values) {
    values.forEach(insertValue.bind(this));
    return this;
  }

  delete(...values) {
    values.forEach(deleteValue.bind(this));
    return this;
  }

  isBalanced() {
    return Math.abs(this.left.height() - this.right.height()) <= 1;
  }

  contains(value) {
    if (this.compare(this.value, value) === 0) return true;

    // try left node
    if (this.compare(value, this.value) < 0 && this.left) return this.left.contains(value);

    // try right node
    if (this.compare(value, this.value) > 0 && this.right) return this.right.contains(value);

    // no matches
    return false;
  }

  size(count = 1) {
    const leftSize = this.left ? this.left.size() : 0;
    const rightSize = this.right ? this.right.size() : 0;

    return count + leftSize + rightSize;
  }

  height(currentHeight = 0) {
    currentHeight++;
    return Math.max(this.left ? this.left.height(currentHeight) : currentHeight,
                    this.right ? this.right.height(currentHeight) : currentHeight);
  }

  depthFirst(callback, orderName = "preorder") {
    const order = depthFirstOrders[orderName.toLowerCase()];

    if (order) order.forEach((o) => o.call(this, callback, orderName));
  }

  breadthFirst(callback) {
    const queue = [];

    processBreadthFirstNode.call(this, callback, queue);

    while(queue.length) {
      const node = queue.shift();
      processBreadthFirstNode.call(node, callback, queue);
    }
  }
}

module.exports = Node;
