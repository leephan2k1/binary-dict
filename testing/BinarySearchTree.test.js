const BinarySearchTree = require("../src/core/BinarySearchTree.js");

const root = new BinarySearchTree((objWordA, objWordB) => {
  if (objWordA?.word === objWordB?.word) {
    return 0;
  }
  return objWordA?.word < objWordB?.word ? -1 : 1;
});
const initial = () => {
  // root.insert({ word: "dog" });
  // root.insert({ word: "manual" });
  // root.insert({ word: "binary" });
  // root.insert({ word: "search" });
  // root.insert({ word: "risk" });
  // root.insert({ word: "tree" });
  // root.insert({ word: "testing" });
  root.insert({ word: "a" });
  root.insert({ word: "a b c" });
  root.insert({ word: "a font" });
  root.insert({ word: "a fortiori" });
  root.insert({ word: "a la carte" });
};
initial();
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

//Mong đợi: (word: )  binary, dog, manual, risk, search, testing, tree
console.log("test id 1: ", root.toString());

//Mong đợi false:
console.log("test id 2: ", root.contains({ word: "test" }));
//Mong đợi true:
console.log("test id 3: ", root.contains({ word: "dog" }));

root.remove({word: "tree"});
/*
                dog
               /   \
           binary  manual
          /   \     /   \
        null null null search     
                        /   \ 
                     risk  testing
                           /    \
                         null   null     

*/
//Mong đợi: (word: )  binary, dog, manual, risk, search, testing
console.log("test id 4: ", root.toString());

initial();
root.remove({word: "search"});
/*
                dog
               /   \
           binary  manual
          /   \     /   \
        null null null testing     
                        /   \ 
                     risk   tree
                           /    \
                         null   null        
*/
//Mong đợi: (word: )  binary, dog, manual, risk, testing, tree
console.log("test id 5: ", root.toString());

//TEST SEARCH
initial();
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
const result = root.search({word: "hihi"})
console.log(result);