document.addEventListener('DOMContentLoaded', function() {
    const pokemonDetails = JSON.parse(localStorage.getItem('pokemonDetails'));
    if (pokemonDetails) {
        displayPokemonDetails(pokemonDetails);
    } else {
        alert('Pokemon details not found!');
        window.location.href = 'index.html';
    }
});

async function fetchPokemonSpecies(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function displayPokemonDetails(pokemon) {
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonImage = document.getElementById('pokemon-image');
    const pokemonDetailsContainer = document.getElementById('pokemon-details');

    pokemonName.textContent = pokemon.name;
    pokemonImage.src = pokemon.sprites.front_default;

    const id = pokemon.id;
    const moves = pokemon.moves.map(move => move.move.name).join(', ');

    // Fetch species details to get habitat and gender information
    const speciesData = await fetchPokemonSpecies(pokemon.species.url);
    const habitat = speciesData.habitat ? speciesData.habitat.name : 'Unknown';
    const genderRate = speciesData.gender_rate;
    const genderRatio = genderRate === -1 ? 'Genderless' : `Male: ${(8 - genderRate) * 12.5}%, Female: ${genderRate * 12.5}%`;

    // Fetch stats details to get HP and strength
    const stats = pokemon.stats;
    const hp = stats.find(stat => stat.stat.name === 'hp').base_stat;
    // Assuming strength corresponds to attack stat
    const attack = stats.find(stat => stat.stat.name === 'attack').base_stat;

    pokemonDetailsContainer.innerHTML = `
        <p><b>ID:</b> <span>${id}</span></p>
        <p><b>Moves:</b> <span>${moves}</span></p>
        <p><b>HP:</b> <span>${hp}</span></p>
        <p><b>Attack:</b> <span>${attack}</span></p>
        <p><b>Habitat:</b> <span>${habitat}</span></p>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});
