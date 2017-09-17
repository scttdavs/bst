"use strict";

const defaultComparitor = (x, y) => x - y;

class Node {
  constructor(value = null,
              comparitor = defaultComparitor) {
    this.compare = comparitor;
    this.right = null;
    this.left = null;
    this.value = value;
  }

  insert(value) {
    if (this.compare(value, this.value) < 0) {
      // left node
      if (!this.left) {
        this.left = new Node(value);
        return this;
      }

      return this.left.insert(value);
    } else {
      // right node
      if (!this.right) {
        this.right = new Node(value);
        return this;
      }

      return this.right.insert(value);
    }

    return null;
  }

  delete(value) {
    if (this.compare(value, this.value) === 0) {
      // current node
      if (this.left || this.right) {
        // has at least one child
        if (this.left && this.right) {
          // has two children (damn)
          this.deleteWithTwoChildren();
        } else {
          // has only one child, so bypass it
          if (this.right) {
            // swap with smallest from right
            this.deleteWithTwoChildren(undefined, "right");
          } else {
            // swap with largest from the left
            this.deleteWithTwoChildren();
          }
        }
      } else {
        this.value = null;
        // throw Error("This is the only node, it can't delete itself!");
      }
      return this;
    } else if (this.compare(value, this.value) < 0) {
      // left node
      return this.deleteFromBranch("left", value);
    } else {
      // right node
      return this.deleteFromBranch("right", value);
    }

    return null;
  }

  deleteFromBranch(branch, value) {
    if (this.compare(this[branch].value, value) === 0) {
      if (this[branch].left || this[branch].right) {
        // has at least one child
        if (this[branch].left && this[branch].right) {
          // has two children (damn)
          this.deleteWithTwoChildren(this[branch]);
        } else {
          // has only one child, so bypass it
          this[branch] = this[branch].left || this[branch].right;
        }
      } else {
        // no children so just delete it
        this[branch] = null;
      }
      return this;
    }

    return this[branch].delete(value);
  }

  // swap out node with largest from left subtree (or smallest from right)
  deleteWithTwoChildren(root = this,
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

  depthFirstLog(callback) {
    callback.call(this);
    if (this.left) this.left.depthFirstLog(callback);
    if (this.right) this.right.depthFirstLog(callback);
  }
}

module.exports = Node;
