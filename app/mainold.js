import "./style.css";
// data-store.js

import data from "./movie-data.json";
console.log(data); // It's now regular JS code!

// helpers
const handleSubmit = (e) => {
  // stop the reload/redirect
  e.preventDefault();

  // the FormData API makes object w all form data
  const form = e.target;
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData);

  console.log("here is your data:", formObj.genreInput);
  // do something with formObj data

  const MovieDataDiv = document.querySelector("#movie-data-div");
  const newDiv = document.createElement("div");
  newDiv.setAttribute("class", "each-movie");
  const movieTitle = formObj.movieTitleInput;
  const criticScore = formObj.criticScoreInput;
  const audienceScore = formObj.audienceScoreInput;
  const GrossSales = formObj.domesticGrossSalesInput;
  const genre = formObj.genreInput;
  newDiv.innerHTML = `
  <section>
    <h2>Movie Title: ${movieTitle}</h2>
    <p>Critic Score: ${criticScore}</p>
    <p>Audience Score: ${audienceScore}</p>
    <p>Gross Income: ${GrossSales.toLocaleString()}</p>
    <p>Genre: ${genre}</p>
  </section>
  `;
  MovieDataDiv.append(newDiv);

  form.reset();
};

const handleReset = () => {
  const form = document.getElementById("new-movie-form");
  form.reset();
};

localStorage.setItem("newLi", `whats up bro`);
const defaultMovies = () => {
  const movieDataDiv = document.querySelector("#movie-data-div");
  data.forEach((data) => {
    const singleMovie = document.createElement("div");
    singleMovie.setAttribute("class", "each-movie");
    singleMovie.innerHTML = `

      <h2 style='width: 100%'>Movie Title: ${data.title}</h2>
      <p>Critic Score: ${data.criticScore}</p>
      <p>Audience Score: ${data.audienceScore}</p>
      <p>Gross Income: ${data.domestic}</p>
      <p>Genre: ${data.genre}</p>
    `;
    movieDataDiv.append(singleMovie);
  });
};

//runners
const main = () => {
  // - Get id of form #
  // - Add event handler
  // - Extract Data From Form
  // - Put Data into an Object
  // 1. Create New Object based on input data
  // 2. Render info in object in the DOM
  const form = document.querySelector("#new-movie-form");
  form.addEventListener("submit", handleSubmit);
  defaultMovies();
  const resetButton = document.querySelector("#reset");
  resetButton.addEventListener("click", handleReset);
};

main();
