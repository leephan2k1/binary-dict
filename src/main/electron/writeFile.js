const fs = require("fs");
const path = require("path");
const arr = [];
const writeFile = (type, character, wordObject, mode) => {
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

    if (mode === "add") {
      words.push(wordObject);
    } else {
      words.forEach((wordObj) => {
        if (wordObj?.word === wordObject?.word) {
          //override:
          Object.assign(wordObj, wordObject);
          return;
        }
      });
    }
    fs.writeFileSync(
      path.join(
        __dirname,
        "../resources",
        "dataset",
        `${type}`,
        `${character}.json`
      ),
      JSON.stringify(words)
    );
  } catch (err) {
    console.log(err);
  }
};
module.exports = writeFile;
