const BinarySearchTree = require("../../core/BinarySearchTree.js");
const customComparator = (objWordA, objWordB) => {
  if (objWordA?.word === objWordB?.word) {
    return 0;
  }
  return objWordA?.word < objWordB?.word ? -1 : 1;
};
const readFile = (type, character) => {
  try {
    const rawData = fs.readFileSync(
      path.join(
        __dirname,
        "../resources",
        "dataset",
        `${type}`,
        `${character}.json`
      )
    );
    const words = JSON.parse(rawData);
    return words;
  } catch (err) {
    console.log(">>>>", err);
  }
};
const fs = require("fs");
const path = require("path");

const init = (type, character) => {
  const words = readFile(type, character);
  const tree = new BinarySearchTree(customComparator);
  //
  tree.insert(words[Math.floor(words.length / 2)]);
  let x = Math.floor(words.length / 2) - 1;
  for (let y = Math.floor(words.length / 2) + 1; y < words.length; y++) {
    if (words[x]) tree.insert(words[x]);
    if (words[y]) tree.insert(words[y]);
    x--;
  }
  const { length } = words;
  return { tree, length };
};

module.exports = {
  init,
};
