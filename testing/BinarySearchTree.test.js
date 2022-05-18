const BinarySearchTree = require("../src/core/BinarySearchTree.js");

const root = new BinarySearchTree((objWordA, objWordB) => {
  if (objWordA?.word === objWordB?.word) {
    return 0;
  }
  return objWordA?.word < objWordB?.word ? -1 : 1;
});
const initial = () => {
  root.insert({ word: "dog" });
  root.insert({ word: "manual" });
  root.insert({ word: "binary" });
  root.insert({ word: "search" });
  root.insert({ word: "risk" });
  root.insert({ word: "tree" });
  root.insert({ word: "testing" });
  // root.insert({ word: "a" });
  // root.insert({ word: "a b c" });
  // root.insert({ word: "a font" });
  // root.insert({ word: "a fortiori" });
  // root.insert({ word: "a la carte" });
};
// initial();
/*
                dog
               /   \
           binary  manual
          /   \     /   \
        null null null search     
                        /   \ 
                     risk   tree
                           /    \
                       testing   null
                       /     \
                     null   null          

*/

beforeEach(() => {
  return initial();
});

test("TC1: kiem tra duyet trung tu", () => {
  expect(root.toString()).toBe(
    '{"word":"binary"},{"word":"dog"},{"word":"manual"},{"word":"risk"},{"word":"search"},{"word":"testing"},{"word":"tree"}'
  );
});

test("TC2: kiem tra method contains", () => {
  expect(root.contains({ word: "test" })).toBe(false);
});

test("TC3: kiem tra method contains", () => {
  expect(root.contains({ word: "dog" })).toBe(true);
});

test("TC4: kiem tra method remove", () => {
  root.remove({ word: "tree" });
  expect(root.toString()).toBe(
    '{"word":"binary"},{"word":"dog"},{"word":"manual"},{"word":"risk"},{"word":"search"},{"word":"testing"}'
  );
});
// /*
//                 dog
//                /   \
//            binary  manual
//           /   \     /   \
//         null null null search
//                         /   \
//                      risk  testing
//                            /    \
//                          null   null

test("TC5: kiem tra method remove", () => {
  root.remove({ word: "search" });
  expect(root.toString()).toBe(
    '{"word":"binary"},{"word":"dog"},{"word":"manual"},{"word":"risk"},{"word":"testing"},{"word":"tree"}'
  );
});

// /*
//                 dog
//                /   \
//            binary  manual
//           /   \     /   \
//         null null null testing
//                         /   \
//                      risk   tree
//                            /    \
//                          null   null
// */

// /*
//                 dog
//                /   \
//            binary  manual
//           /   \     /   \
//         null null null search
//                         /   \
//                      risk   tree
//                            /    \
//                        testing   null
//                        /     \
//                      null   null

test("TC6: kiem tra method search", () => {
  expect(root.search({ word: "hihi" })).toBe(null);
});

test("TC7: kiem tra method search", () => {
  expect(JSON.stringify(root.search({ word: "risk" }).value)).toBe(
    '{"word":"risk"}'
  );
});
