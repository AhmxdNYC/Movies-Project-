import { getMovies } from "./localStorage.js";

export const createBarChart = () => {
  const movies = getMovies();
  const ctx = document.getElementById("barChart").getContext("2d");

  const sortedMovies = movies.slice().sort((a, b) => b.domestic - a.domestic);
  const movieTitles = sortedMovies.map((movie) => movie.title);
  const domesticTotals = sortedMovies.map((movie) => movie.domestic);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: movieTitles,
      datasets: [
        {
          label: "Domestic Totals ($)",
          data: domesticTotals,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

export const createPieChart = () => {
  const movies = getMovies();
  const ctx = document.getElementById("pieChart").getContext("2d");
  const genreData = {};

  movies.forEach((movie) => {
    if (movie.genre) {
      genreData[movie.genre] = (genreData[movie.genre] || 0) + movie.domestic;
    }
  });

  const genreLabels = Object.keys(genreData);
  const genreValues = Object.values(genreData);

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: genreLabels,
      datasets: [
        {
          data: genreValues,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        title: {
          display: true,
          text: "Distribution of Domestic Totals by Genre",
        },
      },
    },
  });
};

export const createScatterPlot = () => {
  const movies = getMovies();
  const ctx = document.getElementById("scatterPlot").getContext("2d");

  const audienceDataset = {
    label: "Audience Scores",
    data: movies.map((movie) => ({
      x: movie.criticScore,
      y: movie.audienceScore,
    })),
    backgroundColor: "rgba(255, 99, 132, 0.8)",
    borderColor: "rgba(255, 99, 132, 1)",
    borderWidth: 1,
    pointRadius: 4,
  };

  const criticDataset = {
    label: "Critic Scores",
    data: movies.map((movie) => ({
      x: movie.criticScore,
      y: movie.criticScore,
    })),
    backgroundColor: "rgba(54, 162, 235, 0.8)",
    borderColor: "rgba(54, 162, 235, 1)",
    borderWidth: 1,
    pointRadius: 4,
  };

  new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [audienceDataset, criticDataset],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Critic vs. Audience Scores Comparison",
        },
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          min: 20,
          max: 100,
          ticks: {
            stepSize: 10,
          },
        },
        y: {
          type: "linear",
          min: 0,
          max: 100,
          ticks: {
            stepSize: 10,
          },
        },
      },
    },
  });
};
