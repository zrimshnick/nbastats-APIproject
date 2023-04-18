import { DOMSelectors } from "./DOM.js";

// reference use
DOMSelectors.searchArea.disabled = true;
DOMSelectors.filterPlayer.addEventListener("click", () => {
  DOMSelectors.searchArea.placeholder = "Search for a player...";
  DOMSelectors.searchArea.disabled = false;
  DOMSelectors.list.innerHTML = "";
  DOMSelectors.playerStatsDirections.classList.remove("hide");
  DOMSelectors.teamInfoDirections.classList.add("hide");
  DOMSelectors.filterPlayer.classList.add("toggle");
  DOMSelectors.filterTeam.classList.remove("toggle");
});
DOMSelectors.filterTeam.addEventListener("click", () => {
  DOMSelectors.searchArea.placeholder = "View a team below...";
  DOMSelectors.playerStatsDirections.classList.add("hide");
  DOMSelectors.teamInfoDirections.classList.remove("hide");
  DOMSelectors.filterPlayer.classList.remove("toggle");
  DOMSelectors.filterTeam.classList.add("toggle");
});

///// CODE /////

/// search functions ///
const playersSearch = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    DOMSelectors.list.innerHTML = "";
    const searchParams = DOMSelectors.searchArea.value;
    const searchQuery = async function () {
      try {
        const response = await fetch(
          `https://balldontlie.io/api/v1/players?search=${searchParams}&per_page=100`
        );
        const data = await response.json();
        if (data.meta.total_count === 0) {
          alert(
            `No results for "${searchParams}": Please check player name spelling`
          );
          DOMSelectors.searchArea.value = "";
        } else {
        }
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
            DOMSelectors.list.insertAdjacentHTML(
              "beforeend",
              `<li><a class="item-name" id="p${player.id}">${player.first_name} ${player.last_name}</a></li>
            <div class="item-info" id="item-info" >&nbsp&nbsp~&nbsp${player.team.full_name}  |  Pos: ${player.position}  |  ${player.height_feet}'${player.height_inches}",  ${player.weight_pounds}lbs  </div>
            <div class="player-stats hide" id="${player.id}"></div>`
            );
            DOMSelectors.searchArea.value = "";
            const playerStatsFunction = function () {
              const playerIDParam = player.id;
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
                    ).innerText = `PPG: ${Number(stats.pts).toFixed(
                      1
                    )},\xa0\xa0RPG: ${Number(stats.reb).toFixed(
                      1
                    )},\xa0\xa0APG: ${Number(stats.ast).toFixed(
                      1
                    )}\xa0\xa0|\xa0\xa0SPG: ${stats.stl},\xa0\xa0BPG: ${
                      stats.blk
                    }\xa0\xa0|\xa0\xa0TO: ${Number(stats.turnover).toFixed(
                      1
                    )}\xa0\xa0|\xa0\xa0FG: ${Number(stats.fg_pct * 100).toFixed(
                      0
                    )}%, 3PT: ${Number(stats.fg3_pct * 100).toFixed(
                      0
                    )}%, FT: ${Number(stats.ft_pct * 100).toFixed(
                      0
                    )}%\xa0\xa0|\xa0\xa0MPG: ${stats.min}`;
                    document
                      .getElementById(`p${stats.player_id}`)
                      .addEventListener("click", () => {
                        if (
                          document
                            .getElementById(`${stats.player_id}`)
                            .classList.contains("hide")
                        ) {
                          document
                            .getElementById(`${stats.player_id}`)
                            .classList.remove("hide");
                        } else {
                          document
                            .getElementById(`${stats.player_id}`)
                            .classList.add("hide");
                        }
                      });
                  });
                } catch (error) {
                  console.log(error);
                  alert(
                    "Something went wrong: Problem fetching data from API; Check CORS Restrictions"
                  );
                }
              };
              gettingStats();
            };
            playerStatsFunction();
          }
        });
      } catch (error) {
        console.log(error);
        alert(
          "Something went wrong: Problem fetching data from API; Check CORS Restrictions"
        );
      }
    };
    if (searchParams.length > 0) {
      console.log("search params has stuff");
      searchQuery();
    } else {
      console.log("search params is blank");
      alert("Search Bar was left blank, please enter in a player name");
    }
  });
};

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
            `<button class="item-name" id="${team.abbreviation}" >${team.full_name}</button>
              <div class="team-info hide" id="t${team.id}" alt="${team.full_name} ${team.conference} ${team.division}">${team.abbreviation}  |  Conference: ${team.conference}  |  Division: ${team.division}</div>`
          );
          document
            .getElementById(`${team.abbreviation}`)
            .addEventListener("click", () => {
              if (
                document
                  .getElementById(`t${team.id}`)
                  .classList.contains("hide")
              ) {
                document.getElementById(`t${team.id}`).classList.remove("hide");
              } else {
                document.getElementById(`t${team.id}`).classList.add("hide");
              }
            });
        });
      } catch (error) {
        console.log(error);
        alert(
          "Something went wrong: Problem fetching data from API; Check CORS Restrictions"
        );
      }
    };
    searchQuery();
  });
};
// calling the search functions //
playersSearch();
teamList();
