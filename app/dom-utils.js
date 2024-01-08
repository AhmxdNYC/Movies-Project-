//dom-utils.js

// Import functions from localStorage.js
import { getMovies, removeMovie } from "./localStorage.js";

// Function to render movie data onto the DOM
export const renderMovies = () => {
  const movieDataDiv = document.querySelector("#movie-data-div");
  movieDataDiv.innerHTML = ""; // Clear existing movies in the div
  const movies = getMovies(); // Retrieve movies from local storage

  movies.forEach((movie,index) => {
    // For each movie, create a div and set its content
    const movieDiv = document.createElement("div");
    // During EACH ITERATION SETS A NEW INDEX CALLED 'data-movie-index' + index parameter
    movieDiv.setAttribute('data-movie-index', index);
    movieDiv.setAttribute('data-movie-title', movie.title)
    movieDiv.className = "each-movie";
    movieDiv.innerHTML = `
      <h2>Movie Title: ${movie.title}</h2>
      <p>Critic Score: ${movie.criticScore}</p>
      <p>Audience Score: ${movie.audienceScore}</p>
      <p>Gross Income: ${movie.domestic}</p>
      <p>Genre: ${movie.genre}</p>
    `;
    movieDataDiv.append(movieDiv); // Append the movie div to the main div
  });
};
export const MovieRemovalListener = () => {
    // Select the parent container of all movies
    const movieDataDiv = document.querySelector("#movie-data-div");
    // Add a click event listener to the parent container
    movieDataDiv.addEventListener('click', (e) => {
      // Determine if the clicked element is a movie div
      // check for closests CLASS taht was clicked 
      const movieElement = e.target.closest('.each-movie');
      // If a movie element was clicked
      if (movieElement) {
        // Get the index of the movie from the custom data attribute
        const movieIndex = parseInt(movieElement.getAttribute('data-movie-index'));
        // Remove the movie with the retrieved index
        removeMovie(movieIndex);
        // Re-render the movies to update the DOM
        renderMovies();
      }
    });
  };