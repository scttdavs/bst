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

    it("should not insert a duplicate value", () => {
      const node = new Node(5);
      node.insert(10).insert(1);

      assert.equal(node.contains(10), true);
      assert.equal(node.size(), 3);

      node.insert(10);

      assert.equal(node.size(), 3);
    });

    it("should insert more than 1 value", () => {
      const node = new Node(5);
      const newValues = [10, 3, 1];
      node.insert(...newValues);

      assert.equal(node.contains(10), true);
      assert.equal(node.size(), 4);
      assert.equal(node.height(), 3);
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

    it("should delete simply with one child from root node", () => {
      const node = new Node(5);
      node.insert(10);
      //        5
      //          \
      //           10

      assert.equal(node.size(), 2);

      node.delete(5);

      assert.equal(node.size(), 1);
      assert.equal(node.value, 10);
    });

    it("should delete with two children from root node", () => {
      const node = new Node(5);
      node.insert(10).insert(3);
      //        5
      //       / \
      //     3    10

      assert.equal(node.size(), 3);

      node.delete(5);

      assert.equal(node.size(), 2);
      assert.equal(node.value, 3);
      assert.equal(node.right.value, 10);
    });

    it("should delete the root node by itself", () => {
      const node = new Node(5);

      assert.equal(node.size(), 1);

      node.delete(5);

      assert.equal(node.size(), 1);
      assert.equal(node.value, null);
    });

    it("should delete more than 1 value", () => {
      const node = new Node(5);
      node.insert(10, 1, 6, 12);
      //        5
      //      /   \
      //    1      10
      //          /  \
      //         6    12

      assert.equal(node.contains(10), true);
      assert.equal(node.contains(1), true);
      assert.equal(node.size(), 5);

      node.delete(...[1, 10]);
      //        5
      //          \
      //           6
      //            \
      //            12

      assert.equal(node.contains(10), false);
      assert.equal(node.contains(1), false);
      assert.equal(node.right.value, 6);
      assert.equal(node.right.right.value, 12);
      assert.equal(node.size(), 3);
    });
  });

  describe("Size", () => {
    it("should return the count of all nodes in the tree", () => {
      const node = new Node(5);
      node.insert(10).insert(1).insert(6).insert(53).insert(87);

      assert.equal(node.size(), 6);
    });
  });

  describe("Depth", () => {
    it("should return 0 as the depth of the root node", () => {
      const node = new Node(1).insert(4, 0);

      assert.equal(node.depth(1), 0);
    });

    it("should return the number of edges between the root node and the current node", () => {
      const node = new Node(5);
      node.insert(10, 1, 9, 53, 12);
      //        5
      //      /   \
      //    1      10
      //          / \
      //        9   53
      //            /
      //          12

      assert.equal(node.depth(12), 3);
      assert.equal(node.depth(9), 2);
      assert.equal(node.depth(10), 1);
      assert.equal(node.depth(1), 1);
    });
  });

  describe("Height", () => {
    it("should return the distance from a node to the root node", () => {
      const node = new Node(5);
      node.insert(10).insert(1).insert(9).insert(53).insert(12);
      //        5
      //      /   \
      //    1      10
      //          / \
      //        9   53
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

    it("should work with another custom comparator", () => {
      const node = new Node({value: 5}, (x, y) => x.value - y.value);

      node.insert({value: 1}).insert({value: 8}).insert({value: 7}).insert({value: 9});
      //      5
      //    /  \
      //  1     8
      //      /  \
      //    7     9

      assert.equal(node.left.value.value, 1);
      assert.equal(node.right.value.value, 8);
      assert.equal(node.right.left.value.value, 7);
      assert.equal(node.right.right.value.value, 9);
    });
  });

  describe("isBalanced", () => {
    it("should return false if the tree's height on the left and right is equal or off by only 1", () => {
      const node = new Node(5);
      node.insert(10).insert(1).insert(9).insert(53).insert(12);
      //        5
      //      /   \
      //    1      10
      //          / \
      //        9   53
      //            /
      //          12

      assert.equal(node.isBalanced(), false);
    });

    it("should return true if the tree's height on the left and right is equal or off by only 1", () => {
      const node = new Node(5);
      node.insert(10).insert(1).insert(0).insert(9).insert(53).insert(12);
      //        5
      //      /   \
      //    1      10
      //  /       / \
      // 0      9   53
      //            /
      //          12

      assert.equal(node.isBalanced(), true);
    });
  });

  describe("depthFirst", () => {
    it("should log over each node in the tree in PREORDER", () => {
      const loggedValues = [];
      const node = new Node(5);
      node.insert(10).insert(1).insert(0).insert(4).insert(9).insert(53).insert(12);
      //        5
      //      /   \
      //    1      10
      //   / \    / \
      //  0  4   9  53
      //            /
      //          12

      node.depthFirst(function() {
        loggedValues.push(this.value);
      });
      assert.deepEqual(loggedValues, [5, 1, 0, 4, 10, 9, 53, 12]);
    });

    it("should log over each node in the tree in INORDER", () => {
      const loggedValues = [];
      const node = new Node(5);
      node.insert(10).insert(1).insert(0).insert(4).insert(9).insert(53).insert(12);
      //        5
      //      /   \
      //    1      10
      //   / \    / \
      //  0  4   9  53
      //            /
      //          12

      node.depthFirst(function() {
        loggedValues.push(this.value);
      }, "inorder");
      assert.deepEqual(loggedValues, [0, 1, 4, 5, 9, 10, 12, 53]);
    });

    it("should log over each node in the tree in POSTORDER", () => {
      const loggedValues = [];
      const node = new Node(5);
      node.insert(10).insert(1).insert(0).insert(4).insert(9).insert(53).insert(12);
      //        5
      //      /   \
      //    1      10
      //   / \    / \
      //  0  4   9  53
      //            /
      //          12

      node.depthFirst(function() {
        loggedValues.push(this.value);
      }, "postorder");
      assert.deepEqual(loggedValues, [0, 4, 1, 9, 12, 53, 10, 5]);
    });
  });

  describe("breadthFirst", () => {
    it("should log over each node in the tree in order by level", () => {
      const loggedValues = [];
      const node = new Node(5);
      node.insert(10).insert(1).insert(0).insert(4).insert(9).insert(53).insert(12);
      //        5
      //      /   \
      //    1      10
      //   / \    / \
      //  0  4   9  53
      //            /
      //          12

      node.breadthFirst(function() {
        loggedValues.push(this.value);
      });
      assert.deepEqual(loggedValues, [5, 1, 10, 0, 4, 9, 53, 12]);
    });
  });
});
