// const { ipcRenderer } = require("electron/renderer");
const fs = require("fs");
const path = require("path");

const menuItemsDOM = document.querySelectorAll(".menu-item");
const framesDOM = document.querySelectorAll(".frame");

const intro = document.querySelector("#intro");
const resultFrameDOM = document.querySelector("#result-frame");
const wordListDOM = document.querySelector("#wordList");

const prevPagination = document.querySelector("#pagination-prev");
const nextPagination = document.querySelector("#pagination-next");
const numberPagination = document.querySelector("#pagination-number");

const filterDOM = document.querySelector("#filter");
const sortFilter = document.querySelector("#filter-word-sort");
const wordTypeFilter = document.querySelector("#filter-word-type");

const searchFrameDOM = document.querySelector("#search-frame");
const searchFormDOM = document.forms["search"];
const searchTextDOM = document.querySelector("#search-text");
const searchResultDOM = document.querySelector("#search-result");

const addWordFrameDOM = document.querySelector("#add-word-frame");
const softwareInfoDOM = document.querySelector("#software-info-frame");
const wordList = document.querySelector("#wordList__details");
const likeBtn = document.querySelector("#like");
const addWordForm = document.querySelector("#add-word");
const transType = document.querySelector("#dict-type");

let currentFrame = 0;
let likeList = [];
let recentlyList = [];
let wordsList = [];
let wordPayload = {};
//default english to vietnamese
let transTypeValue = "ev";
//pagination
let page;
//word type filter
let wordType = "all";

const app = {
  activeNavbar: function () {
    menuItemsDOM.forEach((menuItem) => {
      menuItem.addEventListener("click", () => {
        //remove all active
        menuItemsDOM.forEach((e) => {
          e.classList.remove("active");
        });
        //hidden all frame
        framesDOM.forEach((e) => {
          e.classList.add("hidden");
        });
        //active current item
        menuItem.classList.add("active");
        //display current frame match with item
        this.activeFrame();
      });
    });
  },

  activeFrame: function () {
    let indexFrame;
    menuItemsDOM.forEach((item, index) => {
      if (item.classList.contains("active")) {
        indexFrame = index;
        currentFrame = index;
        return;
      }
    });

    if (currentFrame === 4) {
      this.loadContent(likeList);
    }

    if (currentFrame === 3) {
      page = 1;
      numberPagination.value = page;
      this.loadContent(recentlyList.slice(0, 20));
    }

    if (currentFrame === 1) {
      wordList.innerHTML = null;
      //pagination reset
      page = 1;
      //UI html
      numberPagination.value = page;
      ipcRenderer.send("get-list", {
        request: true,
      });
      ipcRenderer.on("get-list-result", (event, payload) => {
        wordsList = payload;
        this.loadContent(wordsList.slice(0, 20));
      });
    }

    //active ui
    switch (indexFrame) {
      case 0:
        //display search + result search
        // resultFrameDOM.classList.remove("hidden");
        intro.classList.remove("hidden");
        searchFrameDOM.classList.remove("hidden", "h-[20%]");
        searchFrameDOM.classList.add("h-[30%]");
        searchTextDOM.value = "";
        break;
      case 1:
      case 3:
      case 4:
        //display search + filter + word list
        searchFrameDOM.classList.remove("hidden", "h-[30%]");
        searchFrameDOM.classList.add("h-[20%]");
        filterDOM.classList.remove("hidden");
        wordListDOM.classList.remove("hidden");
        searchTextDOM.value = "";
        break;
      case 2:
        //display add word form
        addWordFrameDOM.classList.remove("hidden");
        break;
      case 5:
        //display info frame
        softwareInfoDOM.classList.remove("hidden");
        break;
    }
  },

  activeLikeButton: function (bool) {
    if (bool) {
      likeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-4 mt-2 cursor-pointer hover:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>`;
    } else {
      likeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-4 mt-2 cursor-pointer hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>`;
    }
  },

  loadContent: function (data) {
    wordList.innerHTML = null;
    data.map((e) => {
      wordList.innerHTML += `<li class="p-4 even:bg-gray-300">
        <span class="word-list">${e.word}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
        <span class="word-description">${e.desc || e.description}</span>
      </li>`;
    });
  },

  writeWordsToFile: function (fileName, obj) {
    try {
      fs.writeFileSync(
        path.join(
          __dirname,
          "../",
          "../",
          "src",
          "main",
          "resources",
          fileName,
          `${fileName}.json`
        ),
        JSON.stringify(obj)
      );
    } catch (e) {
      console.log(">>>", e);
    }
  },

  readJSONtoWords: function (fileName) {
    try {
      const rawData = fs.readFileSync(
        path.join(
          __dirname,
          "../",
          "../",
          "src",
          "main",
          "resources",
          fileName,
          `${fileName}.json`
        )
      );
      switch (fileName) {
        case "like":
          likeList = JSON.parse(rawData);
          break;
        case "recently":
          recentlyList = JSON.parse(rawData);
          break;
      }
    } catch (e) {
      this.writeWordsToFile(fileName, []);
    }
  },

  listenSearchForm: function () {
    searchFormDOM.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    let debounceTime;
    searchTextDOM.addEventListener("keyup", (e) => {
      if (currentFrame === 0) {
        intro.classList.add("hidden");
        resultFrameDOM.classList.remove("hidden");
        ipcRenderer.send("search-value", e.target.value);
        if (debounceTime) {
          clearTimeout(debounceTime);
        }
        debounceTime = setTimeout(() => {
          if (e.target.value === wordPayload.word) {
            const exist = recentlyList.find((e) => e.word === wordPayload.word);
            if (!exist) {
              recentlyList.push({
                word: wordPayload.word,
                desc: wordPayload.desc,
              });
              this.writeWordsToFile("recently", recentlyList);
            }
          }
        }, 500);
      }
      //recently frame
      if (currentFrame === 3) {
        if (e.target.value) {
          const word = recentlyList.find(
            (element) => element.word === e.target?.value
          );
          if (word) {
            this.loadContent([word]);
          }
        } else {
          this.loadContent(recentlyList);
        }
      }
      //like frame
      if (currentFrame === 4) {
        if (e.target.value) {
          const word = likeList.find(
            (element) => element.word === e.target?.value
          );
          if (word) {
            this.loadContent([word]);
          }
        } else {
          this.loadContent(likeList);
        }
      }
    });
  },

  listenAddForm: function () {
    addWordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const objEV = {
        description: `${addWordForm["word-type"].value}: ${addWordForm.meaning.value}`,
        html: `<h1>${addWordForm.word.value}</h1><h2>${addWordForm["word-type"].value}</h2><ul><li>${addWordForm.meaning.value}</li><li>${addWordForm.example.value}</li></ul>`,
        word: addWordForm.word.value,
      };
      ipcRenderer.send("add-word", objEV);
    });
  },

  listenLikeButton: function () {
    likeBtn.addEventListener("click", (e) => {
      const word = document.querySelector("#search-result h1").innerText;
      const desc = document.querySelector("#search-result > ul > li").innerText;
      const obj = {
        word,
        desc,
      };
      const exist = likeList.find((e) => e.word === word);
      if (!exist) {
        likeList.push(obj);
        this.activeLikeButton(true);
      } else {
        likeList = likeList.filter((e) => e.word !== word);
        this.activeLikeButton(false);
      }
      this.writeWordsToFile("like", likeList);
    });
  },

  listenFilterSort: function () {
    sortFilter.addEventListener("change", (e) => {
      if (currentFrame === 3) {
        if (e.target.value === "asc") {
          recentlyList.sort((a, b) => (a.word < b.word ? -1 : 1))
          // this.loadContent(
          //   recentlyList
          //     .slice(page * 20 - 20, page * 20)
          //     .sort((a, b) => (a.word < b.word ? -1 : 1))
          // );
        }
        if (e.target.value === "desc") {
          recentlyList.sort((a, b) => (a.word > b.word ? -1 : 1))
          // this.loadContent(
          //   recentlyList
          //     .slice(page * 20 - 20, page * 20)
          //     .sort((a, b) => (a.word > b.word ? -1 : 1))
          // );
        }
      }
      if (currentFrame === 4) {
        switch (e.target.value) {
          case "asc":
            this.loadContent(
              likeList
                .slice(page * 20 - 20, page * 20)
                .sort((a, b) => (a.word < b.word ? -1 : 1))
            );
            break;
          case "desc":
            this.loadContent(
              likeList
                .slice(page * 20 - 20, page * 20)
                .sort((a, b) => (a.word > b.word ? -1 : 1))
            );
            break;
        }
      }
      if(currentFrame === 1){

      }
    });
  },

  listenWordTypeFilter: function () {
    wordTypeFilter.addEventListener("change", (e) => {
      wordType = e.target.value;
      if (e.target.value !== "all") {
        if (transTypeValue === "ev") {
          wordType = this.helper.typeEngToVi(e.target.value);
          this.handleContentWordTypeFilter();
        }
        if (transTypeValue === "ve") {
          this.handleContentWordTypeFilter();
        }
      } else {
        this.handleContentPagination();
      }
    });
  },

  listenTransType: function () {
    transType.addEventListener("change", (e) => {
      ipcRenderer.send("trans-type", e.target.value);
      transTypeValue = e.target.value;
    });
  },

  listenPaginate: function () {
    nextPagination.addEventListener("click", () => {
      //constraint
      switch (currentFrame) {
        case 1:
          if (page * 20 < wordsList.length) page++;
          break;
        case 3:
          if (page * 20 < recentlyList.length) page++;
          break;
        case 4:
          if (page * 20 < likeList.length) page++;
          break;
      }

      this.handleContentPagination();

      numberPagination.value = page;
    });
    prevPagination.addEventListener("click", () => {
      //constraint
      if (page > 1) page--;

      this.handleContentPagination();

      numberPagination.value = page;
    });
  },

  listenInputPagination: function () {
    numberPagination.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        page = +e.target.value;
        this.handleContentPagination();
      }
    });
  },

  handleContentPagination: function () {
    switch (currentFrame) {
      case 1:
        if (wordType === "all") {
          this.loadContent(wordsList.slice(page * 20 - 20, page * 20));
        } else {
          this.handleContentWordTypeFilter();
        }
        break;
      case 3:
        this.loadContent(recentlyList.slice(page * 20 - 20, page * 20));
        break;
      case 4:
        this.loadContent(likeList.slice(page * 20 - 20, page * 20));
        break;
    }
  },

  handleContentWordTypeFilter: function () {
    switch (currentFrame) {
      case 1:
        const cloneWordsList = wordsList.filter((e) =>
          e.word_types.includes(wordType)
        );
        this.loadContent(cloneWordsList.slice(page * 20 - 20, page * 20));
        break;
    }
  },

  styleResult: function () {
    const h1s = document.querySelectorAll("#search-result h1");
    const h2s = document.querySelectorAll("#search-result h2");
    const h3s = document.querySelectorAll("#search-result h3");
    const uls = document.querySelectorAll("#search-result ul");
    const ols = document.querySelectorAll("#search-result ol");
    h1s.forEach((e) => {
      e.classList.add("font-bold", "text-xl", "py-2");
    });
    h2s.forEach((e) => {
      e.classList.add("py-1");
    });
    h3s.forEach((e) => {
      e.classList.add("py-1");
    });
    uls.forEach((e) => {
      e.classList.add("px-6", "py-1", "list-disc", "list-inside");
    });
    ols.forEach((e) => {
      e.classList.add("px-6", "py-1", "list-disc", "list-inside");
    });
  },

  helper: {
    typeEngToVi: function (value) {
      switch (value) {
        case "noun":
          return "danh từ";
        case "adj":
          return "tính từ";
        case "verb":
          return "động từ";
        case "adv":
          return "trạng từ";
        case "pre":
          return "giới từ";
        case "pro":
          return "đại từ";
        case "con":
          return "liên từ";
        case "int":
          return "thán từ";
      }
    },
  },

  ipcListenResponse: function () {
    ipcRenderer.on("search-value-result", (event, payload) => {
      if (currentFrame === 0) {
        this.activeLikeButton(false);
        if (payload?.html) {
          searchResultDOM.innerHTML = payload.html;
          wordPayload = {
            word: payload.word,
            desc: payload.description,
          };
          this.styleResult();
        }
        // const exist = likeList.find((e) => e.word === payload?.word);
        // if (exist) this.activeLikeButton(true);
      }
    });
  },
};

app.readJSONtoWords("like");
app.readJSONtoWords("recently");
app.activeNavbar();

app.listenSearchForm();
app.listenAddForm();
app.listenLikeButton();
app.listenFilterSort();
app.listenTransType();
app.listenPaginate();
app.listenWordTypeFilter();
app.listenInputPagination();

app.ipcListenResponse();
