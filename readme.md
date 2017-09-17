# Binary Search Tree (in Javascript)

## Usage

```js
const Node = require("bst"); // not yet published to npm
// create a tree with the root node value of 5
const tree = new Node(5);
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

### height
Returns the height of a given tree or subtree.
```js
const tree = new Node(5).insert(10).insert(1).insert(8).insert(7).height();
// 4
```

### size
Returns the total number of nodes in a tree or subtree.
```js
const tree = new Node(5).insert(10).insert(1).insert(8).insert(7).size();
// 5
```

### contains
Returns true if a tree/subtree contains the passed value.
```js
const tree = new Node(5).insert(10).insert(1).insert(8).insert(7).contains(10);
// true
```

### depthFirstLog
Will execute a callback with each node's context bound to "this".
```js
const tree = new Node(5).insert(10).insert(1).insert(8).insert(7).height();
tree.depthFirstLog(function() {
  console.log(this.value)
  // 5, 10, 1, 8, 7
}
```
