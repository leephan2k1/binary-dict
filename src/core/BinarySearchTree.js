const BinarySearchTreeNode = require("./BinarySearchTreeNode");
class BinarySearchTree {
  constructor(nodeValueCompareFunction) {
    this.root = new BinarySearchTreeNode(null, nodeValueCompareFunction);
    // Sao chép method so sánh
    this.nodeComparator = this.root.nodeComparator;
  }

  insert(value) {
    return this.root.insert(value);
  }

  contains(value) {
    return this.root.contains(value);
  }

  remove(value) {
    return this.root.remove(value);
  }

  toString() {
    return this.root.toString();
  }
}
module.exports = BinarySearchTree;
