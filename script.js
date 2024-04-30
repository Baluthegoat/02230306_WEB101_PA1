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
                <p><b>Type:</b> <span>${pokemonDetails.types[0].type.name}</span></p>
            </div>
        `;
        card.addEventListener('click', () => {
            window.location.href = `details.html?id=${pokemonDetails.id}`;
        
        })
        container.appendChild(card);
    });
}

createPokemonCards();

