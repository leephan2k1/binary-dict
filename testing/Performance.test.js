const fs = require("fs");
const BinarySearchTree = require("../src/core/BinarySearchTree.js");

const performanceTest = async (worker) => {
  const start = Date.now();

  worker();

  const stop = Date.now();
  console.log("Thực thi tốn: ", stop - start, "ms");
};

let rootWord;
function readFile() {
  try {
    let rawData = fs.readFileSync("../src/main/resources/dataset/av/d.json");
    let zWords = JSON.parse(rawData);
    rootWord = zWords;
    // rootWord = new BinarySearchTree((objWordA, objWordB) => {
    //   if (objWordA?.word === objWordB?.word) {
    //     return 0;
    //   }
    //   return objWordA?.word < objWordB?.word ? -1 : 1;
    // });
    // //init tree a
    // for (let i = 0; i < zWords.length; i++) {
    //   rootWord.insert(zWords[i]);
    // }
  } catch (err) {
    console.log(err);
  }
}
// readFile()
const search = () => {
//   let result = rootWord.search({ word: "dyadic" });
//   if (result) {
//     // console.log(result.value.word);
//     console.log("Tìm thấy từ khoá bằng cây BST!");
//     //   console.log(result.value.word);
//   }
    let result = rootWord.find((e) => e.word === "dyadic")
    if (result) {
      //   console.log(result.word);
      console.log("Tìm thấy từ khoá bằng cấu trúc tìm kiếm tuyến tính!");
    }
};
readFile();
performanceTest(search);
