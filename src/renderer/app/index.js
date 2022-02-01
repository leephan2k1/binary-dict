const fs = require("fs");
const path = require("path");

const menuItemsDOM = document.querySelectorAll(".menu-item");
const framesDOM = document.querySelectorAll(".frame");

const resultFrameDOM = document.querySelector("#result-frame");
const wordListDOM = document.querySelector("#wordList");
const filterDOM = document.querySelector("#filter");
const searchFrameDOM = document.querySelector("#search-frame");
const searchFormDOM = document.forms["search"];
const searchTextDOM = document.querySelector("#search-text");
const searchResultDOM = document.querySelector("#search-result");
const addWordFrameDOM = document.querySelector("#add-word-frame");
const softwareInfoDOM = document.querySelector("#software-info-frame");
const wordList = document.querySelector("#wordList__details");
const likeBtn = document.querySelector("#like");
const sortFilter = document.querySelector("#filter-word-sort");

let currentFrame = 0;
let likeList = [];
let recentlyList = [];
let wordPayload = {};

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

    if (currentFrame === 3) {
      this.loadContent(likeList);
    }

    if (currentFrame === 2) {
      this.loadContent(recentlyList);
    }

    //active ui
    switch (indexFrame) {
      case 0:
        //display search + result search
        resultFrameDOM.classList.remove("hidden");
        searchFrameDOM.classList.remove("hidden", "h-[20%]");
        searchFrameDOM.classList.add("h-[30%]");
        searchTextDOM.value = "";
        break;
      case 2:
      case 3:
        //display search + filter + word list
        searchFrameDOM.classList.remove("hidden", "h-[30%]");
        searchFrameDOM.classList.add("h-[20%]");
        filterDOM.classList.remove("hidden");
        wordListDOM.classList.remove("hidden");
        searchTextDOM.value = "";
        break;
      case 1:
        //display add word form
        addWordFrameDOM.classList.remove("hidden");
        break;
      case 4:
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
        <span class="word-description">${e.desc}</span>
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
      if (currentFrame === 2) {
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
      if (currentFrame === 3) {
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
      if (currentFrame === 2) {
        if (e.target.value === "asc") {
          this.loadContent(
            recentlyList.sort((a, b) => (a.word < b.word ? -1 : 1))
          );
        }
        if (e.target.value === "desc") {
          this.loadContent(
            recentlyList.sort((a, b) => (a.word > b.word ? -1 : 1))
          );
        }
      }
      if (currentFrame === 3) {
        switch (e.target.value) {
          case "asc":
            likeList.sort((a, b) => (a.word < b.word ? -1 : 1));
            break;
          case "desc":
            likeList.sort((a, b) => (a.word > b.word ? -1 : 1));
            break;
        }
        this.loadContent(likeList);
      }
    });
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
        const exist = likeList.find((e) => e.word === payload?.word);
        if (exist) this.activeLikeButton(true);
      }
    });
  },
};

app.readJSONtoWords("like");
app.readJSONtoWords("recently");
app.activeNavbar();
app.listenSearchForm();
app.listenLikeButton();
app.listenFilterSort();
app.ipcListenResponse();
