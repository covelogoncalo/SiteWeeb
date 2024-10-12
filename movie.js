const API_KEY = '542611a9de55ef5368c5692b1a18936b';
const BASE_URL = 'https://api.themoviedb.org/3';

// Fonction pour récupérer l'ID du film depuis l'URL
function getMovieId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Fonction pour récupérer les détails du film
function fetchMovieDetails() {
    const movieId = getMovieId();
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`; // Corrigé avec des backticks

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des détails du film');
            }
            return response.json();
        })
        .then(data => {
            displayMovieDetails(data);
            fetchTrailer(movieId); // Récupérer le trailer après avoir affiché les détails
        })
        .catch(error => console.error('Erreur :', error));
}

// Fonction pour afficher les détails du film
function displayMovieDetails(movie) {
    document.getElementById('movieTitle').innerText = movie.title;
    document.getElementById('moviePoster').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // Corrigé avec des backticks
    document.getElementById('movieDescription').innerText = movie.overview;
}

// Fonction pour récupérer le trailer du film
function fetchTrailer(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=fr-FR`; // Corrigé avec des backticks

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération du trailer');
            }
            return response.json();
        })
        .then(data => {
            displayTrailer(data.results);
        })
        .catch(error => console.error('Erreur :', error));
}

// Fonction pour afficher le trailer
function displayTrailer(trailers) {
    const trailerContainer = document.getElementById('trailerContainer');
    trailerContainer.innerHTML = ''; // Réinitialiser le conteneur avant d'ajouter un nouveau trailer

    if (trailers.length > 0) {
        const trailer = trailers[0]; // Prendre le premier trailer
        const trailerEmbed = document.createElement('iframe');
        trailerEmbed.src = `https://www.youtube.com/embed/${trailer.key}`; // Corrigé avec des backticks
        trailerEmbed.width = '560';
        trailerEmbed.height = '315';
        trailerEmbed.allowFullscreen = true;
        trailerContainer.appendChild(trailerEmbed);
    } else {
        trailerContainer.innerText = 'Aucun trailer disponible.';
    }
}

// Fonction pour revenir à la page précédente
function goBack() {
    window.history.back();
}

// Appel de la fonction pour récupérer les détails du film
fetchMovieDetails();
