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

let currentFrame = -1;

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

  listenSearchForm: function () {
    searchFormDOM.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    searchTextDOM.addEventListener("keyup", (e) => {
      ipcRenderer.send("search-value", e.target.value);
    });
  },

  styleResult: function () {
    const h1s = document.querySelectorAll("#search-result h1");
    const h2s = document.querySelectorAll("#search-result h2");
    const h3s = document.querySelectorAll("#search-result h3");
    const uls = document.querySelectorAll("#search-result ul");
    const ols = document.querySelectorAll("#search-result ol");
    h1s.forEach((e) => {
      e.classList.add("font-bold", "text-xl", "p-6");
    });
    h2s.forEach((e) => {
      e.classList.add("px-6", "py-1");
    });
    h3s.forEach((e) => {
      e.classList.add("px-6", "py-1");
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
        searchResultDOM.innerHTML = payload.html;
        this.styleResult();
      }
    });
  },
};

app.activeNavbar();
app.listenSearchForm();
app.ipcListenResponse();
