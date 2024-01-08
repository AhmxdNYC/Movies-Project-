//event-handler-utils.js

// Import functions from dom-utils.js and localStorage.js
import { addMovie } from "./localStorage.js";
import { renderMovies } from "./dom-utils.js";

// Function to handle the submission of the movie form
export const handleSubmit = (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  const form = e.target; // Get the form that triggered the event
  const formData = new FormData(form); // Create a new FormData object from the form
  const movieObj = Object.fromEntries(formData); // Convert form data to a movie object

  addMovie(movieObj); // Add movie to localStorage
  renderMovies(); // Update the displayed movies on the DOM

  form.reset(); // Reset the form fields after submission
};
