const fs = require("fs");
const path = require("path");
const arr = [];
const writeFile = (type, character, obj) => {
  try {
    fs.writeFileSync(
      path.join(
        __dirname,
        "../resources",
        "dataset",
        `${type}`,
        `${character}.json`
      ),
      JSON.stringify(obj)
    );
  } catch (err) {
    console.log(err);
  }
};
module.exports = writeFile;
