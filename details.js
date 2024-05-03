document.addEventListener('DOMContentLoaded', function() {
    const pokemonDetails = JSON.parse(localStorage.getItem('pokemonDetails'));
    if (pokemonDetails) {
        displayPokemonDetails(pokemonDetails);
    } else {
        alert('Pokemon details not found!');
        window.location.href = 'index.html';
    }
});

function displayPokemonDetails(pokemon) {
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonImage = document.getElementById('pokemon-image');
    const pokemonDetailsContainer = document.getElementById('pokemon-details');

    pokemonName.textContent = pokemon.name;
    pokemonImage.src = pokemon.sprites.front_default;

    const types = pokemon.types.map(type => type.type.name).join(', ');
    const strength = pokemon.base_experience;
    const hp = pokemon.stats[0].base_stat;

    pokemonDetailsContainer.innerHTML = `
        <p><b>Type:</b> <span>${types}</span></p>
        <p><b>Strength:</b> <span>${strength}</span></p>
        <p><b>HP:</b> <span>${hp}</span></p>
       
    `;
}
document.addEventListener('DOMContentLoaded', function() {
    // Get the back button element
    const backButton = document.getElementById('backButton');

    // Add event listener to navigate back to index.html when the back button is clicked
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Other code for displaying Pokémon details goes here
});