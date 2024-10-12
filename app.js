const API_KEY = '542611a9de55ef5368c5692b1a18936b';
const BASE_URL = 'https://api.themoviedb.org/3';

let isChangingSection = false; // État pour contrôler les changements de section

// Fonction pour récupérer les films
function fetchFilms() {
    const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=fr-FR`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des films');
            }
            return response.json();
        })
        .then(data => {
            displayContent(data.results, 'filmsSectionContent');
            showSection('filmsSection'); // Afficher uniquement les films
        })
        .catch(error => console.error('Erreur :', error));
}

// Fonction pour récupérer les séries
function fetchSeries() {
    const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=fr-FR`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des séries');
            }
            return response.json();
        })
        .then(data => {
            displayContent(data.results, 'seriesSectionContent');
            showSection('seriesSection'); // Afficher uniquement les séries
        })
        .catch(error => console.error('Erreur :', error));
}

// Fonction pour récupérer les animés
function fetchAnime() {
    const url = `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=fr-FR`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des animés');
            }
            return response.json();
        })
        .then(data => {
            displayContent(data.results, 'animeSectionContent');
            showSection('animeSection'); // Afficher uniquement les animés
        })
        .catch(error => console.error('Erreur :', error));
}

// Fonction pour récupérer les nouveautés
function fetchNouveautes() {
    const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=fr-FR`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des nouveautés');
            }
            return response.json();
        })
        .then(data => {
            displayContent(data.results, 'nouveautesSectionContent');
            showSection('nouveautesSection'); // Afficher uniquement les nouveautés
        })
        .catch(error => console.error('Erreur :', error));
}

// Fonction pour récupérer les populaires
function fetchPopulaires() {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des populaires');
            }
            return response.json();
        })
        .then(data => {
            displayContent(data.results, 'populairesSectionContent');
            showSection('populairesSection'); // Afficher uniquement les populaires
        })
        .catch(error => console.error('Erreur :', error));
}

// Fonction pour afficher les données dans une section
function displayContent(items, sectionId) {
    const container = document.getElementById(sectionId);
    container.innerHTML = '';

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'content-item';

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        img.alt = item.title;
        img.onclick = () => {
            window.location.href = `movie.html?id=${item.id}`; // Redirige vers la page de détails du film
        };

        div.appendChild(img);
        container.appendChild(div);
    });
}

// Fonction pour afficher uniquement la section sélectionnée
function showSection(sectionId) {
    const sections = ['filmsSection', 'seriesSection', 'animeSection', 'nouveautesSection', 'populairesSection'];
    sections.forEach(sec => {
        const el = document.getElementById(sec);
        if (sec === sectionId) {
            el.style.display = 'block'; // Afficher la section sélectionnée
        } else {
            el.style.display = 'none'; // Masquer les autres sections
        }
    });
}

// Fonction de navigation vers une section
function navigateToSection(sectionId) {
    if (!isChangingSection) {
        isChangingSection = true;

        // Appeler la fonction appropriée pour récupérer les données
        switch (sectionId) {
            case 'filmsSection':
                fetchFilms();
                break;
            case 'seriesSection':
                fetchSeries();
                break;
            case 'animeSection':
                fetchAnime();
                break;
            case 'nouveautesSection':
                fetchNouveautes();
                break;
            case 'populairesSection':
                fetchPopulaires();
                break;
            default:
                break;
        }

        // Mettre à jour l'URL
        history.pushState(null, null, `#${sectionId}`);

        // Réinitialiser après un délai
        setTimeout(() => {
            isChangingSection = false;
        }, 300); // Ajuste le délai si nécessaire
    }
}

// Événements pour chaque lien de la navigation
document.querySelectorAll('ul li a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le comportement par défaut
        const sectionId = link.getAttribute('href').replace('#', '') + 'Section'; // Ajoute 'Section' au ID
        navigateToSection(sectionId); // Appelle la fonction de navigation
    });
});

// Appeler les bonnes fonctions en fonction de la page
if (window.location.pathname.includes('index.html')) {
    fetchFilms(); // Charge les films par défaut
}

// Événement pour le bouton de recherche
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    if (query) {
        window.location.href = `search.html?q=${query}`;
    }
});

// Fonction pour afficher les résultats de recherche
function displaySearchResults(results) {
    const container = document.getElementById('searchResults');
    container.innerHTML = ''; // Vide le conteneur

    results.forEach(item => {
        const div = document.createElement('div');
        div.className = 'content-item';

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        img.alt = item.title;

        img.onclick = () => {
            window.location.href = `movie.html?id=${item.id}`; // Redirige vers la page de détails du film
        };

        const title = document.createElement('h3');
        title.textContent = item.title;

        div.appendChild(img);
        div.appendChild(title);
        container.appendChild(div);
    });
}

// Récupérer la requête de recherche et afficher les résultats
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q');

if (query) {
    document.getElementById('searchQuery').textContent = query; // Affiche la requête
    const searchUrl = `${BASE_URL}/search/multi?api_key=${API_KEY}&language=fr-FR&query=${query}`;

    fetch(searchUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des résultats de recherche');
            }
            return response.json();
        })
        .then(data => {
            displaySearchResults(data.results); // Affiche les résultats de recherche
        })
        .catch(error => console.error('Erreur :', error));
}
