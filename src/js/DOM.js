const DOMSelectors = {
  filterPlayer: document.getElementsByClassName("btn-player")[0],
  filterTeam: document.getElementsByClassName("btn-team")[0],
  list: document.querySelector(".item-list"),
  searchForm: document.getElementById("search-form"),
  searchArea: document.getElementById("search-area"),
  teamsButton: document.querySelector(".btn-team"),
  playerButton: document.getElementsByClassName(".item-name"),
  playerStatsDiv: document.getElementsByClassName(".player-stats"),
  playerStatsButton: document.querySelector(".btn-stats"),
  teamInfo: document.querySelector(".team-info"),
};

export { DOMSelectors };
