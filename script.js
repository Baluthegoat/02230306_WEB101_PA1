async function getAllPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await response.json();
    return data.results;
}

async function displayPokemonList(pokemonList){
    const pokemonListContainer = document.getElementById('pokemon-list');

    pokemonListContainer.innerHTML = `
        <ul class="pokemon-list">
            ${pokemonList.map(pokemon => `
                <li class="pokemon-item" data-name="${pokemon.name}">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractPokemonNumber(pokemon.url)}.png" alt="${pokemon.name}" />
                    <span>${pokemon.name}</span>
                </li>
            `).join('')}
        </ul>
    `;
}
async function getPokemonDetails() {
    const response = await fetch('https://pokeapi.co/api/v2/type/3');
    const data = await response.json();
    return data;
}
async function displayPokemonDetails(pokemonDetails) {
    const pokemonDetailsContainer = document.getElementById('pokemon-details');

    pokemonDetailsContainer.innerHTML = `
        <h2>${pokemonDetails.name}</h2>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractPokemonNumber(pokemonDetails.url)}.png" alt="${pokemonDetails.name}" />
    `;
}
function extractPokemonNumber(url) {
    const parts = url.split('/');
    return parts[parts.length - 2];
}
async function handlePokemonClick(event) {
    const pokemonName = event.target.closest('.pokemon-item').dataset.name;
    const allPokemon = await getAllPokemon();
    const clickedPokemon = allPokemon.find(pokemon => pokemon.name === pokemonName);
    const response = await fetch(clickedPokemon.url);
    const data = await response.json();
    displayPokemonDetails(data);
}
document.getElementById('pokemon-list').addEventListener('click', handlePokemonClick);

async function searchPokemon(searchQuery) {
    const allPokemon = await getAllPokemon();
    const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()));
    displayPokemonList(filteredPokemon);
}
async function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim();
    if (searchQuery !== '') {
        await searchPokemon(searchQuery);
    } else {
        // If search query is empty, display all Pokémon
        const allPokemon = await getAllPokemon();
        displayPokemonList(allPokemon);
    }
}

document.getElementById('searchForm').addEventListener('submit', handleSearch);

(async () => {
    const pokemonList = await getAllPokemon();
    displayPokemonList(pokemonList);
})();