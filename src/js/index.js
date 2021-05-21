import { DOMSelectors } from "./DOM";
import { teamIDs } from "./teamID";

// reference
const filterPlayer = document.getElementsByClassName("btn-player")[0];
const filterTeam = document.getElementsByClassName("btn-team")[0];
const filterStats = document.getElementsByClassName("btn-stats")[0];

// reference use
filterPlayer.addEventListener("click", () => {
  document.getElementById("search-area").placeholder =
    "Search for a player for their bio...";
});
filterTeam.addEventListener("click", () => {
  document.getElementById("search-area").placeholder = "View a team below...";
});
filterStats.addEventListener("click", () => {
  document.getElementById("search-area").placeholder =
    "Search for a player for their stats...";
});

///// CODE /////

/// search functions ///
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
          `https://balldontlie.io/api/v1/players?search=${searchParams}&per_page=100`
        );
        const data = await response.json();
        data.data.forEach((player) => {
          DOMSelectors.list.insertAdjacentHTML(
            "beforeend",
            `<button class="item-name">${player.first_name} ${player.last_name}</button>`
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

const teamList = function () {
  DOMSelectors.teamsButton.addEventListener("click", function (e) {
    e.preventDefault();
    //test
    //console.log(DOMSelectors.searchArea.value);
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
            `<button class="item-name">${team.full_name}</button>`
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

/*const teamSearch = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // test
    //console.log(DOMSelectors.searchArea.value);
    DOMSelectors.list.innerHTML = "";
    const searchParams = DOMSelectors.searchArea.value;

    const searchQuery = async function () {
      try {
        const response = await fetch(
          `https://balldontlie.io/api/v1/teams?per_page=35`
        );
        const data = await response.json();
        data.data.forEach((team) => {
          let teamIDValue = "";
          const findID = function () {
            teamIDs.forEach((element) => {
              if (team.full_name.includes(element.searchParams)) {
                teamIDValue.push(element.id);
                //return teamIDValue;
              }
            });
          };
          findID();
        });
        const responseID = await fetch(
          `https://balldontlie.io/api/v1/teams/${teamIDValue}`
        );
        const dataID = await responseID.json();
        dataID.data.forEach((team) => {
          DOMSelectors.list.insertAdjacentHTML(
            "beforeend",
            `<button class="item-name">${team.full_name}</button>`
          );
        });
        /*DOMSelectors.list.insertAdjacentHTML(
            "beforeend",
            `<button class="item-name">${team.full_name}</button>`
          );*/
/*} catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    };
    searchQuery();
  });
};
*/

const seasonAveragesSearch = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // test
    //console.log(DOMSelectors.searchArea.value);
    DOMSelectors.list.innerHTML = "";
    const searchParams = DOMSelectors.searchArea.value;
    const searchQuery = async function () {
      try {
        const response = await fetch(
          // search param needs to be an id
          `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${searchParams}`
        );
        const data = await response.json();
        data.data.forEach((player) => {
          DOMSelectors.list.insertAdjacentHTML(
            "beforeend",
            `<button class="item-name">${player.season} ${player.pts} ${player.reb} ${player.ast} ${player.blk} ${player.stl} ${player.fg_pct} ${player.fg3_pct} ${player.ft_pct}</button>`
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
teamList();
//teamSearch();
seasonAveragesSearch();

/////// make a button to advance to next page
/////// make an error pop up if there's no results
