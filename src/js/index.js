import { DOMSelectors } from "./DOM";

///// CODE /////

const listen = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // test
    console.log(DOMSelectors.searchArea.value);
    DOMSelectors.list.innerHTML = "";
    const searchParams = DOMSelectors.searchArea.value;
    const searchQuery = async function () {
      try {
        const response = await fetch(
          //`https://balldontlie.io/api/v1/players?search=${searchParams}`
          `https://cors-anywhere.herokuapp.com/https://balldontlie.io/api/v1/players?search=${searchParams}`
        );
        const data = await response.json();
        data.data.forEach((player) => {
          console.log(player.last_name);
          DOMSelectors.list.insertAdjacentHTML(
            "beforeend",
            `<div class="player-row">
              <div class="player-name">${player.last_name}</div>
             </div>`
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
