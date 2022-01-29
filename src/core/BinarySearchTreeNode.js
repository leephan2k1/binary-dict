const BinaryTreeNode = require('./BinaryTreeNode')
const Comparator = require('./Comparator');

class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(value = null, compareFunction = null) {
    super(value);
    this.compareFunction = compareFunction;
    this.nodeValueComparator = new Comparator(compareFunction);
  }

  insert(value) {
    if (this.nodeValueComparator.equal(this.value, null)) {
      this.value = value;
      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value)) {
      // Nhỏ hơn => thêm vào trái
      if (this.left) {
        return this.left.insert(value);
      }
      const newNode = new BinarySearchTreeNode(value, this.compareFunction);
      this.setLeft(newNode);
      return newNode;
    }

    if (this.nodeValueComparator.greaterThan(value, this.value)) {
      // Lớn hơn => thêm vào phải
      if (this.right) {
        return this.right.insert(value);
      }
      const newNode = new BinarySearchTreeNode(value, this.compareFunction);
      this.setRight(newNode);
      return newNode;
    }
    return this;
  }

  find(value) {
    // Ưu tiên 1: Kiểm tra root (nút hiện tại)
    if (this.nodeValueComparator.equal(this.value, value)) {
      return this;
    }
    //Giá trị cần tìm nhỏ hơn giá trị nút hiện tại => tìm qua nhánh trái
    if (this.nodeValueComparator.lessThan(value, this.value) && this.left) {
      return this.left.find(value);
    }
    //Giá trị cần tìm lớn hơn giá trị nút hiện tại => tìm qua nhánh phải
    if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) {
      return this.right.find(value);
    }
    //không tìm thấy!
    return null;
  }

  contains(value) {
    return !!this.find(value);
  }

  findMin() {
    if (!this.left) {
      return this;
    }

    return this.left.findMin();
  }

  remove(value) {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      throw new Error("Item not found in the tree");
    }
    //3 trường hợp khi nút cần xoá hợp lệ!
    const { parent } = nodeToRemove;

    //TH1: Nút cần xoá là nút lá.
    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (parent) {
        //Xoá tham chiếu ở nút cha
        parent.removeChild(nodeToRemove);
      } else {
        //Nút cần xoá là nút gốc => đặt lại giá trị undefined
        nodeToRemove.setValue(undefined);
      }
    } 
    //TH2: Nút cần xoá có 2 con 
    //Chiến lược: Tìm và thay thế nút có khoá nhỏ nhất bên nhánh phải.
    else if (nodeToRemove.left && nodeToRemove.right) {
      const nextBiggerNode = nodeToRemove.right.findMin();

      if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
        this.remove(nextBiggerNode.value);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        //nút thay thế là nút ngay dưới phải.
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    }
    //TH3: Nút cần xoá chỉ có 1 con
    else {
      const childNode = nodeToRemove.left || nodeToRemove.right;
      if (parent) {
        parent.replaceChild(nodeToRemove, childNode);
      } else {
        BinaryTreeNode.copyNode(childNode, nodeToRemove);
      }
    }

    // Clear the parent of removed node.
    nodeToRemove.parent = null;

    return true;
  }
}
module.exports = BinarySearchTreeNode;
