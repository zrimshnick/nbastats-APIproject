import { DOMSelectors } from "./DOM";
import { playerIDs } from "./playerID";

// reference
const filterPlayer = document.getElementsByClassName("btn-player")[0];
const filterTeam = document.getElementsByClassName("btn-team")[0];
//const filterStats = document.getElementsByClassName("btn-stats")[0];

// reference use
filterPlayer.addEventListener("click", () => {
  document.getElementById("search-area").placeholder =
    "Search for a player for their bio...";
});
filterTeam.addEventListener("click", () => {
  document.getElementById("search-area").placeholder = "View a team below...";
});

///// CODE /////

/// search functions ///
//let playerID = 237;
let playerIDArray = [];
const playersSearch = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // test
    //console.log(DOMSelectors.searchArea.value);
    DOMSelectors.list.innerHTML = "";
    const searchParams = DOMSelectors.searchArea.value;
    /*const checkSearchBar = function () {
      if (Boolean(searchParams) = false) {
        alert("Please enter in a name")
      } else {

      }
    }*/
    const searchQuery = async function () {
      try {
        const response = await fetch(
          `https://balldontlie.io/api/v1/players?search=${searchParams}&per_page=100`
        );
        const data = await response.json();
        data.data.forEach((player) => {
          if (
            player.height_feet === null ||
            player.height_inches === null ||
            player.weight_pounds === null ||
            player.position === ""
          ) {
            DOMSelectors.list.insertAdjacentHTML(
              "beforeend",
              `<li><a class="item-name">${player.first_name} ${player.last_name} - ${player.team.abbreviation}</a></li>
              <div class="item-info" id="item-info">&nbsp&nbsp~&nbsp${player.team.full_name}</div>`
            );
          } else {
            const addID = function () {
              playerIDArray.push([
                `${player.id}`,
                `${player.first_name} ${player.last_name}`,
              ]);
            };
            addID();
            const playerID = player.id;
            DOMSelectors.list.insertAdjacentHTML(
              "beforeend",
              `<li><a class="item-name">${player.first_name} ${player.last_name} - ${player.team.abbreviation}</a></li>
            <div class="item-info" id="item-info">&nbsp&nbsp~&nbsp${player.team.full_name}  |  Pos: ${player.position}  |  ${player.height_feet}'${player.height_inches}",  ${player.weight_pounds}lbs  </div>
            <div class="player-stats" id="player-stats"></div>`
            );
            const getPlayerStats = async function () {
              try {
                const response = await fetch(
                  `https://balldontlie.io/api/v1/season_averages?player_ids[]=${playerID}`
                );
                const data = await response.json();
                data.data.forEach((stats) => {
                  document.getElementById(
                    "player-stats"
                  ).innerText = `ppg: ${stats.pts}`;
                });
              } catch (error) {
                console.log(error);
                alert("Something went wrong");
              }
            };
            getPlayerStats();
          }
        });
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    };
    searchQuery();
  });
};

/*
const playerStats = function () {
  DOMSelectors.playerButton.addEventListener("click", function (e) {
    e.preventDefault();
    const getStats = async function () {
      try {
        const response = await fetch(
          `https://balldontlie.io/api/v1/season_averages?player_ids[]=237`
        );
        const data = await response.json();
        data.data.forEach((player) => {
          DOMSelectors.list.insertAdjacentHTML(
            "beforeend",
            `<div class="player-stats" id"player-stats">ppggg: ${player.pts}</div>`
          );
        });
        console.log("working");
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    };
    getStats();
  });
};*/
const teamList = function () {
  DOMSelectors.teamsButton.addEventListener("click", function (e) {
    e.preventDefault();
    DOMSelectors.list.innerHTML = "";
    const searchQuery = async function () {
      try {
        const response = await fetch(
          `https://balldontlie.io/api/v1/teams?per_page=35`
        );
        const data = await response.json();
        data.data.forEach((team) => {
          DOMSelectors.list.insertAdjacentHTML(
            "beforeend",
            `<button class="item-name">${team.full_name} - ${team.abbreviation}</button>`
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

// calling the search functions //
playersSearch();
//showPlayerStats();
//playerStats();
teamList();

/////// make a button to advance to next page
/////// make an error pop up if there's no results
