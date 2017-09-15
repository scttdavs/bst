"use strict";

const assert = require("assert");
const Node = require("../bst");

describe("BST", () => {
  describe("Contains", () => {
    it("should return true if it contains a value anywhere in the tree", () => {
      const node = new Node(1);
      node.insert(5).insert(50);

      assert.equal(node.contains(1), true);
      assert.equal(node.contains(5), true);
      assert.equal(node.contains(50), true);
    });

    it("should return false if it does NOT contain a value anywhere in the tree", () => {
      const node = new Node(1);
      node.insert(5).insert(50);

      assert.equal(node.contains(10), false);
    });
  });

  describe("Insert", () => {
    it("should insert the value on the correct 'side' of the node", () => {
      const node = new Node(5);
      node.insert(10).insert(1);

      assert.equal(node.left.value, 1);
      assert.equal(node.right.value, 10);
    });
  });

  describe("Delete", () => {
    it("should delete the value anywhere in the tree", () => {
      const node = new Node(5);
      node.insert(10).insert(1);

      assert.equal(node.contains(1), true);

      node.delete(1);

      assert.equal(node.contains(1), false);
    });
  });
});
