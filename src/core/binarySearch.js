const Comparator = require("./Comparator");

const binarySearch = function (sortedArray, seekElement, comparatorCallback) {

  const comparator = new Comparator(comparatorCallback);

  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  while (startIndex <= endIndex) {

    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    if (comparator.equal(sortedArray[middleIndex], seekElement)) {
      return middleIndex;
    }

    if (comparator.lessThan(sortedArray[middleIndex], seekElement)) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }
  return -1;
};

module.exports = binarySearch;
