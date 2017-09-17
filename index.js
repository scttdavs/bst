"use strict";

class Node {
  constructor(value = null) {
    this.right = null;
    this.left = null;
    this.value = value;
  }

  insert(value) {
    if (value < this.value) {
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
    console.log(value);
    if (this.value === value) {
      // current node
      if (this.left || this.right) {
        // has at least one child
        if (this.left && this.right) {
          // has two children (damn)
          // swap out node with largest from left subtree (or smallest from right)
          this.deleteWithTwoChildren();
        } else {
          // has only one child, so bypass it
          if (this.right) {
            // swap with smallest from right
            const smallestNodeParent = this.getSmallestNodeParent();
            if (smallestNodeParent.left === null) {
              // no other children so just swap left node
              this.value = this.left.value;
              this.left = null;
            } else {
              this.value = smallestNodeParent.left.value;

              // delete the largest node
              smallestNodeParent.left = smallestNodeParent.left.right; // this will never be .left.left
            }
          } else {
            // swap with largest from the left
            const largestNodeParent = this.getLargestNodeParent();
            if (largestNodeParent.right === null) {
              // no other children so just swap left node
              this.value = this.right.value;
              this.right = null;
            } else {
              this.value = largestNodeParent.right.value;

              // delete the largest node
              largestNodeParent.right = largestNodeParent.right.left; // this will never be .right.right
            }
          }
        }
      } else {
        throw Error("This is the only node, it can't delete itself!");
      }
      return this;
    } else if (value < this.value) {
      // left node
      if (this.left.value === value) {
        if (this.left.left || this.left.right) {
          // has at least one child
          if (this.left.left && this.left.right) {
            // has two children (damn)
            // swap out node with largest from left subtree (or smallest from right)
            this.deleteWithTwoChildren(this.left);
          } else {
            // has only one child, so bypass it
            const newNode = this.left.left || this.left.right;
            this.left = newNode;
          }
        } else {
          // no children so just delete it
          this.left = null;
        }
        return this;
      }

      return this.left.delete(value);
    } else {
      // right node
      if (this.right.value === value) {
        if (this.right.left || this.right.right) {
          // has at least one child
          if (this.right.left && this.right.right) {
            // has two children (damn)
            // swap out node with largest from left subtree (or smallest from right)
            this.deleteWithTwoChildren(this.right);
          } else {
            // has only one child, so bypass it
            const newNode = this.right.left || this.right.right;
            this.right = newNode;
          }
        } else {
          this.right = null;
        }
        return this;
      }

      return this.right.delete(value);
    }

    return null;
  }

  deleteWithTwoChildren(root = this) {
    const largestNodeParent = root.left.getLargestNodeParent();
    if (largestNodeParent.right === null) {
      root.value = largestNodeParent.value;
      root.left = null;
    } else {
      root.value = largestNodeParent.right.value;

      // delete the largest node
      largestNodeParent.right = largestNodeParent.right.left; // this will never be .right.right
    }
  }

  getLargestNodeParent(currentLargest = this) {
    return this.right ? this.right.getLargestNodeParent(this) : currentLargest;
  }

  getSmallestNodeParent(currentSmallest = this) {
    return this.left ? this.left.getSmallestNodeParent(this) : currentSmallest;
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
