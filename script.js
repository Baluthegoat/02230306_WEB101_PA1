fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
async function fetchPokemonList() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching Pokemon list:', error);
        return [];
    }
}

async function fetchPokemonData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function displayPokemonList() {
    const pokemonList = await fetchPokemonList();
    const pokemonContainer = document.querySelector('.pokemon-list .container');

    for (const pokemon of pokemonList) {
        const pokemonData = await fetchPokemonData(pokemon.url);
        const pokemonElement = document.createElement('div');
        pokemonElement.classList.add('pokemon-item');
        pokemonElement.innerHTML = `
            <h3>${pokemonData.name}</h3>
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
        `;

        pokemonContainer.appendChild(pokemonElement);
    }
}
displayPokemonList();

async function fetchPokemonSpecies(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getSpeciesData() {
    const speciesData = await fetchPokemonSpecies('https://pokeapi.co/api/v2/pokemon-species?limit=1000');
    console.log(speciesData);
}

getSpeciesData();