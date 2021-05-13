import { bashCompletionSpecFromOptions } from "dashdash";
import { DOMSelectors } from "./DOM";
import { filler } from "./filler";

///// CODE /////

/* const query = async function () {
  try {
    const response = await fetch();
    // `https://api.themoviedb.org/3/discover/movie?sort_by=average_vote.asc&vote_count.gte=10000&vote_average.gte=8&api_key=${key}`
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    alert("something went wrong");
  }
};

query(); */

const listen = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    DOMSelectors.list.innerHTML = "";
    const searchParams = DOMSelectors.searchArea.value;
    const searchQuery = async function () {
      try {
        const response = await fetch(
          `https://balldontlie.io/api/v1/players?search=${searchParams}`
        );
        const data = await response.json();
        data.data.forEach((player) => {
          console.log(player.last_name);
          DOMSelectors.list.insertAdjacentHTML(
            "beforeend",
            `<div class="player-row">
              <div class="player-name">${player.last_name}</div></div>`
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

listen();
