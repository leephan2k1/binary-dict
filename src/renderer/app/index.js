const menuItemsDOM = document.querySelectorAll(".menu-item");
const framesDOM = document.querySelectorAll(".frame");

const resultFrameDOM = document.querySelector("#result-frame");
const wordListDOM = document.querySelector("#wordList");
const filterDOM = document.querySelector("#filter");
const searchFrameDOM = document.querySelector("#search-frame");
const searchFormDOM = document.forms["search"];
const searchTextDOM = document.querySelector("#search-text");
const addWordFrameDOM = document.querySelector("#add-word-frame");
const softwareInfoDOM = document.querySelector("#software-info-frame");

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
        return;
      }
    });
    switch (indexFrame) {
      case 0:
        //display search + result search
        resultFrameDOM.classList.remove("hidden");
        searchFrameDOM.classList.remove("hidden", "h-[20%]");
        searchFrameDOM.classList.add("h-[30%]");
        break;
      case 1:
      case 3:
      case 4:
        //display search + filter + word list
        searchFrameDOM.classList.remove("hidden", "h-[30%]");
        searchFrameDOM.classList.add("h-[20%]");
        searchTextDOM.value = "";
        filterDOM.classList.remove("hidden");
        wordListDOM.classList.remove("hidden");
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

  listenSearchForm: function () {
    searchFormDOM.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    searchTextDOM.addEventListener("keyup", (e) => {
      ipcRenderer.send("search-value", e.target.value);
    });
  },
};

app.activeNavbar();
app.listenSearchForm();
