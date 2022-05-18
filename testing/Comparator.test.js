const Comparator = require("../src/core/Comparator.js");

const comparator = new Comparator();

test("TC1: kiem tra method equal", () => {
  expect(comparator.equal(0, 0)).toBeTruthy();
});

test("TC2: kiem tra method equal", () => {
  expect(comparator.equal(0, 1)).toBe(false);
});

test("TC3: kiem tra method lessThan", () => {
  expect(comparator.lessThan(0, 1)).toBeTruthy();
});

test("TC4: kiem tra method equal", () => {
  expect(comparator.lessThan(1, 0)).toBe(false);
});

test("TC5: kiem tra method greaterThan", () => {
  expect(comparator.greaterThan(1, 0)).toBeTruthy();
});

test("TC6: kiem tra method greaterThan", () => {
  expect(comparator.greaterThan(0, 1)).toBe(false);
});

test("TC7: kiem tra method greaterThanOrEqual", () => {
  expect(comparator.greaterThanOrEqual(1, 0)).toBeTruthy();
});

test("TC8: kiem tra method greaterThanOrEqual", () => {
  expect(comparator.greaterThanOrEqual(0, 0)).toBeTruthy();
});

test("TC9: kiem tra method greaterThanOrEqual", () => {
  expect(comparator.greaterThanOrEqual(0, 1)).toBe(false);
});

test("TC10: kiem tra method lessThanOrEqual", () => {
  expect(comparator.lessThanOrEqual(0, 1)).toBeTruthy();
});

test("TC11: kiem tra method lessThanOrEqual", () => {
  expect(comparator.lessThanOrEqual(1, 1)).toBeTruthy();
});

test("TC12: kiem tra method lessThanOrEqual", () => {
  expect(comparator.lessThanOrEqual(1, 0)).toBe(false);
});

test("TC13: kiem tra method lessThanOrEqual", () => {
  comparator.reverse();
  expect(comparator.lessThan(1, 0)).toBeTruthy();
});

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

test("TC14: kiem tra method equal voi customComparator", () => {
  expect(customComparator.equal({ age: 1 }, { age: 1 })).toBeTruthy();
});

test("TC15: kiem tra method equal voi customComparator", () => {
  expect(customComparator.equal({ age: 0 }, { age: 1 })).toBe(false);
});

test("TC16: kiem tra method lessThan voi customComparator", () => {
  expect(customComparator.lessThan({ age: 0 }, { age: 1 })).toBeTruthy();
});

test("TC17: kiem tra method equal voi customComparator", () => {
  expect(customComparator.lessThan({ age: 1 }, { age: 0 })).toBe(false);
});

test("TC18: kiem tra method greaterThanOrEqual voi customComparator", () => {
  expect(
    customComparator.greaterThanOrEqual({ age: 1 }, { age: 1 })
  ).toBeTruthy();
});

test("TC19: kiem tra method greaterThanOrEqual voi customComparator", () => {
  expect(customComparator.greaterThanOrEqual({ age: 0 }, { age: 1 })).toBe(
    false
  );
});
