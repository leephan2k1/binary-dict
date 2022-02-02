const fs = require("fs");
const path = require("path");

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

const init = (type, character) => {
  const words = readFile(type, character);
  return words;
};

module.exports = {
  init,
};
