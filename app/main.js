//main.js

// Import styles and necessary functions from other modules
import "./style.css";
import {
  getMovies,
  initializeMoviesData,
  resetMovie,
  isMoviesListEmpty,
} from "./localStorage.js";
import { handleSubmit } from "./event-handler-utils.js";
import { renderMovies, MovieRemovalListener } from "./dom-utils.js";

import { 
  createBarChart,
  createPieChart,
  createScatterPlot 
} from "./charts.js";

const main = () => {
  // Initialize movies data if not already present
  if (!getMovies()) initializeMoviesData();

  // Render any existing movies on initial load
  renderMovies();

  // Attach event listener for movie form submission
  document.querySelector("form").addEventListener("submit", handleSubmit);

  // Attach event listeners for the reset button
  const resetButton = document.querySelector("#reset");
  resetButton.addEventListener("click", () => {
    resetMovie(); // Reset movie data to default
    renderMovies(); // Re-render movies after reset
  });

  // Check if movies list is empty and initialize json
  isMoviesListEmpty();
  renderMovies(); // Render movies after checking

  // must change render for this to work
  MovieRemovalListener();

  createBarChart();
  createPieChart();
  createScatterPlot();

};

main(); // Execute the main function
