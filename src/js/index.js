import { DOMSelectors } from "./DOM";
import { genres } from "./genre";

///// CODE /////

const query = async function () {
  try {
    const response = await fetch();
    // `https://api.themoviedb.org/3/discover/movie?sort_by=average_vote.asc&vote_count.gte=10000&vote_average.gte=8&api_key=${key}`
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    alert("Hey something went wrong");
  }
};

query();
