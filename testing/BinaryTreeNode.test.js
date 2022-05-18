const BinaryTreeNode = require("../src/core/BinaryTreeNode.js");

const node = new BinaryTreeNode();

//Mong đợi: null
test("TC1: kiem tra null", () => {
  expect(node.value).toBe(null);
});
test("TC2: kiem tra null", () => {
  expect(node.left).toBe(null);
});
test("TC3: kiem tra null", () => {
  expect(node.right).toBe(null);
});
test("TC4: kiem tra null", () => {
  expect(node.parent).toBe(null);
});

const binaryTree = new BinaryTreeNode(0);
const leftNode = new BinaryTreeNode(1);
const rightNode = new BinaryTreeNode(2);
binaryTree.setLeft(leftNode).setRight(rightNode);
/*
        0
      /   \
     1     2
*/

test("TC5: kiem tra root value", () => {
  expect(binaryTree.value).toBe(0);
});

test("TC6: kiem tra root value", () => {
  expect(binaryTree.left.parent.value).toBe(0);
});

test("TC7: kiem tra root value", () => {
  expect(binaryTree.right.parent.value).toBe(0);
});

test("TC8: kiem tra left value", () => {
  expect(binaryTree.left.value).toBe(1);
});

test("TC9: kiem tra right value", () => {
  expect(binaryTree.right.value).toBe(2);
});

test("TC10: kiem tra parent cua root", () => {
  expect(binaryTree.parent).toBe(null);
});
test("TC11: kiem tra child cua left", () => {
  expect(binaryTree.left.left).toBe(null);
});
test("TC12: kiem tra child cua right", () => {
  expect(binaryTree.right.right).toBe(null);
});

test("TC13: kiem tra duyet trung tu", () => {
  expect(JSON.stringify(binaryTree.traverseInOrder())).toBe('["1","0","2"]');
});

test("TC14: kiem tra duyet trung tu", () => {
  expect(binaryTree.toString()).toBe("1,0,2");
});

test("TC15: kiem tra xoa nut", () => {
  expect(binaryTree.removeChild(binaryTree.left)).toBeTruthy();
});

test("TC16: kiem tra sau khi xoa", () => {
  expect(binaryTree.left).toBe(null);
});

test("TC17: kiem tra duyet trung tu sau khi xoa", () => {
  expect(JSON.stringify(binaryTree.traverseInOrder())).toBe('["0","2"]');
});

test("TC18: kiem tra duyet trung tu sau khi xoa", () => {
  expect(binaryTree.toString()).toBe("0,2");
});

test("TC19: kiem tra xoa con phai", () => {
  binaryTree.setLeft(leftNode);
  expect(binaryTree.removeChild(binaryTree.right)).toBeTruthy();
});

test("TC20: kiem tra con phai sau khi xoa", () => {
  expect(binaryTree.right).toBe(null);
});

test("TC21: kiem tra duyet trung tu sau khi xoa con phai", () => {
  expect(JSON.stringify(binaryTree.traverseInOrder())).toBe('["1","0"]');
});

test("TC22: kiem tra duyet trung tu sau khi xoa con phai", () => {
  expect(binaryTree.toString()).toBe("1,0");
});

// //REPLACE TEST

test("TC23: kiem tra duyet trung tu sau khi them con phai", () => {
  binaryTree.setRight(rightNode);
  const replacementNode = new BinaryTreeNode(5);
  rightNode.setRight(replacementNode);
  expect(JSON.stringify(binaryTree.traverseInOrder())).toBe(
    '["1","0","2","5"]'
  );
});

test("TC24: kiem tra duyet trung tu sau khi them con phai", () => {
  expect(binaryTree.toString()).toBe("1,0,2,5");
});

test("TC25: kiem tra thay the coi phai", () => {
  expect(
    binaryTree.replaceChild(binaryTree.right, binaryTree.right.right)
  ).toBeTruthy();
});

test("TC26: kiem tra gia tri sau khi thay the", () => {
  expect(binaryTree.right.value).toBe(5);
});

// //GET HEIGHT TEST
const root = new BinaryTreeNode(1);
const left = new BinaryTreeNode(3);
const right = new BinaryTreeNode(2);
const grandLeft = new BinaryTreeNode(5);
const grandRight = new BinaryTreeNode(6);
const grandGrandLeft = new BinaryTreeNode(7);

test("TC27: kiem tra do sau cay o nut root", () => {
  expect(root.height).toBe(0);
});

test("TC28: kiem tra he so can bang", () => {
  expect(root.balanceFactor).toBe(0);
});

test("TC29: kiem tra do sau sau khi them con phai", () => {
  root.setLeft(left).setRight(right);
  expect(root.height).toBe(1);
});

test("TC30: kiem tra he so can bang sau khi them con phai", () => {
  expect(root.balanceFactor).toBe(0);
});

test("TC31: kiem tra do sau sau khi them con phai cua con trai", () => {
  left.setLeft(grandLeft).setRight(grandRight);
  expect(root.height).toBe(2);
});

test("TC32: kiem tra do sau sau khi them con trai cua con trai", () => {
  grandLeft.setLeft(grandGrandLeft);
  expect(root.height).toBe(3);
});
