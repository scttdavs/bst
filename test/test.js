"use strict";

const assert = require("assert");
const Node = require("../");

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
    it("should delete the value anywhere in the tree (with no children)", () => {
      const node = new Node(5);
      node.insert(10).insert(1).insert(6);
      //        5
      //      /   \
      //    1      10
      //          /
      //         6

      assert.equal(node.contains(6), true);

      node.delete(6);
      //        5
      //      /   \
      //    1      10

      assert.equal(node.contains(6), false);
    });

    it("should delete the value anywhere in the tree (with one child)", () => {
      const node = new Node(5);
      node.insert(10).insert(1).insert(6);
      //        5
      //      /   \
      //    1      10
      //          /
      //         6

      assert.equal(node.contains(10), true);

      node.delete(10);
      //        5
      //      /   \
      //    1      6

      assert.equal(node.contains(10), false);
      assert.equal(node.contains(6), true);
    });

    it("should delete the value anywhere in the tree (with two children)", () => {
      const node = new Node(5);
      node.insert(10).insert(1).insert(6).insert(12);
      //        5
      //      /   \
      //    1      10
      //          /  \
      //         6    12

      assert.equal(node.contains(10), true);

      node.delete(10);
      //        5
      //      /   \
      //    1      6
      //            \
      //            12

      assert.equal(node.contains(10), false);
      assert.equal(node.contains(6), true);
    });
  });

  describe("Size", () => {
    it("should return the count of all nodes in the tree", () => {
      const node = new Node(5);
      node.insert(10).insert(1).insert(6).insert(53).insert(87);

      assert.equal(node.size(), 6);
    });
  });

  describe("Height", () => {
    it("should return the distance from a node to the root node", () => {
      const node = new Node(5);
      node.insert(10).insert(1).insert(16).insert(53).insert(12);
      //        5
      //      /   \
      //    1      10
      //          / \
      //        16  53
      //            /
      //          12

      assert.equal(node.height(), 4);
    });
  });
});
