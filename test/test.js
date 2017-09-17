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

    it("should get the parent of the smallest node", () => {
      const node = new Node(8);
      node.insert(3).insert(9).insert(1).insert(5).insert(12).insert(4).insert(11);
      //        8
      //      /   \
      //    3      9
      //  /   \     \
      // 1     5    12
      //      /     /
      //     4     11

      assert(node.getSmallestNodeParent().left.value, 1);
    });

    it("should get the parent of the largest node", () => {
      const node = new Node(8);
      node.insert(3).insert(9).insert(1).insert(5).insert(12).insert(4).insert(11);
      //        8
      //      /   \
      //    3      9
      //  /   \     \
      // 1     5    12
      //      /     /
      //     4     11

      assert(node.getLargestNodeParent().right.value, 12);
    });

    it("should delete the value anywhere in the tree (with one child)", () => {
      const node = new Node(5);
      node.insert(10).insert(1).insert(8).insert(7);
      //        5
      //      /   \
      //    1      10
      //          /
      //         8
      //        /
      //       7

      assert.equal(node.contains(10), true);
      assert.equal(node.size(), 5);

      node.delete(10);
      //        5
      //      /   \
      //    1      8
      //          /
      //         7

      assert.equal(node.contains(10), false);
      assert.equal(node.contains(8), true);
      assert.equal(node.size(), 4);
    });

    it("should delete the root in the tree (with two children)", () => {
      const node = new Node(8);
      node.insert(3).insert(9).insert(1).insert(5).insert(12).insert(4).insert(11);
      //        8
      //      /   \
      //    3      9
      //  /   \     \
      // 1     5    12
      //      /     /
      //     4     11

      assert.equal(node.size(), 8);
      assert.equal(node.contains(8), true);

      node.delete(8);
      //        5
      //      /   \
      //    3      9
      //  /   \     \
      // 1     4    12
      //            /
      //           11

      assert.equal(node.contains(8), false);
      assert.equal(node.contains(3), true);
      assert.equal(node.size(), 7);
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
      assert.equal(node.size(), 5);

      node.delete(10);
      //        5
      //      /   \
      //    1      6
      //            \
      //            12

      assert.equal(node.contains(10), false);
      assert.equal(node.contains(6), true);
      assert.equal(node.size(), 4);
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

  describe("comparator", () => {
    it("should work with a custom comparator", () => {
      const node = new Node("f", (x, y) => {
        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
      });

      node.insert("b").insert("p").insert("l").insert("z");
      //      f
      //    /  \
      //  b     p
      //      /  \
      //    l     z

      assert.equal(node.left.value, "b");
      assert.equal(node.right.right.value, "z");
      assert.equal(node.right.left.value, "l");
    });
  });
});
