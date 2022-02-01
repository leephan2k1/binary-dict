const fs = require("fs");
const path = require("path");
const arr = [];
const writeFile = (type, character, wordObject) => {
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
    words.push(wordObject);
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
