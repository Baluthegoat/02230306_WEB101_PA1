async function fetchPokemonData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function createPokemonCards() {
    const pokemonData = await fetchPokemonData('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const container = document.querySelector('.container');

    pokemonData.results.forEach(async (pokemon) => {
        const pokemonDetails = await fetchPokemonData(pokemon.url);
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-header">
                <h3>${pokemonDetails.name}</h3>
                <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name} Image">
            </div>
            <div class="card-body">
                <button onclick="showPokemonDetails('${pokemonDetails.name}')">Details</button>
                <button onclick="addToFavorites('${pokemonDetails.name}', '${pokemonDetails.sprites.front_default}')">Add to Favorites</button>
            </div>
        `;
        container.appendChild(card);
    });
}

async function showPokemonDetails(pokemonName) {
    const pokemonData = await fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (pokemonData.name) {
        localStorage.setItem('pokemonDetails', JSON.stringify(pokemonData));
        window.location.href = 'details.html';
    } else {
        alert('Pokemon not found!');
    }
}

async function searchPokemon() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const pokemonData = await fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
    if (pokemonData.name) {
        localStorage.setItem('pokemonDetails', JSON.stringify(pokemonData));
        window.location.href = 'details.html';
    } else {
        alert('Pokemon not found!');
    }
}

function addToFavorites(pokemonName, imageUrl) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push({ name: pokemonName, image: imageUrl });
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Pokemon added to favorites!');
}

createPokemonCards();

document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('favorites');
    backButton.addEventListener('click', function() {
        window.location.href = 'favorites.html';
    });
});
