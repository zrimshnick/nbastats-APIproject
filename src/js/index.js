import { DOMSelectors } from "./DOM";

// reference
const filterPlayer = document.getElementsByClassName("btn-player")[0];
const filterTeam = document.getElementsByClassName("btn-team")[0];
//const filterStats = document.getElementsByClassName("btn-stats")[0];

// reference use
DOMSelectors.searchArea.disabled = true;

filterPlayer.addEventListener("click", () => {
  document.getElementById("search-area").placeholder = "Search for a player...";
  DOMSelectors.searchArea.disabled = false;
  DOMSelectors.list.innerHTML = "";
});
filterTeam.addEventListener("click", () => {
  document.getElementById("search-area").placeholder = "View a team below...";
});

///// CODE /////

/// search functions ///
//let playerID = 237;
//let playerIDArray = [];
let playerIDArray = {};
const playersSearch = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
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
            playerIDArray[
              `${player.first_name} ${player.last_name}`
            ] = `${player.id}`;
            console.log(playerIDArray);
            DOMSelectors.list.insertAdjacentHTML(
              "beforeend",
              `<li><a class="item-name" id="p${player.id}">${player.first_name} ${player.last_name}</a></li>
            <div class="item-info" id="item-info">&nbsp&nbsp~&nbsp${player.team.full_name}  |  Pos: ${player.position}  |  ${player.height_feet}'${player.height_inches}",  ${player.weight_pounds}lbs  </div>
            <div class="player-stats" id="${player.id}"></div>`
            );
            DOMSelectors.searchArea.value = "";
            const playerStatsFunction = function () {
              const playerButtonText = document.getElementById(
                `p${player.id}`
              ).textContent;
              const playerIDParam = player.id;
              console.log(playerButtonText);
              console.log(playerIDParam);
              const gettingStats = async function () {
                try {
                  const response = await fetch(
                    `https://balldontlie.io/api/v1/season_averages?player_ids[]=${playerIDParam}`
                  );
                  const data = await response.json();
                  data.data.forEach((stats) => {
                    document.getElementById(
                      `${playerIDParam}`
                    ).innerText = `ppg: ${stats.pts}`;
                  });
                } catch (error) {
                  console.log(error);
                  alert("Something went wrong");
                }
              };
              gettingStats();
              /*document.getElementById(
                `ppg: ${player.id}`
              ).innerText = `${player.id}`;*/
            };
            playerStatsFunction();
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

//////// playerStats

////////
const teamList = function () {
  DOMSelectors.teamsButton.addEventListener("click", function (e) {
    e.preventDefault();
    DOMSelectors.searchArea.value = "";
    DOMSelectors.searchArea.disabled = true;
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
            `<button class="item-name">${team.full_name}</button>
            <div class="team-info hide" id="t${team.id}">${team.abbreviation}  |  Conference: ${team.conference}  |  Division: ${team.division}</div>`
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
/*const teamInfoFunction = function () {
  const findTeamID = async function () {
    try {
      const response = await fetch(
        `https://balldontlie.io/api/v1/teams?per_page=35`
      );
      const data = await response.json();
      data.data.forEach((team) => {
        document.getElementById(`${team.id}`).addEventListener("click", () => {
          teamInfo.classList.remove("hide");
        });
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  findTeamID();
};
*/
// calling the search functions //
playersSearch();
//showPlayerStats();
//playerStats();
teamList();
//teamInfoFunction();

/////// make a button to advance to next page
/////// make an error pop up if there's no results
