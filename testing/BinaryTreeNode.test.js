const BinaryTreeNode = require("../src/core/BinaryTreeNode.js");

const node = new BinaryTreeNode();

//Mong đợi: null
console.log("Line 6", node.value);
console.log("Line 7", node.left);
console.log("Line 8", node.right);
console.log("Line 9", node.parent);

const binaryTree = new BinaryTreeNode(0);
const leftNode = new BinaryTreeNode(1);
const rightNode = new BinaryTreeNode(2);
binaryTree.setLeft(leftNode).setRight(rightNode);
/*
        0
      /   \
     1     2
*/

//Mong đợi: 0
console.log("Line 22", binaryTree.value);
console.log("Line 23", binaryTree.left.parent.value);
console.log("Line 24", binaryTree.right.parent.value);
//Mong đợi: 1
console.log("Line 26", binaryTree.left.value);
//Mong đợi: 2
console.log("Line 28", binaryTree.right.value);
//Mong đợi: null
console.log("Line 30", binaryTree.parent);
console.log("Line 31", binaryTree.left.left);
console.log("Line 32", binaryTree.right.right);
//Mong đợi: [1, 0, 2]
console.log("Line 34", binaryTree.traverseInOrder());
//Mong đợi: "1,0,2"
console.log("Line 36", binaryTree.toString());

//Mong đợi: true
console.log("Line 39", binaryTree.removeChild(binaryTree.left));

//Mong đợi: null
console.log("Line 42", binaryTree.left);
//Mong đợi: [0, 2]
console.log("Line 44", binaryTree.traverseInOrder());
//Mong đợi: "0,2"
console.log("Line 44", binaryTree.toString());

binaryTree.setLeft(leftNode);
//Mong đợi: true
console.log("Line 50", binaryTree.removeChild(binaryTree.right));
//Mong đợi: null
console.log("Line 52", binaryTree.right);
//Mong đợi: [1, 0]
console.log("Line 54", binaryTree.traverseInOrder());
//Mong đợi: "1,0"
console.log("Line 56", binaryTree.toString());
binaryTree.setRight(rightNode);

//REPLACE TEST
const replacementNode = new BinaryTreeNode(5);
rightNode.setRight(replacementNode);
//Mong đợi: [1, 0, 2, 5]
console.log("Line 63", binaryTree.traverseInOrder());
//Mong đợi: "1,0,2,5"
console.log("Line 65", binaryTree.toString());
//Mong đợi: true
console.log(
  "Line 67",
  binaryTree.replaceChild(binaryTree.right, binaryTree.right.right)
);
//Mong đợi: 5
console.log("Line 69", binaryTree.right.value);

//GET HEIGHT TEST
const root = new BinaryTreeNode(1);
const left = new BinaryTreeNode(3);
const right = new BinaryTreeNode(2);
const grandLeft = new BinaryTreeNode(5);
const grandRight = new BinaryTreeNode(6);
const grandGrandLeft = new BinaryTreeNode(7);

//Mong đợi: 0
console.log("Line 79", root.height);
console.log("Line 80", root.balanceFactor);
root.setLeft(left).setRight(right);
//Mong đợi: 1
console.log("Line 86", root.height);
//Mong đợi: 0
console.log("Line 88", root.balanceFactor);

left
.setLeft(grandLeft)
.setRight(grandRight);

//Mong đợi: 2
console.log("Line 86", root.height);

grandLeft.setLeft(grandGrandLeft);

//Mong đợi: 3
console.log("Line 101", root.height);



