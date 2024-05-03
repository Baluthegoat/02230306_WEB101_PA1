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
                <p><b>Type:</b> <span>${pokemonDetails.types.map(type => type.type.name).join(', ')}</span></p>
                <p><b>Strength:</b> <span>${pokemonDetails.base_experience}</span></p>
                <p><b>HP:</b> <span>${pokemonDetails.stats[0].base_stat}</span></p>
                <button onclick="showPokemonDetails('${pokemonDetails.name}')">Details</button>
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

createPokemonCards();
