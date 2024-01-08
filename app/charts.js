import { getMovies } from "./localStorage.js";
export const createBarChart = () => {
    const movies = getMovies();
    const ctx = document.getElementById('barChart').getContext('2d');

    // Sort movies by their domestic box office totals in descending order
    // This allows the chart to display movies starting from the highest grossing
    const sortedMovies = movies.slice().sort((a, b) => b.domestic - a.domestic);

    // Extract the titles and domestic totals of each movie
    // These arrays will be used to label and populate the bar chart
    const movieTitles = sortedMovies.map(movie => movie.title);
    const domesticTotals = sortedMovies.map(movie => movie.domestic);

    // Create and configure the bar chart using Chart.js
    // The chart will display domestic totals for each movie
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: movieTitles,
            datasets: [{
                label: 'Domestic Totals ($)',
                data: domesticTotals,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true, // Start the y-axis from 0
                },
            },
        },
    });
};


export const createPieChart = () => {
    const movies = getMovies();
    const ctx = document.getElementById('pieChart').getContext('2d');
    const genreData = {};

    // Aggregate domestic totals for each genre
    // This loop calculates the total box office for each genre category
    movies.forEach(movie => {
        if (movie.genre) {
            genreData[movie.genre] = (genreData[movie.genre] || 0) + movie.domestic;
        }
    });

    // Prepare data for pie chart: extract genre names and their corresponding totals
    const genreLabels = Object.keys(genreData);
    const genreValues = Object.values(genreData);

    // Create and configure the pie chart to show distribution of domestic totals by genre
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: genreLabels,
            datasets: [{
                data: genreValues,
                backgroundColor: [
                    // Custom color array for visual differentiation of genres
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
            }],
        },
    });
};

export const createScatterPlot = () => {
    const movies = getMovies();
    const ctx = document.getElementById('scatterPlot').getContext('2d');

    // Create datasets for audience and critic scores
    // These datasets represent each movie as a point plotted against critic and audience scores
    const audienceDataset = {
        label: 'Audience Scores',
        data: movies.map(movie => ({ x: movie.criticScore, y: movie.audienceScore })),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        pointRadius: 4,
    };

    const criticDataset = {
        label: 'Critic Scores',
        data: movies.map(movie => ({ x: movie.criticScore, y: movie.criticScore })),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        pointRadius: 4,
    };

    // Create a scatter plot to visually compare audience and critic scores
    // This helps in identifying patterns or discrepancies between these two types of ratings
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [audienceDataset, criticDataset],
        },
        options: {
            plugins: {
                title: {
                    position: 'left',
                    display: true,
                    text: 'Critic vs. Audience Scores Comparison'
                },
                legend: {
                    display: true,
                },
                labels: {
                    font: {
                        fontColor: 'white'
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: 20,
                    max: 100,
                    ticks: {
                        stepSize: 10,
                    },
                },
                y: {
                    type: 'linear',
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