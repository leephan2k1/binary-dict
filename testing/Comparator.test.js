const Comparator = require("../src/core/Comparator.js");

const comparator = new Comparator();

//Mong đợi: true
console.log("line 6:", comparator.equal(0, 0));

//Mong đợi: false
console.log("line 9:", comparator.equal(0, 1));

//Mong đợi: true
console.log("line 12:", comparator.lessThan(0, 1));

//Mong đợi: false
console.log("line 15:", comparator.lessThan(1, 0));

//Mong đợi: true
console.log("line 18:", comparator.greaterThan(1, 0));

//Mong đợi: false
console.log("line 21:", comparator.greaterThan(0, 1));

//Mong đợi: true
console.log("line 24:", comparator.greaterThanOrEqual(1, 0));
//Mong đợi: true
console.log("line 26:", comparator.greaterThanOrEqual(0, 0));

//Mong đợi: false
console.log("line 29:", comparator.greaterThanOrEqual(0, 1));

//Mong đợi: true
console.log("line 32:", comparator.lessThanOrEqual(0, 1));
//Mong đợi: true
console.log("line 34:", comparator.lessThanOrEqual(1, 1));

//Mong đợi: false
console.log("line 37:", comparator.lessThanOrEqual(1, 0));

//Mong đợi: true
comparator.reverse();
console.log("line 41:", comparator.lessThan(1, 0));

const customComparator = new Comparator((objA, objB) => {
  //same ref
  if (objA === objB) {
    return 0;
  }
  //criteria
  if (objA.age === objB.age) {
    return 0;
  }
  return objA.age < objB.age ? -1 : 1;
});

//Mong đợi: true
console.log('line 56', customComparator.equal({age: 1}, {age: 1}));
//Mong đợi: false
console.log('line 58', customComparator.equal({age: 0}, {age: 1}));

//Mong đợi: true
console.log('line 61', customComparator.lessThan({age: 0}, {age: 1}));
//Mong đợi: false
console.log('line 63', customComparator.lessThan({age: 1}, {age: 0}));

//Mong đợi: true
console.log('line 66', customComparator.greaterThanOrEqual({age: 1}, {age: 1}));
//Mong đợi: false
console.log('line 68', customComparator.greaterThanOrEqual({age: 0}, {age: 1}));