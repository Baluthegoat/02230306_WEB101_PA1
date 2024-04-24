document.addEventListener('DOMContentLoaded', () => {
    const pokemonContainer = document.getElementById('pokemonContainer');

    async function fetchPokemon(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async function displayPokemonList() {
        const response = await fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const pokemonList = response.results;

        pokemonContainer.innerHTML = '';

        pokemonList.forEach(async pokemon => {
            const pokemonData = await fetchPokemon(pokemon.url);

            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon');

            pokemonCard.innerHTML = `
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <h3>${pokemonData.name}</h3>
                <p>Type: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
            `;

            pokemonContainer.appendChild(pokemonCard);
        });
    }

    displayPokemonList();

    document.getElementById('searchForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form submission
        
        const searchInput = document.getElementById('searchInput');
        const searchQuery = searchInput.value.toLowerCase();
        searchInput.value = ''; // Clear input field after search

        const response = await fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
        const pokemonData = response;

        pokemonContainer.innerHTML = '';

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon');

        pokemonCard.innerHTML = `
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            <h3>${pokemonData.name}</h3>
            <p>Type: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
        `;

        pokemonContainer.appendChild(pokemonCard);
    });
});
