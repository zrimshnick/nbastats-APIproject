import { DOMSelectors } from "./DOM";

// reference
//const searchAreaPlaceholder = document.getElementById("search-form").placeholder;
const filterPlayer = document.getElementsByClassName("btn-player")[0];
const filterTeam = document.getElementsByClassName("btn-team")[0];
const filterStats = document.getElementsByClassName("btn-stats")[0];

// reference use
filterPlayer.addEventListener("click", () => {
  document.getElementById("search-area").placeholder =
    "Search for a player for their bio...";
});
filterTeam.addEventListener("click", () => {
  document.getElementById("search-area").placeholder = "Search for a team...";
});
filterStats.addEventListener("click", () => {
  document.getElementById("search-area").placeholder =
    "Search for a player for their stats...";
});

///// CODE /////

const playersSearch = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // test
    //console.log(DOMSelectors.searchArea.value);
    DOMSelectors.list.innerHTML = "";
    const searchParams = DOMSelectors.searchArea.value;
    const searchQuery = async function () {
      try {
        const response = await fetch(
          `https://balldontlie.io/api/v1/players?search=${searchParams}`
          //`https://cors-anywhere.herokuapp.com/https://balldontlie.io/api/v1/players?search=${searchParams}`
        );
        const data = await response.json();
        data.data.forEach((player) => {
          DOMSelectors.list.insertAdjacentHTML(
            "beforeend",
            `<button class="player-name">${player.first_name} ${player.last_name}</button>`
          );
        });
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    };
    searchQuery();
  });
};

playersSearch();
