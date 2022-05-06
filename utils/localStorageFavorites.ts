const toggleFavorite = (id: number) => {
    let favorites: number[] = JSON.parse(
        localStorage.getItem('favorites') || '[]'
    );
    const isFavorite = favorites.includes(id);
    if (isFavorite) {
        favorites = favorites.filter((favorite) => favorite !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
};

const existPokemonInFavorites = (id: number) => {
    if (typeof localStorage === 'undefined') return false;
    const favorites: number[] = JSON.parse(
        localStorage.getItem('favorites') || '[]'
    );
    // console.log(favorites.includes(id));

    return favorites.includes(id);
};

const getFavoritePokemons = (): number[] => {
    const favorites: number[] = JSON.parse(
        localStorage.getItem('favorites') || '[]'
    );
    return favorites;
};

const exportedObject = {
    toggleFavorite,
    existPokemonInFavorites,
    getFavoritePokemons,
};

export default exportedObject;
