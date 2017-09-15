"use strict";

class Node {
  constructor(value = null) {
    this.right = null;
    this.left = null;
    this.value = value;

    this.consts = {
      INSERT: "insert",
      DELETE: "delete"
    }
  }

  findAnd(action, value) {
    // if (action === this.consts.DELETE && this.value === value) return delete this;

    if (value < this.value) {
      // left node
      if (action === this.consts.INSERT && !this.left) {
        this.left = new Node(value);
        return this;
      }

      if (action === this.consts.DELETE && this.left && this.left.value === value) {
        this.left = null;
        return this;
      }

      return this.left.findAnd(action, value);
    } else {
      // right node
      if (!this.right && action === this.consts.INSERT) {
        this.right = new Node(value);
        return this;
      }

      if (action === this.consts.DELETE && this.right && this.right.value === value) {
        this.right = null;
        return this;
      }

      return this.right.findAnd(action, value);
    }

    return null;
  }

  insert(value) {
    return this.findAnd(this.consts.INSERT, value);
  }

  delete(value) {
    return this.findAnd(this.consts.DELETE, value);
  }

  contains(value) {
    if (this.value === value) return true;

    // try left node
    if (value < this.value && this.left) return this.left.contains(value);

    // try right node
    if (value > this.value && this.right) return this.right.contains(value);

    // no matches
    return false;
  }

  size(count = 1) {
    const leftSize = this.left ? this.left.size() : 0;
    const rightSize = this.right ? this.right.size() : 0;

    return count + leftSize + rightSize;
  }

  depthFirstLog(callback) {
    callback.call(this);
    if (this.left) this.left.depthFirstLog(callback);
    if (this.right) this.right.depthFirstLog(callback);
  }
}

module.exports = Node;
