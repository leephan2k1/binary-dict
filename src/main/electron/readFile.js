const fs = require("fs");
const path = require("path");
// const BinarySearchTree = require("../../core/BinarySearchTree.js");
// const customComparator = (objWordA, objWordB) => {
//   if (objWordA?.word === objWordB?.word) {
//     return 0;
//   }
//   return objWordA?.word < objWordB?.word ? -1 : 1;
// };

const arr = []
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
    const words =  JSON.parse(rawData);
    console.log(words);
  } catch (err) {
    console.log(err);
  }
};
// readFile('av', 'a');
// module.exports = readFile;
