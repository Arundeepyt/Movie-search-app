document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchButton").addEventListener("click", searchMovies);
});

function searchMovies() {
    let movieTitle = document.getElementById("searchInput").value.trim();

    if (movieTitle === "") {
        alert("Please enter a movie name!");
        return;
    }

    let apiKey = "dcb7763c"; // Your API Key
    let apiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

    document.getElementById("loading").style.display = "block"; // Show loading text

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("loading").style.display = "none"; // Hide loading text
            
            if (data.Response === "True") {
                document.getElementById("results").innerHTML = `
                    <div class="movie-item">
                        <h2>${data.Title} (${data.Year})</h2>
                        <img src="${data.Poster}" alt="Movie Poster">
                        <p><strong>Genre:</strong> ${data.Genre}</p>
                        <p><strong>Director:</strong> ${data.Director}</p>
                        <p><strong>Actors:</strong> ${data.Actors}</p>
                        <p><strong>Plot:</strong> ${data.Plot}</p>
                        <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
                    </div>
                `;
            } else {
                document.getElementById("results").innerHTML = `<p>Movie not found!</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("loading").style.display = "none"; // Hide loading text
            document.getElementById("results").innerHTML = `<p>Something went wrong. Try again!</p>`;
        });
}