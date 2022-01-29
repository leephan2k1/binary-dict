const Comparator = require("./Comparator");

class BinaryTreeNode {
  constructor(value = null) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;
    this.nodeComparator = new Comparator();
  }

  setValue(value) {
    this.value = value;
    return this;
  }

  get leftHeight() {
    if (!this.left) {
      return 0;
    }
    return this.left.height + 1;
  }

  get rightHeight() {
    if (!this.right) {
      return 0;
    }
    return this.right.height + 1;
  }

  get height() {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  //Hệ số cân bằng của cây
  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  //Thêm nút con trái
  setLeft(node) {
    //Nếu đã tồn tại con trái, tách nó ra khỏi cây
    if (this.left) {
      this.left.parent = null;
    }

    this.left = node;

    if (this.left) {
      this.left.parent = this;
    }
    return this;
  }

  //Thêm nút con phải
  setRight(node) {
    //Nếu đã tồn tại con phải, tách nó ra khỏi cây
    if (this.right) {
      this.right.parent = null;
    }

    this.right = node;

    if (this.right) {
      this.right.parent = this;
    }

    return this;
  }

  //Xoá nhánh trên cây
  removeChild(node) {
    //nhánh cần xoá là nút con trái
    if (this.left && this.nodeComparator.equal(this.left, node)) {
      this.left = null;
      return true;
    }
    //nhánh cần xoá là nút con phải
    if (this.right && this.nodeComparator.equal(this.right, node)) {
      this.right = null;
      return true;
    }
    return false;
  }

  //Thay thế nhánh
  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) {
      return false;
    }

    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.left = replacementNode;
      return true;
    }
    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.right = replacementNode;
      return true;
    }

    return false;
  }

  static copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }

  //Duyệt trung tự
  traverseInOrder() {
    let traverse = [];

    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder());
    }

    traverse.push(JSON.stringify(this.value));

    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder());
    }
    return traverse;
  }

  toString() {
    return this.traverseInOrder().toString();
  }

}

module.exports = BinaryTreeNode;
