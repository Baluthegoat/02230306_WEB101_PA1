document.addEventListener('DOMContentLoaded', function() {
    displayFavoritePokemon();
});

function displayFavoritePokemon() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';

    favorites.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-header">
                <h3>${pokemon.name}</h3>
                <img src="${pokemon.image}" alt="${pokemon.name} Image">
            </div>
            <div class="card-body">
                <button onclick="removeFromFavorites('${pokemon.name}')">Remove from Favorites</button>
            </div>
        `;
        favoritesList.appendChild(card);
    });
}

function removeFromFavorites(pokemonName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(pokemon => pokemon.name !== pokemonName);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavoritePokemon();
}
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});
