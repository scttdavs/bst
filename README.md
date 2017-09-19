# Binary Search Tree (in Javascript)
[![Build Status](https://travis-ci.org/scttdavs/bst.svg)](https://travis-ci.org/scttdavs/bst) [![Coverage Status](https://coveralls.io/repos/github/scttdavs/bst/badge.svg?branch=master)](https://coveralls.io/github/scttdavs/bst?branch=master) [![NPM](https://img.shields.io/npm/v/bst-js.svg)](https://www.npmjs.com/package/bst-js)

## Usage

```js
const Node = require("bst-js");
// create a tree with the root node value of 5
const tree = new Node(5);
```

The above will assume that the value of each node is a number. If you would like to store other forms of data, you will need to use your own comparator so that the tree can properly be sorted:
```js
const tree = new Node("f", (x, y) => {
  if (x < y) return -1;
  if (x > y) return 1;
  return 0;
});

tree.insert("b").insert("p").insert("l").insert("z");
//      f
//    /  \
//  b     p
//      /  \
//    l     z
```

## Methods

### insert
Inserts a node with the given value.
```js
const tree = new Node(9).insert(4);
//      9
//     /
//    4
```

### delete
Deletes a node with the given value.
```js
const tree = new Node(5).insert(10).insert(1).insert(8).insert(7);
//        5
//      /   \
//    1      10
//          /
//         8
//        /
//       7
tree.delete(10);
//        5
//      /   \
//    1      8
//          /
//         7
```

### isBalanced
Returns true if the height of the left and right subtrees have a difference of 1 or less.
```js
const tree = new Node(5);
tree.insert(10).insert(1).insert(0).insert(9).insert(53).insert(12);

tree.isBalanced();
// true
```

### height
Returns the height of a given tree or subtree.
```js
const tree = new Node(5).insert(10).insert(1).insert(8).insert(7);

tree.height();
// 4
```

### size
Returns the total number of nodes in a tree or subtree.
```js
const tree = new Node(5).insert(10).insert(1).insert(8).insert(7);

tree.size();
// 5
```

### contains
Returns true if a tree/subtree contains the passed value.
```js
const tree = new Node(5).insert(10).insert(1).insert(8).insert(7);

tree.contains(10);
// true
```

### depthFirst
Will execute a callback with each node's context bound to `this` over a depthFirst `PREORDER` traversal (by default). It also supports `INORDER` and `POSTORDER` traversals.
```js
const tree = new Node(5).insert(10).insert(1).insert(8).insert(7);

tree.depthFirst(function() {
  console.log(this.value);
});
// 5, 10, 1, 8, 7

tree.depthFirst(function() {
  console.log(this.value);
}, "inorder");
// 1, 5, 7, 8, 10
```

### breadthFirst
Will execute a callback with each node's context bound to `this` over a breadthFirst traversal.
```js
const tree = new Node(5).insert(10).insert(1).insert(0).insert(8).insert(7);
//        5
//      /   \
//    1      10
//   /      /
//  0      8
//        /
//       7

tree.breadthFirst(function() {
  console.log(this.value);
});
// 5, 1, 10, 0, 8, 7
```

## Possible additional features

- rebalance after each insert/delete
- allow for bulk insert/delete
