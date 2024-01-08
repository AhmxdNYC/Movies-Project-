//localStorage.js

// Import default movie data from a JSON file
import movieData from "./movie-data.json";
console.log(movieData); // Log the imported data for debugging

// Function to set a key-value pair in localStorage
export const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value)); // Store the value as a JSON string
};

// Function to get a value from localStorage by key
export const getLocalStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)); // Parse the stored JSON string back into a JS object
  } catch (err) {
    console.error(err); // Log errors if JSON parsing fails
    return null;
  }
};

// Function to set the movies in local storage
// set movie string to have val of movie variable
export const setMovies = (movies) => setLocalStorageKey("movies", movies);

// Function to get the movies from local storage
export const getMovies = () => getLocalStorageKey("movies");

// Function to initialize movies in local storage with DEFAULT
export const initializeMoviesData = () => {
  if (!getLocalStorageKey("movies")) {
    setLocalStorageKey("movies", movieData);
  }
};

// Function to add a new movie to the existing array in localStorage
export const addMovie = (movie) => {
  const movies = getMovies() || [];
  setLocalStorageKey("movies", [...movies, movie]);
  console.log(movie);
  console.log(movies);
};

// Function to reset movies to the default set
export const resetMovie = () => {
  setMovies(movieData);
};

// Function to check if the movies list is empty and initialize if necessary
export const isMoviesListEmpty = () => {
  if (!getMovies()) setMovies(movieData);
};

// for extra features later

// Function to remove a specific movie from the list
// MUST CHANGE RENDER FOR THIS TO WORK INDEXES
    export const removeMovie = (indexToRemove) => {
        // Retrieve the current array of movies
        let movies = getMovies();
        // If there are movies
        if (movies) {
          // Remove the movie at the specified index
          movies.splice(indexToRemove, 1);
          // Update the movies in local storage with the modified array
          setMovies(movies);
          // (Note: No need to reattach event listeners here, as renderMovies will be called)
        }
      };

