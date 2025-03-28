document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchButton").addEventListener("click", searchMovies);
    document.getElementById("viewFavoritesButton").addEventListener("click", showFavorites);
});

function searchMovies() {
    let movieTitle = document.getElementById("searchInput").value.trim();

    if (movieTitle === "") {
        alert("Please enter a movie name!");
        return;
    }

    let apiKey = "dcb7763c"; // Your API Key
    let apiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

    document.getElementById("loading").style.display = "block";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("loading").style.display = "none";

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
                        <button onclick="addToFavorites('${data.Title}')">Add to Favorites</button>
                    </div>
                `;
            } else {
                document.getElementById("results").innerHTML = `<p>Movie not found!</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("loading").style.display = "none";
            document.getElementById("results").innerHTML = `<p>Something went wrong. Try again!</p>`;
        });
}

function addToFavorites(movieTitle) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(movieTitle)) {
        favorites.push(movieTitle);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`${movieTitle} added to Favorites!`);
    } else {
        alert(`${movieTitle} is already in Favorites!`);
    }
}

function showFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let favoritesList = document.getElementById("favoritesList");

    if (favorites.length === 0) {
        favoritesList.innerHTML = "<p>No favorite movies yet.</p>";
        return;
    }

    favoritesList.innerHTML = "<ul>" + favorites.map(movie => `<li>${movie}</li>`).join('') + "</ul>";
}