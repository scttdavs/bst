"use strict";

const assert = require('assert');
const Node = require("../bst");

describe('BST', () => {
  describe('Contains', () => {
    it('should return true if it contains a value anywhere in the tree', () => {
      const node = new Node(1);
      node.insert(5).insert(50);

      assert.equal(node.contains(1), true);
      assert.equal(node.contains(5), true);
      assert.equal(node.contains(50), true);
    });

    it('should return false if it does NOT contain a value anywhere in the tree', () => {
      const node = new Node(1);
      node.insert(5).insert(50);

      assert.equal(node.contains(10), false);
    });
  });
});
