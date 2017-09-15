const nodePrototype = {
  consts: {
    INSERT: "insert",
    DELETE: "delete"
  },

  findAnd(action, value) {
    // if (action === this.consts.DELETE && this.value === value) return delete this;

    if (value < this.value) {
      // left node
      if (action === this.consts.INSERT && !this.left) return this.left = createNode(value);
      if (action === this.consts.DELETE && this.left && this.left.value === value) return this.left = null;

      return this.left.findAnd(action, value);
    } else {
      // right node
      if (!this.right && action === this.consts.INSERT) return this.right = createNode(value);
      if (action === this.consts.DELETE && this.right && this.right.value === value) return this.right = null;

      return this.right.findAnd(action, value);
    }

    return null;
  },

  insert(value) {
    return this.findAnd(this.consts.INSERT, value);
  },

  delete(value) {
    return this.findAnd(this.consts.DELETE, value);
  },

  contains(value) {
    if (this.value === value) return true;

    // try left node
    if (value < this.value && this.left) return this.left.contains(value);

    // try right node
    if (value > this.value && this.right) return this.right.contains(value);

    // no matches
    return false;
  },

  depthFirstLog(callback) {
    callback.call(this);
    if (this.left) this.left.depthFirstLog(callback);
    if (this.right) this.right.depthFirstLog(callback);
  }
}

const createNode = (value) => {
  const obj = Object.create(nodePrototype);

  obj.right = null;
  obj.left = null;
  obj.value = value || null;

  return obj;
}

module.exports = createNode;
