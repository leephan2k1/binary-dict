const customComparator = (objWordA, objWordB) => {
  if (objWordA?.word === objWordB?.word) {
    return 0;
  }
  return objWordA?.word < objWordB?.word ? -1 : 1;
};

module.exports = customComparator;