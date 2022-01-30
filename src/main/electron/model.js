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
    console.log('>>>>', err);
  }
};
const fs = require("fs");
const path = require("path");

const init = (type, character) => {
  const words = readFile(type, character);
  const tree = new BinarySearchTree(customComparator);
  for (let y = Math.floor(words.length / 2); y < words.length; y++) {
    tree.insert(words[y]);
  }
  for (let x = 0; x < Math.floor(words.length / 2); x++) {
    tree.insert(words[x]);
  }
  return tree;
};

module.exports = {
  init,
};
