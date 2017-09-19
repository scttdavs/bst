"use strict";

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

const depthFirstOrders = {
  inorder: [L, D, R],
  preorder: [D, L, R],
  postorder: [L, R, D]
}

class Node {
  constructor(value = null,
              comparator = defaultComparator) {
    this.compare = comparator;
    this.right = null;
    this.left = null;
    this.value = value;
  }

  insert(value, root = this) {
    if (this.compare(value, this.value) < 0) {
      // left node
      if (!this.left) {
        this.left = new Node(value, this.compare);
        return root;
      }

      return this.left.insert(value, root);
    } else if (this.compare(value, this.value) > 0) {
      // right node
      if (!this.right) {
        this.right = new Node(value, this.compare);
        return root;
      }

      return this.right.insert(value, root);
    }

    // the value is equal, so do nothing
    return null;
  }

  delete(value, root = this) {
    if (this.compare(value, this.value) === 0) {
      // current node
      // only gets hit if it is the root node as we always
      // delete from the parent node in other cases
      if (this.left || this.right) {
        // has at least one child
        if (this.left && this.right) {
          // has two children (damn)
          this.deleteBySwapping();
        } else {
          // has only one child, so bypass it
          if (this.right) {
            // swap with smallest from right
            this.deleteBySwapping(undefined, "right");
          } else {
            // swap with largest from the left
            this.deleteBySwapping();
          }
        }
      } else {
        this.value = null;
        // throw Error("This is the only node, it can't delete itself!");
      }
      return root;
    } else if (this.compare(value, this.value) < 0) {
      // left node
      return this.deleteFromBranch("left", value, root);
    } else {
      // right node
      return this.deleteFromBranch("right", value, root);
    }
  }

  deleteFromBranch(branch, value, root = this) {
    if (this.compare(this[branch].value, value) === 0) {
      if (this[branch].left || this[branch].right) {
        // has at least one child
        if (this[branch].left && this[branch].right) {
          // has two children (damn)
          this.deleteBySwapping(this[branch]);
        } else {
          // has only one child, so bypass it
          this[branch] = this[branch].left || this[branch].right;
        }
      } else {
        // no children so just delete it
        this[branch] = null;
      }
      return root;
    }

    return this[branch].delete(value, root);
  }

  // swap out node with largest from left subtree (or smallest from right)
  deleteBySwapping(root = this,
                   side = "left",
                   otherSide = side === "left" ? "right" : "left",
                   getNodeParent = side === "left" ? "getLargestNodeParent" : "getSmallestNodeParent") {
    const nodeParent = root[side][getNodeParent]();
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
  }

  getLargestNodeParent(currentLargest = this) {
    return this.right ? this.right.getLargestNodeParent(this) : currentLargest;
  }

  getSmallestNodeParent(currentSmallest = this) {
    return this.left ? this.left.getSmallestNodeParent(this) : currentSmallest;
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
}

module.exports = Node;
